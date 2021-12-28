import Collider from "./collider.js";
import Rectangle from "../math/shapes/rectangle.js";

/**
 * Box Collider
 * @class BoxCollider
 * @constructor
 * @param {object} properties Component properties
 * @param {Vector} properties.offset Offset from the center of the parent
 * @param {Vector} properties.size The size of the collider
 * @param {RigidBody} rigidBody The RigidBody component of the parent
 */
class BoxCollider extends Collider {

    static DRAG_COEFFICIENT = 1;

    constructor(properties, rigidBody) {
        super(properties, rigidBody);
        this.boundingBox = new Rectangle(0, 0, properties.size.x, properties.size.y);
    }

    /**
     * Returns the offset from the center of the parent
     * @name getOffset
     * @function
     * @returns {Vector}
     */
    getOffset() {
        return this.properties.offset;
    }

    /**
     * Returns the size of the collider
     * @name getSize
     * @function
     * @returns {Vector}
     */
    getSize() {
        return this.properties.size;
    }

    collidesWith(collider) {
        return Math.abs(this.boundingBox.x - collider.boundingBox.x) <= Math.abs(this.boundingBox.width + collider.boundingBox.width)/2 &&
                Math.abs(this.boundingBox.y - collider.boundingBox.y) <= Math.abs(this.boundingBox.height + collider.boundingBox.height)/2;
    }
    getDragCoefficient() {
        return BoxCollider.DRAG_COEFFICIENT;
    }

    onPhysicsUpdate() {
        //Update the position of the bounding box
        const position = this.getParent().getPosition()
        const size = this.getSize();
        this.boundingBox.x = position.x//-size.x/2;
        this.boundingBox.y = position.y//-size.y/2;

        super.onPhysicsUpdate();
    }
}

export default BoxCollider;