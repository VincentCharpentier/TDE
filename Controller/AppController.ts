console.info("%cCHEATING MAY BREAK YOU GAME", "font: 2em sans-serif; color: red");
console.log("%cAlways avoid to copy / paste code from unknown source", "font-size:1.4em;");


window.addEventListener("load", function()
{
    AppController.Init();
});

class AppController
{
    public static Init()
    {
        CanvasController.Init();
        UIController.Init();
        InputController.Init();
        WorldController.Init();
        this._targetDelta = 1000 / Config.View.MAX_FPS;
        this.Tick();

        for (var i = 0; i < 3; i++) {
            var t = new Turret();
            t.coord = new Coord(
                Math.round(Math.random() * CanvasController.viewport.width),
                Math.round(Math.random() * CanvasController.viewport.height)
            );
            WorldController.RegisterObject(t);
        }
    }

    /**
     *
     * @param dt time elasped since last tick (ms)
     */
    public static Tick()
    {
        // On evite de dépasser le nombre max de FPS
        var dt = new Date().getTime() - this._lastTick;

        var delay = 0;
        if (dt < this._targetDelta) {
            delay = this._targetDelta - dt;
        }

        setTimeout(() =>
        {
            this._lastTick = new Date().getTime();
            this.TickAll(dt + delay);
            this.Tick();
        }, delay);
    }
    private static _lastTick: number = 0;
    private static _targetDelta: number;

    private static TickAll(dt: number)
    {
        WorldController.Tick(dt);
        CanvasController.Draw();
    }

}
