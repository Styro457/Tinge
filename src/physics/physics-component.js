import Component from "../objects/component.js";

/**
 * Base class for all physics components
 * @class PhysicsComponent
 * @constructor
 * @param {object} properties Component properties
 */
class PhysicsComponent extends Component {

    constructor(properties) {
        super(properties);
    }

    onPhysicsUpdate() {}

}

export default PhysicsComponent;