import Game from "./src/game.js"

import Texture from "./src/image/texture.js"
import Sprite from "./src/image/sprite.js"
import RigidBody from "./src/physics/rigidbody.js";
import BoxCollider from "./src/physics/box-collider.js";
import CustomComponent from "./src/objects/custom-component.js";
import Renderer from "./src/render/renderer.js";
import Camera from "./src/camera/camera.js";
import Vector from "./src/math/vector.js";
import InputManager from "./src/input/input.js";

const game = new Game({});

new Camera({
    position: new Vector(0, 100),
    zoom: 1
});

const background = new Sprite(
    {position: new Vector(0, 0), rotation: new Vector(0, 0), scale: new Vector(1080, 720)},
    new Texture("https://i.imgur.com/IsSNQSG.png"));
game.activeScene.objects.push(background);


const player = new Sprite(
    {position: new Vector(-25, 200), rotation: new Vector(0, 0), scale: new Vector(30, 40)},
    new Texture("https://i.imgur.com/hDS6kU3.jpeg"));
const rigidBody = new RigidBody({mass: 10, elasticity:0.1, isKinematic: false});
player.addComponent(rigidBody);
const boxCollider = new BoxCollider({offset: Vector.zero, size: new Vector(30, 40)}, rigidBody);
player.addComponent(boxCollider);
player.addComponent(new CustomComponent({
    onUpdate: function(){
        Renderer.instance.mainCamera.getPosition().x = player.getPosition().x;
        if(InputManager.keysPressed[" "] && rigidBody.onGround) {
            rigidBody.addForce(new Vector(0, 300));
        }
        if(InputManager.keysPressed["d"]) {
            if(rigidBody.velocity.x < 180)
                rigidBody.addForce(new Vector(40, 0));
            //player.getPosition().x += 10;
        }
        else if(InputManager.keysPressed["a"]) {
            if(rigidBody.velocity.x > -180)
                rigidBody.addForce(new Vector(-40, 0));
            //player.getPosition().x -= 10;
        }
        else {
            rigidBody.velocity.x *= 0.8;
        }
        if(InputManager.keysPressed["="]) {
            Renderer.instance.mainCamera.properties.zoom += 0.01;
        }
        if(InputManager.keysPressed["-"]) {
            Renderer.instance.mainCamera.properties.zoom -= 0.01;
        }
    }
}));
game.activeScene.objects.push(player);

const floor = new Sprite(
    {position: new Vector(0, 10), rotation: new Vector(0, 0), scale: new Vector(500, 20)},
    new Texture("https://i.imgur.com/PfIilbS.png"));
const floorRigidBody = new RigidBody({mass: 10, elasticity: 0.1, isKinematic: true
})
floor.addComponent(floorRigidBody);
const floorCollider = new BoxCollider({offset: Vector.zero, size: new Vector(500, 20)}, floorRigidBody);
floor.addComponent(floorCollider);
game.activeScene.objects.push(floor);

game.start();