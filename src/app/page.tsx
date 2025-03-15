/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ModeToggle } from '@/components/theme-toggle '
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Camera, FlipHorizontal, MoonIcon, PersonStanding, PersonStandingIcon, SunIcon, Video, Volume2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { toast } from "sonner"
import * as cocossd from '@tensorflow-models/coco-ssd'
import { DetectedObject, ObjectDetection } from '@tensorflow-models/coco-ssd'
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Slider } from '@/components/ui/slider'
import { beep } from '../../utils/audio'
import BounceLoader from "react-spinners/BounceLoader";
import CircleLoader from "react-spinners/CircleLoader";
import { drawOnCanvas } from '../../utils/drow'
import RightSide from '@/components/Right-side/right-side'


type Props = object
// let interval = null

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //state 
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, SetisRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setautoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);
  const [model, setModel] = useState<ObjectDetection>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    initModel();
  }, [])

  //load models
  // set it in a state varaible
  async function initModel() {
    const loadeModel: ObjectDetection = await cocossd.load({
      base: "mobilenet_v2"
    });
    setModel(loadeModel);
  }

  useEffect(() => {
    if (model) {
      setLoading(false);
    }
  }, [model])

  async function runPrediction() {
    if (
      model
      && webcamRef.current
      && webcamRef.current.video
      && webcamRef.current.video.readyState === 4
    ) {
      const predictions: DetectedObject[] = await model.detect(webcamRef.current.video)
      console.log(predictions)
      resizeCanvas(canvasRef, webcamRef);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        //ctx.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
        drawOnCanvas(mirrored, predictions, ctx);
      }
    }
  }

  useEffect(() => {
    if (!model) return;
    setLoading(false);
    const interval = setInterval(() => {
      runPrediction();
    }, 100)

    return () => clearInterval(interval)
  }, [model]);

  return (


    <div className="flex h-screen">
      {/* left side */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam ref={webcamRef}
            mirrored={mirrored}
            className='h-full w-full object-contain p-2'
          />
          <canvas ref={canvasRef} width={640} height={480} />
        </div>
      </div>

      {/* Right side */}
      <RightSide />

      {loading && <div className='z-50  px-4 absolute w-full h-full flex items-center justify-center bg-primary-foreground'>
        Getting things read ...   <CircleLoader size={30} color='#ff0000' />
      </div>}
    </div >
  )



  // inner components
  // function RenderFeatureHighlightsSection() {
  //   return (
  //     <div className="text-xs text-muted-foreground">
  //       <ul className="space-y-4">
  //         <li>
  //           <strong>Dark Mode/Sys Theme 🌗</strong>
  //           <p>Toggle between dark mode and system theme.</p>
  //           <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
  //             <SunIcon size={14} />
  //           </Button>{" "}
  //           /{" "}
  //           <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
  //             <MoonIcon size={14} />
  //           </Button>
  //         </li>
  //         <li>
  //           <strong>Horizontal Flip ↔️</strong>
  //           <p>Adjust horizontal orientation.</p>
  //           <Button className='h-6 w-6 my-2'
  //             variant={'outline'} size={'icon'}
  //             onClick={() => {
  //               setMirrored((prev) => !prev)
  //             }}
  //           ><FlipHorizontal size={14} /></Button>
  //         </li>
  //         <Separator />
  //         <li>
  //           <strong>Take Pictures 📸</strong>
  //           <p>Capture snapshots at any moment from the video feed.</p>
  //           <Button
  //             className='h-6 w-6 my-2'
  //             variant={'outline'} size={'icon'}
  //             onClick={userPromptScreenshot}
  //           >
  //             <Camera size={14} />
  //           </Button>
  //         </li>
  //         <li>
  //           <strong>Manual Video Recording 📽️</strong>
  //           <p>Manually record video clips as needed.</p>
  //           <Button className='h-6 w-6 my-2'
  //             variant={isRecording ? 'destructive' : 'outline'} size={'icon'}
  //             onClick={userPromptRecord}
  //           >
  //             <Video size={14} />
  //           </Button>
  //         </li>
  //         <Separator />
  //         <li>
  //           <strong>Enable/Disable Auto Record 🚫</strong>
  //           <p>
  //             Option to enable/disable automatic video recording whenever
  //             required.
  //           </p>
  //           <Button className='h-6 w-6 my-2'
  //             variant={autoRecordEnabled ? 'destructive' : 'outline'}
  //             size={'icon'}
  //             onClick={toggleAutoRecord}
  //           >
  //             {/* {autoRecordEnabled ? <Rings color='white' height={30} /> : <PersonStanding size={14} />} */}

  //           </Button>
  //         </li>

  //         <li>
  //           <strong>Volume Slider 🔊</strong>
  //           <p>Adjust the volume level of the notifications.</p>
  //         </li>
  //         <li>
  //           <strong>Camera Feed Highlighting 🎨</strong>
  //           <p>
  //             Highlights persons in{" "}
  //             <span style={{ color: "#FF0F0F" }}>red</span> and other objects in{" "}
  //             <span style={{ color: "#00B612" }}>green</span>.
  //           </p>
  //         </li>
  //         <Separator />
  //         <li className="space-y-4">
  //           <strong>Share your thoughts 💬 </strong>
  //           {/* <SocialMediaLinks/> */}
  //           <br />
  //           <br />
  //           <br />
  //         </li>
  //       </ul>
  //     </div>
  //   )
  // }
}

export default HomePage

function resizeCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  webcamRef: React.RefObject<Webcam | null>) {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if ((canvas && video)) {
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }

}
