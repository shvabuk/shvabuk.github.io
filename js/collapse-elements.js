export default class CollapseElements {
    #triggers;

    constructor(selector = '[data-collapse-target]') {
        this.#triggers = document.querySelectorAll(selector);

        this.#addListener();
    }

    #addListener() {
        this.#triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const isCollapsed = trigger.classList.contains('collapsed');
    
                if (isCollapsed) {
                    this.show(trigger);
                } else {
                    this.hide(trigger);
                }
            });
        });

    }

    show(trigger) {
        const targets = this.#getTargets(trigger);

        targets.forEach((target) => {
            trigger.classList.remove('collapsed');
            target.classList.add('show');
            target.style.maxHeight = target.scrollHeight + 'px';
        });
    }

    hide(trigger) {
        const targets = this.#getTargets(trigger);

        targets.forEach((target) => {
            trigger.classList.add('collapsed');
            target.classList.remove('show');
            target.style.maxHeight = null;
        });
    }

    #getTargets(trigger) {
        const targetsSelector = trigger.dataset.collapseTarget;
        return document.querySelectorAll(targetsSelector);
    }


}
