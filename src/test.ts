import path from "path";
import { Signer } from "./Signer";

let pfxPath = path.join(__dirname, "../src/example/prueba.pfx");
let sourcePath = path.join(__dirname, "../src/example/example.pdf");
let targetPath = path.join(__dirname, "../src/example/signature_example.pdf");
let urlImage = path.join(__dirname, "../src/example/image.png");

export const testRemote = () => {
  const signer = new Signer({
    page: 1,
    visible: true,
    reason: "Yo soy el Firmante",
    location: "PE/PCL",
    urlImage,
    positionX: 100,
    positionY: 100,
  });

  signer
    .sign({
      pfxPath,
      pfxPassword: "password",
      sourcePath,
      targetPath,
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
