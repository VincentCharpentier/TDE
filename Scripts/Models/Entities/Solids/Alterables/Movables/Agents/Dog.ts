class Dog extends AgentObject
{
    private static MAX_HEALTH: number = 50;
    private static SIZE: number = 5;
    private static SIGHT: number = 250;
    private static STANDING_DISTANCE: number = 50;
    private static SPEED: number = 1.5;

    private master: Player = null;

    public constructor(coord: Coord)
    {
        super(coord, Dog.MAX_HEALTH, Dog.SPEED);
    }

    public OnDie() { };

    public SetupBbox() { };

    public SetupShape()
    {
        this.shape.AddShape(
            new Circle(
                Dog.SIZE,
                new ShapeMaterial(
                    Color.RED,
                    ColorConfig.REGULAR
                )));
    };

    public Think(): void
    {
        if (this.master === null) {
            // try to find a master to follow
            var objs = WorldController.GetObjectsInArea(this.coord, Dog.SIGHT);
            for (var i = 0; i < objs.length; i++) {
                if (objs[i] instanceof Player) {
                    this.master = <Player>objs[i];
                    break;
                }
            }
        }
        if (this.master !== null) {
            var dest = this.coord.toPolar(this.master.coord);
            dest.dist = Dog.STANDING_DISTANCE;
            this.SetDestination(dest.toCartesian());
        }
    }

    public Act(): void
    {
        if (this.HasDestination !== null) {

        }
    }
}
