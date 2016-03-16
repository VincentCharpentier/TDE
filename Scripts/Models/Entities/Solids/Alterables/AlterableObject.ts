abstract class AlterableObject extends SolidObject
{
    private health: number;
    protected max_health: number;

    constructor(coord: Coord, maxHealth: number)
    {
        super(coord);
        this.max_health = maxHealth;
        this.health = this.max_health;
    }

    abstract OnDie(): void;

    public AddHealth(value: number)
    {
        this.health += value;
    }

    public RemoveHealth(value: number)
    {
        this.health -= value;
        if (this.health <= 0) {
            this.OnDie();
            this.Destroy();
        }
    }
}
