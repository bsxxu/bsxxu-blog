import { useEffect, useRef } from 'react';

export default function Background() {
  // const canvasRef = useRef(null);
  // const drawStar = (ctx, x, y, radius, color) => {
  //   ctx.fillStyle = color;
  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.lineTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
  //   for (let i = 1; i < 5; i++) {
  //     ctx.lineTo(
  //       x + radius * Math.cos((i * 2 * Math.PI) / 5),
  //       y + radius * Math.sin((i * 2 * Math.PI) / 5),
  //     );
  //   }
  //   ctx.closePath();
  //   ctx.fill();
  // };
  // const createStars = (ctx, numStars) => {
  //   for (let i = 0; i < numStars; i++) {
  //     const x = Math.random() * ctx.canvas.width;
  //     const y = Math.random() * ctx.canvas.height;
  //     const radius = Math.random() * 5 + 5;
  //     const color = `hsl(${Math.random() * 360}, 100%, 80%)`;
  //     drawStar(ctx, x, y, radius, color);
  //   }
  // };
  // const draw = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   createStars(ctx, 100);
  // };
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  //   draw();
  //   window.addEventListener('resize', draw);
  //   return () => {
  //     window.removeEventListener('resize', draw);
  //   };
  // }, []);
  // return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}
