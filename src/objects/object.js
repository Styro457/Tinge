/**
 * @classdesc
 * Base class for objects.
 * @class Object
 * @constructor
 * @param {object} properties Object properties
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