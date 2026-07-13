---
title: 初学者都能看懂的对 Melitz (2003) 全文推导及读后感
date: 2025-03-26
updated: 2026-03-22
section: 阅读笔记
tags: [复现, 公式推导, 经济学]
featured: true
pinned: true
cover: https://pic4.zhimg.com/v2-9e263457ce6c13b061d049a5f9facecf_1440w.jpg
hero: https://pic4.zhimg.com/v2-9e263457ce6c13b061d049a5f9facecf_1440w.jpg
description: 对 Melitz (2003) 经典异质性企业贸易模型的全文推导与读后感。
toc: false    # 不显示目录，正文全宽居中
---


**《初学者都能看懂的对The Impact of Trade on Intra-Industry Reallocations and Aggregate Industry（Melitz，2003）全文推导及读后感》** 这篇文章写于我刚入门经济学的时候，那时候的我还非常的懵懂、十分的青涩，没想到现在却与原来的科研道路渐行渐远。

此时此刻，或许是站在了彻底告别科研的路口，无意间又翻出了当年写下的这篇文章，不禁十分感慨。我打算把这篇文章放在我的博客上（也同步在知乎），供大家在学习原文时参考，里面讲了**Melitz的模型是什么样的，他为什么会这样去构建这个模型，以及怎样去构建这个模型的**。

里面的内容我写的非常详细，可供刚刚学经济学的朋友参考，毕竟当时我也是个初学者（笑）。话不多说，让我们立即开始：

# 一、引言

李嘉图从比较优势论述了国家间的贸易理论；保罗·克鲁格曼将运输成本纳入到贸易理论分析中，开创了新经济地理理论；马克·J·梅里兹则将异质性企业理论融入到新经济地理学中，建立了新新经济地理学。如果说新经济地理理论的“新”指企业间运输成本与规模报酬的差异，那新新经济地理的“新”就是指生产率的差异。梅里兹是如何发现这一“新”的呢？现在就让我们一起来看看他于2003年写的文章*The Impact of Trade on Intra-Industry Reallocations and Aggregate Industry Productivity*。

这篇文章总的来说，可以依次分为：对需求端的建模，对生产端的建模，求解封闭经济下的均衡，开放经济下的均衡，以及贸易的影响。这篇文章显示了贸易是如何导致那些生产率更高的企业出口，而同时迫使生产率最低的企业退出，并使得市场份额更趋向于生产率更高的企业。最终实现了总生产率的提高，利润也分配给更有生产率的企业。同时，它也考虑了沉默成本对企业出口的影响。

# 二、全文推导

**（一）对需求端的建模**

给定了一个CES形式效用函数，总效用U为：

$$
U = \left[ \int_{\omega \in \Omega} q(\omega)^{\rho} \, d\omega \right]^{1/\rho}
$$

其中，$\omega$表示商品，$\Omega$表示可提供的商品数量，$0 < \rho < 1$。商品间是可替代的，两个商品间的替代弹性是$\sigma = 1/(1 - \rho) > 1$。实质上$\omega$代表不同企业，$q(\omega)$是不同企业的产品，之所以这样设，是因为异质性企业的生产率不同，他们的成本函数自然也不同，相应消费者的需求函数$q$也不同。

原文我是用word写的，用pandoc转成markdown有部分公式会出错，我就直接放图片了♡

<center>

![图片描述](https://picx.zhimg.com/v2-a799d38f66419bc492693e3a18f87353_1440w.jpg)

![图片描述](https://picx.zhimg.com/v2-fd9aef6355921eb5e0355aa4f6857d31_1440w.jpg)

![图片描述](https://pic4.zhimg.com/v2-691dfb71b7e0fbcaa404653d98923ae7_1440w.jpg)

![图片描述](https://picx.zhimg.com/v2-87137c49b0bc76a3dd3441252443c947_1440w.jpg)

![图片描述](https://pic1.zhimg.com/v2-59d686de52a8ef1e6ace06bf5938e914_1440w.jpg)

![图片描述](https://picx.zhimg.com/v2-e6485b4e25983ebf688a7e07f03ccdf7_1440w.jpg)

![图片描述](https://pic1.zhimg.com/v2-9d21bc633d8e91a94e9402552a473266_1440w.jpg)

![图片描述](https://pic2.zhimg.com/v2-10702427b75afd1f88a6c158679ba2ef_1440w.jpg)

![图片描述](https://pica.zhimg.com/v2-39e6c08da81c56da1dba5219f866ad14_1440w.jpg)

![图片描述](https://pic2.zhimg.com/v2-9ccf8b72776bffa1abc12f2e1dd39421_1440w.jpg)

![图片描述](https://pic2.zhimg.com/v2-f252c1905493ee016dbb90663fb5a337_1440w.jpg)

![图片描述](https://pica.zhimg.com/v2-ea24608091a6a846c69a014d0c219588_1440w.jpg)

![图片描述](https://pic4.zhimg.com/v2-2d6b3acec7528ab4a8272a6405ba9f11_1440w.jpg)

![图片描述](https://pic2.zhimg.com/v2-03c614b712c893c2e4a1990bddb76441_1440w.jpg)

![图片描述](https://pic2.zhimg.com/v2-4c6c532a07ab023cef033edfafc80afd_1440w.jpg)

![图片描述](https://pic1.zhimg.com/v2-37ec3201527c9d46d6d1afdb4b619adc_1440w.jpg)

![图片描述](https://pic4.zhimg.com/v2-9e263457ce6c13b061d049a5f9facecf_1440w.jpg)

![图片描述](https://pic2.zhimg.com/v2-723a74bae28ed050470c002577dc28ff_1440w.jpg)

![图片描述](https://pica.zhimg.com/v2-f5b1ab627fe674a29c417b293b0bd862_1440w.jpg)

![图片描述](https://picx.zhimg.com/v2-b8fcd43163c9007851d64132b363424d_1440w.jpg)

</center>

# 三、参考文献：

[1] Econometrica - 2003 - Melitz - The Impact of Trade on Intra‐Industry Reallocations and Aggregate Industry Productivity

[2] 上海社会科学院世界经济研究所博士生 - 李锦明 - Melitz2003主要内容翻译及证明

[3] 知乎网友 - 高级动物 - 国际贸易经典模型Melitz 2003 推导

文章的精妙之处无需多言，Melitz的公式告诉我们，只有好好打下经济学的基础（经济学的理论直觉与数理能力），才能将推公式和发文章信手拈来。

---

科研的道路是曲折的，能不能发顶刊是难说的，在这里笔者赋词一首，聊表过去的时光。

<center>

**《定风波·作别》**
回首当年灯火明，案头笺注伴深更。一卷文章初写就，依旧，墨痕深浅是曾经。
此去江湖风雨路，且住，人间何处不飘零。却看来时花似锦，莫问，也无风雨也无晴。

</center>