class Dog extends AgentObject
{
    private static MAX_HEALTH: number = 50;
    private static SIZE: number = 5;

    public OnDie() { };

    public SetupBbox() { };

    public SetupShape()
    {
        this.shape.AddShape(
            new Circle(
                Dog.SIZE,
                new ShapeMaterial(
                    Color.RED,
                    ColorConfig.REGULAR
                )));
    };

    public SetupMaxHealth()
    {
        this.max_health = Dog.MAX_HEALTH;
    };

    public Tick(dt: number)
    {

    };
}
