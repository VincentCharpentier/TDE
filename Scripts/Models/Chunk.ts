class Chunk
{
    private static _nextId: number = 1;
    public id: number;
    public coord: Coord;
    public metaCoord: Coord;
    private objects: Array<WorldObject> = new Array();

    public constructor(_metaCoord: Coord)
    {
        this.id = Chunk._nextId++;
        this.metaCoord = _metaCoord;
        this.coord = new Coord(
            this.metaCoord.x * Config.World.CHUNK_SIZE,
            this.metaCoord.y * Config.World.CHUNK_SIZE
        );
    }

    public RegisterObject(obj: WorldObject)
    {
        // console.log(this.id + " register ", obj);
        obj.chunk_id = this.id;
        this.objects.push(obj);
    }

    public UnregisterObject(obj: WorldObject): boolean
    {
        var index = this.objects.reduce(
            function(prevObj, currentObj, idx)
            {
                var res = prevObj + (currentObj.id === obj.id ? idx : 0);
                return prevObj + (currentObj.id === obj.id ? idx + 1 : 0);
            }, -1);
        if (index !== -1) {
            var tmp = this.objects.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    public Contains(coord: Coord): boolean
    {
        if (this.coord.x <= coord.x
            && this.coord.x + Config.World.CHUNK_SIZE > coord.x
            && this.coord.y <= coord.y
            && this.coord.y + Config.World.CHUNK_SIZE > coord.y) {
            return true;
        }
        return false;
    }

    public GetObjects(): Array<WorldObject>
    {
        return this.objects;
    }

    public GetObstacles(): Array<SolidObject>
    {
        return <Array<SolidObject>>this.objects.filter(obj =>
        {
            return obj instanceof SolidObject && (<SolidObject>obj).IsObstacle()
        });
    }

    public Draw(ctx: CanvasRenderingContext2D): void
    {
        var finalCoord: Coord = new Coord(
            this.coord.x - CanvasController.currentOffset.x,
            this.coord.y - CanvasController.currentOffset.y
        );
        ctx.strokeStyle = Config.Debug.Draw.CHUNKS_COLOR;
        ctx.beginPath();
        ctx.rect(finalCoord.x, finalCoord.y,
            Config.World.CHUNK_SIZE, Config.World.CHUNK_SIZE);
        ctx.stroke();
    }

    public Highlight(ctx: CanvasRenderingContext2D): void
    {
        var finalCoord: Coord = new Coord(
            this.coord.x - CanvasController.currentOffset.x,
            this.coord.y - CanvasController.currentOffset.y
        );
        ctx.fillStyle = Config.Debug.Draw.CURRENT_CHUNK_COLOR;
        ctx.fillRect(finalCoord.x, finalCoord.y,
            Config.World.CHUNK_SIZE, Config.World.CHUNK_SIZE);
    }
}
