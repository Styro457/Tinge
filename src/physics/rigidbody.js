import Component from "../objects/component.js";
import Vector from "../math/vector.js"
import PhysicsEngine from "./physics.js";

/**
 *
 * Component that handles the physics of an object
 * @class RigidBody
 * @constructor
 * @param {object} properties Component properties
 */
class RigidBody extends Component {

    /**
     * The velocity of the object
     * @public
     * @name velocity
     * @type {Vector}
     */
    velocity = Vector.zero;

    constructor(properties) {
        super(properties);
    }

    onStart() {

    }

    onUpdate() {
        this.velocity.add(PhysicsEngine.instance.options.gravity)
        this.getParent().getPosition().add(this.velocity);
    }

}

export default RigidBody;