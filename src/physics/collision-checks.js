import Vector from "../math/vector.js";

class Collisions {

    static polyPoly(p1, p2) {
        // go through each of the vertices, plus the next
        // vertex in the list
        let next = 0;

        for (let current = 0; current < p1.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current+1;
            if (next === p1.length) next = 0;

            // get the PVectors at our current position
            // this makes our if statement a little cleaner
            let vc = p1[current];    // c for "current"
            let vn = p1[next];       // n for "next"

            // now we can use these two points (a line) to compare
            // to the other polygon's vertices using polyLine()
            let collision = Collisions.polyLine(p2, vc.x,vc.y,vn.x,vn.y);
            if (collision !== false) return collision;

/*            // optional: check if the 2nd polygon is INSIDE the first
            collision = Collisions.polyPoint(p2, p1[current].x, p1[current].y);
            if (collision) return p1[current];*/
        }
        return false;
    }

    static polyLine(vertices, x1, y1, x2, y2) {

            // go through each of the vertices, plus the next
            // vertex in the list
            let next = 0;
            for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current+1;
            if (next === vertices.length) next = 0;

            // get the PVectors at our current position
            // extract X/Y coordinates from each
            const x3 = vertices[current].x;
            const y3 = vertices[current].y;
            const x4 = vertices[next].x;
            const y4 = vertices[next].y;

            // do a Line/Line comparison
            // if true, return 'true' immediately and
            // stop testing (faster)
            let hit = Collisions.lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
            if (hit) {
                return new Vector((x1+x2+x3+x4)/4, (y1+y2+y3+y4)/4);
            }
            }
            // never got a hit
            return false;
    }


    static lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        // calculate the direction of the lines
        let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
        let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return true;
        }
        return false;
    }

    // POLYGON/POINT
    // used only to check if the second polygon is
    // INSIDE the first
    static polyPoint(vertices, px, py) {
        let collision = false;

        // go through each of the vertices, plus the next
        // vertex in the list
        let next = 0;
        for (let current=0; current < vertices.length; current++) {

        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current+1;
        if (next === vertices.length) next = 0;

        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        let vc = vertices[current];    // c for "current"
        let vn = vertices[next];       // n for "next"

        // compare position, flip 'collision' variable
        // back and forth
        if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
    (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
        collision = !collision;
    }
    }
    return collision;
    }
}

export default Collisions;