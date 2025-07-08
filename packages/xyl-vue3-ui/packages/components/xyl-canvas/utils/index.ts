import { handleRadius } from "..";

// 检查是否点中手柄
export const isPointInHandle = (x, y, points) => {
  for (let i = 0; i < points.length / 2; i += 1) {
    const dx = x - points[i * 2];
    const dy = y - points[i * 2 + 1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= handleRadius + 3) {
      return i;
    }
  }
  return -1;
}

// 计算最小外接矩形
export const calculateBoundingBox = (vertices, borderWidth = 0) => {
  if (vertices.length === 0) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };
  }
  const xCoords = vertices.filter((x, i) => i % 2 === 0)
  const yCoords = vertices.filter((x, i) => i % 2 === 1)
  const minX = Math.min(...xCoords) - borderWidth;
  const maxX = Math.max(...xCoords) + borderWidth;
  const minY = Math.min(...yCoords) - borderWidth;
  const maxY = Math.max(...yCoords) + borderWidth;
  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

export const calcPosFromOriginal = (points) => {
  let { minX, minY } = calculateBoundingBox(points);
  let arr: Array<any> = [];
  (points as Array<any>).forEach((point, index) => {
    if (index % 2 === 0) {
      arr.push(point - minX);
    } else {
      arr.push(point - minY);
    }
  });
  return {
    left: minX,
    top: minY,
    points: arr,
    originalPoints: points,
  };
}