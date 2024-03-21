export default class TabElements {
    #triggers;

    constructor(selector = '[data-tab-target]') {
        this.#triggers = document.querySelectorAll(selector);

        this.#addListener();
    }

    #addListener() {
        this.#triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                this.show(trigger);
            });
        });
    }

    show(trigger) {
        const isActive = trigger.classList.contains('active');
    
        if (!isActive) {
            this.#activate(trigger);
        }
    }

    #activate(trigger) {
        const targets = this.#getTargets(trigger);

        targets.forEach(target => this.#hideSiblings(target));
        this.#hideSiblings(trigger);

        trigger.classList.add('active');

        for (const target of targets) {
            target.classList.add('show');
        }
    }

    #getTargets(trigger) {
        const targetsSelector = trigger.dataset.tabTarget;
        return document.querySelectorAll(targetsSelector);
    }

    #hideSiblings(element) {
        for (const child of element.parentNode.children) {
            child.classList.remove('active');
            child.classList.remove('show');
        }
    }
}
