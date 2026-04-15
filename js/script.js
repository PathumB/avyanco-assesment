(function () {
    /*  Form submit feedback  */
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            var inputs = document.querySelectorAll('.form-field__input');
            var allFilled = true;
            inputs.forEach(function (inp) {
                if (!inp.value.trim()) {
                    allFilled = false;
                    inp.style.borderColor = '#e53e3e';
                    inp.addEventListener('input', function () { inp.style.borderColor = ''; }, { once: true });
                }
            });
            if (allFilled) {
                submitBtn.textContent = 'Enquiry Sent ✓';
                submitBtn.style.background = '#16a34a';
                submitBtn.style.borderColor = '#16a34a';
                submitBtn.disabled = true;
            }
        });
    }

    /*  Stat counter animation  */
    var statNumbers = document.querySelectorAll('.stat-card__number');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.4 });
        statNumbers.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(12px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            obs.observe(el);
        });
    }

    /*  FAQ accordion  */
    var triggers = document.querySelectorAll('.faq__trigger');
    triggers.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            var bodyId = btn.getAttribute('aria-controls');
            var body = document.getElementById(bodyId);

            triggers.forEach(function (t) {
                t.setAttribute('aria-expanded', 'false');
                var b = document.getElementById(t.getAttribute('aria-controls'));
                if (b) b.classList.remove('faq__body--open');
            });
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                if (body) body.classList.add('faq__body--open');
            }
        });
    });

    /*  accordion  */
    var items = document.querySelectorAll('.accordion__item');
    items.forEach(function (item) {
        var trigger = item.querySelector('.accordion__trigger');
        var chevron = item.querySelector('.accordion__chevron');

        trigger.addEventListener('click', function () {
            var isOpen = item.classList.contains('accordion__item--open');

            // Simply toggle the current item
            if (isOpen) {
                item.classList.remove('accordion__item--open');
                trigger.setAttribute('aria-expanded', 'false');
                chevron.innerHTML = '<polyline points="6 9 12 15 18 9"/>';
            } else {
                item.classList.add('accordion__item--open');
                trigger.setAttribute('aria-expanded', 'true');
                chevron.innerHTML = '<polyline points="18 15 12 9 6 15"/>';
            }
        });
    });

    /*  Reveal on scroll  */
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
            revealObserver.observe(el);
        });
    }

})();