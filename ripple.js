document.addEventListener('click', function(e) {
    const el = e.target.closest('.editable');
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cs   = getComputedStyle(el);
    const origPos = cs.position;
    const origOverflow = cs.overflow;

    if (origPos === 'static') {
        el.style.position = 'relative';
    }
    if (origOverflow !== 'hidden') {
        el.style.overflow = 'hidden';
    }

    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top  = `${e.clientY - rect.top  - size/2}px`;

    el.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
        if (origPos === 'static')       el.style.position = '';
        if (origOverflow !== 'hidden')  el.style.overflow = '';
    });
});
