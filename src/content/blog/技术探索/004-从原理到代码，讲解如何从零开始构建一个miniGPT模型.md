---
title: 从原理到代码，讲解如何从零开始构建一个miniGPT模型
date: 2026-03-22
updated: 2026-03-23
section: 技术探索
tags: [复现, 语言类大模型, AI]
cover: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/GPT2.png
hero: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/GPT2.png
featured: true
pinned: true
order: 2
description: 从零开始，逐步实现一个 mini GPT 模型，深入理解 Transformer 架构。
---

本文章参考学习项目：
https://github.com/bbruceyuan/LLMs-Zero-to-Hero

---

# 一、引言

简单来说，我们在做一件“自己造轮子”的事：**不依赖现成的深度学习库（如HuggingFace Transformers），仅使用PyTorch的基础组件，从零实现一个简化版的GPT模型，并用它来训练和生成文本**。

**总体思路如下**：

## 1.  **第一步：定义蓝图（配置）**
代码开头的`GPTConfig`类定义了模型的“超参数”，比如有多少层（`n_layer`）、多少个头（`n_head`）、嵌入维度（`n_embd`）等。这就像一个建筑图纸，规定了积木的大小和形状。

## 2.  **第二步：搭建基础积木（核心组件）**
从最核心的“单头注意力机制”（`SingleHeadAttention`）开始写。这里手动实现了Q、K、V的线性变换，以及**因果掩码（causal mask）**，确保模型只能看到当前位置之前的信息，这是GPT模型能够做预测的关键。
接着，将单头注意力并行化，组装成“多头注意力”（`MultiHeadAttention`）。这就像是把多个单头注意力拼在一起，让模型能从不同角度理解文本。

## 3.  **第三步：构建中层积木（Transformer块）**
创建了`FeedForward`（即MLP）和`Block`类。一个标准的Transformer块就是将“注意力层”和“前馈层”串起来，中间加上残差连接和层归一化。这是GPT的核心处理单元。

## 4.  **第四步：组装最终产品（完整GPT模型）**
用`GPT`类将所有积木组装起来。它包含了词嵌入和位置嵌入，然后堆叠多个`Block`，最后通过一个线性层（`lm_head`）将隐藏状态映射回词表大小，输出每个位置的下一个词的概率。

## 5.  **第五步：准备“原材料”（数据处理）**
`MyDataset`类负责读取数据。它读取JSONL文件，使用`tiktoken`将文本转换为数字（token ID），然后将长文本分割成固定长度（`block_size`）的片段。每个片段的前`block_size`个token作为输入（`x`），后`block_size`个token作为目标输出（`y`），用于计算损失。

## 6.  **第六步：让模型动起来（训练与生成）**
最后，代码构建了`DataLoader`，定义了优化器和学习率调度器，并编写了`train`和`eval`函数。在训练循环中，它进行前向传播、计算损失、反向传播和参数更新，并定期保存模型检查点。

---

# 二、原理讲解

要理解GPT的核心思路，这里可以参考GPT-2的详细模型架构。

在学习的过程中，非常建议看3Blue1Brown的这个视频辅助理解，常看常新：
https://www.bilibili.com/video/BV13z421U7cs
https://www.bilibili.com/video/BV1TZ421j7Ke

<center>

![image.png](https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/GPT2.png)

</center>

## 1. 输入部分
- **输入是一个序列**：假设一次输入 `B` 条句子（batch size），每条句子长度是 `T`（token数）。所以输入的形状是 `(B, T)`，里面存的是每个 token 的 ID。
- **Token Embedding**：用一个查找表把每个 token ID 变成对应的词向量。词向量的维度是 `C`（即模型隐藏层大小），所以这一步输出 `(B, T, C)`。
- **Position Embedding**：因为 Transformer 没有“顺序感”，需要额外告诉模型每个 token 在序列中的位置。这里也用一个可学习的查找表，根据位置索引得到位置向量，形状也是 `(T, C)`。**两者直接相加**，得到带位置信息的输入表示，形状 `(B, T, C)`。

