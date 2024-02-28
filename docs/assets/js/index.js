/*!
  * Ostap Shvab github pages v2.0.2 (https://github.com/shvabuk/shvabuk.github.io)
  * Copyright 2017-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/shvabuk.github.io/blob/master/LICENSE)
  * 
  */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    // import Example from './example.js';

    document.addEventListener('DOMContentLoaded', function () {
      new Collapsable();
    });
    class Collapsable {
      constructor(buttonSelector) {
        this.buttonSelector = buttonSelector ? buttonSelector : '[data-collapse-target]';
        this.init();
      }
      init() {
        document.querySelectorAll(this.buttonSelector).forEach(function (button) {
          const targetsSelector = button.dataset.collapseTarget;
          document.querySelectorAll(targetsSelector).forEach(function (target) {
            button.addEventListener('click', function () {
              const isTargetOpened = target.classList.contains('show');
              if (isTargetOpened) {
                target.classList.remove('show');
                target.style.maxHeight = null;
              } else {
                target.classList.add('show');
                target.style.maxHeight = target.scrollHeight + 'px';
              }
            });
          });
        });
      }
    }

    // import Example from './example.js';

    // const ex = new Example();
    // ex.sayHello();

}));
//# sourceMappingURL=index.js.map
