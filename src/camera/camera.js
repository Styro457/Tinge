import Object from "../objects/object.js";
import Renderer from "../render/renderer.js";
import Vector from "../math/vector.js";

/**
 * Camera object
 * @class Camera
 * @constructor
 * @param {object} properties Object properties
 * @param {number} properties.zoom Camera zoom
 */
class Camera extends Object {

    constructor(properties) {
        super(properties);
        if (Renderer.instance.mainCamera === undefined) {
            Renderer.instance.mainCamera = this;
        }
    }

    /**
     * Changes the camera zoom (Default: 1)
     * @name setZoom
     * @function
     * @param {number} value The new zoom value
     */
    setZoom(value) {
        this.properties.zoom = value;
    }

    /**
     * Returns the camera zoom
     * @name getZoom
     * @function
     * @returns {number}
     */
    getZoom() {
       return this.properties.zoom;
    }

    /**
     * Returns the position on the screen of a point in the world
     * @name worldToScreenPosition
     * @function
     * @param {Vector} worldPosition The position in the world
     * @returns {Vector} The position on the screen
     */
    static worldToScreenPosition(worldPosition) {
        return worldPosition.clone()
            .subtractV(Renderer.instance.mainCamera.getPosition())
            .multiply(Renderer.instance.mainCamera.properties.zoom)
            .addV(new Vector(Renderer.instance.getWidth()/2, Renderer.instance.getHeight()/2));
    }

    /**
     * Returns the size on the screen of an object
     * @name worldToScreenPosition
     * @function
     * @param {Vector} worldSize The size of the object
     * @returns {Vector} The size on the screen
     */
    static worldToScreenSize(worldSize) {
        return worldSize.clone().multiply(Renderer.instance.mainCamera.properties.zoom);
    }

}

export default Camera;