console.warn("%cCHEATING MAY BREAK YOU GAME", "font: 2em sans-serif; color: red");
console.info("%cAlways avoid to copy / paste code from unknown or non trusted sources", "font-size:1.4em;");


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
        setInterval(() => { AppController.Tick(); }, this._targetDelta);
        setInterval(() => { DebugController.EchoConsole(); }, 5000);
    }

    private static _tickdone = true;
    /**
     *
     * @param dt time elasped since last tick (ms)
     */
    public static Tick()
    {
        if (this._tickdone) {
            DebugController.StartTimer("MainTick");
            this._tickdone = false;
            // On evite de dépasser le nombre max de FPS
            var dt = performance.now() - this._lastTick;

            var delay = 0;
            if (dt < this._targetDelta) {
                delay = this._targetDelta - dt;
            }

            setTimeout(() =>
            {
                this._lastTick = performance.now();
                this.TickAll(dt + delay);
                this._tickdone = true;
                // this.Tick();
            }, delay);
            DebugController.StopTimer("MainTick");
        }
    }
    private static _lastTick: number = 0;
    private static _targetDelta: number;

    private static TickAll(dt: number)
    {
        DebugController.StartTimer("Tick");

        WorldController.Tick(dt);

        DebugController.StopTimer("Tick");
        DebugController.StartTimer("Draw");

        CanvasController.Draw();

        DebugController.StopTimer("Draw");
    }

}
