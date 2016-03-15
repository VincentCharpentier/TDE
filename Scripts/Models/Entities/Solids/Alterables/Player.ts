
class Player extends WorldObject
{
    // TODO : LocalPlayerController

    // For future multiplayer mode
    private _isLocalPlayer: boolean;

    constructor(coord: Coord, isLocalPlayer_: boolean)
    {
        super(coord);
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

    private is_moving = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    Tick(dt: number): void
    {
        if (this._isLocalPlayer) {
            // re-eval speed
            // 1. apply drag to stop unwanted movements
            if ((this.speed.y < 0 && !this.is_moving.up)
                || (this.speed.y > 0 && !this.is_moving.down)) {
                // up
                this.speed.y *= Config.Player.DRAG_FACTOR;
                if (Math.abs(this.speed.y) < 1e-3) {
                    this.speed.y = 0;
                }
            }
            if ((this.speed.x < 0 && !this.is_moving.left)
                || (this.speed.x > 0 && !this.is_moving.right)) {
                // up
                this.speed.x *= Config.Player.DRAG_FACTOR;
                if (Math.abs(this.speed.x) < 1e-3) {
                    this.speed.x = 0;
                }
            }


            // 2. consider user input
            if (this.is_moving.up) {
                this.speed.y -= Config.Player.ACCELERATION;
            }
            if (this.is_moving.down) {
                this.speed.y += Config.Player.ACCELERATION;
            }
            if (this.is_moving.left) {
                this.speed.x -= Config.Player.ACCELERATION;
            }
            if (this.is_moving.right) {
                this.speed.x += Config.Player.ACCELERATION;
            }

            // Considerer la vitesse maximale par rapport à
            // l'ensemble des vitesses (indistinctement)
            var combinedSpeed = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
            if (combinedSpeed > Config.Player.MAX_SPEED) {
                var slow_ratio = Config.Player.MAX_SPEED / combinedSpeed;
                this.speed.x *= slow_ratio;
                this.speed.y *= slow_ratio;
            }

            // 3. Update coord
            this.coord.x += this.speed.x;
            this.coord.y += this.speed.y;
            this.UpdateChunk();
        }
        WorldController.player = this;
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

    Move(dir: string)
    {
        if (!this.is_moving[dir]) {
            this.is_moving[dir] = true;
        }
    }

    MoveUp()
    {
        this.Move("up");
    }

    MoveDown()
    {
        this.Move("down");
    }

    MoveLeft()
    {
        this.Move("left");
    }

    MoveRight()
    {
        this.Move("right");
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
