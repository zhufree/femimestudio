// app.js - 主应用程序模块
import Header from './components/header.js';
import Hero from './components/hero.js';
import Team from './components/team.js';
import Timeline from './components/timeline.js';
import Poster from './components/poster.js';

export default class App {
  constructor() {
    this.header = new Header();
    this.hero = new Hero();
    this.team = new Team();
    this.timeline = new Timeline();
    this.poster = new Poster();
    this.currentLang = 'zh'; // 默认语言
    
    // 监听语言变化事件
    document.addEventListener('languageChange', (event) => {
      this.currentLang = event.detail.language;
    });
  }

  // 初始化应用
  init() {
    // 获取body元素
    const body = document.body;
    const main = document.querySelector('main') || document.createElement('main');
    
    // 清空main内容
    if (main.innerHTML !== '') {
      main.innerHTML = '';
    }
    
    // 如果main不在DOM中，添加它
    if (!document.contains(main)) {
      body.appendChild(main);
    }
    
    // 渲染header并添加到body的最前面
    const headerElement = this.header.render();
    body.insertBefore(headerElement, body.firstChild);
    
    // 渲染其他组件并添加到main中
    main.appendChild(this.hero.render(this.currentLang));
    main.appendChild(this.poster.render(this.currentLang));
    main.appendChild(this.timeline.render(this.currentLang));
    main.appendChild(this.team.render(this.currentLang));
    
    // 添加页面加载动画
    this.addLoadingAnimation();
  }

  // 添加页面加载动画
  addLoadingAnimation() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.opacity = '0';
      
      // 淡入动画
      setTimeout(() => {
        hero.style.transition = 'opacity 1s ease-in-out';
        hero.style.opacity = '1';
      }, 100);
    }
  }
}
