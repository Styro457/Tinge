/**
 * Base class for objects.
 * @class Object
 * @constructor
 * @param {object} properties Object properties
 * @param {Vector} properties.position The position of the object
 * @param {number} properties.rotation The rotation of the object in radians
 * @param {Vector} properties.scale The scale of the object
 * @param {Vector} properties.parent The parent of this object
 * @param {Vector} properties.children The children of this object
 */

class Object {

    constructor(properties) {
        this.properties = properties;
        this.components = [];

        if(properties.children === undefined) {
            this.properties.children = [];
        }
    }

    /**
     * Returns the position of the object
     * @name getPosition
     * @function
     * @returns {Vector}
     */
    getPosition() {
        if(this.getParent() !== undefined) {
            return this.properties.position + this.getParent().getPosition();
        }
        return this.properties.position;
    }

    /**
     * Returns the rotation of the object in radians
     * @name getRotation
     * @function
     * @returns {number}
     */
    getRotation() {
        if(this.getParent() !== undefined) {
            return this.properties.position + this.getParent().getRotation();
        }
        return this.properties.rotation;
    }

    /**
     * Returns the scale of the object
     * @name getScale
     * @function
     * @returns {Vector}
     */
    getScale() {
        if(this.getParent() !== undefined) {
            return this.properties.position + this.getParent().getScale();
        }
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

    /**
     * Returns the parent of this object
     * @name getParent
     * @function
     * @returns {object}
     */
    getParent() {
        return this.properties.parent;
    }

    /**
     * Sets this object as the parent of another object
     * @name addChildren
     * @function
     * @param {Object} object The object to link to this object
     */
    addChildren(object) {
        object.properties.parent = object;
        this.properties.children.push(object);
    }

    /**
     * Removes the parent of one of this objects children
     * @name removeChildren
     * @function
     * @param {Object} object The object to unlink from this object
     */
    removeChildren(object) {
        object.properties.parent = undefined;
        const index = this.getChildren().indexOf(object);
        if (index > -1) {
            this.getChildren().splice(index, 1);
        }
    }

    /**
     * Returns the children of this object
     * @name getChildren
     * @function
     * @returns {Object[]}
     */
    getChildren() {
        return this.properties.parent;
    }

}

export default Object;