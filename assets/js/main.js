const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

function toggleMobile() {
    const burger = document.getElementById('navBurger');
    const menu   = document.getElementById('mobileMenu');
    const overlay= document.getElementById('mobileOverlay');
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}
function closeMobile() {
    document.getElementById('navBurger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('open');  
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
});
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function openModal(url, title, tag, isPortrait = false) {
    const modal   = document.getElementById('videoModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalIframe').src = url;
    document.getElementById('modalTitle').textContent  = title;
    document.getElementById('modalTag').textContent    = tag;
    content.classList.toggle('portrait', isPortrait);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('videoModal').classList.remove('open');
    document.getElementById('modalIframe').src = '';
    document.body.style.overflow = '';
}
function handleModalClick(e) {
    if (e.target === document.getElementById('videoModal')) closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function loadPersonalEmbed(card, embedUrl, videoId) {
    const placeholder = card.querySelector('.embed-placeholder');
    if (!placeholder) return;
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;';
    placeholder.replaceWith(iframe);
}

function switchPlatform(cardId, platform) {
    const card = document.getElementById(cardId);
    if (!card) return;
card.querySelectorAll('.plat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.plat === platform);
});

card.querySelectorAll('.client-platform-info').forEach(info => {
    info.classList.toggle('active', info.dataset.plat === platform);
});
}
