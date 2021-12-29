/**
 * Base render object
 * @class Renderer
 * @constructor
 * @param {object} options The renderer parameters
 * @param {number} options.width The width of the canvas without scaling
 * @param {number} options.height The height of the canvas without scaling
 * @param {HTMLCanvasElement} [options.canvas] The html canvas to draw to on screen
 */
class Renderer {

    static instance;

    constructor(options) {
        this.options = options;

        /**
         * The main camera
         * @type {Camera}
         * @public
         */
        this.mainCamera = undefined;
    }

    /**
     * Clears the canvas
     * @name clear
     * @function
     */
    clear() {}

    /**
     * Returns a reference to the screen canvas
     * @name getCanvas
     * @function
     * @returns {HTMLCanvasElement}
     */
    getCanvas() {
        return this.options.canvas;
    }

    /**
     * Returns a reference to the screen canvas context
     * @name getCanvas
     * @function
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
     */
    getContext() {
        return this.options.context;
    }

    /**
     * Returns the width of the canvas
     * @name getWidth
     * @function
     * @returns {number}
     */
    getWidth() {
        return this.options.width;
    }

    /**
     * Returns the height of the canvas
     * @name getHeight
     * @function
     * @returns {number}
     */
    getHeight() {
        return this.options.height;
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

export default Renderer;