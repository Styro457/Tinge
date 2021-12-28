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
        this.velocity = new Vector(0, 0);

        /**
         * Whether the object is supported by something and is not falling
         * @type {boolean}
         * @public
         */
        this.onGround = false;
    }
    }

    /**
     * Whether physics affects the rigidbody.
     * @name isKinematic
     * @function
     * @returns {boolean}
     */
    isKinematic() {
        return this.properties.isKinematic;
    }

    onPhysicsUpdate() {
        if(this.isKinematic()) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
        //add gravity
        if(!this.onGround) {
            this.velocity.addV(PhysicsEngine.instance.options.gravity)
        }

        this.velocity.add(PhysicsEngine.instance.options.gravity)
        this.getParent().getPosition().add(this.velocity);
    }

}

export default RigidBody;