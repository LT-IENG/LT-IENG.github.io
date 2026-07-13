/**
 * Remark plugin: strip Nunjucks {% raw %} / {% endraw %} tags
 * from markdown content before rendering, mimicking Hexo behavior.
 */
export function remarkStripRaw() {
  return (tree, file) => {
    // Walk all text nodes and strip the raw/endraw tags
    walk(tree, (node) => {
      if (node.type === 'text' || node.type === 'html' || node.type === 'inlineCode') {
        node.value = node.value.replace(/\{%\s*raw\s*%\}/g, '');
        node.value = node.value.replace(/\{%\s*endraw\s*%\}/g, '');
      }
      if (node.type === 'code') {
        node.value = node.value.replace(/\{%\s*raw\s*%\}/g, '');
        node.value = node.value.replace(/\{%\s*endraw\s*%\}/g, '');
      }
    });
  };
}

function walk(node, fn) {
  fn(node);
  if (node.children) {
    node.children.forEach((child) => walk(child, fn));
  }
}
