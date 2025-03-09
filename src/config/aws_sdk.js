import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const kinesisVideo = new AWS.KinesisVideo();

export async function getSignalingChannelEndpoint() {
  const response = await kinesisVideo
    .getSignalingChannelEndpoint({
      ChannelARN: `arn:aws:kinesisvideo:us-east-1:533267403488:stream/my-stream/1741516852523`,
      SingleMasterChannelEndpointConfiguration: {
        Protocols: ["WSS", "HTTPS"], // WebSocket and HTTPS protocols
        Role: "MASTER", // or 'VIEWER'
      },
    })
    .promise();
  return response.ResourceEndpointList;
}
