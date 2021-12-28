import Game from "../game.js";

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
        this.physicsComponents = [];
    }

    update() {
        Game.instance.physicsEngine.update();
        this.physicsComponents.forEach(function (physicsComponent) {
            physicsComponent.onPhysicsUpdate();
        })

        this.objects.forEach(function (object) {
            object.components.forEach(function (component, index) {
                component.onEarlyUpdate();
            });
        });
        this.objects.forEach(function (object) {
            object.components.forEach(function (component, index) {
                component.onUpdate();
            });
        });
        this.objects.forEach(function (object) {
            object.components.forEach(function (component, index) {
                component.onLateUpdate();
            });
        });
    }

}

export default Scene;