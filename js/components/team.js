// team.js - 团队展示组件
export default class Team {
  constructor() {
    this.translations = {
      zh: {
        sectionTitle: '我们的团队',
        roles: {
          planner: '策划',
          programmer: '程序',
          artist: '美术'
        }
      },
      en: {
        sectionTitle: 'Our Team',
        roles: {
          planner: 'Planner',
          programmer: 'Programmer',
          artist: 'Artist'
        }
      }
    };
    
    this.teamMembers = [
      {
        name: 'Yoona',
        role: 'planner',
        avatar: 'assets/images/duyu touxiang@2x.png'
      },
      {
        name: 'zhufree',
        role: 'programmer',
        avatar: 'assets/images/free touxiang@2x.png'
      },
      {
        name: '蛋烘糕',
        role: 'artist',
        avatar: 'assets/images/jiyuan touxiang@2x.png'
      },
      {
        name: '鱼摆摆鸽',
        role: 'artist',
        avatar: 'assets/images/yuzza touxiang@2x.png'
      }
    ];
    
    // 监听语言变化事件
    document.addEventListener('languageChange', (event) => {
      this.updateContent(event.detail.language);
    });
  }

  // 渲染team组件
  render(lang = 'zh') {
    const section = document.createElement('section');
    section.className = 'py-24 bg-gray-50 dark:bg-gray-900';
    section.id = 'team';
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    
    const title = document.createElement('h2');
    title.className = 'text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white';
    title.textContent = this.translations[lang].sectionTitle;
    
    const teamGrid = document.createElement('div');
    teamGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto';
    
    // 创建团队成员卡片
    this.teamMembers.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.className = 'bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700';
      
      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary';
      
      const avatar = document.createElement('img');
      avatar.src = member.avatar;
      avatar.alt = member.name;
      avatar.className = 'w-full h-full object-cover';
      
      const nameElem = document.createElement('h3');
      nameElem.className = 'text-xl font-semibold mb-2 text-gray-900 dark:text-white';
      nameElem.textContent = member.name;
      
      const roleElem = document.createElement('p');
      roleElem.className = 'text-gray-600 dark:text-gray-300';
      roleElem.textContent = this.translations[lang].roles[member.role];
      
      avatarDiv.appendChild(avatar);
      memberCard.appendChild(avatarDiv);
      memberCard.appendChild(nameElem);
      memberCard.appendChild(roleElem);
      
      teamGrid.appendChild(memberCard);
    });
    
    container.appendChild(title);
    container.appendChild(teamGrid);
    section.appendChild(container);
    
    // 保存引用以便后续更新
    this.teamElement = section;
    
    return section;
  }

  // 更新内容以响应语言变化
  updateContent(lang) {
    if (!this.teamElement) return;
    
    // 更新标题 - 使用新的选择器
    const title = this.teamElement.querySelector('.text-4xl.font-bold.text-center');
    if (title) {
      title.textContent = this.translations[lang].sectionTitle;
    }
    
    // 更新每个成员的角色 - 使用新的选择器
    const memberCards = this.teamElement.querySelectorAll('.bg-white.dark\\:bg-gray-800');
    memberCards.forEach((card, index) => {
      if (index < this.teamMembers.length) {
        const role = this.teamMembers[index].role;
        const roleElem = card.querySelector('.text-gray-600.dark\\:text-gray-300');
        if (roleElem) {
          roleElem.textContent = this.translations[lang].roles[role];
        }
      }
    });
  }
}
