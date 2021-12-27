import Component from "../objects/component.js";

/**
 * @classdesc
 * Base class for rendering components
 * @class Renderer
 * @constructor
 * @param {object} properties Component properties
 */
class Renderer extends Component {

    constructor(properties) {
        super(properties);
    }

    onUpdate() {

    }

}

export default Renderer;