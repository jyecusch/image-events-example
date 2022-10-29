import { topic, bucket, collection } from "@nitric/sdk";

// the bucket to store images
export const imgFiles = bucket('images');

// the topic to publish new image events
export const imgEvts = topic('imageEvts');

// the database to store image metadata
export const imgMeta = collection('imageMeta');