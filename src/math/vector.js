class Vector {

    static zero = new Vector(0, 0);

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addV(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    add(value) {
        this.x += value;
        this.y += value;
        return this;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    multiply(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }

    multiplyV(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

}

export default Vector;