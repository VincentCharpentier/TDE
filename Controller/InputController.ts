window.addEventListener("keydown", function(ev: KeyboardEvent)
{
    // transfert l'event à InputController
    InputController.OnKeyDown(ev);
    var letItGo = InputController.TryPreventDefault(ev);
    if (!letItGo) {
        ev.preventDefault();
    }
    return letItGo;
});
window.addEventListener("keyup", function(ev: KeyboardEvent)
{
    // transfert l'event à InputController
    InputController.OnKeyUp(ev);
    var letItGo = InputController.TryPreventDefault(ev);
    if (!letItGo) {
        ev.preventDefault();
    }
    return letItGo;
});




// KEYCODES (DESCRIPTIVE ENUM)
enum KEY
{
    BACKSPACE = 8,
    TAB = 9,
    ENTER = 13,
    SHIFT = 16,
    CTRL = 17,
    ALT = 18,
    PAUSE_BREAK = 19,
    CAPS_LOCK = 20,
    ESCAPE = 27,
    SPACE = 32,
    PAGE_UP = 33,
    PAGE_DOWN = 34,
    END = 35,
    HOME = 36,
    LEFT_ARROW = 37,
    UP_ARROW = 38,
    RIGHT_ARROW = 39,
    DOWN_ARROW = 40,
    INSERT = 45,
    DELETE = 46,
    NUM_0 = 48,
    NUM_1 = 49,
    NUM_2 = 50,
    NUM_3 = 51,
    NUM_4 = 52,
    NUM_5 = 53,
    NUM_6 = 54,
    NUM_7 = 55,
    NUM_8 = 56,
    NUM_9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    LEFT_WINDOW_KEY = 91,
    RIGHT_WINDOW_KEY = 92,
    SELECT_KEY = 93,
    NUMPAD_0 = 96,
    NUMPAD_1 = 97,
    NUMPAD_2 = 98,
    NUMPAD_3 = 99,
    NUMPAD_4 = 100,
    NUMPAD_5 = 101,
    NUMPAD_6 = 102,
    NUMPAD_7 = 103,
    NUMPAD_8 = 104,
    NUMPAD_9 = 105,
    MULTIPLY = 106,
    ADD = 107,
    SUBTRACT = 109,
    DECIMAL_POINT = 110,
    DIVIDE = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NUM_LOCK = 144,
    SCROLL_LOCK = 145,
    SEMI_COLON = 186,
    EQUAL_SIGN = 187,
    COMMA = 188,
    DASH = 189,
    PERIOD = 190,
    FORWARD_SLASH = 191,
    GRAVE_ACCENT = 192,
    OPEN_BRACKET = 219,
    BACK_SLASH = 220,
    CLOSE_BRAKET = 221,
    SINGLE_QUOTE = 222
};


enum ACTION
{
    PLAYER_MOVE_UP,
    PLAYER_MOVE_DOWN,
    PLAYER_MOVE_LEFT,
    PLAYER_MOVE_RIGHT,
    PLAYER_STOP_UP,
    PLAYER_STOP_DOWN,
    PLAYER_STOP_LEFT,
    PLAYER_STOP_RIGHT,
    // PLAYER IS ABOUT TO ATTACK (ex: bow aiming)
    PLAYER_PRE_ATTACK,
    // PLAYER SHOOT
    PLAYER_ATTACK,
    // USED TO OPEN/CLOSE INVENTORY
    PLAYER_TOGGLE_INVENTORY,
    // PLAYER_PREBUILD,
    // PLAYER_BUILD
}

enum INPUT_MODE
{
    KEY_DOWN,
    KEY_UP
};


class InputController
{
    // KEY => ACTIONS
    private static key_map: { [key: number]: Array<ACTION> } = {};
    // ACTION => INPUT_TYPE
    private static action_input_mode: { [action: number]: INPUT_MODE } = {};
    // ACTION => Function
    private static action_handler: { [action: number]: Function } = {};
    // Controle pour eviter la répetition des events keydown
    private static current_keys_down: { [key: number]: any } = {};
    // will store WorldObject listening to inputs
    private static listeners: { [id: number]: WorldObject } = {};
    // Keys that have a special function in browser that need to be catch
    private static prevent_defaults: Array<KEY> = new Array(
        KEY.TAB
    );

    private constructor() { }

