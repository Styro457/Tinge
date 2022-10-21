import Game from "../game.js";
import PhysicsComponent from "../physics/physics-component.js";

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
        Game.instance.physicsEngine.update();
        this.objects.forEach(function (object) {
            object.components.forEach(function (component, index) {
                if(component instanceof PhysicsComponent)
                    component.onPhysicsUpdate();
            });
        });
    }

}

export default Scene;