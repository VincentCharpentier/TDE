
class WorldController
{
    // Local player
    public static player: Player;

    public static Init()
    {
        ChunkController.Init();
        // TODO : trouver une façon de permettre la création de
        // plusieurs joueurs
        WorldController.player = new Player(new Coord(
            Math.round(Math.random() * CanvasController.viewport.width),
            Math.round(Math.random() * CanvasController.viewport.height)
        ), true);

        /* TODO : remove */
        for (var i = 0; i < 20; i++) {
            var t = new Turret(new Coord(
                Math.round(Math.random() * CanvasController.viewport.width),
                Math.round(Math.random() * CanvasController.viewport.height)
            ));
        }

        /* TODO : REMOVE */
        setInterval(() =>
        {
            console.log(
                WorldController.player.coord.toString(),
                WorldController.player.speed.toString()
            );
        }, 3000);
    }

    public static RegisterObject(obj: WorldObject): void
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

    public static GetObjectsInArea(coord: Coord, dist: number): Array<WorldObject>
    {
        var result = new Array<WorldObject>();

        var chunks = ChunkController.GetChunksInZone(coord, dist);
        // Agents act
        for (var c = 0; c < chunks.length; c++) {
            result = result.concat(chunks[c].GetObjects());
        }
        return result;
    }
}
