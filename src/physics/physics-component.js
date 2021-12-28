import Component from "../objects/component.js";
import Game from "../game.js";

/**
 * Base class for all physics components
 * @class PhysicsComponent
 * @constructor
 * @param {object} properties Component properties
 */
class PhysicsComponent extends Component {

    constructor(properties) {
        super(properties);
        Game.instance.activeScene.physicsComponents.push(this);
    }

    onPhysicsUpdate() {}

}

export default PhysicsComponent;