**讲解一下：**
- B = Batch Size（批次大小）：一次同时喂给模型多少句话。主要处理并行计算加速。
- T = Sequence Length（序列长度）：一句话里有多少个 token（词 / 字）。
- C = Hidden Size（隐藏层大小）：每个词用多少维向量表示。一般来说，C越大，维度越高，一个词的含义越丰富，能捕捉更丰富的语义（情感、逻辑、上下文），但模型更大更慢。

举个例子：

```
假设：
B = 8（一次处理 8 句话）
T = 100（每句话最长 100 个词）
C = 768
那么输入形状就是：
(8, 100, 768)
```

---

## 2. Transformer 块（Block）—— 重复 N 次
图上画了一个 `N` 的标记，表示这个块会堆叠 N 次（比如 GPT‑2 的 12、24 层）。每个块内部结构完全相同，让我们仔细看。

### 2.1 第一个层归一化（Layer Norm）
- 输入先过一个 **LayerNorm**，保证数值稳定，加速训练。  
- 之后进入 **多头自注意力（Multi‑Head Attention）**。

### 2.2 多头自注意力（MHA）
这是 GPT 最关键的部分。

- **线性变换**：输入经过三个不同的线性层，分别得到 **Q（查询）、K（键）、V（值）**。它们的形状都是 `(B, T, C)`。
- **分头**：把 `C` 维拆成 `h` 个头，每个头的维度是 `C/h`（图中写的 `C/h`）。所以 Q、K、V 就变成了 `(B, h, T, C/h)`。
- **缩放点积注意力**：
  - 计算 `Q @ K^T`，得到 `(B, h, T, T)` 的注意力分数。
  - 除以 `sqrt(C/h)` 进行缩放，防止梯度消失。
  - **Mask**：因为 GPT 是自回归的，生成当前词时不能看到未来的词。所以会用一个“上三角”掩码把未来位置的分数变成负无穷，这样 softmax 后它们的权重几乎为零。
  - 对注意力分数做 softmax，再乘上 V，得到每个头的输出 `(B, h, T, C/h)`。
- **拼接与投影**：把 `h` 个头的结果在最后一个维度拼起来，变回 `(B, T, C)`，再经过一个线性层（图中标注的 `Linear (C, C)`）进行混合。这一步输出就是注意力模块的结果。

**讲解一下：**
Q：查询 = 我要找什么语义
K：键 = 我提供什么语义
Q・K 相似度 = 匹配程度
V：值 = 真正要传递的信息
**Q和K决定注意力在哪里（关联的程度、权重），V将相关的内容融合进来**
$$
\text{Output} = \text{Softmax}\left(\frac{QK^\top}{\sqrt{d}}\right) \cdot V
$$
如果缺少Q和V，就会变成简单的平均：
$$
\text{Output} = \frac{1}{T}\sum V_i
$$
多头注意力机制，就是C/h，提高模型对上下文的理解，以及并行计算的速度。

**具体地，$W_Q$如何训练出来？**
$W_Q$一开始是随机数 → 前向算输出 → 算误差 → 反向传播求梯度 → 用梯度更新 $W_Q$里的每个数字 → 重复上述过程，直到loss达到预期

#### （1） 初始化：$W_Q$一开始全是随机数
训练开始前，没人知道 $W_Q$ 应该是什么。
直接随机生成：

$$
W_Q = \begin{bmatrix}
0.1 & 0.2 \\
0.3 & 0.4
\end{bmatrix}
$$

这些数字完全是**乱的**，模型此时啥也不会。

#### （2）前向传播：用当前 $W_Q$ 算 Q。
输入词向量：
$$x = [0.5,\ 0.3]$$

计算 Q：
$$
Q = x \cdot W_Q
= [0.5,\ 0.3] \begin{bmatrix}0.1&0.2\\0.3&0.4\end{bmatrix}
= [0.14,\ 0.22]
$$

