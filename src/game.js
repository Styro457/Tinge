import CanvasRender from "./render/canvas/canvas_renderer.js"
import Vector from "./math/vector.js"
import Texture from "./image/texture.js"
import Sprite from "./image/sprite.js"
import Scene from "./scene/scene.js"
import RigidBody from "./physics/rigidbody.js";
import PhysicsEngine from "./physics/physics.js";
import BoxCollider from "./physics/box-collider.js";
import Time from "./system/time.js";

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
            gravity: new Vector(0, 30),
        })

/*
        this.options.renderEngine.drawImage(new Texture("https://i.imgur.com/ZnVA1ma.png"), new Vector(75, 75), new Vector(0, 0), new Vector(160, 200));
*/

        this.activeScene = new Scene();

        const background = new Sprite({
            position: new Vector(500, 500),
            rotation: new Vector(0, 0),
            scale: new Vector(2000, 2000)
        }, new Texture("https://i.imgur.com/wghI3OE.png"));

        this.activeScene.objects.push(background);


        const image = new Sprite({
            position: new Vector(200, 20),
            rotation: new Vector(0, 0),
            scale: new Vector(160, 200)
        }, new Texture("https://i.imgur.com/ZnVA1ma.png"));

        const rigidBody = new RigidBody({
            mass: 1,
            elasticity:0.2,
            isKinematic: false
        });
        image.addComponent(rigidBody)
        const boxCollider = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(160, 200)
        }, rigidBody)
        boxCollider.onCollision = function() {
            console.log("COLLISION: ");
/*            rigidBody.velocity.y = 0;
            PhysicsEngine.instance.options.gravity.y = 0;*/
/*            image.getPosition().y  -= 5;
            rigidBody.velocity.y = 0;*/
        }
        image.addComponent(boxCollider)
/*        image.addComponent(new CustomComponent({
            onUpdate: function(component){
                console.log(component.getParent().getPosition().y + " - " + component.getParent().getPosition().x)
            }
        }))*/
        this.activeScene.objects.push(image);

        const floor = new Sprite({
            position: new Vector(50, 600),
            rotation: new Vector(0, 0),
            scale: new Vector(1000, 40)
        }, new Texture("https://i.imgur.com/ZnVA1ma.png"));

        const r2 = new RigidBody({
            mass: 1,
            elasticity: 0.2,
            isKinematic: true
        })
        floor.addComponent(r2)

        const b2 = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(1000, 40)
        }, r2);
        b2.onCollision = function () {
            //console.log("COLLISION2: ");
        }
        floor.addComponent(b2)
        this.activeScene.objects.push(floor);

        this.start();
    }

    start() {
        Time.lastTime = Date.now();
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        Time.deltaTime = (Date.now()-Time.lastTime)/1000;
        Time.lastTime = Date.now();

        this.activeScene.update();

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

}

export default Game;