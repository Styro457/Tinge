class Rectangle {

    static zero = new Rectangle(0, 0, 0, 0);

    constructor(x, y, width, height) {
        /**
         * The height of the rectangle
         * @type {number}
         * @public
         */
        this.x = x;

        /**
         * The y coordinate of the rectangles bottom left corner
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