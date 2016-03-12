
class WorldController
{
    // TODO: needs to be private
    public static objects: Array<WorldObject> = [];
    public static player: Player;

    public static Init()
    {
        // TODO : trouver une façon de permettre la création de plusieurs
        // joueurs
        WorldController.player = new Player(true);
    }

    public static RegisterObject(obj: WorldObject): void
    {
        this.objects.push(obj);
    }


    public static Tick(dt: number)
    {
        // Agents act
        for (var i = 0; i < WorldController.objects.length; i++) {
            WorldController.objects[i].Tick(dt);
        }
    }

    public static getObjectsInArea(coord_from: Coord, coord_to: Coord)
    {
        if (coord_from.x > coord_to.x) throw "Reversed coordinates given (1)";
        if (coord_from.y > coord_to.y) throw "Reversed coordinates given (2)";
        // take items in the extended area
        var subset = WorldController.objects.map((object) =>
        {
            if (object.coord.x >= coord_from.x - Config.World.ITEM_MAX_WIDTH
                && object.coord.x <= coord_to.x
                && object.coord.y >= coord_from.y - Config.World.ITEM_MAX_WIDTH
                && object.coord.y <= coord_to.y) {
                return object;
            }
        });
        // TODO : only item in area
        //subset.map((item) => {});
        return
    }
}
