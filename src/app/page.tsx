/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Separator } from '@/components/ui/separator'
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'

type Props = object

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);

  //state 
  const [mirrored, setMirrored] = useState<boolean>(false);
  return (


    <div className="flex h-screen">
      {/* left side */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam ref={webcamRef}
            mirrored={mirrored}
            className='h-full w-full object-contain p-2'
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between  shadow-md rounded-md p-4">
          {/* top section */}
          <div className="flex flex-col gap-2">

            <Separator />
          </div>

          {/* Middle section  */}
          <div className="flex flex-col gap-2">
            <Separator />

            <Separator />
          </div>


          {/* Bottom section  */}
          <div className="flex flex-col gap-2">

            <Separator />
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage