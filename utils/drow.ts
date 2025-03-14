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


          ctx.beginPath();
          ctx.lineWidth = 2;

          // styling
          ctx.fillStyle = name === "person" ? "red" : "green";
          ctx.globalAlpha = 0.4;

          mirrored ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8) : ctx.roundRect(x, y, width, height, 8);

          // draw stroke or fill
          ctx.fill();

          // text styling
          ctx.font = "12px Courier New";
          ctx.fillStyle = 'black'
          ctx.globalAlpha = 1;
          mirrored
               ? ctx.fillText(name, ctx.canvas.width - x - width + 10, y + 20)
               : ctx.fillText(name, x + 10, y + 20);

     });
}