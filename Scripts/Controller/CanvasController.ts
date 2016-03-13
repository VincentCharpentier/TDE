
class CanvasController
{
    private static canvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;
    public static currentOffset: Coord;

    // TODO: back to private
    public static viewport = {
        width: 0,
        height: 0
    }

    public static Init(): void
    {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        var size = Config.World.CHUNK_SIZE * Config.World.Map.NB_CHUNK_PER_EDGE;
        if (this.canvas.offsetWidth > size) {
            this.canvas.style.width = size + "px";
        }
        if (this.canvas.offsetHeight > size) {
            this.canvas.style.height = size + "px";
        }
        this.canvas.width = this.viewport.width = this.canvas.offsetWidth;
        this.canvas.height = this.viewport.height = this.canvas.offsetHeight;
        this.ctx = this.canvas.getContext("2d");
    }


    private static _lastDraw: number = 0;
    public static fps: number = 0;

    public static Draw(): void
    {
        CanvasController.currentOffset = new Coord(
            WorldController.player.coord.x - this.canvas.width / 2,
            WorldController.player.coord.y - this.canvas.height / 2
        );

        var time = new Date().getTime();
        this.fps = 1000 / (time - this._lastDraw);
        this._lastDraw = new Date().getTime();

        var size = Config.World.CHUNK_SIZE * Config.World.Map.NB_CHUNK_PER_EDGE;
        this.ctx.clearRect(0, 0, size, size);
        this.ctx.fillStyle = ColorProcessor.GetColor(Color.GREEN, ColorConfig.DARK);
        this.ctx.rect(0, 0, size, size);
        this.ctx.fill();

        // DRAW Objects
        var objects = WorldController.GetObjectsInArea(
            WorldController.player.coord,
            Config.World.RENDER_ZONE);
        // console.log(objects.length);
        for (var i = 0; i < objects.length; i++) {
            objects[i].Draw(this.ctx);
        }

        // Draw DEBUG
        if (Config.Debug.Draw.CURRENT_CHUNK) {
            ChunkController.Draw(this.ctx);
        }
        if (Config.Debug.Draw.CHUNKS) {
            ChunkController.DrawCurrentChunk(this.ctx);
        }
    }
}
