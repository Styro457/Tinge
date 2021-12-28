import Renderer from "../render/renderer.js";
import Quadtree from "../math/quadtree.js";
import Rectangle from "../math/shapes/rectangle.js";

/**
 * Physics engine class
 * @class PhysicsEngine
 * @constructor
 * @param {object} options The options for the physics engine
 * @param {Vector} options.gravity The value of the gravitational force
 */
class PhysicsEngine {

    static instance;

    static AIR_DENSITY = 0.0000000045;

    constructor(options) {
        PhysicsEngine.instance = this;

        this.options = options;

        /**
         * Quadtree used for optimising collision detection
         * @type {Quadtree}
         * @public
         */
        this.quadtree = new Quadtree(0, new Rectangle(0, 0, Renderer.instance.getWidth(), Renderer.instance.getHeight()));
    }

    update() {
        this.quadtree.clear();
    }

}

export default PhysicsEngine;