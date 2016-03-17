
class WorldController
{
    // Local player
    public static player: Player;

    public static Init()
    {
        ChunkController.Init();
        /*
        TODO : trouver une façon de permettre la création de plusieurs joueurs
        */

        var playerInitialCoord = new Coord(
            Math.round(Math.random() * CanvasController.viewport.width),
            Math.round(Math.random() * CanvasController.viewport.height)
        );
        WorldController.player = new Player(playerInitialCoord, true);


        DebugController.DebugInitScript();
    }

    public static RegisterObject(obj: WorldObject): void
    {
        ChunkController.RegisterObject(obj);
    }

    public static UnregisterObject(obj: WorldObject): void
    {
        ChunkController.RegisterObject(obj);
    }

    public static UpdateObjectChunk(obj: WorldObject): void
    {
        ChunkController.RegisterObject(obj);
    }


    public static Tick(dt: number)
    {
        var objects = WorldController.GetObjectsInArea(
            WorldController.player.coord,
            Config.World.LIVING_ZONE_SIZE);
        for (var i = 0; i < objects.length; i++) {
            objects[i].Tick(dt);
        }
    }

    public static GetObjectsInArea(coord: Coord, dist: number, precise: boolean = true): Array<WorldObject>
    {
        var result = new Array<WorldObject>();

        var chunks = ChunkController.GetChunksInZone(coord, dist);
        // Agents act
        for (var c = 0; c < chunks.length; c++) {
            result = result.concat(chunks[c].GetObjects());
        }
        if (precise) {
            return result.filter(o =>
            {
                return o.coord.toPolar(coord).dist < dist;
            });
        } else {
            return result;
        }
    }
}
