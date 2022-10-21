class Vector {

    static zero = new Vector(0, 0);
    static kEpsilon = 0.00001;

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
        let magnitude = this.magnitude();
        if (magnitude > Vector.kEpsilon)
            this.divideV(magnitude);
        else {
            this.x = 0;
            this.y = 0;
        }
        return this;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    dotProduct(vector) {
        return this.x*vector.x + this.y+vector.y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}

export default Vector;