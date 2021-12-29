import CanvasRenderer from "./render/canvas/canvas_renderer.js"
import Vector from "./math/vector.js"
import Texture from "./image/texture.js"
import Sprite from "./image/sprite.js"
import Scene from "./scene/scene.js"
import RigidBody from "./physics/rigidbody.js";
import PhysicsEngine from "./physics/physics.js";
import BoxCollider from "./physics/box-collider.js";
import Time from "./system/time.js";
import CustomComponent from "./objects/custom-component.js";
import Renderer from "./render/renderer.js";
import Camera from "./camera/camera.js";

class Game {

    static instance;

    constructor(options) {
        Game.instance = this;

        this.options = options;
        this.renderEngine = new CanvasRenderer({
            canvas: document.getElementById("tingeCanvas"),
            width: 1280,
            height: 720
        });

        this.renderEngine.mainCamera = new Camera({
            position: new Vector(0, -270),
            scale: new Vector(1, 1)
        });

        this.physicsEngine = new PhysicsEngine({
            gravity: new Vector(0, 50),
        })

        this.activeScene = new Scene();

        const background = new Sprite({
            position: new Vector(0, 0),
            rotation: new Vector(0, 0),
            scale: new Vector(4000, 2000)
        }, new Texture("https://i.imgur.com/IsSNQSG.png"));

        this.activeScene.objects.push(background);


        const player = new Sprite({
            position: new Vector(-500, -400),
            rotation: new Vector(0, 0),
            scale: new Vector(160, 200)
        }, new Texture("https://i.imgur.com/hDS6kU3.jpeg"));

        const rigidBody = new RigidBody({
            mass: 1,
            elasticity:0.1,
            isKinematic: false
        });
        player.addComponent(rigidBody)
        const boxCollider = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(160, 200)
        }, rigidBody)

        player.addComponent(boxCollider)

        this.activeScene.objects.push(player);

        let keys = {};

        player.addComponent(new CustomComponent({
            onUpdate: function(){
                Renderer.instance.mainCamera.getPosition().x = player.getPosition().x;
                if(keys[" "] && rigidBody.onGround) {
                    rigidBody.addForce(new Vector(0, -1000));
                }
                if(keys["d"]) {
                    player.getPosition().x += 10;
                }
                if(keys["a"]) {
                    player.getPosition().x -= 10;
                }
            }
        }))
        document.onkeydown = function (e) {
            keys[e.key] = true;
        };

        document.onkeyup = function (e) {
            keys[e.key] = false;
        };

        const floor = new Sprite({
            position: new Vector(0, -10),
            rotation: new Vector(0, 0),
            scale: new Vector(2000, 80)
        }, new Texture("https://i.imgur.com/PfIilbS.png"));

        const r2 = new RigidBody({
            mass: 1,
            elasticity: 0.1,
            isKinematic: true
        })
        floor.addComponent(r2)

        const b2 = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(2000, 80)
        }, r2);
        floor.addComponent(b2)
        this.activeScene.objects.push(floor);


        const s1 = new Sprite({
            position: new Vector(20, -100),
            rotation: new Vector(0, 0),
            scale: new Vector(500, 80)
        }, new Texture("https://i.imgur.com/PfIilbS.png"));

        const s1RB = new RigidBody({
            mass: 1,
            elasticity: 0.1,
            isKinematic: true
        })
        s1.addComponent(s1RB)

        const s1C = new BoxCollider({
            offset: Vector.zero,
            size: new Vector(500, 80)
        }, s1RB);
        s1.addComponent(s1C)
        this.activeScene.objects.push(s1);

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