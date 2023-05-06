import { NextApiRequest, NextApiResponse } from "next";
import Channels from "pusher";

const channels = new Channels({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);

  await channels.trigger("listeners", "streaming", { message: "ok" });

  const test = await channels.trigger("visitors", "connect", {
    message: "true",
  });
  console.log("test", test);

  res.status(200).end();
}
