/**
 * @classdesc
 * a base render object
 * @class Render
 * @constructor
 * @param {object} options The renderer parameters
 * @param {number} options.width The width of the canvas without scaling
 * @param {number} options.height The height of the canvas without scaling
 * @param {HTMLCanvasElement} [options.canvas] The html canvas to draw to on screen
 */
class Render {

    constructor(options) {
        this.options = options;
    }

    /**
     * Clear the canvas
     * @name clear
     * @function
     */
    clear() {}

    /**
     * Return a reference to the screen canvas
     * @name getCanvas
     * @function
     * @returns {HTMLCanvasElement}
     */
    getCanvas() {
        return this.options.canvas;
    }

    /**
     * Return a reference to the screen canvas context
     * @name getCanvas
     * @function
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
     */
    getContext() {
        return this.options.context;
    }

    /**
     * Draw an image on the canvas
     * @name clear
     * @function
     * @param {Texture} texture The image source
     * @param {Vector} position The position of the image on the screen
     * @param {Vector} rotation The rotation of the image
     * @param {Vector} scale The scale of the image
     */
    drawImage(texture, position, rotation, scale) {}
}

export default Render;