同理算出 K、V，再算注意力，最后得到模型输出。

#### （3）计算损失（模型答错了，产生误差）
假设这是一个语言模型：
- 真实下一个词：**天空**
- 模型当前预测：**书本**

就会产生一个 **loss 值**，比如 loss = 2.7

这个 loss 代表：**模型错得有多离谱**

#### （4） 反向传播：求 $W_Q$ 每个位置的梯度
这是训练最关键的一步。

神经网络会自动求导：
$$
\frac{\partial loss}{\partial W_Q}
$$

也就是：**$W_Q$里每个数字，稍微变一点，loss 会怎么变？**

比如算出来梯度可能是：
$$
\nabla W_Q = \begin{bmatrix}
0.02 & -0.01 \\
0.03 & -0.02
\end{bmatrix}
$$

梯度的意义：
- 正数：这个值变大，loss 会变大
- 负数：这个值变大，loss 会变小

#### （5） 更新 $W_Q$（往 loss 变小的方向挪一点）
用梯度下降公式：

$$
W_Q^{\text{new}} = W_Q^{\text{old}} - lr \times \nabla W_Q
$$

lr 是学习率，比如 0.01。

更新第一个值：
$$
0.1 - 0.01\times0.02 = 0.0998
$$

全部更新后，新的 W_Q 变成：

$$
W_Q^{\text{new}} = \begin{bmatrix}
0.0998 & 0.2001 \\
0.2997 & 0.4002
\end{bmatrix}
$$

此时只变了一丢丢，几乎看不出来。

#### （6） 重复
- 前向算 Q
- 算 loss
- 反向算梯度
- 更新 W_Q

慢慢的，同理Q、K、V：
- W_Q 越来越擅长把 x 变成**好用的查询向量**
- W_K 越来越擅长变成**匹配用的键**
- W_V 越来越擅长变成**信息载体**


---

## 3. 最后的输出层
- 堆叠完 N 个块之后，再经过一个 **Layer Norm**（图中“Layer Norm (C, *)”）。
- 然后是一个线性层 **Linear (C, V)**，把隐藏状态 `(B, T, C)` 映射到词表大小 `V`，得到每个位置上每个词的得分（logits），形状 `(B, T, V)`。
- 最后用 **Softmax** 把得分转换成概率分布（图中 `Softmax`）。训练时用交叉熵计算损失，生成时则从这个分布里采样下一个词。

**这里再补充一下softmax：**
$$
\text{Softmax}(x_i) = \frac{e^{x_i}}{\sum_{j=1}^{N} e^{x_j}}
$$
就是一个常见的归一化方法。
另外还可以加入温度，温度越高生成的就更相关、更确定；越低则更发散、更随机：
$$
\text{Softmax}(x_i, \tau) = \frac{e^{x_i / \tau}}{\sum_{j=1}^{N} e^{x_j / \tau}}
$$
整个注意力机制：
$$
\text{Output} = \text{Softmax}\left(\frac{QK^\top}{\sqrt{d}}\right) \cdot V
$$
**注意**：在 self-attention 计算中，注意力权重是通过 Query 和 Key 的点积得到的。点积的值随着向量维度 $d_k$ 增大而增大，因为 $\text{score} = Q \cdot K^T$，如果不做缩放，$\text{score}$ 数值会过大，经过 softmax 时会导致**梯度消失**或**梯度饱和**的问题。因为 softmax 在输入非常大或非常小时，会趋向于“接近 0 或 1”，对梯度的敏感性下降，从而影响模型训练。为了防止 softmax 输出过于极端、保持数值稳定性，需要对 $\text{score}$ 进行缩放：$ \text{score} = \frac{Q \cdot K^T}{\sqrt{d_k}} $，通过除以 $\sqrt{d_k}$，可以让 $\text{score}$ 的方差维持在一个稳定水平，避免因为维度过大而导致数值不稳定。


