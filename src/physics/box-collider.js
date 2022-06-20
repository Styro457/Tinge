import Collider from "./collider.js";
import Rectangle from "../math/shapes/rectangle.js";
import Vector from "../math/vector.js";

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

    handleCollision(collider) {
        const penetration = new Array(4);

        const rightEdge = this.boundingBox.x + this.boundingBox.width/2;
        const colliderRightEdge = collider.boundingBox.x + collider.boundingBox.width/2;
        const leftEdge = this.boundingBox.x - this.boundingBox.width/2;
        const colliderLeftEdge = collider.boundingBox.x - collider.boundingBox.width/2;

        if(rightEdge < colliderRightEdge) {
            penetration[0] = rightEdge-colliderLeftEdge; // penetration on the right
        }
        else if(leftEdge > colliderLeftEdge) {
            penetration[1] = colliderRightEdge-leftEdge; // penetration on the left
        }

        const topEdge = this.boundingBox.y - this.boundingBox.height/2;
        const colliderTopEdge = collider.boundingBox.y - collider.boundingBox.height/2;
        const bottomEdge = this.boundingBox.y + this.boundingBox.height/2;
        const colliderBottomEdge = collider.boundingBox.y + collider.boundingBox.height/2;

        if(topEdge > colliderTopEdge) {
            penetration[2] = colliderBottomEdge-topEdge; // penetration on the top
        }
        else if(bottomEdge < colliderBottomEdge) {
            penetration[3] = bottomEdge-colliderTopEdge; // penetration on the bottom
        }

        let bestAxis = 0;
        let zeroCount = 0;

        for(let i = 0; i < 4; i++) {
            if(penetration[i] === undefined) {
                penetration[i] = 0;
                zeroCount++;
            }
            else if(penetration[i] > penetration[bestAxis]) {
                bestAxis = i;
            }
        }

        //penetrating in only one direction
        if(zeroCount === 3) {
            if(bestAxis > 1) bestAxis -= 2;
            else bestAxis += 2;
        }

        const elasticity = (this.rigidBody.getElasticity()+collider.rigidBody.getElasticity())/2;
        if(bestAxis === 0 || bestAxis === 1) {
            //push objects apart
            //penetration[2] - penetration on top
            //penetration[3] - penetration on the bottom
            if(penetration[3] > penetration[2])
                //this.getParent().getPosition().y -= penetration[3];
                this.rigidBody.addForce(new Vector(0, penetration[3]*100));
            else {
                //this.getParent().getPosition().y += penetration[2];
                this.rigidBody.addForce(new Vector(0, penetration[2]*-100));
                this.rigidBody.onGround = true;
            }

            this.rigidBody.addForce(new Vector(0, -(1+elasticity)*(this.rigidBody.velocity.y-collider.rigidBody.velocity.y)));
        }
        else {
            //push objects apart
            //penetration[0] - penetration on the right
            //penetration[1] - penetration on the left
            if(penetration[1] > penetration[0])
                //this.getParent().getPosition().x += penetration[1];
                this.rigidBody.addForce(new Vector(penetration[1]*-100, 0));
            else
                //this.getParent().getPosition().x -= penetration[0];
                this.rigidBody.addForce(new Vector(penetration[0]*100, 0));

            this.rigidBody.addForce(new Vector(-(1+elasticity)*(this.rigidBody.velocity.x-collider.rigidBody.velocity.x), 0));
        }

    }

    getSurface() {
        return new Vector(this.boundingBox.width, this.boundingBox.height);
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