import Pusher from 'pusher'

export const pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    cluster: process.env.PUSHER_APP_CLUSTER as string,
    key: process.env.PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_APP_SECRET as string,
    useTLS: true
})