# 三、代码复现
基本上这个代码的含义以及是干什么的，我都在后面有注释或者解释。

## 1.导入相关的 package

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset
from torch.utils.data import DataLoader
from dataclasses import dataclass

import math

torch.manual_seed(1024)
```

## 2.模型预设

```python

@dataclass
class GPTConfig:
    block_size: int = 512   # 这里其实应该是文本的最大长度（ max_seq_len）。模型一次能处理的最大序列长度（即上下文窗口的大小）。
    batch_size: int = 12  # 每个训练批次（batch）中包含的样本数量。一次处理多少条句子。
    n_layer: int = 6  # Transformer 块的重复次数，也就是模型的深度（层数）。每一层都包含一个多头自注意力和一个前馈网络。层数越多，模型的表达能力越强，但训练难度和显存占用也越大。
    n_head: int = 12  # 多头注意力中的头数（heads），就是h。
    n_embd: int = 768    # 嵌入向量的维度，也是模型中所有隐藏层的维度（hidden size），就是C。
    head_size: int = n_embd // n_head # 每个注意力头的维度，就是C/h。
    dropout: float = 0.1  # dropout 概率。在训练过程中，随机将一部分神经元的输出置零，防止过拟合。0.1 是常用值。
    # # tiktoken 使用的是 GPT-2 的词表，大约有 50257 个token
    vocab_size: int = 50257 # tiktoken 使用的是 GPT‑2 的词表，共 50257 个 token。这个值决定了最后一层输出（线性层）的维度，因为模型要为每个 token 计算概率。

```

## 3.模型结构

### 3.1 单头注意力机制 (SingleHeadAttention)
```python

class SingleHeadAttention(nn.Module):
    def __init__(self, config): 
        super().__init__()  # 继承nn.Module的所有功能，让这个类能被 PyTorch 正常使用
        self.key = nn.Linear(config.n_embd, config.head_size)
        self.value = nn.Linear(config.n_embd, config.head_size)
        self.query = nn.Linear(config.n_embd, config.head_size)
        self.head_size = config.head_size

        # Q/K/V线性层：分别将输入（形状 (B, T, C)）映射到每个头的维度 head_size（即 C/h ）

        self.register_buffer(
            'attention_mask', 
            torch.tril(torch.ones(config.block_size, config.block_size))
        )

        # self.register_buffer 创建了一个下三角矩阵，形状 (block_size, block_size)，用于在计算注意力时遮住未来位置。

        self.dropout = nn.Dropout(config.dropout)

        # 创建dropout层：防止过拟合

    def forward(self, x):
        batch_size, seq_len, hidden_size = x.size()
        # 把输入数据 x 的形状拆出来：就是(B, T, C)
        k = self.key(x)
        v = self.value(x)
        q = self.query(x)
        weight = q @ k.transpose(-2, -1)   # @ 就是 torch.matmul 的简化写法
        # 一定要在 softmax 前除以 sqrt(head_size)
        # 这个weight就是注意力分数，查询和匹配打分QK^T
        weight = weight.masked_fill(
            self.attention_mask[:seq_len, :seq_len] == 0, 
            float('-inf')
        ) / math.sqrt(self.head_size)  
        # 这里的 hidden_size 其实是 head_size，因为是单头
        # masked_fill：把上三角变成负无穷，让模型看不到未来的词
        weight = F.softmax(weight, dim=-1)
        weight = self.dropout(weight) # 随机丢弃一些权重，防止模型死记硬背
        out = weight @ v # 用权重乘以 V：得到最终的注意力输出
        return out # 返回计算结果

