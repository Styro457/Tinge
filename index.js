import Game from "./src/game.js"

import Texture from "./src/image/texture.js"
import Sprite from "./src/image/sprite.js"
import RigidBody from "./src/physics/rigidbody.js";
import BoxCollider from "./src/physics/box-collider.js";
import CustomComponent from "./src/objects/custom-component.js";
import Renderer from "./src/render/renderer.js";
import Camera from "./src/camera/camera.js";
import Vector from "./src/math/vector.js";

const game = new Game({});

new Camera({
    position: new Vector(0, -270),
    zoom: 0.5
});

const background = new Sprite(
    {position: new Vector(0, 0), rotation: new Vector(0, 0), scale: new Vector(4000, 2000)},
    new Texture("https://i.imgur.com/IsSNQSG.png"));
game.activeScene.objects.push(background);


const player = new Sprite(
    {position: new Vector(-500, -400), rotation: new Vector(0, 0), scale: new Vector(160, 200)},
    new Texture("https://i.imgur.com/hDS6kU3.jpeg"));
const rigidBody = new RigidBody({mass: 1, elasticity:0.1, isKinematic: false});
player.addComponent(rigidBody);
const boxCollider = new BoxCollider({offset: Vector.zero, size: new Vector(160, 200)}, rigidBody);
player.addComponent(boxCollider);
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
        if(keys["="]) {
            Renderer.instance.mainCamera.properties.zoom += 0.01;
        }
        if(keys["-"]) {
            Renderer.instance.mainCamera.properties.zoom -= 0.01;
        }
    }
}));
game.activeScene.objects.push(player);

const floor = new Sprite(
    {position: new Vector(0, -10), rotation: new Vector(0, 0), scale: new Vector(2000, 80)},
    new Texture("https://i.imgur.com/PfIilbS.png"));
const floorRigidBody = new RigidBody({mass: 1, elasticity: 0.1, isKinematic: true
})
floor.addComponent(floorRigidBody);
const floorCollider = new BoxCollider({offset: Vector.zero, size: new Vector(2000, 80)}, floorRigidBody);
floor.addComponent(floorCollider);
game.activeScene.objects.push(floor);

const platform = new Sprite(
    {position: new Vector(20, -100), rotation: new Vector(0, 0), scale: new Vector(500, 80)},
    new Texture("https://i.imgur.com/PfIilbS.png"));

const platformRigidBody = new RigidBody({mass: 1, elasticity: 0.1, isKinematic: true})
platform.addComponent(platformRigidBody)
const platformCollider = new BoxCollider({offset: Vector.zero, size: new Vector(500, 80)}, platformRigidBody);
platform.addComponent(platformCollider)
game.activeScene.objects.push(platform);


let keys = {};

document.onkeydown = function (e) {
    keys[e.key] = true;
};

document.onkeyup = function (e) {
    keys[e.key] = false;
};

game.start();