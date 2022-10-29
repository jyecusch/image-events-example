import { api } from "@nitric/sdk";
import { imgFiles, imgEvts } from "../lib/resources";
import axios from "axios"

const images = imgFiles.for("writing");
const imageEvts = imgEvts.for("publishing");

interface UploadRequest {
  link: string;
  key: string;
}

api("main").post("/images", async (ctx) => {
  const { link, key } = ctx.req.json() as UploadRequest;
  
  // download the image
  const imgData = await getImage(link);
  // store it in S3
  await images.file(key).write(imgData);
  // send an event to update dynamoDb with another function
  await imageEvts.publish({ payload: { link, key } });

  return ctx;
});

const getImage = async (url: string): Promise<Uint8Array> => {
    const res = await axios({url, responseType: 'arraybuffer'});
    return new Uint8Array(res.data);
}