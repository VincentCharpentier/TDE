class NavMesh
{
    private meshes: Array<TriangleMesh>;
}

class TriangleMesh
{
    // Determine le nombre de point par coté
    private static MaxPointDist: number = 10;

    // localisation
    private pt1: Coord;
    private pt2: Coord;
    private pt3: Coord;

    private edgePoints: Array<Coord>;

    private area: number;
    private sign: number;

    constructor(pt1: Coord, pt2: Coord, pt3: Coord)
    {
        this.pt1 = pt1;
        this.pt2 = pt2;
        this.pt3 = pt3;
        var area = 1 / 2 * (-pt2.y * pt3.x + pt1.y * (-pt2.x + pt3.x) + pt1.x * (pt2.y - pt3.y) + pt2.x * pt3.y);
        this.sign = area < 0 ? -1 : 1;
        this.area = Math.abs(area);
        // Edge points
        this.edgePoints = new Array();
        var EvalEdge = (pt: PolarCoord) =>
        {
            if (pt.dist > TriangleMesh.MaxPointDist) {
                if (pt.dist / 2 <= TriangleMesh.MaxPointDist) {
                    pt.dist /= 2;
                    this.edgePoints.push(pt.toCartesian());
                } else {
                    var nbPoints = Math.floor(pt.dist / TriangleMesh.MaxPointDist);
                    var gap = pt.dist / (nbPoints + 1);
                    for (var i = 0; i < nbPoints; i++) {
                        pt.dist -= gap;
                        this.edgePoints.push(pt.toCartesian());
                    }
                }
            }
        }
        EvalEdge(pt1.toPolar(pt2));
        EvalEdge(pt2.toPolar(pt3));
        EvalEdge(pt3.toPolar(pt1));
    }

    public IsInside(point: Coord)
    {
        var s = (this.pt1.y * this.pt3.x - this.pt1.x * this.pt3.y + (this.pt3.y - this.pt1.y) * point.x + (this.pt1.x - this.pt3.x) * point.y) * this.sign;
        var t = (this.pt1.x * this.pt2.y - this.pt1.y * this.pt2.x + (this.pt1.y - this.pt2.y) * point.x + (this.pt2.x - this.pt1.x) * point.y) * this.sign;
        return s > 0 && t > 0 && (s + t) < 2 * this.area;
    }

    public getNavPoints(): Array<Coord>
    {
        return this.edgePoints.concat(this.pt1, this.pt2, this.pt3);
    }
}
