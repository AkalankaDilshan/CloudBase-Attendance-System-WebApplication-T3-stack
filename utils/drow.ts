import { DetectedObject } from '@tensorflow-models/coco-ssd'

export function drawOnCavas(
     mirrored: boolean,
     predictions: DetectedObject[],
     ctx: CanvasRenderingContext2D | null | undefined
) {
     predictions.forEach((detectedObject: DetectedObject) => {
          const { class: name, bbox, score } = detectedObject;
          const [x, y, width, height] = bbox;

          if (ctx && score > 50) {
               ctx.beginPath();

               //string for Canvas 

               ctx.fillStyle = name === 'person' ? '#FF0F0F' : '00B612';
               ctx.globalAlpha = 0.4;

               ctx.rect(x, y, width, height, 8)

               //draw strole or fill
               ctx.fill();

               //text styling
               ctx.font = "12px Courier New";
               ctx.fillStyle = 'black'
               ctx.globalAlpha = 1;




          }
     })


}