import { pad } from ".";
import { drawPolygon } from "./utils/draw";

export const useDrawPanel = (canvasRef) => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  const drawPanel = (canvas, points, i) => {
    points = points.map(point => point + pad)
    drawPolygon(canvas, points)
    drawHandle(points, canvas.getContext('2d'));
  }
  return { drawPanel }
}