class InputManager {

    static keysPressed = []

    constructor() {
        document.addEventListener('keydown', event => {
            InputManager.keysPressed = true;
        })
        document.addEventListener('keyup', event => {
            InputManager.keysPressed = false;
        })
    }

}

export default InputManager;