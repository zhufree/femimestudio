// hero.js - 网站主要内容展示组件
export default class Hero {
  constructor() {
    this.translations = {
      zh: {
        welcomeText: '欢迎来到',
        statusBadge: '首款游戏开发中',
        introText: '这是一款融合科幻与温情的治愈系养成游戏~ 你将在近未来架空世界里，体验一段跨越种族的情感羁绊✨',
        worldTitle: '📖世界观设定',
        worldDesc: '某个遥远星球的毁灭让一群外星生物不得不离开家园，他们随着陨石降临地球，却因为与人类的误解，最终酿成了一场持续百年的战争。而你的故事，就从未来时空开启的一次拯救计划开始...',
        featuresTitle: '🌟游戏特色',
        alienTitle: '👾独特外星生物设定：',
        alienFeatures: [
          '拥有类人特征',
          '活力充沛但情感认知缺失',
          '极强的学习与适应能力',
          '天生亲和自然的特殊能力'
        ],
        worldBuildingTitle: '🤖近未来世界观：',
        worldBuildingFeatures: [
          '隐居在人类社会中的外星避难者',
          '致力于消除偏见的外星地下互助组织',
          '跨越时空的信息传递'
        ],
        themeTitle: '🎯核心主题：',
        themeList: [
          '生命平等的价值',
          '不同种族间的理解与包容',
          '寻找共存之道',
          '守护希望与和平'
        ],
        conclusion: '这是一个关于理解、包容与救赎的故事，也是一场改变过去、拯救未来的冒险。在这里，每一个生命都值得被温柔以待💫'
      },
      en: {
        welcomeText: 'Welcome to',
        statusBadge: 'First game in development',
        introText: 'This is a healing simulation game that blends sci-fi with warmth~ In a near-future world, you will experience emotional bonds that transcend species✨',
        worldTitle: '📖World Setting',
        worldDesc: 'The destruction of a distant planet forced a group of aliens to leave their home. They arrived on Earth with meteorites, but misunderstandings with humans led to a century-long war. Your story begins with a rescue plan initiated from the future...',
        featuresTitle: '🌟Game Features',
        alienTitle: '👾Unique Alien Creature Design:',
        alienFeatures: [
          'Humanoid characteristics',
          'Energetic but lacking emotional cognition',
          'Strong learning and adaptation abilities',
          'Natural affinity with nature'
        ],
        worldBuildingTitle: '🤖Near-Future World:',
        worldBuildingFeatures: [
          'Alien refugees living among human society',
          'Underground alien mutual aid organizations dedicated to eliminating prejudice',
          'Cross-time information transmission'
        ],
        themeTitle: '🎯Core Themes:',
        themeList: [
          'Value of life equality',
          'Understanding and tolerance between different species',
          'Finding ways to coexist',
          'Protecting hope and peace'
        ],
        conclusion: 'This is a story about understanding, tolerance, and redemption, as well as an adventure to change the past and save the future. Here, every life deserves to be treated with gentleness💫'
      }
    };
    
    // 监听语言变化事件
    document.addEventListener('languageChange', (event) => {
      this.updateContent(event.detail.language);
    });
  }

