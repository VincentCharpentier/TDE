abstract class Agent extends WorldObject
{
    protected _canThink = true;
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

    /**
     * Agent act depending on his goal (defined at last "Think" call)
     */
    public abstract Act(): void;
}


class Ennemy extends Agent
{
    public SetupShape()
    {

    }

    Tick(dt: number): void
    {

    }

    public Think()
    {

    }

    public Act()
    {

    }
}
