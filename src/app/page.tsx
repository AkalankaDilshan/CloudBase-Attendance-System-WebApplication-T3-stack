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
import LoadingScreen from '@/components/loading-screen/LoadingScreen'


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
            className="h-full w-full object-contain"
          />
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Right side */}
      <RightSide
        mirrored={mirrored} setMirrored={setMirrored}
        isRecording={isRecording} setIsRecording={SetisRecording}
        autoRecordEnabled={autoRecordEnabled} setautoRecordEnabled={setautoRecordEnabled}
        volume={volume} setVolume={setVolume}
      />

      <LoadingScreen loading={loading} />
    </div >
  )


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