```

### 3.2 单头注意力机制 (SingleHeadAttention)

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.heads = nn.ModuleList(
            [
                SingleHeadAttention(config)
                for _ in range(config.n_head)
            ]
        )
        # 创建多个 “单头注意力”，for _ in range(config.n_head)：创建 N 个单头。前面n_head: int = 12
        self.proj = nn.Linear(config.n_embd, config.n_embd) # 把多头结果拼回去
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x):
        output = torch.cat(
            [h(x) for h in self.heads],  # 每个头都算一遍注意力
            dim=-1  # 沿着最后一个维度拼接
        ) # (B, T, n_embd)
        output = self.proj(output)
        output = self.dropout(output)
        return output
        # 将每个头的输出（维度 head_size）拼接起来，还原回原始维度 n_embd，再通过一个线性层进行融合，最后加dropout。

```

### 3.3 前馈网络 (FeedForward)

```python
class FeedForward(nn.Module):
    # 实际上就是 MLP (多层感知机)
    def __init__(self, config):
        super().__init__()
        self.net = nn.Sequential(
          # 第一层：把维度放大 4 倍
            nn.Linear(config.n_embd, 4 * config.n_embd),
          # 激活函数：加入非线性，让模型能学复杂东西
            nn.GELU(),
          # 第二层：把维度缩回去
            nn.Linear(4 * config.n_embd, config.n_embd),
          # 随机丢神经元，防止过拟合
            nn.Dropout(config.dropout)
        )
    
    def forward(self, x):
        return self.net(x)

```

Attention = 大家互相聊天、找关系
FeedForward = 每个人自己安静思考、消化信息
Transformer 就是：
聊天 → 思考 → 聊天 → 思考……
反复堆叠，最后就变聪明了。

### 3.4 Transformer块 (Block)

```python
class Block(nn.Module):
    def __init__(self, config):
        super().__init__()
        head_size = config.n_embd // config.n_head
        self.att = MultiHeadAttention(config) # 多头注意力（找关系）
        self.ffn = FeedForward(config) # 前馈网络（独立思考）
        self.ln1 = nn.LayerNorm(config.n_embd) # 归一化1（稳定训练）
        self.ln2 = nn.LayerNorm(config.n_embd) # 归一化2（稳定训练）

    def forward(self, x):
        x = x + self.att(self.ln1(x)) # 第一步：注意力 + 残差
        x = x + self.ffn(self.ln2(x)) # 第二步：前馈 + 残差
        return x

```

先记住一句话
Block = 注意力 + 思考 + Norm + 残差
一个完整的 “理解 + 思考” 循环
大模型就是把这个 Block 重复堆叠 20 次、50 次、100 次
堆得越多，模型越聪明！
**举个例子：**
```
输入一句话 x
↓
ln1 标准化
↓
att 注意力：词之间互相找关系
↓
残差：加上原来的 x（保留原味）
→ 得到新 x
↓
ln2 标准化
↓
ffn 前馈：每个词自己深度思考
↓
残差：加上刚才的 x（保留记忆）
↓
输出最终结果
```

### 3.5 完整GPT模型 (GPT)

