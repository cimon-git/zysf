// ============ 汉堡菜单 ============
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');
if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ============ 左侧知识库菜单折叠展开（首页） ============
document.querySelectorAll('.menu-card-head').forEach(head => {
  head.addEventListener('click', () => {
    head.parentElement.classList.toggle('collapsed');
  });
});

// ============ FAQ 手风琴（FAQ 页） ============
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('open');
  });
});

// ============ 首页搜索筛选 ============
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const noResult = document.getElementById('noResult');
const cards = document.querySelectorAll('.menu-card');

function runSearch(){
  const kw = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach(card => {
    const keywords = (card.dataset.keywords || '').toLowerCase();
    const titleText = card.querySelector('.menu-title').textContent.toLowerCase();
    const subText = card.querySelector('.menu-sub').textContent.toLowerCase();
    const links = card.querySelectorAll('.menu-card-body a');

    let cardMatches = false;

    if(kw === ''){
      card.classList.remove('hidden');
      card.classList.remove('collapsed');
      links.forEach(a => a.classList.remove('dim'));
      cardMatches = true;
    } else {
      const headMatch = keywords.includes(kw) || titleText.includes(kw) || subText.includes(kw);
      let anyLinkMatch = false;

      links.forEach(a => {
        const linkMatch = a.textContent.toLowerCase().includes(kw);
        if(linkMatch) anyLinkMatch = true;
        a.classList.toggle('dim', !(linkMatch || headMatch));
      });

      cardMatches = headMatch || anyLinkMatch;
      card.classList.toggle('hidden', !cardMatches);
      if(cardMatches) card.classList.remove('collapsed');
    }

    if(cardMatches) visibleCount++;
  });

  if (noResult) noResult.classList.toggle('show', visibleCount === 0);
}

if (searchInput && searchBtn) {
  searchBtn.addEventListener('click', runSearch);
  searchInput.addEventListener('input', runSearch);
  searchInput.addEventListener('keydown', e => { if(e.key === 'Enter') runSearch(); });
}

// ============ 回到顶部 ============
const toTopBtn = document.getElementById('toTopBtn');
if (toTopBtn) {
  window.addEventListener('scroll', () => {
    toTopBtn.classList.toggle('show', window.scrollY > 400);
  });
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============ 站内锚点平滑滚动（仅同页锚点） ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 66, behavior:'smooth' });
    }
  });
});
