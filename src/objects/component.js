/**
 * @classdesc
 * Base class for everything attached to objects.
 * @class Component
 * @constructor
 * @param {object} properties Component properties
 */
class Component {

    constructor(properties) {
        this.properties = properties;
    }

    /**
     * Returns the object that the component is part of
     * @name getParent
     * @function
     * @returns {Object}
     */
    getParent() {
        return this.properties.parent;
    }

    /**
     * Start function called after the component has been enabled
     * @name onStart
     * @function
     */
    onStart() {}

    /**
     * Update function that is called every frame
     * @name onUpdate
     * @function
     */
    onUpdate() {}

    /**
     * Update function that is called every frame, after onUpdate
     * @name onLateUpdate
     * @function
     */
    onLateUpdate() {}

}

export default Component;
