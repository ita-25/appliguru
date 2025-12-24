document.addEventListener('DOMContentLoaded', () => {
    // 1. ANIMATED COUNTER LOGIC
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + (counter.getAttribute('data-target') === '98' ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    // Trigger counters when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.success-metrics');
    if (statsSection) observer.observe(statsSection);

    // 2. MOBILE MENU TOGGLE
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.desktop-nav');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active');
            }
        });
    });
});
