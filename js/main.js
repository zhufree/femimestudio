// 导入主应用程序
import App from './app.js';

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
