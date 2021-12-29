import Object from "../objects/object.js";
import Renderer from "../render/renderer.js";
import Vector from "../math/vector.js";

/**
 * Camera object
 * @class Camera
 * @constructor
 * @param {object} properties Object properties
 */
class Camera extends Object {

    constructor(properties) {
        super(properties);
        if (Renderer.instance.mainCamera === undefined) {
            Renderer.instance.mainCamera = this;
        }
    }

    /**
     * Returns the position on the screen of a point in the world
     * @name worldToScreenPosition
     * @function
     * @param {Vector} worldPosition The position in the world
     * @returns {Vector} The position on the screen
     */
    static worldToScreenPosition(worldPosition) {
        return worldPosition.clone().subtractV(Renderer.instance.mainCamera.getPosition()).addV(new Vector(Renderer.instance.getWidth()/2, Renderer.instance.getHeight()/2));
    }

}

export default Camera;