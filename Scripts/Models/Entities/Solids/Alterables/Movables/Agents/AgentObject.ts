abstract class AgentObject extends MovableObject
{
    protected _canThink = true;

    private destination: Coord = null;

    /**
     * Agent consider what action it should take
     */
    public abstract Think(): void;
    public BeforeAct()
    {
        if (this._canThink) {
            this.Think();
            this._canThink = false;
            setTimeout(() =>
            {
                this._canThink = true;
            }, Config.Agent.THINK_DELAY);
        }
    }

    public Tick(dt: number)
    {
        super.Tick(dt);
        this.BeforeAct();
        this.Act();
        this.Nav();
    }

    /**
     * Agent act depending on his goal (defined at last "Think" call)
     */
    public abstract Act(): void;

    protected SetDestination(coord: Coord)
    {
        this.destination = coord;
    }

    protected HasDestination(): boolean
    {
        return this.destination !== null;
    }

    private Nav(): void
    {
        if (this.HasDestination() && (this.coord.x !== this.destination.x || this.coord.y !== this.destination.y)) {
            if (this.coord.y > this.destination.y) {
                // TOP
                if (this.coord.x > this.destination.x) {
                    // LEFT
                    this.Move(Direction.UP_LEFT);
                } else if (this.coord.x < this.destination.x) {
                    // RIGHT
                    this.Move(Direction.UP_RIGHT);
                } else {
                    this.Move(Direction.UP);
                }
            } else if (this.coord.y < this.destination.y) {
                // DOWN
                if (this.coord.x > this.destination.x) {
                    // LEFT
                    this.Move(Direction.DOWN_LEFT);
                } else if (this.coord.x < this.destination.x) {
                    // RIGHT
                    this.Move(Direction.DOWN_RIGHT);
                } else {
                    this.Move(Direction.DOWN);
                }
            } else {
                // HORIZONTALLY
                if (this.coord.x > this.destination.x) {
                    // LEFT
                    this.Move(Direction.LEFT);
                } else if (this.coord.x < this.destination.x) {
                    // RIGHT
                    this.Move(Direction.RIGHT);
                } else {
                    this.Stop();
                }
            }
        }
    }
}
