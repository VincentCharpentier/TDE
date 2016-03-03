
class CanvasController {
    private static canvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;

    // TODO: back to private
    public static viewport = {
        width: 0,
        height: 0
    }

    public static Init(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        if (this.canvas.offsetWidth > Config.World.Map.SIZE) {
            this.canvas.style.width = Config.World.Map.SIZE + "px";
        }
        if (this.canvas.offsetHeight > Config.World.Map.SIZE) {
            this.canvas.style.height = Config.World.Map.SIZE + "px";
        }
        this.canvas.width  = this.viewport.width  = this.canvas.offsetWidth;
        this.canvas.height = this.viewport.height = this.canvas.offsetHeight;
        this.ctx = this.canvas.getContext("2d");
    }


    private static _lastDraw: number = 0;
    public static fps: number = 0;
    public static Draw(): void {
        var time = new Date().getTime();
        this.fps = 1000 / (time - this._lastDraw);
        this._lastDraw = new Date().getTime();

        this.ctx.clearRect(0, 0, Config.World.Map.SIZE, Config.World.Map.SIZE);
        this.ctx.fillStyle = ColorProcessor.GetColor(Color.GREEN, ColorConfig.DARK);
        this.ctx.rect(0, 0, Config.World.Map.SIZE, Config.World.Map.SIZE);
        this.ctx.fill();
        for (var i = 0; i < WorldController.objects.length; i++) {
            WorldController.objects[i].Draw(this.ctx);
        }
    }
}
