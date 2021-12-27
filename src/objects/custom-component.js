import Component from "./component.js";

/**
 * @classdesc
 * Component with custom onStart and onUpdate functions used for easily making simple components
 * @class CustomComponent
 * @constructor
 * @param {object} properties Component properties
 * @param {function} properties.onStart Custom start function
 * @param {function} properties.onUpdate Custom update function
 */
class CustomComponent extends Component {

    constructor(properties) {
        super(properties);
    }

    onStart() {
        if(this.properties.onStart !== undefined) {
            this.properties.onStart(this);
        }
    }

    onUpdate() {
        if(this.properties.onUpdate !== undefined) {
            this.properties.onUpdate(this);
        }
    }

}

export default CustomComponent;