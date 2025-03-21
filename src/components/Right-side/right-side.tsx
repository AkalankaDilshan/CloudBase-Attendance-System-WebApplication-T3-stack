/* eslint-disable @typescript-eslint/no-unused-vars */
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SunIcon, MoonIcon, FlipHorizontal, Camera, Video, PersonStandingIcon, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme-toggle ";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Slider } from "@radix-ui/react-slider";
import BounceLoader from "react-spinners/BounceLoader";
import { beep } from "../../../utils/audio";
import { useState } from "react";
import { toast } from "sonner";

type RightSideProps = {
     mirrored: boolean;
     setMirrored: React.Dispatch<React.SetStateAction<boolean>>;
     isRecording: boolean;
     setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
     autoRecordEnabled: boolean;
     setautoRecordEnabled: React.Dispatch<React.SetStateAction<boolean>>;
     // volume: number;
     // setVolume: React.Dispatch<React.SetStateAction<number>>;
};

const RightSide = ({ mirrored, setMirrored, isRecording, setIsRecording, autoRecordEnabled, setautoRecordEnabled }: RightSideProps) => {
     // const [mirrored, setMirrored] = useState(false);
     // const [isRecording, setIsRecording] = useState(false);
     // const [autoRecordEnabled, setautoRecordEnabled] = useState<boolean>(false);
     const [volume, setVolume] = useState(0.5);


     return (
          <div className="flex flex-row flex-1">
               <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between  shadow-md rounded-md p-4">
                    {/* top section */}
                    <div className="flex flex-col gap-2">
                         <ModeToggle />

                         <Button
                              variant={'outline'}
                              size={'icon'}
                              onClick={() => {
                                   setMirrored((prev) => !prev)
                              }}
                         >
                              <FlipHorizontal />
                         </Button>

                         <Separator className='my-2' />
                    </div>

                    {/* Middle section  */}
                    <div className="flex flex-col gap-2">
                         <Separator className='my-2' />

                         <Button
                              variant={'outline'}
                              size={'icon'}
                              onClick={userPromptScreenshot}
                         >
                              <Camera />
                         </Button>

                         <Button
                              variant={isRecording ? 'destructive' : 'outline'}
                              size={'icon'}
                              onClick={userPromptRecord}
                         >
                              <Video />
                         </Button>

                         <Separator className='my-2' />
                         <Button
                              variant={autoRecordEnabled ? 'destructive' : 'outline'}
                              size={'icon'}
                              onClick={toggleAutoRecord}
                         >
                              {autoRecordEnabled ? <BounceLoader color="#ffffff" size={25} /> : <PersonStandingIcon />}
                         </Button>
                    </div>


                    {/* Volume Bottom section  */}
                    <div className="flex flex-col gap-2">
                         <Separator className='my-2' />

                         <Popover>
                              <PopoverTrigger asChild>
                                   <Button variant={'outline'} size={'icon'}>
                                        <Volume2 />
                                   </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                   {/* <Slider
                                        max={1}
                                        min={0}
                                        step={0.1}
                                        defaultValue={[volume]}
                                   onValueCommit={(val) => {
                                        console.log("Volume changed to:", val[0]); // Debugging step
                                        setVolume(val[0]);
                                        beep(val[0]);
                                   }}
                                   /> */}
                                   <Slider defaultValue={[33]} max={100} step={1} />

                              </PopoverContent>
                         </Popover>
                    </div>
               </div>

               <div className='h-full flex-1 py-4 px-2 overflow-y-scroll'>
                    <RenderFeatureHighlightsSection />
               </div>
          </div>
     );

     //handler function
     function userPromptScreenshot() {

          //take screenshot 

          //save it to download
     }

     function userPromptRecord() {

          //check if isRecording
          //then stop isRecording
          // and save to download


     }

     function toggleAutoRecord() {
          if (autoRecordEnabled) {
               setautoRecordEnabled(false);

               //show toast to user to notify the change
               toast("Auto record disable")


          }
          else {
               setautoRecordEnabled(true);
               //show toast
               toast("Auto record enabled")
          }
     }

     function RenderFeatureHighlightsSection() {
          return (
               <div className="text-xs text-muted-foreground">
                    <ul className="space-y-4">
                         <li>
                              <strong>Dark Mode/Sys Theme 🌗</strong>
                              <p>Toggle between dark mode and system theme.</p>
                              <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
                                   <SunIcon size={14} />
                              </Button>{" "}
                              /{" "}
                              <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
                                   <MoonIcon size={14} />
                              </Button>
                         </li>
                         <li>
                              <strong>Horizontal Flip ↔️</strong>
                              <p>Adjust horizontal orientation.</p>
                              <Button className='h-6 w-6 my-2'
                                   variant={'outline'} size={'icon'}
                                   onClick={() => {
                                        setMirrored((prev) => !prev)
                                   }}
                              ><FlipHorizontal size={14} /></Button>
                         </li>
                         <Separator />
                         <li>
                              <strong>Take Pictures 📸</strong>
                              <p>Capture snapshots at any moment from the video feed.</p>
                              <Button
                                   className='h-6 w-6 my-2'
                                   variant={'outline'} size={'icon'}
                                   onClick={userPromptScreenshot}
                              >
                                   <Camera size={14} />
                              </Button>
                         </li>
                         <li>
                              <strong>Manual Video Recording 📽️</strong>
                              <p>Manually record video clips as needed.</p>
                              <Button className='h-6 w-6 my-2'
                                   variant={isRecording ? 'destructive' : 'outline'} size={'icon'}
                                   onClick={userPromptRecord}
                              >
                                   <Video size={14} />
                              </Button>
                         </li>
                         <Separator />
                         <li>
                              <strong>Enable/Disable Auto Record 🚫</strong>
                              <p>
                                   Option to enable/disable automatic video recording whenever
                                   required.
                              </p>
                              <Button className='h-6 w-6 my-2'
                                   variant={autoRecordEnabled ? 'destructive' : 'outline'}
                                   size={'icon'}
                                   onClick={toggleAutoRecord}
                              >
                                   {/* {autoRecordEnabled ? <Rings color='white' height={30} /> : <PersonStanding size={14} />} */}

                              </Button>
                         </li>

                         <li>
                              <strong>Volume Slider 🔊</strong>
                              <p>Adjust the volume level of the notifications.</p>
                         </li>
                         <li>
                              <strong>Camera Feed Highlighting 🎨</strong>
                              <p>
                                   Highlights persons in{" "}
                                   <span style={{ color: "#FF0F0F" }}>red</span> and other objects in{" "}
                                   <span style={{ color: "#00B612" }}>green</span>.
                              </p>
                         </li>
                         <Separator />
                         <li className="space-y-4">
                              <strong>Share your thoughts 💬 </strong>
                              {/* <SocialMediaLinks/> */}
                              <br />
                              <br />
                              <br />
                         </li>
                    </ul>
               </div>
          )
     }
};

export default RightSide;
