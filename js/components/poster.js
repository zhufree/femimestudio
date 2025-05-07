// poster.js - 海报展示组件
export default class Poster {
  constructor() {
    this.translations = {
      zh: {
        sectionTitle: '概念介绍海报',
        viewFullSize: '点击查看大图',
        viewVideo: '点击播放视频',
        close: '关闭'
      },
      en: {
        sectionTitle: 'Concept Posters',
        viewFullSize: 'Click to view full size',
        viewVideo: 'Click to play video',
        close: 'Close'
      }
    };
    
    this.posters = [
      {
        src: 'assets/images/poster/poster_1.png',
        alt: 'Poster 1'
      },
      {
        src: 'assets/images/poster/poster_2.png',
        alt: 'Poster 2'
      }
    ];
    
    // 添加视频
    this.video = {
      src: 'assets/images/poster/poster.mov',
      alt: 'Concept Video'
    };
    
    // 监听语言变化事件
    document.addEventListener('languageChange', (event) => {
      this.updateContent(event.detail.language);
    });
    
    // 当前打开的模态框
    this.currentModal = null;
  }

  // 渲染poster组件
  render(lang = 'zh') {
    const section = document.createElement('section');
    section.className = 'py-24 bg-gray-50 dark:bg-gray-800';
    section.id = 'posters';
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    
    const title = document.createElement('h2');
    title.className = 'text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white';
    title.textContent = this.translations[lang].sectionTitle;
    
    const posterGrid = document.createElement('div');
    posterGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto';
    
    // 创建海报项
    this.posters.forEach((poster, index) => {
      const posterCard = document.createElement('div');
      posterCard.className = 'relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl';
      posterCard.setAttribute('data-poster-index', index);
      
      const posterImage = document.createElement('img');
      posterImage.src = poster.src;
      posterImage.alt = poster.alt;
      posterImage.className = 'w-full h-auto transition-transform duration-500 group-hover:scale-105';
      
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100';
      
      const viewText = document.createElement('span');
      viewText.className = 'text-white font-medium px-4 py-2 rounded-full bg-primary bg-opacity-90';
      viewText.textContent = this.translations[lang].viewFullSize;
      
      overlay.appendChild(viewText);
      posterCard.appendChild(posterImage);
      posterCard.appendChild(overlay);
      
      // 添加点击事件，打开模态框
      posterCard.addEventListener('click', () => {
        this.openModal(poster, lang);
      });
      
      posterGrid.appendChild(posterCard);
    });
    
    // 创建视频容器
    const videoContainer = document.createElement('div');
    videoContainer.className = 'mt-16 max-w-5xl mx-auto';
    
    // 创建视频卡片
    const videoCard = document.createElement('div');
    videoCard.className = 'relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl';
    
    // 创建视频缩略图（使用视频的第一帧作为缩略图）
    const videoThumbnail = document.createElement('video');
    videoThumbnail.src = this.video.src;
    videoThumbnail.alt = this.video.alt;
    videoThumbnail.className = 'w-full h-auto transition-transform duration-500 group-hover:scale-105';
    videoThumbnail.preload = 'metadata';
    videoThumbnail.muted = true;
    videoThumbnail.playsInline = true;
    
    // 添加播放按钮覆盖层
    const videoOverlay = document.createElement('div');
    videoOverlay.className = 'absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 flex-col';
    
    // 添加播放图标
    const playIcon = document.createElement('div');
    playIcon.className = 'w-16 h-16 rounded-full bg-primary bg-opacity-90 flex items-center justify-center';
    playIcon.innerHTML = `
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
      </svg>
    `;
    
    // 添加提示文字
    const viewVideoText = document.createElement('span');
    viewVideoText.className = 'text-white font-medium px-4 py-2 rounded-full bg-primary bg-opacity-90 mt-2';
    viewVideoText.textContent = this.translations[lang].viewVideo;
    
    // 组装视频卡片
    videoOverlay.appendChild(playIcon);
    videoOverlay.appendChild(viewVideoText);
    videoCard.appendChild(videoThumbnail);
    videoCard.appendChild(videoOverlay);
    
    // 添加点击事件，打开视频模态框
    videoCard.addEventListener('click', () => {
      this.openVideoModal(this.video, lang);
    });
    
    videoContainer.appendChild(videoCard);
    
    container.appendChild(title);
    container.appendChild(posterGrid);
    container.appendChild(videoContainer);
    section.appendChild(container);
    
    // 保存引用以便后续更新
    this.posterElement = section;
    
    return section;
  }

