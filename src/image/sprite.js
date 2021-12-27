import Object from "../objects/object.js";
import SpriteRenderer from "./sprite-renderer.js"

/**
 * Simple object with a texture
 * @class Sprite
 * @constructor
 * @param {object} properties Object properties
 * @param {Texture} texture The texture of the sprite
 */
class Sprite extends Object {

    constructor(properties, texture) {
        super(properties);
        this.addComponent(new SpriteRenderer({
            texture: texture,
        }))
    }

}

export default Sprite