import Pusher from "pusher-js";

let pusherClient: Pusher | null = null;

export const getPusherClient = () => {
  if (!pusherClient && typeof window !== 'undefined') {
    pusherClient = new Pusher("84d001bb843e2b1468a6", {
      cluster: "eu",
      channelAuthorization: {
        endpoint: "/api/pusher-auth",
        transport: "ajax",
      },
    });
  }
  return pusherClient;
};
