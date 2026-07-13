export interface Section {
  id: string;
  name: string;
  description: string;
  color: string;
  colorClass: string;
  emoji: string;
}

export const sections: Section[] = [
  {
    id: '项目作品',
    name: '项目作品',
    description: '独立开发的项目实践与技术实现',
    color: '#c4a882',
    colorClass: 'section-project',
    emoji: '',
  },
  {
    id: '技术探索',
    name: '技术探索',
    description: 'AI 技术原理、模型解析与编程技巧',
    color: '#5b7a8c',
    colorClass: 'section-tech',
    emoji: '',
  },
  {
    id: '阅读笔记',
    name: '阅读笔记',
    description: '经济学论文、读书思考与知识整理',
    color: '#b8937a',
    colorClass: 'section-reading',
    emoji: '',
  },
  {
    id: '闲隅拾笺',
    name: '闲隅拾笺',
    description: '随笔、杂谈与生活中的灵感碎片',
    color: '#8b9d83',
    colorClass: 'section-notes',
    emoji: '',
  },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