```python
class GPT(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.token_embedding_table = nn.Embedding(config.vocab_size, config.n_embd) # 词嵌入（把文字变成向量）
        self.position_embedding_table = nn.Embedding(config.block_size, config.n_embd) # 位置编码（告诉模型词的顺序）
        self.blocks = nn.Sequential(
            *[Block(config) for _ in range(config.n_layer)]
        ) # 把刚才的 Block 重复 n_layer 次
        self.ln_final = nn.LayerNorm(config.n_embd)
        # 归一化
        self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False) # 输出层（预测下一个字）
        
        # linear (4 -> 8)； weight shape 是记上是 8 * 4，
        # 所以 embedding weight 和 lm_head weight 是共享的
        # 这里学习一下 tie weight。
        # 这是为了减少参数，加快训练；（现在 25的 SLM 很多都这样做了，注意⚠️）
        # self.token_embedding_table.weight = self.lm_head.weight 输入嵌入 和 输出层 共享权重

        self.apply(self._init_weights) # 递归初始化模型所有权重
    
    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
          # 线性层初始化，这里使用的是正态分布初始化
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            # 偏置初始化：全零
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
          # 嵌入层初始化
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)

    def forward(self, idx, targets=None):
      # 输入文字 idx → 模型计算 → 输出预测 logits
        # idx 是输入的 token ids
        batch, seq_len = idx.size() # 拿到输入尺寸
        token_emb = self.token_embedding_table(idx) # 文字 → 词向量

        # 生成位置向量
        # seq 长度是这次输入的最大长度
        pos_emb = self.position_embedding_table(
            # 要确保 位置编码和输入的 idx 在同一个设备上
            torch.arange(seq_len, device=idx.device)
        )
        # 有一个经典题目：为什么 embedding 和 position 可以相加？
        # 1. 维度匹配：词嵌入和位置编码都被设计为相同维度（如d_model=512），都是形状为[seq_len, d_model]的向量。逐元素相加在数学上是合法的，结果仍是同一向量空间中的向量。# 2. 信息融合：相加后的向量可以视为同时编码了两种信息：语义信息：来自词嵌入，表示词语的语义内容；位置信息：来自位置编码，表示词语在序列中的顺序。
        x = token_emb + pos_emb   # shape is (batch, seq_len, n_embd)
        x = self.blocks(x) # 经过 N 层注意力 + 思考
        x = self.ln_final(x) # 最终归一化
        logits = self.lm_head(x)   # shape is (batch, seq_len, vocab_size) 预测下一个词 logits = 每个词的概率分数
        
        if targets is None:
            loss = None
        else:
            batch, seq_len, vocab_size = logits.size()
            logits = logits.view(batch * seq_len, vocab_size)
            targets = targets.view(batch * seq_len)
            loss = F.cross_entropy(logits, targets)
        return logits, loss
        # 计算损失

    def generate(self, idx, max_new_tokens):
        # idx is (B, T) array of indices in the current context，generate 函数：让模型写文章！
        for _ in range(max_new_tokens):
            # 如果序列太长，只取最后 block_size 个token，防止句子太长
            idx_cond = idx if idx.size(1) <= self.block_size else idx[:, -self.block_size:]
            # 获取预测
            logits, _ = self(idx_cond)
            # 只关注最后一个时间步（最后一个词）的预测
            logits = logits[:, -1, :]  # becomes (B, vocab_size)
            # 应用softmax获取概率
            probs = F.softmax(logits, dim=-1)
            # 采样下一个token
            idx_next = torch.multinomial(probs, num_samples=1)  # (B, 1)
            # 附加到序列上，拼接到句子后面
            idx = torch.cat((idx, idx_next), dim=1)  # (B, T+1)
        return idx
```

## 4.准备数据

### 4.1 切割数据
把文字切成模型能吃的小块