  // 渲染hero组件
  render(lang = 'zh') {
    const section = document.createElement('section');
    section.className = 'min-h-screen flex items-center py-20 pt-32 relative bg-cover bg-center bg-no-repeat';
    section.style.backgroundImage = "url('../assets/images/background.png')";
    
    // 添加遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-70 z-0';
    section.appendChild(overlay);
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10';
    
    const title = document.createElement('h1');
    title.className = 'text-5xl md:text-6xl font-extrabold leading-tight mb-10 text-gray-900 dark:text-gray-100';
    title.innerHTML = 'Femime Studio<br>';
    
    const content = document.createElement('div');
    content.className = 'max-w-2xl';
    
    // 使用当前语言的文本内容
    const t = this.translations[lang];
    
    content.innerHTML = `
      <h2 class="text-3xl font-semibold mb-5">${t.welcomeText} <span class="text-primary">${'Femime Studio'}</span></h2>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light dark:bg-primary-dark text-primary relative -top-4">
        <span class="w-2 h-2 bg-primary rounded-full mr-2"></span>
        ${t.statusBadge}
      </span>
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div class="mb-8">
          <p class="text-gray-700 dark:text-gray-300 mb-4">${t.introText}</p>
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">${t.worldTitle}</h3>
          <p class="text-gray-700 dark:text-gray-300">${t.worldDesc}</p>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">${t.featuresTitle}</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">${t.alienTitle}</h4>
              <ul class="space-y-2">
                ${t.alienFeatures.map(feature => `<li class="pl-5 relative text-gray-700 dark:text-gray-300"><span class="absolute left-0 text-primary">•</span>${feature}</li>`).join('')}
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">${t.worldBuildingTitle}</h4>
              <ul class="space-y-2">
                ${t.worldBuildingFeatures.map(feature => `<li class="pl-5 relative text-gray-700 dark:text-gray-300"><span class="absolute left-0 text-primary">•</span>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">${t.themeTitle}</h3>
          <ul class="space-y-2">
            ${t.themeList.map(theme => `<li class="pl-5 relative text-gray-700 dark:text-gray-300"><span class="absolute left-0 text-primary">•</span>${theme}</li>`).join('')}
          </ul>
        </div>
        
        <div class="bg-primary-light dark:bg-primary-dark p-5 rounded-xl border-l-4 border-primary">
          <p class="text-gray-700 dark:text-gray-300 italic">${t.conclusion}</p>
        </div>
      </div>
    `;
    
    container.appendChild(title);
    container.appendChild(content);
    section.appendChild(container);
    
    // 保存一个引用，以便后续更新
    this.heroElement = section;
    
    return section;
  }

  // 更新内容以响应语言变化
  updateContent(lang) {
    if (!this.heroElement) return;
    
    const t = this.translations[lang];
    const content = this.heroElement.querySelector('.max-w-2xl');
    if (!content) return;
    
    // 更新欢迎文本
    const welcomeText = content.querySelector('.text-3xl');
    if (welcomeText) {
      welcomeText.innerHTML = `${t.welcomeText} <span class="text-primary">Femime Studio</span>`;
    }
    
    // 更新状态标签
    const statusBadge = content.querySelector('.inline-flex');
    if (statusBadge) {
      // 更新状态标签文本，保留圆点
      const badgeText = statusBadge.childNodes[2];
      if (badgeText && badgeText.nodeType === Node.TEXT_NODE) {
        badgeText.nodeValue = t.statusBadge;
      }
    }
    
    // 获取主内容区域
    const gameIntro = content.querySelector('.bg-white.dark\\:bg-gray-800');
    if (!gameIntro) return;
    
    // 获取所有的内容区块
    const sections = gameIntro.querySelectorAll('.mb-8');
    
    // 第一部分：介绍和世界观
    if (sections.length > 0) {
      const firstSection = sections[0];
      const paragraphs = firstSection.querySelectorAll('p');
      if (paragraphs.length > 0) {
        paragraphs[0].textContent = t.introText;
        if (paragraphs.length > 1) {
          paragraphs[1].textContent = t.worldDesc;
        }
      }
      const h3First = firstSection.querySelector('h3');
      if (h3First) {
        h3First.textContent = t.worldTitle;
      }
    }
    
    // 第二部分：游戏特色
    if (sections.length > 1) {
      const secondSection = sections[1];
      const h3Second = secondSection.querySelector('h3');
      if (h3Second) {
        h3Second.textContent = t.featuresTitle;
      }
      
      // 获取特色列表的两个部分
      const featureColumns = secondSection.querySelectorAll('.grid > div');
      
      // 更新外星生物设定
      if (featureColumns.length > 0) {
        const alienColumn = featureColumns[0];
        const alienTitle = alienColumn.querySelector('h4');
        if (alienTitle) {
          alienTitle.textContent = t.alienTitle;
        }
        
        const alienItems = alienColumn.querySelectorAll('li');
        alienItems.forEach((li, index) => {
          if (index < t.alienFeatures.length) {
            // 保留圆点标记
            const dot = li.querySelector('span');
            li.innerHTML = '';
            if (dot) li.appendChild(dot);
            li.appendChild(document.createTextNode(t.alienFeatures[index]));
          }
        });
      }
      
      // 更新世界观设定
      if (featureColumns.length > 1) {
        const worldColumn = featureColumns[1];
        const worldTitle = worldColumn.querySelector('h4');
        if (worldTitle) {
          worldTitle.textContent = t.worldBuildingTitle;
        }
        
        const worldItems = worldColumn.querySelectorAll('li');
        worldItems.forEach((li, index) => {
          if (index < t.worldBuildingFeatures.length) {
            // 保留圆点标记
            const dot = li.querySelector('span');
            li.innerHTML = '';
            if (dot) li.appendChild(dot);
            li.appendChild(document.createTextNode(t.worldBuildingFeatures[index]));
          }
        });
      }
    }
    
    // 第三部分：核心主题
    if (sections.length > 2) {
      const thirdSection = sections[2];
      const h3Third = thirdSection.querySelector('h3');
      if (h3Third) {
        h3Third.textContent = t.themeTitle;
      }
      
      const themeItems = thirdSection.querySelectorAll('li');
      themeItems.forEach((li, index) => {
        if (index < t.themeList.length) {
          // 保留圆点标记
          const dot = li.querySelector('span');
          li.innerHTML = '';
          if (dot) li.appendChild(dot);
          li.appendChild(document.createTextNode(t.themeList[index]));
        }
      });
    }
    
    // 第四部分：结论
    const conclusion = gameIntro.querySelector('.bg-primary-light');
    if (conclusion) {
      const conclusionP = conclusion.querySelector('p');
      if (conclusionP) {
        conclusionP.textContent = t.conclusion;
      }
    }
  }
}
