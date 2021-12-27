/**
 * Scene class
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
                component.onEarlyUpdate();
            });
        });
        this.objects.forEach(function (object, index) {
            object.components.forEach(function (component, index) {
                component.onUpdate();
            });
        });
        this.objects.forEach(function (object, index) {
            object.components.forEach(function (component, index) {
                component.onLateUpdate();
            });
        });
    }

}

export default Scene;