class Turret extends Agent {
    // TODO : in config
    public static TURRET_SIZE: number = 20;

    SetupShape(): void {
        var body = new Circle(Turret.TURRET_SIZE, new ShapeMaterial(Color.BLUE));
        this.shape.AddShape(body);
    }

    Think(): void {

    }

    Act(): void {

    }
}