import CanvasRenderer from "./render/canvas/canvas_renderer.js"
import Vector from "./math/vector.js"
import Scene from "./scene/scene.js"
import PhysicsEngine from "./physics/physics.js";
import Time from "./system/time.js";

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

        this.physicsEngine = new PhysicsEngine({
            gravity: new Vector(0, 50),
        })

        this.activeScene = new Scene();
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