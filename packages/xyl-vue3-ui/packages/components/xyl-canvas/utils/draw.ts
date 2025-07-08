const lineWidth = 2

// 绘制四边形
export const drawPolygon = (canvas, points, color = '255, 150, 38') => {

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制四边形
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i * 2], points[i * 2 + 1]);
  }
  ctx.closePath();

  // 填充四边形
  ctx.fillStyle = `rgba(${color}, 0.1)`;
  ctx.fill();

  // 绘制边框
  ctx.strokeStyle = `rgba(${color}, 1)`;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

}

// 绘制手柄
export const drawHandle = (points, ctx) => {
  for (let i = 0; i < points.length / 2; i++) {
    ctx.beginPath();
    ctx.arc(points[i * 2], points[i * 2 + 1], handleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 150, 38, 1)';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制手柄标签
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
  }
}