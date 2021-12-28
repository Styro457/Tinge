import Renderer from "../renderer.js"

/**
 * Canvas render object
 * @class CanvasRenderer
 * @extends Renderer
 * @constructor
 * @param {object} options The renderer parameters
 * @param {number} options.width The width of the canvas without scaling
 * @param {number} options.height The height of the canvas without scaling
 * @param {HTMLCanvasElement} [options.canvas] The html canvas to draw to on screen
 */
class CanvasRenderer extends Renderer {

    constructor(options) {
        super(options);
        Renderer.instance = this;
        this.options.context =  this.options.canvas.getContext("2d");
    }

    clear() {
        this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
    }

    drawImage(texture, position, rotation, scale) {
        this.getContext().drawImage(texture.image, position.x-(scale.x/2), position.y-(scale.y/2), scale.x, scale.y);
    }

}

export default CanvasRenderer;