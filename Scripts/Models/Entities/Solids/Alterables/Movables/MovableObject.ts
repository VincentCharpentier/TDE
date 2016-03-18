abstract class MovableObject extends AlterableObject
{
    protected is_moving = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    protected max_speed: number;
    public speed: Coord;


    constructor(coord: Coord, max_health: number, max_speed: number)
    {
        super(coord, max_health);
        this.max_speed = max_speed;
        this.speed = new Coord(0, 0);
    }

    public Stop(): void
    {
        this.is_moving.up = false;
        this.is_moving.down = false;
        this.is_moving.left = false;
        this.is_moving.right = false;
    }

    public Move(dir: Direction): void
    {
        this.Stop();
        switch (dir) {
            case Direction.UP:
                this.is_moving.up = true;
                break;
            case Direction.UP_RIGHT:
                this.is_moving.up = true;
                this.is_moving.right = true;
                break;
            case Direction.RIGHT:
                this.is_moving.right = true;
                break;
            case Direction.DOWN_RIGHT:
                this.is_moving.down = true;
                this.is_moving.right = true;
                break;
            case Direction.DOWN:
                this.is_moving.down = true;
                break;
            case Direction.DOWN_LEFT:
                this.is_moving.down = true;
                this.is_moving.left = true;
                break;
            case Direction.LEFT:
                this.is_moving.left = true;
                break;
            case Direction.UP_LEFT:
                this.is_moving.up = true;
                this.is_moving.left = true;
                break;
        }
    }

    Tick(dt: number)
    {
        var factor = dt / 1000;
        var drag = Config.Moves.DRAG_FACTOR * factor;
        var gain = Config.Moves.ACCELERATION * factor;
        // re-eval speed
        // 1. apply drag to stop unwanted movements
        if ((this.speed.y < 0 && !this.is_moving.up)
            || (this.speed.y > 0 && !this.is_moving.down)) {
            // up
            this.speed.y *= drag;
            if (Math.abs(this.speed.y) < 1e-3) {
                this.speed.y = 0;
            }
        }
        if ((this.speed.x < 0 && !this.is_moving.left)
            || (this.speed.x > 0 && !this.is_moving.right)) {
            // up
            this.speed.x *= drag;
            if (Math.abs(this.speed.x) < 1e-3) {
                this.speed.x = 0;
            }
        }


        // 2. consider user input
        if (this.is_moving.up) {
            this.speed.y -= gain;
        }
        if (this.is_moving.down) {
            this.speed.y += gain;
        }
        if (this.is_moving.left) {
            this.speed.x -= gain;
        }
        if (this.is_moving.right) {
            this.speed.x += gain;
        }

        // Considerer la vitesse maximale par rapport à
        // l'ensemble des vitesses (indistinctement)
        var combinedSpeed = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
        if (combinedSpeed > this.max_speed) {
            var slow_ratio = this.max_speed / combinedSpeed;
            this.speed.x *= slow_ratio;
            this.speed.y *= slow_ratio;
        }

        // 3. Update coord
        this.coord.x += this.speed.x;
        this.coord.y += this.speed.y;
        this.UpdateChunk();
    }

    public IsObstacle(): boolean
    {
        return false;
    }
}


enum Direction
{
    UP,
    UP_RIGHT,
    RIGHT,
    DOWN_RIGHT,
    DOWN,
    DOWN_LEFT,
    LEFT,
    UP_LEFT
};
