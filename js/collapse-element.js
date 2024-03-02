export default class CollapseElement {
    #trigger;
    #targets;

    constructor(selector = '[data-collapse-target]') {
        this.#trigger = document.querySelector(selector);

        const targetsSelector = this.#trigger.dataset.collapseTarget;
        this.#targets = document.querySelectorAll(targetsSelector);

        this.#addListener();
    }

    show() {
        this.#targets.forEach((target) => {
            this.#trigger.classList.remove('collapsed');
            target.classList.add('show');
            target.style.maxHeight = target.scrollHeight + 'px';
        });
    }

    hide() {
        this.#targets.forEach((target) => {
            this.#trigger.classList.add('collapsed');
            target.classList.remove('show');
            target.style.maxHeight = null;
        });
    }

    #addListener() {
        this.#trigger.addEventListener('click', () => {
            const isCollapsed = this.#trigger.classList.contains('collapsed');

            if (isCollapsed) {
                this.show();
            } else {
                this.hide();
            }
        });
    }
}