    public static Init(locale: string = "FR")
    {
        // KEY INITIAL MAPPING
        // INIT ALL ARRAYS
        for (var i in KEY) {
            var key: KEY = KEY[<string>i];
            InputController.key_map[key] = new Array();
        }

        // COMMON CONTROLS
        InputController.RegisterInputEvent(ACTION.PLAYER_TOGGLE_INVENTORY, KEY.TAB);
        InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_UP, KEY.UP_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_DOWN, KEY.DOWN_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_LEFT, KEY.LEFT_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_RIGHT, KEY.RIGHT_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_STOP_UP, KEY.UP_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_STOP_DOWN, KEY.DOWN_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_STOP_LEFT, KEY.LEFT_ARROW);
        InputController.RegisterInputEvent(ACTION.PLAYER_STOP_RIGHT, KEY.RIGHT_ARROW);
        // REGION SPECIFIC CONTROLS
        switch (locale) {
            case "FR":
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_UP, KEY.Z);
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_DOWN, KEY.S);
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_LEFT, KEY.Q);
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_RIGHT, KEY.D);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_UP, KEY.Z);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_DOWN, KEY.S);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_LEFT, KEY.Q);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_RIGHT, KEY.D);
                break;
            case "EN":
            default:
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_UP, KEY.W);
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_DOWN, KEY.S);
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_LEFT, KEY.A);
                InputController.RegisterInputEvent(ACTION.PLAYER_MOVE_RIGHT, KEY.D);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_UP, KEY.W);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_DOWN, KEY.S);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_LEFT, KEY.A);
                InputController.RegisterInputEvent(ACTION.PLAYER_STOP_RIGHT, KEY.D);
                break;
        }

        // SET ACTION MODE
        var input_mode_down = [
            // others will be onkeyup
            ACTION.PLAYER_MOVE_UP,
            ACTION.PLAYER_MOVE_DOWN,
            ACTION.PLAYER_MOVE_LEFT,
            ACTION.PLAYER_MOVE_RIGHT
        ];
        for (var i in ACTION) {
            var action: ACTION = ACTION[<string>i];
            if (!isNaN(parseInt(action.toString()))) {
                if (input_mode_down.indexOf(action) > -1) {
                    InputController.action_input_mode[action] = INPUT_MODE.KEY_DOWN;
                } else {
                    InputController.action_input_mode[action] = INPUT_MODE.KEY_UP;
                }
            }
        }


        // DEFINE HANDLERS
        var dispatch = (type: string) =>
        {
            return () =>
            {
                InputController
                    .DispatchEvent(type);
            }
        };

        // TODO : Tableau d'association
        InputController.action_handler[ACTION.PLAYER_MOVE_UP] =
            dispatch("input.player.move.up");
        InputController.action_handler[ACTION.PLAYER_MOVE_DOWN] =
            dispatch("input.player.move.down");
        InputController.action_handler[ACTION.PLAYER_MOVE_LEFT] =
            dispatch("input.player.move.left");
        InputController.action_handler[ACTION.PLAYER_MOVE_RIGHT] =
            dispatch("input.player.move.right");
        // stops player
        InputController.action_handler[ACTION.PLAYER_STOP_UP] =
            dispatch("input.player.stop.up");
        InputController.action_handler[ACTION.PLAYER_STOP_DOWN] =
            dispatch("input.player.stop.down");
        InputController.action_handler[ACTION.PLAYER_STOP_LEFT] =
            dispatch("input.player.stop.left");
        InputController.action_handler[ACTION.PLAYER_STOP_RIGHT] =
            dispatch("input.player.stop.right");
        // TODO : PUT OTHER ACTION HANDLERS

    }


    static RegisterInputEvent(action: ACTION, key: KEY, oldKey: KEY = null): boolean
    {
        if (oldKey !== null) {
            var i = InputController.key_map[oldKey].indexOf(action);
            while (i !== -1) {
                InputController.key_map[oldKey].splice(i, 1);
                i = InputController.key_map[oldKey].indexOf(action);
            }
        }
        var conflict = InputController.key_map[key].length > 0 ? true : false;

        InputController.key_map[key].push(action);

        return conflict;
    }

    // Recoit les events keydown de l'object window
    public static OnKeyDown(ev: KeyboardEvent): void
    {
        // Controle pour eviter la répetition des events keydown
        if (InputController.current_keys_down[ev.which]) return;
        InputController.current_keys_down[ev.which] = true;
        // Send event key & type
        InputController.EvalInput(ev.which, INPUT_MODE.KEY_DOWN);
    }

    public static OnKeyUp(ev: KeyboardEvent): void
    {
        // Controle pour eviter la répetition des events keydown
        delete InputController.current_keys_down[ev.which];
        // Send event key & type
        InputController.EvalInput(ev.which, INPUT_MODE.KEY_UP);
    }

    private static EvalInput(key: KEY, mode: INPUT_MODE)
    {
        var actions = InputController.key_map[key];
        if (actions === undefined) {
            return;
        }
        // IF INPUT KEY VALID
        // FOR EACH LINKED ACTION
        for (var i in actions) {
            var action = actions[i];
            var expected_mode = InputController.action_input_mode[action];
            if (expected_mode === undefined) {
                console.error("No input mode for action : " + action.toString());
                return;
            }
            if (expected_mode !== mode) {
                continue;
            }
            // GOOD INPUT MODE
            var handler = InputController.action_handler[action];
            if (handler === undefined) {
                console.error("No handler for action : " + action.toString());
            }
            handler();
        }
    }

    static AddEventListener(listener: WorldObject)
    {
        InputController.listeners[listener.id] = listener;
    }

    static RemoveEventListener(listener: WorldObject)
    {
        delete InputController.listeners[listener.id];
    }

    static DispatchEvent(eventType: string)
    {
        for (var id in InputController.listeners) {
            InputController.listeners[id].On(eventType);
        }
    }

    static TryPreventDefault(ev: KeyboardEvent)
    {
        if (InputController.prevent_defaults.indexOf(ev.which) !== -1) {
            return false;
        }
        return true;
    }
}
