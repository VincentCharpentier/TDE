class Config
{
    public static View = {
        MAX_FPS: 60, // s
        UI_REFRESH_SPEED: 0.5, // s
    }

    public static World = {
        // Item max width
        ITEM_MAX_WIDTH: 50,
        Map: {
            SIZE: 1000
        }
    };

    public static Agent = {
        // time between think process (ms)
        THINK_DELAY: 200
    };

    public static Player = {
        SIZE: 10,
        MAX_SPEED: 2, // px per sec
        ACCELERATION: 0.4, // (px per sec) per sec
        DRAG_FACTOR: 0.3 // [0:1]
    };
}
