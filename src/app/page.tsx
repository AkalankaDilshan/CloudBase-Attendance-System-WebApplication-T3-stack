/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'

type Props = object

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);

  //state 
  const [mirrored, setMirrored] = useState<boolean>(false);
  return (

    // left side
    <div className="flex h-screen">
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam ref={webcamRef}
            mirrored={mirrored}
            className='h-full w-full object-contain p-2'
          />
        </div>
      </div>
    </div>

    //Right side

  )
}

export default HomePage