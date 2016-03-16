
class Player extends MovableObject
{
    private static MAX_HEALTH = 50;
    private static MAX_SPEED = 2;

    // For future multiplayer mode
    private _isLocalPlayer: boolean;

    constructor(coord: Coord, isLocalPlayer_: boolean)
    {
        super(coord, Player.MAX_HEALTH, Player.MAX_SPEED);
        this.speed = new Coord(0, 0);
        this._isLocalPlayer = isLocalPlayer_;
        if (this._isLocalPlayer) {
            InputController.AddEventListener(this);
        }
    }

    SetupShape(): void
    {
        this.shape.AddShape(
            new Circle(
                Config.Player.SIZE,
                new ShapeMaterial(
                    Color.YELLOW,
                    ColorConfig.REGULAR
                )));
    }


    Tick(dt: number): void
    {
        if (this._isLocalPlayer) {
            super.Tick(dt);
        }
        // WorldController.player = this;
    }

    StopUp()
    {
        this.is_moving.up = false;
    }

    StopDown()
    {
        this.is_moving.down = false;
    }

    StopLeft()
    {
        this.is_moving.left = false;
    }

    StopRight()
    {
        this.is_moving.right = false;
    }

    StartMove(dir: string)
    {
        if (!this.is_moving[dir]) {
            this.is_moving[dir] = true;
        }
    }

    MoveUp()
    {
        this.StartMove("up");
    }

    MoveDown()
    {
        this.StartMove("down");
    }

    MoveLeft()
    {
        this.StartMove("left");
    }

    MoveRight()
    {
        this.StartMove("right");
    }

    SetupBbox()
    {

    }

    OnDie()
    {

    }

    On(event: string)
    {
        switch (event) {
            case "input.player.move.up":
                this.MoveUp();
                break;
            case "input.player.move.down":
                this.MoveDown();
                break;
            case "input.player.move.left":
                this.MoveLeft();
                break;
            case "input.player.move.right":
                this.MoveRight();
                break;
            case "input.player.stop.up":
                this.StopUp();
                break;
            case "input.player.stop.down":
                this.StopDown();
                break;
            case "input.player.stop.left":
                this.StopLeft();
                break;
            case "input.player.stop.right":
                this.StopRight();
                break;
        }
    }
}
