import CollapseElement from './collapse-element.js';
import { ISSTracker } from './satellite-tracker.js';

document.addEventListener('DOMContentLoaded', function () {
    // Navbar collapsing
    const burger = new CollapseElement('#burger');

    // ISS Tracker start
    const ISS = new ISSTracker();
    ISS.runAutoupdate(60000);
});
