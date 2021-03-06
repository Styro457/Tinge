import Vector from "../math/vector.js"
import PhysicsEngine from "./physics.js";
import PhysicsComponent from "./physics-component.js";
import Time from "../system/time.js";

/**
 * Component that handles the physics of an object
 * @class RigidBody
 * @constructor
 * @param {object} properties Component properties
 * @param {number} properties.mass The mass of the object
 * @param {number} properties.elasticity The coefficient of elasticity of the object (between 1 and 0)
 * @param {boolean} properties.isKinematic Whether physics affect the rigidbody
 * @param {boolean} properties.useGravity Whether this object is affected by gravity
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
         * The angular velocity of the object
         * @type {number}
         * @public
         */
        this.angularVelocity = 0;

        /**
         * Whether the object is supported by something and is not falling
         * @type {boolean}
         * @public
         */
        this.onGround = false;

        /**
         * The Collider component of the parent
         * @type {Collider}
         * @public
         */
        this.collider = undefined;
    }

    /**
     * Adds a force to the rigidbody
     * @name addForce
     * @function
     * @param {Vector} acceleration The force vector
     */
    addForce(acceleration) {
        this.velocity.addV(acceleration.divide(this.getMass()/10));
    }

    /**
     * Increases the angular velocity
     * @name addAngularVelocity
     * @function
     * @param {number} acceleration The amount to increase angular velocity by
     */
    addAngularVelocity(acceleration) {
        this.angularVelocity += acceleration;
    }

    /**
     * Whether physics affect the rigidbody.
     * @name isKinematic
     * @function
     * @returns {boolean}
     */
    isKinematic() {
        return this.properties.isKinematic;
    }

    /**
     * Changes the mass of the object
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
        if(!this.onGround && this.properties.useGravity) {
            this.velocity.addV(PhysicsEngine.instance.options.gravity)
        }

        //add air resistance
        if(this.collider !== undefined) {
            this.addForce(this.velocity.clone()
                .multiplyV(this.velocity)
                .multiplyV(this.velocity.clone().normalize())
                .multiplyV(this.collider.getSurface())
                .multiply(PhysicsEngine.AIR_DENSITY*this.collider.getDragCoefficient())
            );

            const negative = this.angularVelocity < 0 ? 1 : -1;
            this.angularVelocity -= negative*(this.angularVelocity*this.angularVelocity*this.collider.getArea()*PhysicsEngine.AIR_DENSITY*this.collider.getDragCoefficient());
        }

        this.getParent().getPosition().addV(this.velocity.clone().multiply(Time.deltaTime));
        this.getParent().properties.rotation += this.angularVelocity * Time.deltaTime;
    }

}

export default RigidBody;