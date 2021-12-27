/**
 * @classdesc
 * Physics engine class
 * @class PhysicsEngine
 * @constructor
 * @param {object} options The options for the physics engine
 * @param {Vector} options.gravity The value of the gravitational force
 */
class PhysicsEngine {

    static instance;

    constructor(options) {
        PhysicsEngine.instance = this;

        this.options = options;
    }

}

export default PhysicsEngine;