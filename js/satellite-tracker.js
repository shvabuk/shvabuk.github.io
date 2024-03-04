const isObject = (value) => {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

// A simple objects deep merging for the settings options.
const merge = (target, source) => {
    for (const key in source) {
        if (isObject(target[key]) && isObject(source[key])) {
            target[key] = merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }

    return target;
}

export default class SatelliteTracker {
    #defaultSettings = {
        containerSelector: 'satellite-tracker',
        details: {
            generate: true,
            selector: 'satellite-details',
            partsSelector: 'satellite-details-part',
            parts : {
                latitude: {
                    valueSelector: 'satellite-latitude',
                    label: 'Latitude: ',
                },
                longitude: {
                    valueSelector: 'satellite-longitude',
                    label: 'Longitude: ',
                },
                velocity: {
                    valueSelector: 'satellite-velocity',
                    label: 'Speed: ',
                },
                altitude: {
                    valueSelector: 'satellite-altitude',
                    label: 'Altitude: ',
                },
                visibility: {
                    valueSelector: 'satellite-visibility',
                    label: 'Visibility: ',
                },
            },
        },
        map: {
            generate: true,
            selector: 'satellite-world-map',
            title: 'World map',
            parts: {
                marker: {
                    selector: 'satellite-marker',
                    title: 'Satellite',
                }
            }
        }
    };
    #satellite;
    #domHandler;
    #intervalID;

    constructor(satelliteID, settings = {}) {
        this.#satellite = new Satellite(satelliteID);

        const mergedSettings = merge(merge({}, this.#defaultSettings), settings);
        this.#domHandler = new DOMHandler(mergedSettings);
    }

    runAutoupdate(delay) {
        this.updateValues();
        this.#intervalID = setInterval(()=>this.updateValues(), delay);
    }

    stopAutoupdate() {
        clearInterval(this.#intervalID);
    }

    updateValues() {
        this.#satellite.getStatus().then(data => {
            this.#domHandler.setDetails(data.details);

            this.#domHandler.setMarker(data.marker.top, data.marker.left);
            
        }).catch(error => {
            console.error(error.message);
        });
    }
}

class Satellite {
    #satelliteID;

    constructor(satelliteID) {
        this.#satelliteID = satelliteID;
    }

    async getStatus() {
        const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${this.#satelliteID}`);
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();

        return this.#toSupplementValues(data);
    }

    #toSupplementValues(data) {
        const supplementedValues = {
            details: {
                latitude: data.latitude.toFixed(2),
                longitude: data.longitude.toFixed(2),
                velocity: `${data.velocity.toFixed(2)} km/hr`,
                altitude: `${data.altitude.toFixed(2)} km`,
                visibility: data.visibility,
            },
            marker: {
                top: this.#getMarkerEquirectangularTopPosition(data.latitude),
                left: this.#getMarkerEquirectangularLeftPosition(data.longitude),
            }
        };

        return supplementedValues;
    }

    #getMarkerEquirectangularTopPosition(latitude) {
        const top = 100 - (latitude + 90) * 100 / 180;
        return `${top}%`;
    }

    #getMarkerEquirectangularLeftPosition(longitude) {
        const left = (longitude + 180) * 100 / 360;
        return `${left}%`;
    }
}

class DOMHandler {

    #settings = {};
    #containerElement;
    #markerElement;
    #valuesElements = {};

    constructor(settings) {
        this.#settings = settings;
        this.#containerElement = document.querySelector(`.${this.#settings.containerSelector}`);

        this.#initMapAndMarker();
        this.#initDetails();
    }

    setMarker(top, left) {
        this.#markerElement.style.top = top;
        this.#markerElement.style.left = left;
    }

    setDetails(details) {
        for (const name in details) {
            this.#setDetail(name, details[name]);
        }
    }

    #setDetail(name, value) {
        this.#valuesElements[name].innerText = value;
    }

    #initMapAndMarker() {
        if (this.#settings.map.generate) {
            const mapElement = this.#generateMapElement();
            this.#generateMarkerElement(mapElement);
        }

        this.#markerElement = this.#containerElement.querySelector(`.${this.#settings.map.parts.marker.selector}`);
    }

    #generateMapElement() {
        const mapElement = document.createElement("DIV");
        mapElement.classList.add(this.#settings.map.selector);
        mapElement.title = this.#settings.map.title;
        this.#containerElement.append(mapElement);

        return mapElement;
    }

    #generateMarkerElement(mapElement) {
        const marker = document.createElement("DIV");
        marker.classList.add(this.#settings.map.parts.marker.selector);
        marker.title = this.#settings.map.parts.marker.title;
        mapElement.append(marker);

        return marker;
    }

    #initDetails() {
        if (this.#settings.details.generate) {
            const detailsElement = this.#generateDetailsElement();
            this.#generateDetailsParts(detailsElement);
        }

        this.#valuesElements = this.#getValuesElements();
    }

    #generateDetailsElement() {
        const detailsElement = document.createElement("P");
        detailsElement.classList.add(this.#settings.details.selector);
        this.#containerElement.append(detailsElement);

        return detailsElement;
    }

    #generateDetailsParts(detailsElement) {
        const parts = this.#settings.details.parts;

        for (const name in this.#settings.details.parts) {
            this.#generateDetailsPart(detailsElement, this.#settings.details.parts[name]);
        }
    }

    #generateDetailsPart(detailsElement, part) {
        const rowElement = document.createElement("SPAN");
        rowElement.classList.add(this.#settings.details.partsSelector);
        rowElement.innerText = part.label;

        const valueElement = document.createElement("SPAN");
        valueElement.classList.add(part.valueSelector);
        rowElement.append(valueElement);

        detailsElement.append(rowElement);
    }

    #getValuesElements() {
        const result = {};

        for (const name in this.#settings.details.parts) {
            result[name] = this.#containerElement.querySelector(`.${this.#settings.details.parts[name].valueSelector}`);
        }

        return result;
    }
}

export class ISSTracker extends SatelliteTracker {
    constructor(settings = {
        containerSelector: 'iss-tracker',
        map: {
            parts: {
                marker: {
                    title: 'ISS',
                },
            }
        }
    }) {
        super('25544', settings);
    }
}
