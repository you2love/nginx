// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 导航链接高亮
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// 平滑滚动到锚点
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 内容卡片动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有内容卡片添加动画
document.querySelectorAll('.content-card, .feature-card, .resource-item, .case-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// AI卡片特殊效果
document.querySelectorAll('.ai-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.3)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
});

// 搜索功能（模拟）
function createSearchFeature() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-input-wrapper">
            <input type="text" id="searchInput" placeholder="搜索Nginx知识点..." class="search-input">
            <span class="search-icon">🔍</span>
        </div>
        <div id="searchResults" class="search-results"></div>
    `;

    const heroContent = document.querySelector('.hero-content');
    heroContent.insertBefore(searchContainer, heroContent.querySelector('.cta-buttons'));

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const searchableContent = [
        { title: '事件驱动架构', section: 'basics' },
        { title: '负载均衡算法', section: 'advanced' },
        { title: 'AI配置助手', section: 'ai-era' },
        { title: '智能监控', section: 'ai-era' },
        { title: '微服务架构', section: 'practice' },
        { title: 'SSL/TLS配置', section: 'basics' },
        { title: '缓存优化', section: 'advanced' },
        { title: '安全防护', section: 'advanced' },
        { title: 'API网关', section: 'practice' },
        { title: 'WebSocket', section: 'practice' }
    ];

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        const results = searchableContent.filter(item =>
            item.title.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            searchResults.innerHTML = results.map(item => `
                <div class="search-result-item" data-section="${item.section}">
                    ${item.title}
                </div>
            `).join('');
            searchResults.style.display = 'block';

            // 添加点击事件
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const sectionId = this.getAttribute('data-section');
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        window.scrollTo({
                            top: section.offsetTop - headerHeight,
                            behavior: 'smooth'
                        });
                        searchResults.style.display = 'none';
                        searchInput.value = '';
                    }
                });
            });
        } else {
            searchResults.innerHTML = '<div class="no-results">未找到相关内容</div>';
            searchResults.style.display = 'block';
        }
    });

    // 点击外部关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// 添加搜索样式
const searchStyles = `
    <style>
        .search-container {
            max-width: 600px;
            margin: 0 auto 30px;
            position: relative;
        }

        .search-input-wrapper {
            position: relative;
        }

        .search-input {
            width: 100%;
            padding: 15px 50px 15px 20px;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            outline: none;
            transition: all 0.3s ease;
        }

        .search-input:focus {
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            transform: scale(1.02);
        }

        .search-icon {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            cursor: pointer;
        }

        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            margin-top: 10px;
            max-height: 300px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        }

        .search-result-item {
            padding: 15px 20px;
            cursor: pointer;
            transition: background 0.3s ease;
            border-bottom: 1px solid #f0f0f0;
        }

        .search-result-item:hover {
            background: #f8f9fa;
            color: #009639;
        }

        .search-result-item:last-child {
            border-bottom: none;
        }

        .no-results {
            padding: 15px 20px;
            color: #666;
            text-align: center;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', searchStyles);

// 初始化搜索功能
createSearchFeature();

// 添加回到顶部按钮
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '↑';
backToTopButton.setAttribute('aria-label', '回到顶部');
document.body.appendChild(backToTopButton);

// 回到顶部按钮样式
const backToTopStyles = `
    <style>
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
            z-index: 1000;
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', backToTopStyles);

// 显示/隐藏回到顶部按钮
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// 回到顶部功能
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 添加加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化滚动事件
const debouncedScroll = debounce(() => {
    updateActiveNav();
}, 10);

window.addEventListener('scroll', debouncedScroll);

console.log('Nginx 2026 Tutorial - AI时代的高性能Web服务器学习指南');
console.log('欢迎学习！如有问题，请参考相关章节内容。');