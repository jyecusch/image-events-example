import { imgEvts, imgMeta } from "../lib/resources";

const imageMetadata = imgMeta.for("writing");

imgEvts.subscribe(({ req }) => {
  const { key, link } = req.json();
  imageMetadata.doc(key).set({
    link,
  });
});
