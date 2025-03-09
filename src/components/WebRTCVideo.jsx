import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

export default function WebRTCVideo({ signalingEndpoint, role }) {
     const videoRef = useRef(null);
     const [peer, setPeer] = useState(null);

     useEffect(() => {
          const peer = new Peer({
               initiator: role === 'MASTER',
               trickle: false,
          });

          peer.on('signal', (data) => {
               // Send signaling data to the other peer via AWS KVS signaling channel
               console.log('Signal data:', data);
          });

          peer.on('stream', (stream) => {
               // Attach the remote stream to the video element
               if (videoRef.current) {
                    videoRef.current.srcObject = stream;
               }
          });

          setPeer(peer);

          return () => {
               peer.destroy();
          };
     }, [role]);

     return <video ref={videoRef} autoPlay playsInline muted={role === 'MASTER'} />;
}