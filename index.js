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
    {position: new Vector(-25, 200), rotation: 0, scale: new Vector(40, 40)},
    new Texture("https://i.imgur.com/hDS6kU3.jpeg"));
const rigidBody = new RigidBody({mass: 10, elasticity:0.1, isKinematic: false, useGravity: false});
player.addComponent(rigidBody);
const boxCollider = new BoxCollider({offset: Vector.zero, size: new Vector(40, 40)}, rigidBody);
player.addComponent(boxCollider);
player.addComponent(new CustomComponent({
    onUpdate: function(){
        //Renderer.instance.mainCamera.getPosition().x = player.getPosition().x;
        if(InputManager.keysPressed[" "]) {
            //rigidBody.addForce(new Vector(0, 300));
            player.properties.rotation += 0.1;
        }
        if(InputManager.keysPressed["d"]) {
            rigidBody.addForce(new Vector(10, 0));
            //player.properties.position.x += 5;
        }
        else if(InputManager.keysPressed["a"]) {
            rigidBody.addForce(new Vector(-10, 0));
            //player.properties.position.x -= 5;
        }
        if(InputManager.keysPressed["w"]) {
            rigidBody.addForce(new Vector(0, 10));
            //player.properties.position.x += 5;
        }
        else if(InputManager.keysPressed["s"]) {
            rigidBody.addForce(new Vector(0, -10));
            //player.properties.position.x -= 5;
        }
        else if(InputManager.keysPressed["l"]) {
            rigidBody.addAngularVelocity(1);
        }
        else if(InputManager.keysPressed["k"]) {
            rigidBody.addAngularVelocity(-1);
        }
        else {
            //rigidBody.velocity.x *= 0.8;
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

const player2 = new Sprite(
    {position: new Vector(-80, 200), rotation: 0, scale: new Vector(30, 40)},
    new Texture("https://i.imgur.com/hDS6kU3.jpeg"));
const rigidBody2 = new RigidBody({mass: 5, elasticity:0.1, isKinematic: false, useGravity: false});
player2.addComponent(rigidBody2);
const boxCollider2 = new BoxCollider({offset: Vector.zero, size: new Vector(30, 40)}, rigidBody2);
player2.addComponent(boxCollider2);
game.activeScene.objects.push(player2);

game.start();