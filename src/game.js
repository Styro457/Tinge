import CanvasRender from "./render/canvas/canvas_renderer.js"
import Vector from "./math/vector.js"
import Texture from "./image/texture.js"
import Sprite from "./image/sprite.js"
import Scene from "./scene/scene.js"
import CustomComponent from "./objects/custom-component.js"

class Game {

    static instance;

    constructor(options) {
        Game.instance = this;

        this.options = options;
        this.options.renderEngine = new CanvasRender({
            canvas: document.getElementById("tingeCanvas")
        });

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

        image.addComponent(new CustomComponent({
            onUpdate: function(component) {
                component.getParent().properties.position.x += 1;
            }
        }))
        this.activeScene.objects.push(image);

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        this.activeScene.update();
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

}

export default Game;