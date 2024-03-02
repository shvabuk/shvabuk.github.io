/*!
  * Ostap Shvab github pages v2.0.3 (https://github.com/shvabuk/shvabuk.github.io)
  * Copyright 2017-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/shvabuk.github.io/blob/master/LICENSE)
  * 
  */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var id = 0;
  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }
  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }

  var _trigger = /*#__PURE__*/_classPrivateFieldLooseKey("trigger");
  var _targets = /*#__PURE__*/_classPrivateFieldLooseKey("targets");
  var _addListener = /*#__PURE__*/_classPrivateFieldLooseKey("addListener");
  class CollapseElement {
    constructor(selector = '[data-collapse-target]') {
      Object.defineProperty(this, _addListener, {
        value: _addListener2
      });
      Object.defineProperty(this, _trigger, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _targets, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _trigger)[_trigger] = document.querySelector(selector);
      const targetsSelector = _classPrivateFieldLooseBase(this, _trigger)[_trigger].dataset.collapseTarget;
      _classPrivateFieldLooseBase(this, _targets)[_targets] = document.querySelectorAll(targetsSelector);
      _classPrivateFieldLooseBase(this, _addListener)[_addListener]();
    }
    show() {
      _classPrivateFieldLooseBase(this, _targets)[_targets].forEach(target => {
        _classPrivateFieldLooseBase(this, _trigger)[_trigger].classList.remove('collapsed');
        target.classList.add('show');
        target.style.maxHeight = target.scrollHeight + 'px';
      });
    }
    hide() {
      _classPrivateFieldLooseBase(this, _targets)[_targets].forEach(target => {
        _classPrivateFieldLooseBase(this, _trigger)[_trigger].classList.add('collapsed');
        target.classList.remove('show');
        target.style.maxHeight = null;
      });
    }
  }
  function _addListener2() {
    _classPrivateFieldLooseBase(this, _trigger)[_trigger].addEventListener('click', () => {
      const isCollapsed = _classPrivateFieldLooseBase(this, _trigger)[_trigger].classList.contains('collapsed');
      if (isCollapsed) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  const isObject = value => {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
  };
  const merge = (target, source) => {
    for (const key in source) {
      if (isObject(target[key]) && isObject(source[key])) {
        target[key] = merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };
  var _defaultSettings = /*#__PURE__*/_classPrivateFieldLooseKey("defaultSettings");
  var _satellite = /*#__PURE__*/_classPrivateFieldLooseKey("satellite");
  var _domHandler = /*#__PURE__*/_classPrivateFieldLooseKey("domHandler");
  var _intervalID = /*#__PURE__*/_classPrivateFieldLooseKey("intervalID");
  class SatelliteTracker {
    constructor(satelliteID, settings = {}) {
      Object.defineProperty(this, _defaultSettings, {
        writable: true,
        value: {
          containerSelector: 'satellite-tracker',
          details: {
            generate: true,
            selector: 'satellite-details',
            partsSelector: 'satellite-details-part',
            parts: {
              latitude: {
                valueSelector: 'satellite-latitude',
                label: 'Latitude: '
              },
              longitude: {
                valueSelector: 'satellite-longitude',
                label: 'Longitude: '
              },
              velocity: {
                valueSelector: 'satellite-velocity',
                label: 'Speed: '
              },
              altitude: {
                valueSelector: 'satellite-altitude',
                label: 'Altitude: '
              },
              visibility: {
                valueSelector: 'satellite-visibility',
                label: 'Visibility: '
              }
            }
          },
          map: {
            generate: true,
            selector: 'satellite-world-map',
            title: 'World map',
            parts: {
              marker: {
                selector: 'satellite-marker',
                title: 'Satellite'
              }
            }
          }
        }
      });
      Object.defineProperty(this, _satellite, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _domHandler, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _intervalID, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _satellite)[_satellite] = new Satellite(satelliteID);
      const mergedSettings = merge(merge({}, _classPrivateFieldLooseBase(this, _defaultSettings)[_defaultSettings]), settings);
      _classPrivateFieldLooseBase(this, _domHandler)[_domHandler] = new DOMHandler(mergedSettings);
    }
    runAutoupdate(delay) {
      this.updateValues();
      _classPrivateFieldLooseBase(this, _intervalID)[_intervalID] = setInterval(() => this.updateValues(), delay);
    }
    stopAutoupdate() {
      clearInterval(_classPrivateFieldLooseBase(this, _intervalID)[_intervalID]);
    }
    updateValues() {
      _classPrivateFieldLooseBase(this, _satellite)[_satellite].getStatus().then(data => {
        _classPrivateFieldLooseBase(this, _domHandler)[_domHandler].setDetails(data.details);
        _classPrivateFieldLooseBase(this, _domHandler)[_domHandler].setMarker(data.marker.top, data.marker.left);
      }).catch(error => {
        console.error(error.message);
      });
    }
  }
  var _satelliteID = /*#__PURE__*/_classPrivateFieldLooseKey("satelliteID");
  var _toSupplementValues = /*#__PURE__*/_classPrivateFieldLooseKey("toSupplementValues");
  var _getMarkerEquirectangularTopPosition = /*#__PURE__*/_classPrivateFieldLooseKey("getMarkerEquirectangularTopPosition");
  var _getMarkerEquirectangularLeftPosition = /*#__PURE__*/_classPrivateFieldLooseKey("getMarkerEquirectangularLeftPosition");
  class Satellite {
    constructor(satelliteID) {
      Object.defineProperty(this, _getMarkerEquirectangularLeftPosition, {
        value: _getMarkerEquirectangularLeftPosition2
      });
      Object.defineProperty(this, _getMarkerEquirectangularTopPosition, {
        value: _getMarkerEquirectangularTopPosition2
      });
      Object.defineProperty(this, _toSupplementValues, {
        value: _toSupplementValues2
      });
      Object.defineProperty(this, _satelliteID, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _satelliteID)[_satelliteID] = satelliteID;
    }
    async getStatus() {
      const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${_classPrivateFieldLooseBase(this, _satelliteID)[_satelliteID]}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      return _classPrivateFieldLooseBase(this, _toSupplementValues)[_toSupplementValues](data);
    }
  }
  function _toSupplementValues2(data) {
    const supplementedValues = {
      details: {
        latitude: data.latitude.toFixed(2),
        longitude: data.longitude.toFixed(2),
        velocity: `${data.velocity.toFixed(2)} km/hr`,
        altitude: `${data.altitude.toFixed(2)} km`,
        visibility: data.visibility
      },
      marker: {
        top: _classPrivateFieldLooseBase(this, _getMarkerEquirectangularTopPosition)[_getMarkerEquirectangularTopPosition](data.latitude),
        left: _classPrivateFieldLooseBase(this, _getMarkerEquirectangularLeftPosition)[_getMarkerEquirectangularLeftPosition](data.longitude)
      }
    };
    return supplementedValues;
  }
  function _getMarkerEquirectangularTopPosition2(latitude) {
    const top = 100 - (latitude + 90) * 100 / 180;
    return `${top}%`;
  }
  function _getMarkerEquirectangularLeftPosition2(longitude) {
    const left = (longitude + 180) * 100 / 360;
    return `${left}%`;
  }
  var _settings = /*#__PURE__*/_classPrivateFieldLooseKey("settings");
  var _containerElement = /*#__PURE__*/_classPrivateFieldLooseKey("containerElement");
  var _markerElement = /*#__PURE__*/_classPrivateFieldLooseKey("markerElement");
  var _valuesElements = /*#__PURE__*/_classPrivateFieldLooseKey("valuesElements");
  var _setDetail = /*#__PURE__*/_classPrivateFieldLooseKey("setDetail");
  var _initMapAndMarker = /*#__PURE__*/_classPrivateFieldLooseKey("initMapAndMarker");
  var _generateMapElement = /*#__PURE__*/_classPrivateFieldLooseKey("generateMapElement");
  var _generateMarkerElement = /*#__PURE__*/_classPrivateFieldLooseKey("generateMarkerElement");
  var _initDetails = /*#__PURE__*/_classPrivateFieldLooseKey("initDetails");
  var _generateDetailsElement = /*#__PURE__*/_classPrivateFieldLooseKey("generateDetailsElement");
  var _generateDetailsParts = /*#__PURE__*/_classPrivateFieldLooseKey("generateDetailsParts");
  var _generateDetailsPart = /*#__PURE__*/_classPrivateFieldLooseKey("generateDetailsPart");
  var _getValuesElements = /*#__PURE__*/_classPrivateFieldLooseKey("getValuesElements");
  class DOMHandler {
    constructor(settings) {
      Object.defineProperty(this, _getValuesElements, {
        value: _getValuesElements2
      });
      Object.defineProperty(this, _generateDetailsPart, {
        value: _generateDetailsPart2
      });
      Object.defineProperty(this, _generateDetailsParts, {
        value: _generateDetailsParts2
      });
      Object.defineProperty(this, _generateDetailsElement, {
        value: _generateDetailsElement2
      });
      Object.defineProperty(this, _initDetails, {
        value: _initDetails2
      });
      Object.defineProperty(this, _generateMarkerElement, {
        value: _generateMarkerElement2
      });
      Object.defineProperty(this, _generateMapElement, {
        value: _generateMapElement2
      });
      Object.defineProperty(this, _initMapAndMarker, {
        value: _initMapAndMarker2
      });
      Object.defineProperty(this, _setDetail, {
        value: _setDetail2
      });
      Object.defineProperty(this, _settings, {
        writable: true,
        value: {}
      });
      Object.defineProperty(this, _containerElement, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _markerElement, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _valuesElements, {
        writable: true,
        value: {}
      });
      _classPrivateFieldLooseBase(this, _settings)[_settings] = settings;
      _classPrivateFieldLooseBase(this, _containerElement)[_containerElement] = document.querySelector(`.${_classPrivateFieldLooseBase(this, _settings)[_settings].containerSelector}`);
      _classPrivateFieldLooseBase(this, _initMapAndMarker)[_initMapAndMarker]();
      _classPrivateFieldLooseBase(this, _initDetails)[_initDetails]();
    }
    setMarker(top, left) {
      _classPrivateFieldLooseBase(this, _markerElement)[_markerElement].style.top = top;
      _classPrivateFieldLooseBase(this, _markerElement)[_markerElement].style.left = left;
    }
    setDetails(details) {
      for (const name in details) {
        _classPrivateFieldLooseBase(this, _setDetail)[_setDetail](name, details[name]);
      }
    }
  }
  function _setDetail2(name, value) {
    _classPrivateFieldLooseBase(this, _valuesElements)[_valuesElements][name].innerText = value;
  }
  function _initMapAndMarker2() {
    if (_classPrivateFieldLooseBase(this, _settings)[_settings].map.generate) {
      const mapElement = _classPrivateFieldLooseBase(this, _generateMapElement)[_generateMapElement]();
      _classPrivateFieldLooseBase(this, _generateMarkerElement)[_generateMarkerElement](mapElement);
    }
    _classPrivateFieldLooseBase(this, _markerElement)[_markerElement] = _classPrivateFieldLooseBase(this, _containerElement)[_containerElement].querySelector(`.${_classPrivateFieldLooseBase(this, _settings)[_settings].map.parts.marker.selector}`);
  }
  function _generateMapElement2() {
    const mapElement = document.createElement("DIV");
    mapElement.classList.add(_classPrivateFieldLooseBase(this, _settings)[_settings].map.selector);
    mapElement.title = _classPrivateFieldLooseBase(this, _settings)[_settings].map.title;
    _classPrivateFieldLooseBase(this, _containerElement)[_containerElement].append(mapElement);
    return mapElement;
  }
  function _generateMarkerElement2(mapElement) {
    const marker = document.createElement("DIV");
    marker.classList.add(_classPrivateFieldLooseBase(this, _settings)[_settings].map.parts.marker.selector);
    marker.title = _classPrivateFieldLooseBase(this, _settings)[_settings].map.parts.marker.title;
    mapElement.append(marker);
    return marker;
  }
  function _initDetails2() {
    if (_classPrivateFieldLooseBase(this, _settings)[_settings].details.generate) {
      const detailsElement = _classPrivateFieldLooseBase(this, _generateDetailsElement)[_generateDetailsElement]();
      _classPrivateFieldLooseBase(this, _generateDetailsParts)[_generateDetailsParts](detailsElement);
    }
    _classPrivateFieldLooseBase(this, _valuesElements)[_valuesElements] = _classPrivateFieldLooseBase(this, _getValuesElements)[_getValuesElements]();
  }
  function _generateDetailsElement2() {
    const detailsElement = document.createElement("P");
    detailsElement.classList.add(_classPrivateFieldLooseBase(this, _settings)[_settings].details.selector);
    _classPrivateFieldLooseBase(this, _containerElement)[_containerElement].append(detailsElement);
    return detailsElement;
  }
  function _generateDetailsParts2(detailsElement) {
    _classPrivateFieldLooseBase(this, _settings)[_settings].details.parts;
    for (const name in _classPrivateFieldLooseBase(this, _settings)[_settings].details.parts) {
      _classPrivateFieldLooseBase(this, _generateDetailsPart)[_generateDetailsPart](detailsElement, _classPrivateFieldLooseBase(this, _settings)[_settings].details.parts[name]);
    }
  }
  function _generateDetailsPart2(detailsElement, part) {
    const rowElement = document.createElement("SPAN");
    rowElement.classList.add(_classPrivateFieldLooseBase(this, _settings)[_settings].details.partsSelector);
    rowElement.innerText = part.label;
    const valueElement = document.createElement("SPAN");
    valueElement.classList.add(part.valueSelector);
    rowElement.append(valueElement);
    detailsElement.append(rowElement);
  }
  function _getValuesElements2() {
    const result = {};
    for (const name in _classPrivateFieldLooseBase(this, _settings)[_settings].details.parts) {
      result[name] = _classPrivateFieldLooseBase(this, _containerElement)[_containerElement].querySelector(`.${_classPrivateFieldLooseBase(this, _settings)[_settings].details.parts[name].valueSelector}`);
    }
    return result;
  }
  class ISSTracker extends SatelliteTracker {
    constructor(settings = {
      containerSelector: 'iss-tracker',
      map: {
        parts: {
          marker: {
            title: 'ISS'
          }
        }
      }
    }) {
      super('25544', settings);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Navbar collapsing
    new CollapseElement('#burger');

    // ISS Tracker start
    const ISS = new ISSTracker();
    ISS.runAutoupdate(60000);
  });

}));
//# sourceMappingURL=index.js.map