  // 打开模态框查看海报大图
  openModal(poster, lang) {
    // 如果已经有打开的模态框，先关闭它
    if (this.currentModal) {
      document.body.removeChild(this.currentModal);
      this.currentModal = null;
      // 恢复背景页面滚动
      document.body.style.overflow = '';
    }
    
    // 禁止背景页面滚动
    document.body.style.overflow = 'hidden';
    
    // 创建模态框背景
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity duration-300 overflow-y-auto';
    modal.style.opacity = '0';
    
    // 创建模态框内容容器
    const modalContent = document.createElement('div');
    modalContent.className = 'relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-11/12 max-w-6xl max-h-[90vh] overflow-hidden flex flex-col';
    
    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white';
    closeButton.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <span class="sr-only">${this.translations[lang].close}</span>
    `;
    
    // 创建图片容器，添加滚动支持
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full overflow-y-auto flex-1';
    
    // 创建图片
    const image = document.createElement('img');
    image.src = poster.src;
    image.alt = poster.alt;
    image.className = 'w-full h-auto';
    
    // 组装模态框
    imageContainer.appendChild(image);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(imageContainer);
    modal.appendChild(modalContent);
    
    // 阻止事件冒泡，确保滚动只在模态框内生效
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // 添加关闭模态框的事件
    closeButton.addEventListener('click', () => {
      this.closeModal(modal);
    });
    
    // 点击模态框背景也可以关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });
    
    // 按ESC键也可以关闭
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modal);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    // 将模态框添加到body
    document.body.appendChild(modal);
    this.currentModal = modal;
    
    // 触发重排后显示模态框
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  }
  
  // 打开视频模态框
  openVideoModal(video, lang) {
    // 如果已经有打开的模态框，先关闭它
    if (this.currentModal) {
      document.body.removeChild(this.currentModal);
      this.currentModal = null;
      // 恢复背景页面滚动
      document.body.style.overflow = '';
    }
    
    // 禁止背景页面滚动
    document.body.style.overflow = 'hidden';
    
    // 创建模态框背景
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 transition-opacity duration-300';
    modal.style.opacity = '0';
    
    // 创建模态框内容容器
    const modalContent = document.createElement('div');
    modalContent.className = 'relative bg-transparent rounded-lg w-11/12 max-w-6xl max-h-[90vh] overflow-hidden flex flex-col';
    
    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 z-10 text-white hover:text-gray-200';
    closeButton.innerHTML = `
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <span class="sr-only">${this.translations[lang].close}</span>
    `;
    
    // 创建视频容器
    const videoContainer = document.createElement('div');
    videoContainer.className = 'w-full flex-1 flex items-center justify-center';
    
    // 创建视频元素
    const videoElement = document.createElement('video');
    videoElement.src = video.src;
    videoElement.className = 'w-full h-auto max-h-[80vh]';
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    
    // 组装模态框
    videoContainer.appendChild(videoElement);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(videoContainer);
    modal.appendChild(modalContent);
    
    // 阻止事件冒泡
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // 添加关闭模态框的事件
    closeButton.addEventListener('click', () => {
      // 停止视频播放
      videoElement.pause();
      videoElement.currentTime = 0;
      this.closeModal(modal);
    });
    
    // 点击模态框背景也可以关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        // 停止视频播放
        videoElement.pause();
        videoElement.currentTime = 0;
        this.closeModal(modal);
      }
    });
    
    // 按ESC键也可以关闭
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        // 停止视频播放
        videoElement.pause();
        videoElement.currentTime = 0;
        this.closeModal(modal);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    // 将模态框添加到body
    document.body.appendChild(modal);
    this.currentModal = modal;
    
    // 触发重排后显示模态框
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  }

  // 关闭模态框
  closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      if (this.currentModal === modal) {
        this.currentModal = null;
      }
      // 恢复背景页面滚动
      document.body.style.overflow = '';
    }, 300);
  }

  // 更新内容以响应语言变化
  updateContent(lang) {
    if (!this.posterElement) return;
    
    // 更新标题
    const title = this.posterElement.querySelector('.text-4xl.font-bold.text-center');
    if (title) {
      title.textContent = this.translations[lang].sectionTitle;
    }
    
    // 更新所有海报卡片的查看文本
    const viewTexts = this.posterElement.querySelectorAll('.group-hover\\:opacity-100 span');
    viewTexts.forEach(text => {
      text.textContent = this.translations[lang].viewFullSize;
    });
    
    // 如果有打开的模态框，更新关闭按钮文本
    if (this.currentModal) {
      const closeButton = this.currentModal.querySelector('button span');
      if (closeButton) {
        closeButton.textContent = this.translations[lang].close;
      }
    }
  }
}
