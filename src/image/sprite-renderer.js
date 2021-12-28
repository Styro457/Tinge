import Renderer from "../render/renderer.js";
import Render from "../render/render.js";

/**
 * Component for rendering sprites
 * @class SpriteRenderer
 * @constructor
 * @param {object} properties Component properties
 * @param {Texture} properties.texture The texture of the sprite
 * @param {Object} properties.parent The object the component is part of
 */
class SpriteRenderer extends Renderer {

    constructor(properties) {
        super(properties);
    }

    onUpdate() {
        Render.instance.drawImage(this.properties.texture, this.properties.parent.properties.position, this.properties.parent.properties.rotation, this.properties.parent.properties.scale);
    }

}

export default SpriteRenderer;