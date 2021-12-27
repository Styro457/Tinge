/**
 * @classdesc
 * Scene object
 * @class Scene
 * @constructor
 * @param {object} options Scene options
 */
class Scene {

    constructor(options) {
        this.options = options;
        this.objects = [];
    }

    update() {
        this.objects.forEach(function (object, index) {
            object.components.forEach(function (component, index) {
                component.onUpdate();
            });
        });
    }

}

export default Scene;