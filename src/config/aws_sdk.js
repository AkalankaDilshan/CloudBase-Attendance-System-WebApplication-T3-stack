import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const kinesisVideo = new AWS.KinesisVideo();

export async function getSignalingChannelEndpoint(streamName) {
  const response = await kinesisVideo
    .getSignalingChannelEndpoint({
      ChannelARN: `arn:aws:kinesisvideo:${process.env.AWS_REGION}:your-account-id:channel/${streamName}/your-channel-id`,
      SingleMasterChannelEndpointConfiguration: {
        Protocols: ["WSS", "HTTPS"], // WebSocket and HTTPS protocols
        Role: "MASTER", // or 'VIEWER'
      },
    })
    .promise();
  return response.ResourceEndpointList;
}
