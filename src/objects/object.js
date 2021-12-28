/**
 * Base class for objects.
 * @class Object
 * @constructor
 * @param {object} properties Object properties
 * @param {Vector} properties.position The position of the object
 * @param {Vector} properties.rotation The rotation of the object
 * @param {Vector} properties.scale The scale of the object
 */

class Object {

    constructor(properties) {
        this.properties = properties;
        this.components = [];
    }

    /**
     * Returns the position of the object
     * @name getPosition
     * @function
     * @returns {Vector}
     */
    getPosition() {
        return this.properties.position;
    }

    /**
     * Returns the rotation of the object
     * @name getRotation
     * @function
     * @returns {Vector}
     */
    getRotation() {
        return this.properties.rotation;
    }

    /**
     * Returns the scale of the object
     * @name getScale
     * @function
     * @returns {Vector}
     */
    getScale() {
        return this.properties.scale;
    }

    /**
     * Add a component to the object
     * @name addComponent
     * @function
     * @param {Component} component The component
     */
    addComponent(component) {
        this.components.push(component);
        component.properties.parent = this;
        this.getComponent()
    }

    /**
     * Returns the first component of a specific type from the object
     * @name getComponent
     * @function
     * @param {object} type The component type
     */
    getComponent(type) {
        this.components.forEach(function(component) {
            if(component.constructor === type) {
                return component;
            }
        })
        return undefined;
    }

    /**
     * Returns all the components of a specific type from the object
     * @name getComponents
     * @function
     * @param {object} type The component type
     */
    getComponents(type) {
        const result = [];
        this.components.forEach(function(component) {
            if(component.constructor === type.constructor) {
                result.push(component);
            }
        })
        return result;
    }

}

export default Object;