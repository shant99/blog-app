import PusherServer from "pusher";
import PusherClient from "pusher-js";

const CLUSTER = (process.env.PUSHER_CLUSTER as string) || "ap2";

if (!CLUSTER) {
  throw new Error("PUSHER_CLUSTER environment variable is not defined!");
}

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: CLUSTER,
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
    throw new Error(
      "NEXT_PUBLIC_PUSHER_APP_KEY environment variable is not defined!"
    );
  }

  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    {
      cluster: CLUSTER,
      channelAuthorization: {
        endpoint: "/api/pusher-auth",
        transport: "ajax",
      },
    }
  );
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
