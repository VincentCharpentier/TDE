class FullShape {
    private parts: Array<Shape> = [];

    public AddShape(shape: Shape) {
        this.parts.push(shape);
    }

    public Draw(ctx: CanvasRenderingContext2D, at: Coord, rotation: number): void {
        for (var i = 0; i < this.parts.length; i++) {
            this.parts[i].Draw(ctx, at, rotation);
        }
    }
}

class Coord {
    public x: number;
    public y: number;

    constructor(x_: number, y_: number) {
        this.x = x_;
        this.y = y_;
    }
}

class ShapeFactory {
    public static Square(material: ShapeMaterial, coord: Coord, width: number, rotation: number): Square {
        var result = new Square(width, material);
        result.setLocalCoord(coord.x, coord.y);
        result.setLocalRotation(rotation);
        return result;
    }
}


abstract class Shape {
    protected material: ShapeMaterial;
    protected localCoord: Coord;
    protected localRotation: number;

    constructor(material_: ShapeMaterial) {
        this.material = material_;
    }

    public setLocalCoord(x: number = 0, y: number = 0) {
        this.localCoord = new Coord(x, y);
    }

    public setLocalRotation(rotation: number = 0) {
        this.localRotation = rotation;
    }

    abstract Draw(ctx: CanvasRenderingContext2D, at: Coord, rotation: number): void
}

class Square extends Shape {
    private width: number;

    constructor(width_: number, material_: ShapeMaterial) {
        super(material_);
        this.width = width_;
    }

    public Draw(ctx: CanvasRenderingContext2D, at: Coord, rotation: number = 0): void {
        var finalCoord: Coord = new Coord(at.x + this.localCoord.x, at.y + this.localCoord.y),
            finalRotation = (rotation + this.localRotation),
            halfWidth = this.width / 2;
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate(finalCoord.x + halfWidth, finalCoord.y + halfWidth);
        // rotate the rect
        ctx.rotate(finalRotation * Math.PI / 180);
        ctx.rect(-halfWidth, -halfWidth, this.width, this.width);
        ctx.fillStyle = this.material.GetColorString();
        ctx.fill();

        // restore the context to its untranslated/unrotated state
        ctx.restore();
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(radius_: number, material_: ShapeMaterial) {
        super(material_);
        this.radius = radius_;
    }

    public Draw(ctx: CanvasRenderingContext2D, at: Coord, rotation: number = 0): void {
        ctx.beginPath();
        ctx.arc(at.x + this.radius, at.y + this.radius, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.material.GetColorString();
        ctx.fill();
    }
}


class ShapeMaterial {
    public color: Color;
    public config: ColorConfig;

    constructor(color_: Color, config_: ColorConfig = ColorConfig.REGULAR) {
        this.color = color_;
        this.config = config_;
    }

    public GetColorString(): string {
        return ColorProcessor.GetColor(this.color, this.config);
    }
}

// Value asscociated to color should be the hue value
enum Color {
    RED = 0,
    BLUE = 238,
    GREEN = 133,
    YELLOW = 54,
    PINK = 340
}

enum ColorConfig {
    LIGHTER = 95,
    LIGHT = 80,
    REGULAR = 60,
    DARK = 40,
    DARKER = 25
}

class ColorProcessor {

    public static GetColor(color: Color, saturation: ColorConfig = ColorConfig.REGULAR, light: number = 50, opacity: number = 1): string {
        // TODO check values
        return "hsla(" + color + "," + saturation + "%," + light + "%," + opacity + ")";
    }
}
