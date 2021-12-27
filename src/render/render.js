/**
 * @classdesc
 * a base renderer object
 * @class Renderer
 * @constructor
 * @param {object} options The renderer parameters
 * @param {number} options.width The width of the canvas without scaling
 * @param {number} options.height The height of the canvas without scaling
 * @param {HTMLCanvasElement} [options.canvas] The html canvas to draw to on screen
 */
class RenderEngine {

    constructor(options) {

    }

    /**
     * clear the canvas
     * @name clear
     * @function
     */
    clear() {}

    /**
     * return a reference to the screen canvas
     * @name getCanvas
     * @function
     * @returns {HTMLCanvasElement}
     */
    getCanvas() {}

    drawImage() {

    }
}