```python
# 写一个 dataset，为了 Dataloader 准备
class MyDataset(Dataset):
    def __init__(self, path, block_size=512):
        # block_size：模型一次看多长的句子（默认 512 个词）
        import tiktoken
        self.enc = tiktoken.get_encoding("gpt2")
        self.block_size = block_size

        self.eos_token = self.enc.encode(
            "<|endoftext|>",
            allowed_special={"<|endoftext|>"}
        )[0]
        # 设置结束符（句子结束标记）,<|endoftext|> = 一段话结束

        import json
        # 导入 Python 标准库的 json 模块，用于解析 JSON 格式的字符串。因为输入文件是 JSONL 格式（每行一个 JSON 对象），我们需要用 json.loads 把每行字符串转换成字典，然后取出 'text' 字段。

        self.encoded_data = []
        # 创建一个空列表 self.encoded_data，它将是最终存储所有样本的容器。每个样本是一个长度为 block_size + 1 的 token 列表。

        self.max_lines = 1000 # 只取前 1000 行（防止数据太大）
        raw_data = [] # 用来临时存放从文件中提取出来的原始文本（字符串形式）。
        with open(path, 'r') as f: # 以只读模式打开 path 指定的文件，并将文件对象赋值给变量 f。with 语句确保文件在操作结束后自动关闭。
            for i, line in enumerate(f): # enumerate(f) 会迭代文件的每一行，并返回索引 i 和行内容 line。这样我们可以知道当前是第几行。
                if i >= self.max_lines:
                    break
                    #如果当前行号（从 0 开始）已经达到或超过 max_lines，就跳出循环，不再继续读取后续行。这样可以确保只处理前 1000 行。
                try:
                    text = json.loads(line.strip())['text']
                    raw_data.append(text)
                except json.JSONDecodeError:
                    continue
                except Exception as e:
                    continue
                    # line.strip() 去掉行首尾的空白字符（如换行符）。
                    # json.loads(...) 将 JSON 字符串解析为 Python 字典。然后从字典中取出键 'text' 对应的值，赋给 text。如果成功，就把这个文本添加到 raw_data 列表中。如果 json.loads 失败（比如该行不是合法的 JSON），会抛出 json.JSONDecodeError，此时我们直接 continue 跳过这一行。如果还有其他任何异常（比如字典中没有 'text' 键），也 continue 跳过。这种捕获所有异常的写法比较宽泛，但对于简单示例足够。
        full_encoded = [] # 首先创建空列表 full_encoded，它将存放整个语料库的所有 token ID。
        for text in raw_data:
            encoded_text = self.enc.encode(text)
            full_encoded.extend(encoded_text + [self.eos_token])
        # 遍历 raw_data 中的每一条原始文本。
        # self.enc.encode(text) 用 tiktoken 分词器将文本编码成 token ID 列表。
        # encoded_text + [self.eos_token] 在编码后的文本末尾加上一个 EOS token（表示该文本结束）。
        # full_encoded.extend(...) 把这一小段（文本 tokens + EOS）追加到 full_encoded 的末尾。这样，所有文本就按顺序拼接成了一个很长的 token 流。

        # 将长文本分割成训练样本
        for i in range(0, len(full_encoded), self.block_size): # 使用步长为 block_size 的循环，遍历 full_encoded。i 是每个样本的起始索引，从 0 开始，每次增加 block_size。
            # 多取一个 Token 作为目标
            # 从 full_encoded 中切出一个片段，从索引 i 到 i+block_size+1（左闭右开）。长度为 block_size + 1。因为 GPT 训练时，每个样本需要 block_size 个输入 token 和 block_size 个目标 token，所以样本长度比 block_size 多 1。
            chunk = full_encoded[i:i+self.block_size+1]
            # 如果长度不够，用 eos_token 填充
            # 如果这个切出来的 chunk 长度不足 block_size + 1（通常发生在最后一个窗口），就用 EOS token 填充到所需长度。这样保证所有样本长度一致，方便批量训练。
            if len(chunk) < self.block_size + 1:
                chunk = chunk + [self.eos_token] * (self.block_size + 1 - len(chunk))
            # 将处理好的 chunk（长度为 block_size + 1 的 token 列表）添加到 self.encoded_data 中。训练时，__getitem__ 方法会从这个列表中取出一个样本，并切成输入 x（前 block_size 个 token）和目标 y（后 block_size 个 token）。
            self.encoded_data.append(chunk)
    
    def __len__(self):
        return len(self.encoded_data)
    # 告诉系统：你有多少条训练数据


    def __getitem__(self, idx):
        chunk = self.encoded_data[idx] # 取出第 idx 个样本（长度为 block_size+1 的列表）
        x = torch.tensor(chunk[:-1], dtype=torch.long) # 输入：前 block_size 个 token
        y = torch.tensor(chunk[1:], dtype=torch.long) # 目标：后 block_size 个 token
        return x, y
        #例如，如果 chunk = [1, 2, 3, 4, 5]（block_size=4），那么：x = [1, 2, 3, 4]，y = [2, 3, 4, 5]。模型学习的是：看到 1 预测 2，看到 [1,2] 预测 3，依此类推。最后用 torch.tensor 将列表转换成 PyTorch 张量，类型为 torch.long（因为 token ID 是整数）。

    def encode(self, text):
        """将文本编码为token IDs"""
        return self.enc.encode(text)

    def decode(self, ids):
        """将token IDs解码为文本"""
        return self.enc.decode(ids)

```

