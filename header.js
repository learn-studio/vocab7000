// header.js

// 定義載入 Header 的函式
function loadHeader() {
    // 這裡假設你的 header.html 放在 components 資料夾下
    // 如果路徑不同，請自行調整 fetch 的網址
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header load failed');
            return response.text();
        })
        .then(data => {
            // 1. 插入 HTML
            document.getElementById('header-placeholder').innerHTML = data;

            // 2. 插入後，初始化 Header 的互動邏輯 (手機選單)
            initHeaderLogic();

            // 3. (選用) 自動標示當前頁面
            highlightCurrentPage();
        })
        .catch(error => console.error('Error loading header:', error));
}

// 初始化 Header 邏輯 (原本寫在 HTML 裡的 script 移到這裡)
function initHeaderLogic() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileNav');
    const btnIcon = menuBtn ? menuBtn.querySelector('.material-icons') : null;

    if (!menuBtn || !menu) return;

    // 點擊漢堡選單
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止冒泡
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            if(btnIcon) btnIcon.innerText = 'menu';
        } else {
            menu.classList.add('open');
            if(btnIcon) btnIcon.innerText = 'close';
        }
    });

    // 點擊外部關閉選單
    document.addEventListener('click', function(event) {
        const isClickInside = menu.contains(event.target) || menuBtn.contains(event.target);
        
        if (!isClickInside && menu.classList.contains('open')) {
            menu.classList.remove('open');
            if(btnIcon) btnIcon.innerText = 'menu';
        }
    });
}

// (選用) 簡單判斷當前頁面並變色
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-item, .mobile-nav-overlay a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.style.color = '#7FA99B'; // 作者頁的文青綠
            link.style.fontWeight = 'bold';
        }
    });
}

// 執行載入
loadHeader();
