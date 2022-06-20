import Collider from "./collider.js";
import Rectangle from "../math/shapes/rectangle.js";
import Vector from "../math/vector.js";
import Collisions from "./collision-checks.js";

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
        if(this.rigidBody.getMass() !== 50) return;
        let cos = Math.cos(this.getParent().getRotation());
        let sin = Math.sin(this.getParent().getRotation());
        let p1 = [
            new Vector((this.boundingBox.x-this.boundingBox.width/2), this.boundingBox.y+this.boundingBox.height/2),
            new Vector(this.boundingBox.x+this.boundingBox.width/2, this.boundingBox.y+this.boundingBox.height/2),
            new Vector(this.boundingBox.x-this.boundingBox.width/2, this.boundingBox.y-this.boundingBox.height/2),
            new Vector(this.boundingBox.x+this.boundingBox.width/2, this.boundingBox.y-this.boundingBox.height/2),
        ];
        for (let current = 0; current < p1.length; current++) {
            let xc = p1[current].x;
            p1[current].x = (p1[current].x-this.boundingBox.x)*cos - (p1[current].y-this.boundingBox.y)*sin + this.boundingBox.x;
            p1[current].y = (p1[current].y-this.boundingBox.y)*cos + (xc-this.boundingBox.x)*sin + this.boundingBox.y;

        }
        let collisionPoint = Collisions.polyPoly(p1,
            [
                    new Vector(collider.boundingBox.x-collider.boundingBox.width/2, collider.boundingBox.y+collider.boundingBox.height/2),
                    new Vector(collider.boundingBox.x+collider.boundingBox.width/2, collider.boundingBox.y+collider.boundingBox.height/2),
                    new Vector(collider.boundingBox.x-collider.boundingBox.width/2, collider.boundingBox.y-collider.boundingBox.height/2),
                    new Vector(collider.boundingBox.x+collider.boundingBox.width/2, collider.boundingBox.y-collider.boundingBox.height/2),
                ],
        )
        if(collisionPoint !== false) {
            // P - the collision point
            // A - center of mass of this object
            // B - center of mass of the object collided with
            let AP = this.getParent().getPosition().clone().subtractV(collisionPoint);
            let BP = collider.getParent().getPosition().clone().subtractV(collisionPoint);

            const elasticity = (this.rigidBody.getElasticity()+collider.rigidBody.getElasticity())/2;

            // V(x) - velocity
            // M(x) - mass

            // {-(1+e) * [V(A)-V(B)] * AP} / [AP * AP * (1/M(A) + 1/M(B))]
            const equationTop = (BP.clone().subtractV(AP).multiplyV(AP).multiply(-(1+elasticity)));
            const equationBottom = AP.clone().multiplyV(AP).multiply(1/this.rigidBody.getMass() + 1/collider.rigidBody.getMass());
            const impulse = equationTop.divideV(equationBottom).multiply(0.5);

            this.rigidBody.velocity = new Vector(0, 0);
            this.rigidBody.addForce(impulse.clone().multiplyV(AP));
            collider.rigidBody.velocity = new Vector(0, 0);
            collider.rigidBody.addForce(impulse.clone().multiplyV(AP.multiply(-1)));
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