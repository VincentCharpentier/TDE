
class Player extends WorldObject
{
    // TODO : LocalPlayerController

    // For future multiplayer mode
    private _isLocalPlayer: boolean;

    constructor(isLocalPlayer_: boolean)
    {
        super();
        this.coord = new Coord(
            Math.round(Config.World.Map.SIZE / 2),
            Math.round(Config.World.Map.SIZE / 2)
        );
        this.speed = new Coord(0, 0);
        this._isLocalPlayer = isLocalPlayer_;
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
                || (this.speed.y > 0 && !this.is_moving.up)) {
                // up
                this.speed.y *= Config.Player.DRAG_FACTOR;
                if (Math.abs(this.speed.y) < 1e-3) {
                    this.speed.y = 0;
                }
            }


            // 2. consider user input
            if (this.is_moving.up) {
                this.speed.y -= Config.Player.ACCELERATION;
                this.speed.y = Math.max(this.speed.y,
                    -1 * Config.Player.MAX_SPEED);
            }
            if (this.is_moving.down) {
                this.speed.y += Config.Player.ACCELERATION;
                this.speed.y = Math.min(this.speed.y, Config.Player.MAX_SPEED);
            }
            if (this.is_moving.left) {
                this.speed.x -= Config.Player.ACCELERATION;
                this.speed.x = Math.max(this.speed.x,
                    -1 * Config.Player.MAX_SPEED);
            }
            if (this.is_moving.right) {
                this.speed.x += Config.Player.ACCELERATION;
                this.speed.x = Math.min(this.speed.x, Config.Player.MAX_SPEED);
            }
            // TODO: Considerer la vitesse maximale par rapport à
            //       l'ensemble des vitesses (indistinctement)

            // 3. Update coord
            this.coord.x += this.speed.x;
            this.coord.y += this.speed.y;
        }
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
        console.info("moving " + dir);
        if (!this.is_moving[dir]) {
            this.is_moving[dir] = true;
        }
    }

    MoveUp()
    {
        this.Move["up"];
    }

    MoveDown()
    {
        this.Move["down"];
    }

    MoveLeft()
    {
        this.Move["left"];
    }

    MoveRight()
    {
        this.Move["right"];
    }
}
