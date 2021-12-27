/**
 * @classdesc
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

    addComponent(component) {
        this.components.push(component);
        component.properties.parent = this;
    }

}

export default Object;