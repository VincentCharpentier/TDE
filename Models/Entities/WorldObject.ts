﻿
abstract class WorldObject {
    public coord: Coord;
    public rotation: number;
    protected shape: FullShape;
    public bbox: BBox;

    constructor() {
        this.shape = new FullShape();
        this.SetupShape();
    }

    abstract SetupShape(): void;

    Draw(ctx: CanvasRenderingContext2D) {
        this.shape.Draw(ctx, this.coord, this.rotation);
    }
    /*
    GetSurroundingObjects(): Array<WorldObject> {

    }
    */

    CollideWithObject(object: WorldObject): boolean {
        return CollisionHelper.isCollision(this, object);
    }
}

enum BBox_Type {
    Circle,
    Rect,
    None
}

class BBox {
    type: BBox_Type;
    public _radius: number;
    public _width: number;
}

class BBox_Factory {
}


enum Collision_Mode {
    None,
    Circle_v_Circle,
    Circle_v_Rect,
    Rect_v_Rect
}

class CollisionHelper {
    public static isCollision(obj1: WorldObject, obj2: WorldObject) {
        return this.EvalCollision(obj1, obj2);;
    }

    private static GetCollisionMode(obj1: WorldObject, obj2: WorldObject): Collision_Mode {
        if (obj1.bbox.type == BBox_Type.None || obj2.bbox.type == BBox_Type.None) {
            return Collision_Mode.None;
        }
        switch (obj1.bbox.type) {
            case BBox_Type.Circle:
                switch (obj2.bbox.type) {
                    case BBox_Type.Circle:
                        return Collision_Mode.Circle_v_Circle;
                    case BBox_Type.Rect:
                        return Collision_Mode.Circle_v_Rect;
                }
                break;
            case BBox_Type.Rect:
                switch (obj2.bbox.type) {
                    case BBox_Type.Circle:
                        return Collision_Mode.Circle_v_Rect;
                    case BBox_Type.Rect:
                        return Collision_Mode.Rect_v_Rect;
                }
                break;
        }
        throw "Unable to evaluate collision";
    }

    private static EvalCollision(obj1: WorldObject, obj2: WorldObject): boolean {
        var mode = this.GetCollisionMode(obj1, obj2);
        switch (mode) {
            case Collision_Mode.Circle_v_Circle:
                var dist = this.DistBeetween(
                    new Coord((obj1.coord.x + obj1.bbox._radius), (obj1.coord.y + obj1.bbox._radius)),
                    new Coord((obj2.coord.x + obj2.bbox._radius), (obj2.coord.y + obj2.bbox._radius))
                );
                if (dist < (obj1.bbox._radius + obj2.bbox._radius)) {
                    return true;
                }
                break;
            case Collision_Mode.Circle_v_Rect:
                // TODO
                /*
                var rect: WorldObject = (obj1.bbox.type == BBox_Type.Rect ? obj1 : obj2),
                    cirle: WorldObject = (obj1.bbox.type == BBox_Type.Rect ? obj2 : obj1);
                // look for useful corner in rect
                var corner: Coord;
                if (cirle.coord.x + cirle.bbox._radius < rect.coord.x + rect.bbox._width / 2) {
                    // LEFT
                    if (cirle.coord.y + cirle.bbox._radius < rect.coord.y + rect.bbox._width / 2) {
                        // TOP - LEFT
                        corner =
                    } else {
                        // BOTTOM - LEFT
                    }
                } else {
                    // RIGHT
                }
                */
                break;
            case Collision_Mode.Rect_v_Rect:
                // TODO
                break;
            case Collision_Mode.None:
                break;
            default:
                throw "Unknown collision mode";
        }
        return false;
    }

    private static DistBeetween(pt1: Coord, pt2: Coord): number {
        var dx = Math.abs(pt1.x - pt2.x),
            dy = Math.abs(pt1.y - pt2.y);
        return Math.sqrt(dx * dx + dy * dy);
    }
}
