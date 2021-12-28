import Collider from "./collider.js";
import Rectangle from "../math/shapes/rectangle.js";

/**
 * Box Collider
 * @class BoxCollider
 * @constructor
 * @param {object} properties Component properties
 * @param {Vector} properties.offset Offset from the center of the parent
 * @param {Vector} properties.size The size of the collider
 */
class BoxCollider extends Collider {

    constructor(properties) {
        super(properties);
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
        const bottomY = this.boundingBox.y + this.boundingBox.height;
        const colliderBottomY = collider.boundingBox.y + collider.boundingBox.height;
        const rightX = this.boundingBox.x + this.boundingBox.width;
        const colliderRightX = collider.boundingBox.x + collider.boundingBox.width;

        return (this.boundingBox.y > collider.boundingBox.y && this.boundingBox.y < colliderBottomY ||
                bottomY > collider.boundingBox.y && bottomY < colliderBottomY) &&
                (this.boundingBox.x > collider.boundingBox.x && this.boundingBox.x < colliderRightX ||
                rightX > collider.boundingBox.x && rightX < colliderRightX);
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