### 4.2 创建并划分数据集

```python

# train data
train_dataset = MyDataset('')
# 在这里放置数据集路径
# https://github.com/mobvoi/seq-monkey-data

# split traindataset to train and val
train_dataset, val_dataset = torch.utils.data.random_split(train_dataset, [0.9, 0.1])
# torch.utils.data.random_split 随机切分数据集。
# 参数 [0.9, 0.1] 表示将 train_dataset 中的 90% 样本分配给 train_dataset（训练集），剩余 10% 分配给 val_dataset（验证集）。
# 这样我们就得到了两个独立的 Dataset 对象，用于后续的模型训练和验证。

# 创建 DataLoader
train_loader = DataLoader(train_dataset, batch_size=12, shuffle=True)
# 训练加载器：
# batch_size=12：每个批次包含 12 个样本。
# shuffle=True：每个 epoch 开始时随机打乱数据顺序，增加模型训练的随机性，有助于收敛。
val_loader = DataLoader(val_dataset, batch_size=12, shuffle=False)
# 验证加载器：
# batch_size=12：同样使用 12 个样本一批。
# shuffle=False：验证时不打乱数据，这样每次验证的结果更稳定，也方便对比不同 epoch 的验证损失。

```

## 5.开始运行
```python
model = GPT(GPTConfig())
device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)

# 打印模型一共有多少参数

total_params = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total_params / 1e6} M")

optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)
# AdamW 是 Adam 优化器的一个变体，加入了权重衰减（decoupled weight decay），在大模型训练中表现更好。传入模型的全部参数 model.parameters()。学习率 lr=3e-4 是一个常用的初始值（对于预训练语言模型通常是 1e-4 到 6e-4 之间）。
# 设置 cosine 学习率
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=1000)
# CosineAnnealingLR 是余弦退火调度器，它按照余弦曲线从初始学习率逐渐衰减到 0。T_max 表示完成一个完整余弦周期的迭代次数（这里设为 1000 步）。在训练过程中，每步优化器更新后，调度器会调整学习率。。
```

```python
# 训练循环
def train(model, optimizer, scheduler, train_loader, val_loader, device):
    model.train()
    total_loss = 0
    for batch_idx, (x, y) in enumerate(train_loader):
        # 将数据移到设备上
        x, y = x.to(device), y.to(device)
        
        # 前向传播
        logits, loss = model(x, targets=y)
        
        # 反向传播
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        # 调整学习率
        scheduler.step()
        
        total_loss += loss.item()
        
        if batch_idx % 100 == 0:
            print(f'Epoch: {epoch}, Batch: {batch_idx}, Loss: {loss.item():.4f}')
    return total_loss

def eval(model, val_loader, device):
    # 验证
    model.eval()
    val_loss = 0
    with torch.no_grad():
        for x, y in val_loader:
            x, y = x.to(device), y.to(device)
            logits, loss = model(x, targets=y)
            val_loss += loss.item()
    return val_loss


for epoch in range(2):
    train_loss = train(model, optimizer, scheduler, train_loader, val_loader, device)
    val_loss = eval(model, val_loader, device)
    print(f'Epoch: {epoch}, Train Loss: {train_loss/len(train_loader):.4f}, Val Loss: {val_loss/len(val_loader):.4f}')

    # 保存模型
    avg_val_loss = val_loss / len(val_loader)
    checkpoint = {
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'scheduler_state_dict': scheduler.state_dict(),
        'val_loss': avg_val_loss,
    }
    # 保存每个epoch的模型
    torch.save(checkpoint, f'checkpoints/model_epoch_{epoch}.pt')
    
```