import Vector from "../math/vector.js"
import PhysicsEngine from "./physics.js";
import PhysicsComponent from "./physics-component.js";

/**
 * Component that handles the physics of an object
 * @class RigidBody
 * @constructor
 * @param {object} properties Component properties
 * @param {number} properties.mass The mass of the object
 * @param {number} properties.elasticity The coefficient of elasticity of the object (between 1 and 0)
 * @param {boolean} properties.isKinematic Whether physics affects the rigidbody
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

     * @name setMass
     * @function
     * @param {number} value The new mass
     */
    setMass(value) {
        this.properties.mass = value;
    }

    /**
     * Returns the mass of the object
     * @name getMass
     * @function
     * @returns {number}
     */
    getMass() {
        return this.properties.mass;
    }

    /**
     * Changes the coefficient of elasticity of the object
     * @name setElasticity
     * @function
     * @param {number} value The new coefficient of elasticity (should be between 1 and 0)
     */
    setElasticity(value) {
        this.properties.elasticity = value;
    }

    /**
     * Returns the coefficient of elasticity of the object
     * @name getElasticity
     * @function
     * @returns {number}
     */
    getElasticity() {
        return this.properties.elasticity;
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