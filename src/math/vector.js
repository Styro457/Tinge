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

    subtractV(vector) {
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

    divide(value) {
        this.x /= value;
        this.y /= value;
        return this;
    }

    divideV(vector) {
        if(vector.x !== 0)
            this.x /= vector.x;
        if(vector.y !== 0)
            this.y /= vector.y;
        return this;
    }

    normalize() {
        if(this.x !== 0)
            this.x /= Math.abs(this.x);
        if(this.y !== 0)
            this.y /= Math.abs(this.y);
        return this;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    dotProduct(vector) {
        return this.x*vector.x + this.y+vector.y;
    }
}

export default Vector;