import { DetectedObject } from '@tensorflow-models/coco-ssd';

export function drawOnCanvas(
     mirrored: boolean,
     predictions: DetectedObject[],
     ctx: CanvasRenderingContext2D | null | undefined
) {
     if (ctx)  // Early return if ctx is null or undefined

          predictions.forEach((detectedObject: DetectedObject) => {
               const { class: name, bbox, score } = detectedObject;
               const [x, y, width, height] = bbox;

               if (score > 0.5) { // Assuming score is between 0 and 1
                    ctx.beginPath();

                    // Adjust x-coordinate if mirrored
                    const adjustedX = mirrored ? ctx.canvas.width - x - width : x;

                    // Draw rectangle
                    ctx.fillStyle = name === 'person' ? '#FF0F0F' : '#00B612';
                    ctx.globalAlpha = 0.4;
                    ctx.rect(adjustedX, y, width, height);
                    ctx.fill();

                    // Draw text
                    ctx.font = "12px Courier New";
                    ctx.fillStyle = 'black';
                    ctx.globalAlpha = 1;
                    ctx.fillText(`${name} (${Math.round(score * 100)}%)`, adjustedX, y > 10 ? y - 5 : y + 10);
               }
          });
}