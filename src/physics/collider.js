import PhysicsEngine from "./physics.js";
import PhysicsComponent from "./physics-component.js";

/**
 * Base class for colliders
 * @class Collider
 * @constructor
 * @param {object} properties Component properties
 * @param {RigidBody} rigidBody The RigidBody component of the parent
 */
class Collider extends PhysicsComponent {

    static DRAG_COEFFICIENT = 1;

    constructor(properties, rigidBody) {
        super(properties);

        /**
         * The RigidBody component of the parent
         * @type {RigidBody}
         * @public
         */
        this.rigidBody = rigidBody;
        this.rigidBody.collider = this;

        /**
         * The bounding box of the collider
         * @type {Rectangle}
         * @public
         */
        this.boundingBox = null;

        /**
         * Function that runs when the collider touches another collider
         * @type {function}
         * @param {Collider} otherCollider
         * @public
         */
        this.onCollision = null;
    }

    /**
     * Returns whether this collider touches another collider
     * @name collidesWith
     * @private
     * @function
     * @param {Collider} collider The other collider
     * @returns {boolean}
     */
    collidesWith(collider) {}

    /**
     * Handles the physics of a collision
     * @name handleCollision
     * @private
     * @function
     * @param {Collider} collider The other collider
     */
    handleCollision(collider) {}

    /**
     * Returns the surface of the collider
     * @name getSurface
     * @function
     * @returns {Vector}
     */
    getSurface() {}

    getDragCoefficient() {
        return Collider.DRAG_COEFFICIENT;
    }

    onPhysicsUpdate() {
        PhysicsEngine.instance.quadtree.insert(this);
    }

    onEarlyUpdate() {
        if(this.rigidBody.isKinematic())
            return;

        this.rigidBody.onGround = false;

        const closeColliders = [];
        PhysicsEngine.instance.quadtree.retrieve(closeColliders, this.boundingBox);
        closeColliders.forEach(collider => {
            if(this.collidesWith(collider) && collider !== this) {
                this.handleCollision(collider);
                if(this.onCollision != null) {
                    this.onCollision();
                }
            }
        })
    }

}

export default Collider;