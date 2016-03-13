
class Coord
{
    public x: number;
    public y: number;

    constructor(x_: number, y_: number)
    {
        this.x = x_;
        this.y = y_;
    }

    public toPolar(origin: Coord): PolarCoord
    {
        return new PolarCoord(origin, this);
    }

    public toString()
    {
        return "(" + this.x + "," + this.y + ")";
    }
}


class PolarCoord
{
    private static PRECISION: number = 5;
    public dist: number;
    public angle: number;
    public origin: Coord;

    constructor(origin: Coord, location: Coord)
    {
        this.origin = origin;
        var relativeCoord = new Coord(location.x - origin.x, location.y - origin.y);
        var fix = 0;
        if (relativeCoord.x < 0) {
            fix = Math.PI;
        } else if (relativeCoord.y < 0) {
            fix = 2 * Math.PI;
        }
        this.dist = Math.sqrt(relativeCoord.x * relativeCoord.x
            + relativeCoord.y * relativeCoord.y);
        this.angle = fix + Math.atan((relativeCoord.y / relativeCoord.x));
    }

    public toCartesian(): Coord
    {
        var result = new Coord(
            this.origin.x + this.dist * Math.cos(this.angle),
            this.origin.y + this.dist * Math.sin(this.angle)
        );
        result.x = PolarCoord.toPrecision(result.x);
        result.y = PolarCoord.toPrecision(result.y);
        return result;
    }

    private static toPrecision(num: number)
    {
        var exp = Math.pow(10, PolarCoord.PRECISION);
        return Math.round(num * exp) / exp;
    }
}

// TESTS cartesians => polar => cartesians
/*
window.addEventListener("load", function()
{
    var origin = new Coord(100, 200);
    var test = (a: Coord) =>
    {
        var zone = -1;
        if (a.x >= origin.x) {
            if (a.y >= origin.y) {
                zone = 1;
            } else {
                zone = 4;
            }
        } else {
            if (a.y >= origin.y) {
                zone = 2;
            } else {
                zone = 3;
            }
        }
        var b = a.toPolar(origin).toCartesian();
        var success = a.x === b.x && a.y === b.y;
        if (success) {
            console.info(a.x + "," + a.y + " (" + zone + ") : OK");
        } else {
            console.error(a.x + "," + a.y + " (" + zone + "): NOK");
            console.debug("GOT : " + b.x + "," + b.y);
        }
        console.debug();
    }
    test(new Coord(250, 378));
    test(new Coord(10, 78));
    test(new Coord(-250, 378));
    test(new Coord(10, 378));
    test(new Coord(250, -378));
    test(new Coord(250, 78));
    test(new Coord(-250, -378));
    test(new Coord(10, 78));
});
*/
