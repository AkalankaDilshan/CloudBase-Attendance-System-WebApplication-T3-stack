/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DetectedObject } from "@tensorflow-models/coco-ssd";

// mirrored, predictions, canvasRef.current?.getContext('2d')
export function drawOnCanvas(
     mirrored: boolean,
     predictions: DetectedObject[],
     ctx: CanvasRenderingContext2D | null | undefined
) {
     if (!ctx) return;
     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
     predictions.forEach((detectedObject: DetectedObject) => {
          const { class: name, bbox } = detectedObject;
          const [x, y, width, height] = bbox;

          // styling
          ctx.fillStyle = name === "person" ? "blue" : "green";
          ctx.globalAlpha = 0.8;
          ctx.lineWidth = 2;

          ctx.beginPath();
          mirrored ? ctx.roundRect(ctx.canvas.width - x - width, y, width, height, 8) : ctx.roundRect(x, y, width, height, 8);

          // draw stroke or fill
          ctx.fill();

          // Reset globalAlpha for text
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'black';
          ctx.font = "12px Courier New";


          mirrored
               ? ctx.fillText(name, ctx.canvas.width - x - width + 10, y + 20)
               : ctx.fillText(name, x + 10, y + 20);
     });
}

// Fallback for rounded rectangle
// function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
//      ctx.beginPath();
//      ctx.moveTo(x + radius, y);
//      ctx.arcTo(x + width, y, x + width, y + height, radius);
//      ctx.arcTo(x + width, y + height, x, y + height, radius);
//      ctx.arcTo(x, y + height, x, y, radius);
//      ctx.arcTo(x, y, x + width, y, radius);
//      ctx.closePath();
// }
