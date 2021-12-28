import PhysicsEngine from "./physics.js";
import PhysicsComponent from "./physics-component.js";

/**
 * Base class for colliders
 * @class Collider
 * @constructor
 * @param {object} properties Component properties
 */
class Collider extends PhysicsComponent {

    constructor(properties) {
        super(properties);

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

    onPhysicsUpdate() {
        PhysicsEngine.instance.quadtree.insert(this);
    }

    onEarlyUpdate() {
        const closeColliders = [];
        PhysicsEngine.instance.quadtree.retrieve(closeColliders, this.boundingBox);
        closeColliders.forEach(collider => {
            if(this.collidesWith(collider) && collider !== this) {
                if(this.onCollision != null) {
                    this.onCollision();
                }
            }
        })
    }

}

export default Collider;