class Turret extends AgentObject
{
    // TODO : in config
    public static TURRET_SIZE: number = 20;

    SetupShape(): void
    {
        var body = new Circle(Turret.TURRET_SIZE, new ShapeMaterial(Color.BLUE));
        this.shape.AddShape(body);
    }

    Tick(dt: number): void
    {

    }


    Think(): void
    {

    }

    Act(): void
    {

    }

    public OnDie()
    {

    }

    public SetupBbox()
    {

    }
}
