import { Injectable } from '@angular/core';
import { IPoint } from '../model/graphic.model';

@Injectable({
  providedIn: 'root'
})
export class BezierService {

  constructor() { }

  makePath(points) {
    var result = "M" + points[0].x + "," + points[0].y + " ";
    var catmull = this.catmullRom2bezier(points);
    for (var i = 0; i < catmull.length; i++) {
        result += "C" + catmull[i][0].x + "," + catmull[i][0].y + " " + catmull[i][1].x + "," + catmull[i][1].y + " " + catmull[i][2].x + "," + catmull[i][2].y + " ";
    }
    return result;
  }

  makePolyline(points: IPoint[], type: string = 'path'): string {
    let result: string = "";
    switch (type) {
        case "polyline":
            result = points.reduce((acc: string, current: IPoint) => acc += current.x + "," + current.y + " ",result)
            break;
        case "path":
            //M 100 350 l 150 -300
            result = "M " + points.reduce((acc: string, current: IPoint) => acc += current.x + " " + current.y + " L ",result)
            result = result.slice(0,result.length - 3);
        default:
            break;
    }
    
    return result;
  }

  catmullRom2bezier(points: IPoint[]) {
    var result = [];
    for (var i = 0; i < points.length - 1; i++) {
        var p = [];
        p.push({
            x: points[Math.max(i - 1, 0)].x,
            y: points[Math.max(i - 1, 0)].y
        });
        p.push({
            x: points[i].x,
            y: points[i].y
        });
        p.push({
            x: points[i + 1].x,
            y: points[i + 1].y
        });
        p.push({
            x: points[Math.min(i + 2, points.length - 1)].x,
            y: points[Math.min(i + 2, points.length - 1)].y
        });

        // Catmull-Rom to Cubic Bezier conversion matrix
        //    0       1       0       0
        //  -1/6      1      1/6      0
        //    0      1/6      1     -1/6
        //    0       0       1       0

        var bp = [];
        bp.push({
            x: ((-p[0].x + 6 * p[1].x + p[2].x) / 6),
            y: ((-p[0].y + 6 * p[1].y + p[2].y) / 6)
        });
        bp.push({
            x: ((p[1].x + 6 * p[2].x - p[3].x) / 6),
            y: ((p[1].y + 6 * p[2].y - p[3].y) / 6)
        });
        bp.push({
            x: p[2].x,
            y: p[2].y
        });
        result.push(bp);
    }

    return result;
  }
}
