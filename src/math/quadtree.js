/**
 * Quadtree used for optimizing collisions
 * @class Quadtree
 * @constructor
 * @param {number} level The current node level
 * @param {Rectangle} bounds The bounds of the node
 */
class Quadtree {

    /**
     * The maximum number of colliders a quadtree holds before it splits
     * @name maxObjects
     * @type {number}
     */
    static MAX_OBJECTS = 10;

    /**
     * The deepest node level
     * @description (maximum number of subdivisions)
     * @name maxLevels
     * @type {number}
     */
    static MAX_LEVELS = 5;

    /**
     * The current node level
     * @name objects
     * @type {Collider[]}
     */
    objects;

    /**
     * The bounds of the node
     * @name bounds
     * @type {Rectangle}
     */
    bounds;

    /**
     * The four subnodes
     * @name nodes
     * @type {Quadtree[]}
     */
    nodes;

    constructor(level, bounds) {
        this.level = level;
        this.objects = [];
        this.bounds = bounds;
        this.nodes = new Array(4);
    }

    /**
     * Clears the quadtree
     * @name clear
     * @function
     */
    clear() {
        this.objects.length = 0;

        for(let i = 0; i < 4; i++) {
            if(this.nodes[i] != null) {
                this.nodes[i].clear();
                this.nodes[i] = null;
            }
        }
    }

    /**
     * Splits the quadtree into 4 subnodes
     * @name split
     * @function
     */
    split() {
        const subWidth = this.bounds.width / 2;
        const subHeight = this.bounds.height / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;

        this.nodes[0] = new Quadtree(this.level+1, new Rectangle(x + subWidth, y, subWidth, subHeight));
        this.nodes[1] = new Quadtree(this.level+1, new Rectangle(x, y, subWidth, subHeight));
        this.nodes[2] = new Quadtree(this.level+1, new Rectangle(x, y + subHeight, subWidth, subHeight));
        this.nodes[3] = new Quadtree(this.level+1, new Rectangle(x + subWidth, y + subHeight, subWidth, subHeight));
    }

    /**
     * Determine which node the collider belongs to. -1 means
     * object cannot completely fit within a child node and is
     * part of the parent node
     * @name getIndex
     * @function
     * @param {Rectangle} boundingBox The bounding box of the collider
     * @returns {number}
     */
    getIndex(boundingBox) {
        let index = -1;

        const verticalMidpoint = this.bounds.x + (this.bounds.width / 2);
        const horizontalMidpoint = this.bounds.y + (this.bounds.height / 2);

        // Object can completely fit within the top quadrants
        const topQuadrant = boundingBox.y < horizontalMidpoint && boundingBox.y + boundingBox.height < horizontalMidpoint;
        // Object can completely fit within the bottom quadrants
        const bottomQuadrant = boundingBox.y > horizontalMidpoint;

        // Object can completely fit within the left quadrants
        if (boundingBox.x < verticalMidpoint && boundingBox.x + boundingBox.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
        }
        // Object can completely fit within the right quadrants
        else if (boundingBox.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }

        return index;
    }

    /**
     * Insert the collider into the quadtree. If the node
     * exceeds the capacity, it will split and add all
     * objects to their corresponding nodes
     * @name insert
     * @function
     * @param {Collider} collider The collider that is being inserted
     */
    insert(collider) {
        if(this.nodes[0] != null) {
            const index = this.getIndex(collider.getBoundingBox());

            if(index !== -1) {
                this.nodes[index].insert(collider);
                return;
            }
        }

        this.objects.push(collider);

        if(this.objects.length > Quadtree.MAX_OBJECTS && this.level < Quadtree.MAX_LEVELS) {
            if(this.nodes[0] == null) {
                this.split();
            }

            let i = 0;
            while(i < this.objects.length) {
                const index = this.getIndex(this.objects[i].getBoundingBox());
                if(index !== -1) {
                    this.nodes[index].insert(this.objects[i]);
                    this.objects.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
    }

    /**
     * Returns all colliders that could collide with the given bounding box
     * @name retrieve
     * @function
     * @param {Collider[]} returnColliders Array to add the colliders to
     * @param {Rectangle} boundingBox The bounding box that is being checked
     */
    retrieve(returnColliders, boundingBox) {
        const index = this.getIndex(boundingBox);
        if(index !== -1 && this.nodes[0] != null) {
            this.nodes[index].retrieve(returnColliders, boundingBox);
        }

        returnColliders.push.apply(returnColliders, this.objects);

        return returnColliders;
    }

}