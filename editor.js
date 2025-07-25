document.addEventListener('DOMContentLoaded', () => {
    const elems = Array.from(document.querySelectorAll('.editable'));

    elems.forEach((el, idx) => {
        const key = `${el.tagName}_${idx}`;
        el.setAttribute('contenteditable', 'true');
        el.dataset.storageKey = key;

        const saved = localStorage.getItem(key);
        if (saved !== null) {
            el.innerHTML = saved;
        }

        el.addEventListener('input', () => {
            localStorage.setItem(key, el.innerHTML);
        });
    });
});
