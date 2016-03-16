class Config
{
    public static View = {
        MAX_FPS: 60, // s
        UI_REFRESH_SPEED: 0.5, // s
    }

    public static World = {
        // Item max width
        ITEM_MAX_WIDTH: 50,
        CHUNK_SIZE: 100,
        Map: {
            // NB CHUNKS
            NB_CHUNK_PER_EDGE: 50
        },
        LIVING_ZONE_SIZE: 700,
        RENDER_ZONE: 400
    };

    public static Agent = {
        // time between think process (ms)
        THINK_DELAY: 200
    };

    public static Moves = {
        ACCELERATION: 4, // (px per sec) per sec
        DRAG_FACTOR: 0.7 // [0:1]
    };

    public static Player = {
        SIZE: 10
    };


    public static Debug = {
        Draw: {
            CHUNKS: true,
            CHUNKS_COLOR: "#F00",
            CURRENT_CHUNK: true,
            CURRENT_CHUNK_COLOR: "rgba(0,0,255,0.2)"
        }
    };
}
