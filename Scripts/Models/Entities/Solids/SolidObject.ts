abstract class SolidObject extends WorldObject
{
    public bbox: BBox;

    constructor(coord: Coord)
    {
        super(coord);
        this.SetupBbox();
    }

    abstract SetupBbox(): void;

    CollideWithObject(object: SolidObject): boolean
    {
        return CollisionHelper.isCollision(this, object);
    }
}
