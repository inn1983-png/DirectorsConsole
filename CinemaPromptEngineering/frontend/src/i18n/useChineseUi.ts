import { useEffect } from 'react';

type Dictionary = Record<string, string>;

const TEXT_DICTIONARY: Dictionary = {
  "Director's Console": '导演控制台',
  'Cinema Prompt Engineering': '电影提示词工程',
  Storyboard: '分镜画布',
  Gallery: '素材库',
  Project: '项目',
  System: '系统',
  'Untitled Project': '未命名项目',
  'New Project': '新建项目',
  'Load Project': '加载项目',
  'Loading...': '加载中...',
  'Recent Projects': '最近项目',
  'Clear Recent Projects': '清空最近项目',
  'Save Project': '保存项目',
  'Saving...': '保存中...',
  'Save As...': '另存为...',
  'Project Settings': '项目设置',
  'Path Mappings': '路径映射',
  'Print Storyboard': '打印分镜',
  'Manage Nodes': '管理节点',
  'Restart Nodes': '重启节点',
  'Restarting...': '重启中...',
  'Cancel All Generations': '取消全部生成',
  'Render Nodes': '渲染节点',
  'Add Node': '添加节点',
  Remove: '移除',
  'Start Monitoring': '开始监控',
  'Stop Monitoring': '停止监控',
  'Select All': '全选',
  'No render nodes configured. Add nodes to distribute rendering.': '尚未配置渲染节点。添加节点后可分布式渲染。',
  'Project Name': '项目名称',
  'Output Folder Path': '输出文件夹路径',
  'Orchestrator URL': '调度器地址',
  'Naming Template': '命名模板',
  Preview: '预览',
  'Auto-save on generation completion': '生成完成后自动保存',
  'Common Templates:': '常用模板：',
  'Panel-based:': '按面板命名：',
  'Per-panel folders:': '按面板分文件夹：',
  'Shot-based:': '按镜头命名：',
  'Timestamped:': '按时间戳命名：',
  'Seed-based:': '按种子命名：',
  Cancel: '取消',
  'Save Settings': '保存设置',
  Validate: '验证',
  'Select Output Folder': '选择输出文件夹',
  'Image Generation': '图像生成',
  'Image Editing': '图像编辑',
  Upscaling: '放大修复',
  'Video Generation': '视频生成',
  'Text to Image': '文生图',
  'Image to Image': '图生图',
  InPainting: '局部重绘',
  'Generate': '生成',
  'Add Panel': '添加面板',
  'Import Workflow': '导入工作流',
  'Edit Workflow': '编辑工作流',
  'Workflow': '工作流',
  'Workflows': '工作流',
  'Parameters': '参数',
  'Notes': '备注',
  'Star Rating': '星级评分',
  'Panel Name': '面板名称',
  'Node Selection': '节点选择',
  'Image Viewer': '图片查看器',
  'Image Compare': '图片对比',
  'Node Manager': '节点管理',
  'Generation Progress': '生成进度',
  'File Browser': '文件浏览器',
  'Media Viewer': '媒体查看器',
  'Batch Rename': '批量重命名',
  'Auto-Rename': '自动重命名',
  'Move to New Folder': '移动到新文件夹',
  Trash: '回收站',
  'Color Tags': '颜色标签',
  'Duplicate Detection': '重复文件检测',
  Search: '搜索',
  Filter: '筛选',
  Sort: '排序',
  Grid: '网格',
  Masonry: '瀑布流',
  List: '列表',
  Timeline: '时间线',
  Settings: '设置',
  Close: '关闭',
  Save: '保存',
  Load: '加载',
  Import: '导入',
  Export: '导出',
  Delete: '删除',
  Rename: '重命名',
  Browse: '浏览',
  Online: '在线',
  Offline: '离线',
  Busy: '忙碌',
  Error: '错误',
  GPU: '显卡',
  VRAM: '显存',
  'GPU Usage:': 'GPU 使用率：',
};

const ATTRIBUTE_DICTIONARY: Dictionary = {
  'Remove from recents': '从最近项目移除',
  'Browse folders': '浏览文件夹',
  'Validate path': '验证路径',
  'No nodes available to restart': '没有可重启的节点',
  'Restart all ComfyUI backends': '重启所有 ComfyUI 后端',
  'Cancel all running generations': '取消所有正在运行的生成任务',
  'No generations running': '当前没有正在运行的生成任务',
  'Node Name (e.g., 5090-Node-1)': '节点名称（例如：5090-Node-1）',
  'ComfyUI URL (e.g., http://192.168.1.100:8188)': 'ComfyUI 地址（例如：http://192.168.1.100:8188）',
  'My VFX Project': '我的视觉项目',
  'e.g., Z:\\Projects\\MyProject\\renders': '例如：Z:\\Projects\\MyProject\\renders',
  'http://localhost:9820': 'http://localhost:9820',
  '{project}_Panel{panel}_{version}': '{project}_Panel{panel}_{version}',
};

const PARTIAL_REPLACEMENTS: Array<[RegExp, string]> = [
  [/^Just now$/i, '刚刚'],
  [/^(\\d+)m ago$/i, '$1 分钟前'],
  [/^(\\d+)h ago$/i, '$1 小时前'],
  [/^(\\d+)d ago$/i, '$1 天前'],
  [/^Restart (\\d+)$/i, '重启 $1 个'],
  [/^Select All \((\\d+)\/(\\d+)\)$/i, '全选（$1/$2）'],
  [/^Restart (\\d+) selected node\(s\)$/i, '重启 $1 个已选节点'],
  [/^● ONLINE$/i, '● 在线'],
  [/^● OFFLINE$/i, '● 离线'],
  [/^● BUSY$/i, '● 忙碌'],
  [/^● ERROR$/i, '● 错误'],
];

const translate = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return value;

  if (TEXT_DICTIONARY[trimmed]) {
    return value.replace(trimmed, TEXT_DICTIONARY[trimmed]);
  }

  for (const [pattern, replacement] of PARTIAL_REPLACEMENTS) {
    if (pattern.test(trimmed)) {
      return value.replace(trimmed, trimmed.replace(pattern, replacement));
    }
  }

  return value;
};

const translateAttributes = (root: ParentNode) => {
  const elements = root.querySelectorAll<HTMLElement>('[title], [placeholder], [aria-label]');
  elements.forEach((element) => {
    ['title', 'placeholder', 'aria-label'].forEach((attributeName) => {
      const rawValue = element.getAttribute(attributeName);
      if (!rawValue) return;
      const replacement = ATTRIBUTE_DICTIONARY[rawValue] || TEXT_DICTIONARY[rawValue] || translate(rawValue);
      if (replacement !== rawValue) {
        element.setAttribute(attributeName, replacement);
      }
    });
  });
};

const translateTextNodes = (root: ParentNode) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((node) => {
    const translated = translate(node.nodeValue || '');
    if (translated !== node.nodeValue) {
      node.nodeValue = translated;
    }
  });
};

const translateDom = () => {
  translateTextNodes(document.body);
  translateAttributes(document.body);
};

export function useChineseUi() {
  useEffect(() => {
    translateDom();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(translateDom);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['title', 'placeholder', 'aria-label'],
    });

    return () => observer.disconnect();
  }, []);
}
