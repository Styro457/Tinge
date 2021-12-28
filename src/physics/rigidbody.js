import Vector from "../math/vector.js"
import PhysicsEngine from "./physics.js";
import PhysicsComponent from "./physics-component.js";

/**
 * Component that handles the physics of an object
 * @class RigidBody
 * @constructor
 * @param {object} properties Component properties
 */
class RigidBody extends PhysicsComponent {

    constructor(properties) {
        super(properties);

        /**
         * The velocity of the object
         * @type {Vector}
         * @public
         */
        this.velocity = Vector.zero;
    }

    onPhysicsUpdate() {
        this.velocity.add(PhysicsEngine.instance.options.gravity)
        this.getParent().getPosition().add(this.velocity);
    }

}

export default RigidBody;