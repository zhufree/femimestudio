// timeline.js - 开发进程时间线组件
export default class Timeline {
  constructor() {
    this.translations = {
      zh: {
        sectionTitle: '开发进程',
        timelineItems: [
          {
            date: '2025年3月',
            title: '角色设计完成',
            description: '完成了游戏角色的设计和细节调整，包括表情和姿态的各种变化。',
            image: 'assets/images/character_design.png'
          },
          {
            date: '2025年2月',
            title: '角色设定草图',
            description: '完成了游戏主要角色的设定草图，确定了整体的美术风格。',
            image: 'assets/images/alien_draft.png'
          },
          {
            date: '2025年6月',
            title: '完成初版Demo',
            description: '完成了游戏的核心功能开发。',
            image: 'assets/images/alien_draft.png'
          }
        ]
      },
      en: {
        sectionTitle: 'Development Progress',
        timelineItems: [
          {
            date: 'March 2025',
            title: 'Character Design Completed',
            description: 'Completed the character design with detailed adjustments, including various expressions and poses.',
            image: 'assets/images/character_design.png'
          },
          {
            date: 'February 2025',
            title: 'Character Design Sketches',
            description: 'Completed sketches of the main game characters and established the overall art style.',
            image: 'assets/images/alien_draft.png'
          },
          {
            date: '2025年6月',
            title: 'First Game Demo Completed',
            description: 'Completed the first demo of the game.',
            image: 'assets/images/cover.jpg'
          }
        ]
      }
    };
    
    // 监听语言变化事件
    document.addEventListener('languageChange', (event) => {
      this.updateContent(event.detail.language);
    });
  }

  // 渲染timeline组件
  render(lang = 'zh') {
    const section = document.createElement('section');
    section.className = 'py-24 bg-gray-100 dark:bg-gray-800';
    section.id = 'timeline';
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    
    const title = document.createElement('h2');
    title.className = 'text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white';
    title.textContent = this.translations[lang].sectionTitle;
    
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'max-w-3xl mx-auto relative';
    
    // 创建时间线中轴
    const timelineLine = document.createElement('div');
    timelineLine.className = 'absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary';
    timelineContainer.appendChild(timelineLine);
    
    // 添加时间线项目
    this.translations[lang].timelineItems.forEach(item => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'mb-16 relative';
      
      const timelineDate = document.createElement('div');
      timelineDate.className = 'absolute left-1/2 transform -translate-x-1/2 -top-5 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium z-10';
      timelineDate.textContent = item.date;
      
      const timelineContent = document.createElement('div');
      timelineContent.className = 'bg-white dark:bg-gray-700 rounded-xl p-6 mt-10 shadow-md border border-gray-100 dark:border-gray-600';
      
      const itemTitle = document.createElement('h3');
      itemTitle.className = 'text-xl font-medium mb-4 text-gray-900 dark:text-white';
      itemTitle.textContent = item.title;
      
      const itemDesc = document.createElement('p');
      itemDesc.className = 'text-gray-700 dark:text-gray-300 mb-5';
      itemDesc.textContent = item.description;
      
      const timelineImage = document.createElement('div');
      timelineImage.className = 'mt-5 rounded-lg overflow-hidden';
      
      const image = document.createElement('img');
      image.src = item.image || 'assets/images/alien_draft.png';
      image.alt = item.title;
      image.className = 'w-full h-auto';
      
      timelineImage.appendChild(image);
      timelineContent.appendChild(itemTitle);
      timelineContent.appendChild(itemDesc);
      timelineContent.appendChild(timelineImage);
      
      timelineItem.appendChild(timelineDate);
      timelineItem.appendChild(timelineContent);
      
      timelineContainer.appendChild(timelineItem);
    });
    
    container.appendChild(title);
    container.appendChild(timelineContainer);
    section.appendChild(container);
    
    // 保存引用以便后续更新
    this.timelineElement = section;
    
    return section;
  }

  // 更新内容以响应语言变化
  updateContent(lang) {
    if (!this.timelineElement) return;
    
    // 获取父元素
    const parent = this.timelineElement.parentNode;
    if (!parent) return;
    
    // 记录当前元素的位置
    const nextSibling = this.timelineElement.nextSibling;
    
    // 移除旧的时间线组件
    parent.removeChild(this.timelineElement);
    
    // 创建全新的时间线组件
    const newTimeline = this.render(lang);
    
    // 将新组件插入到原来的位置
    if (nextSibling) {
      parent.insertBefore(newTimeline, nextSibling);
    } else {
      parent.appendChild(newTimeline);
    }
    
    // 更新引用
    this.timelineElement = newTimeline;
  }
}
