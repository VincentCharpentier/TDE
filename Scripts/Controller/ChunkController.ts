class ChunkController
{
    private static chunks: Array<Chunk>;

    public static Init()
    {
        ChunkController.chunks = new Array();
        for (var x = 0; x < Config.World.Map.NB_CHUNK_PER_EDGE; x++) {
            for (var y = 0; y < Config.World.Map.NB_CHUNK_PER_EDGE; y++) {
                ChunkController.chunks.push(new Chunk(
                    new Coord(x, y)
                ));
            }
        }
    }

    private static GetChunkFromId(id_chunk: number): Chunk
    {
        for (var i = 0; i < ChunkController.chunks.length; i++) {
            if (ChunkController.chunks[i].id === id_chunk) {
                return ChunkController.chunks[i];
            }
        }
        return null;
    }

    public static RegisterObject(obj: WorldObject): void
    {
        var new_chunk = ChunkController.GetChunkForCoord(obj.coord);
        if (obj.chunk_id !== new_chunk.id) {
            if (obj.chunk_id !== null) {
                ChunkController.UnregisterObject(obj);
            }
            new_chunk.RegisterObject(obj);
        }
    }

    public static UnregisterObject(obj: WorldObject): void
    {
        if (obj.chunk_id !== null) {
            ChunkController.GetChunkFromId(obj.chunk_id)
                .UnregisterObject(obj);
        }
    }

    public static GetMetaCoordFromCoord(coord: Coord): Coord
    {
        return new Coord(
            Math.floor(coord.x / Config.World.CHUNK_SIZE),
            Math.floor(coord.y / Config.World.CHUNK_SIZE)
        );
    }

    public static GetChunkForCoord(coord: Coord): Chunk
    {
        var metaCoord = ChunkController.GetMetaCoordFromCoord(coord);
        for (var i = 0; i < ChunkController.chunks.length; i++) {
            if (ChunkController.chunks[i].metaCoord.x === metaCoord.x
                && ChunkController.chunks[i].metaCoord.y === metaCoord.y) {
                return ChunkController.chunks[i];
            }
        }
        return null;
    }

    public static GetChunksInZone(coord: Coord, radius: number): Array<Chunk>
    {
        return ChunkController.GetChunksInMetaZone(
            ChunkController.GetMetaCoordFromCoord(coord),
            Math.ceil(radius / Config.World.CHUNK_SIZE)
        );
    }

    private static GetChunksInMetaZone(metaCoord: Coord, metaDist: number): Array<Chunk>
    {
        return ChunkController.chunks.filter((c) =>
        {
            var dist =
                Math.abs(c.metaCoord.x - metaCoord.x)
                + Math.abs(c.metaCoord.y - metaCoord.y);
            return dist <= metaDist;
        });
    }


    public static Draw(ctx: CanvasRenderingContext2D): void
    {
        var chunks = ChunkController.GetChunksInZone(
            WorldController.player.coord,
            Config.World.RENDER_ZONE);
        // console.log(objects.length);
        for (var i = 0; i < chunks.length; i++) {
            chunks[i].Draw(ctx);
        }
    }

    public static DrawCurrentChunk(ctx: CanvasRenderingContext2D): void
    {
        ChunkController.GetChunkFromId(WorldController.player.chunk_id).Highlight(ctx);
    }
}
