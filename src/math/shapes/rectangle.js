class Rectangle {

    static zero = new Rectangle(0, 0, 0, 0);

    constructor(x, y, width, height) {
        /**
         * The x coordinate of the rectangle's center
         * @type {number}
         * @public
         */
        this.x = x;

        /**
         * The y coordinate of the rectangle's center
         * @type {number}
         * @public
         */
        this.y = y;

        /**
         * The width of the rectangle
         * @type {number}
         * @public
         */
        this.width = width;

        /**
         * The height of the rectangle
         * @type {number}
         * @public
         */
        this.height = height;
    }

}

export default Rectangle;