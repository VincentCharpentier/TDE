class DebugController
{
    static _startup = performance.now();

    static DebugInitScript()
    {
        /* TODO : remove */
        for (var i = 0; i < 20; i++) {
            var t = new Turret(new Coord(
                Math.round(Math.random() * CanvasController.viewport.width),
                Math.round(Math.random() * CanvasController.viewport.height)
            ), 1, 0);
        }

        new Dog(new Coord(
            WorldController.player.coord.x + 250,
            WorldController.player.coord.y + 250
        ));

        var tri = new TriangleMesh(
            new Coord(0, 0),
            new Coord(22, 0),
            new Coord(0, 22)
        );
        console.log(tri);
    }

    static timelogs = {};
    private static LogTime(_for: string, _value: number)
    {
        if (!DebugController.timelogs[_for]) {
            DebugController.timelogs[_for] = 0;
        }
        DebugController.timelogs[_for] += _value;
    }

    static timers = {};
    static StartTimer(_for: string)
    {
        DebugController.timers[_for] = performance.now();
    }

    static StopTimer(_for: string)
    {
        if (DebugController.timers[_for]) {
            DebugController.LogTime(_for, performance.now() - DebugController.timers[_for]);
        }
        delete DebugController.timers[_for];
    }

    static EchoConsole()
    {
        var elasped = performance.now() - DebugController._startup;
        console.log("TIMES :            <<Running for " + elasped.toFixed(2) + "ms>>");
        for (var i in DebugController.timelogs) {
            console.log(" - " + i + " : " + DebugController.timelogs[i].toFixed(2)
                + "ms (" + (100 * DebugController.timelogs[i] / elasped).toFixed(0) + "%)");
        }
    }
}
