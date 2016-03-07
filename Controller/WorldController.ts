
class WorldController
{
    // TODO: needs to be private
    public static objects: Array<WorldObject> = [];
    private static agents: Array<Agent> = [];

    public static RegisterObject(obj: WorldObject): void
    {
        if (Agent.prototype.isPrototypeOf(obj)) {
            this.agents.push(<Agent>obj);
        }
        this.objects.push(obj);
    }


    public static Turn()
    {
        // Agents act
        for (var i = 0; i < WorldController.agents.length; i++) {
            WorldController.agents[i].BeforeAct();
            WorldController.agents[i].Act();
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
