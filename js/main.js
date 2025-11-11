// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== 導航列滾動效果 =====
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // 滾動時改變導航列透明度
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.9)';
      navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    }

    lastScroll = currentScroll;
  });

  // ===== 平滑滾動到錨點 =====
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // 只處理站內錨點連結
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== 滾動動畫效果 (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // 技能標籤的漸入效果
        if (entry.target.classList.contains('skill-category')) {
          const tags = entry.target.querySelectorAll('.skill-tag');
          tags.forEach((tag, index) => {
            setTimeout(() => {
              tag.style.animation = `fadeInUp 0.5s ease-out forwards`;
              tag.style.opacity = '1';
            }, index * 50);
          });
        }
      }
    });
  }, observerOptions);

  // 觀察需要動畫的元素
  const animatedElements = document.querySelectorAll(
    '.about-card, .skill-category, .cert-item, .contact-card, .education-item'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 當元素可見時添加動畫
  const style = document.createElement('style');
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ===== 技能標籤互動效果 =====
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // ===== Timeline 項目的依序顯示 =====
  const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.2 });

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.style.animationPlayState = 'paused';
    timelineObserver.observe(item);
  });

  // ===== 連絡卡片的波紋效果 =====
  const contactCards = document.querySelectorAll('.contact-card');
  
  contactCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // 如果是外部連結，讓瀏覽器正常處理
      if (this.href && !this.href.startsWith('#')) {
        return true;
      }
      
      // 創建波紋效果
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 添加波紋動畫樣式
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .contact-card {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(59, 130, 246, 0.3);
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ===== Hero 區塊的打字效果 (可選) =====
  const heroTitle = document.querySelector('.hero-text h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    let currentText = '';
    let charIndex = 0;
    
    // 先清空文字
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    // 打字效果
    function typeWriter() {
      if (charIndex < originalText.length) {
        currentText += originalText.charAt(charIndex);
        heroTitle.textContent = currentText;
        charIndex++;
        setTimeout(typeWriter, 80);
      } else {
        // 打字完成後，添加閃爍游標效果
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        heroTitle.appendChild(cursor);
      }
    }
    
    // 延遲開始打字效果
    setTimeout(typeWriter, 500);
    
    // 添加游標閃爍動畫
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(cursorStyle);
  }

  // ===== 滾動進度指示器 =====
  const createScrollIndicator = function() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', function() {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      indicator.style.width = scrolled + '%';
    });
    
    const indicatorStyle = document.createElement('style');
    indicatorStyle.textContent = `
      .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
        z-index: 9999;
        transition: width 0.1s ease;
      }
    `;
    document.head.appendChild(indicatorStyle);
  };
  
  createScrollIndicator();

  // ===== 回到頂部按鈕 =====
  const createBackToTop = function() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', '回到頂部');
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    });
    
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        z-index: 999;
      }
      
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
      }
      
      @media (max-width: 768px) {
        .back-to-top {
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          font-size: 20px;
        }
      }
    `;
    document.head.appendChild(buttonStyle);
  };
  
  createBackToTop();

  // ===== 控制台歡迎訊息 =====
  console.log('%c👋 Hi there!', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
  console.log('%cWelcome to Brian Lee\'s Portfolio', 'color: #8b5cf6; font-size: 16px;');
  console.log('%cBuilt with ❤️ using vanilla JavaScript, CSS animations, and modern web technologies.', 'color: #06b6d4; font-size: 14px;');
  console.log('%cInterested in the source code? Check out: https://github.com/dpi627', 'color: #94a3b8; font-size: 12px;');
  
});
