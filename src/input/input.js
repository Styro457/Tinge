class InputManager {

    static keysPressed = []

    constructor() {
        document.addEventListener('keydown', event => {
            InputManager.keysPressed[event.key] = true;
        })
        document.addEventListener('keyup', event => {
            InputManager.keysPressed[event.key] = false;
        })
    }

}

export default InputManager;