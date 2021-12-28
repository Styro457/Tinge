import CanvasRender from "./render/canvas/canvas_renderer.js"
import Vector from "./math/vector.js"
import Texture from "./image/texture.js"
import Sprite from "./image/sprite.js"
import Scene from "./scene/scene.js"
import CustomComponent from "./objects/custom-component.js"
import RigidBody from "./physics/rigidbody.js";
import PhysicsEngine from "./physics/physics.js";
import BoxCollider from "./physics/box-collider.js";

class Game {

    static instance;

    constructor(options) {
        Game.instance = this;

        this.options = options;
        this.renderEngine = new CanvasRender({
            canvas: document.getElementById("tingeCanvas"),
            width: 1280,
            height: 720
        });

        this.physicsEngine = new PhysicsEngine({
            gravity: new Vector(0, 0),
        })

/*
        this.options.renderEngine.drawImage(new Texture("https://i.imgur.com/ZnVA1ma.png"), new Vector(75, 75), new Vector(0, 0), new Vector(160, 200));
*/

        this.activeScene = new Scene();

        const background = new Sprite({
            position: new Vector(0, 0),
            rotation: new Vector(0, 0),
            scale: new Vector(1000, 1000)
        }, new Texture("https://i.imgur.com/wghI3OE.png"));

        this.activeScene.objects.push(background);


        const image = new Sprite({
            position: new Vector(20, 20),
            rotation: new Vector(0, 0),
            scale: new Vector(160, 200)
        }, new Texture("https://i.imgur.com/ZnVA1ma.png"));

        const rigidBody = new RigidBody({});
        rigidBody.velocity.y = 15;
        image.addComponent(rigidBody)
        const boxCollider = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(160, 200)
        })
        boxCollider.onCollision = function() {
            console.log("COLLISION: ");
            image.getPosition().y  -= 5;
            rigidBody.velocity.y = 0;
        }
        image.addComponent(boxCollider)
        this.activeScene.objects.push(image);

        const floor = new Sprite({
            position: new Vector(1, 600),
            rotation: new Vector(0, 0),
            scale: new Vector(500, 20)
        }, new Texture("https://i.imgur.com/ZnVA1ma.png"));

        const b2 = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(500, 20)
        });
        b2.onCollision = function () {
            //console.log("COLLISION2: ");
        }
        floor.addComponent(b2)
        this.activeScene.objects.push(floor);

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        this.physicsEngine.update();
        this.activeScene.update();
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

}

export default Game;