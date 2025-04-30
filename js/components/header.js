// header.js - 页面头部组件
export default class Header {
  constructor() {
    this.currentLang = 'zh'; // 默认中文
    this.currentTheme = 'light'; // 默认日间模式
    this.translations = {
      zh: {
        title: 'Femime Studio - 绯梦工作室',
        toggleLang: '切换到英文',
        toggleTheme: '切换主题',
        lightMode: '日间模式',
        darkMode: '夜间模式'
      },
      en: {
        title: 'Femime Studio',
        toggleLang: 'Switch to Chinese',
        toggleTheme: 'Toggle Theme',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode'
      }
    };
  }

  // 渲染header组件
  render() {
    const header = document.createElement('header');
    header.className = 'fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-all duration-300';
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center';
    
    const logo = document.createElement('div');
    logo.className = 'text-xl font-bold text-primary';
    logo.textContent = 'Femime Studio';
    
    const controls = document.createElement('div');
    controls.className = 'flex space-x-3';
    
    // 语言切换按钮
    const langBtn = document.createElement('button');
    langBtn.className = 'btn btn-outline text-gray-700 dark:text-gray-300 text-sm';
    langBtn.textContent = this.translations[this.currentLang].toggleLang;
    langBtn.addEventListener('click', () => this.toggleLanguage());
    
    // 主题切换按钮
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn btn-outline text-gray-700 dark:text-gray-300 text-sm';
    themeBtn.innerHTML = `<span>${this.currentTheme === 'light' ? 
      this.translations[this.currentLang].darkMode : 
      this.translations[this.currentLang].lightMode}</span>`;
    themeBtn.addEventListener('click', () => this.toggleTheme());
    
    // 组装组件
    controls.appendChild(langBtn);
    controls.appendChild(themeBtn);
    container.appendChild(logo);
    container.appendChild(controls);
    header.appendChild(container);
    
    return header;
  }

  // 切换语言功能
  toggleLanguage() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
    
    // 更新页面标题
    document.title = this.translations[this.currentLang].title;
    
    // 更新按钮文本 - 使用新的选择器
    const langBtn = document.querySelector('.btn-outline:first-child');
    if (langBtn) {
      langBtn.textContent = this.translations[this.currentLang].toggleLang;
    }
    
    // 更新主题按钮文本 - 使用新的选择器
    const themeBtn = document.querySelector('.btn-outline:nth-child(2) span');
    if (themeBtn) {
      themeBtn.textContent = this.currentTheme === 'light' ? 
        this.translations[this.currentLang].darkMode : 
        this.translations[this.currentLang].lightMode;
    }
    
    // 触发语言变更事件，让其他组件也能响应语言变化
    document.dispatchEvent(new CustomEvent('languageChange', {
      detail: { language: this.currentLang }
    }));
  }

  // 切换主题功能
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    
    // 更新HTML类，用于Tailwind暗黑模式
    if (this.currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 更新按钮文本
    const themeBtn = document.querySelector('.btn-outline span');
    if (themeBtn) {
      themeBtn.textContent = this.currentTheme === 'light' ? 
        this.translations[this.currentLang].darkMode : 
        this.translations[this.currentLang].lightMode;
    }
  }
}
