## Api Firma digital Node con Java

Es una libreria para firmar digitalmente un PDF desde Node.js
Utiliza un JAR para generar la firma digital

### Requisitos

```
  jdk8
  node.js 14.*
```

### Dimensión del Widget

```
  Height = 150px
  Width = 70px
```

## Ejemplo Firma visible

```ts
import { Signer } from "node-pdf-signer";

const pfxPath = resolve(__dirname, "cert.pfx");
const pfxPassword = "password";

const sourcePath = resolve(__dirname, "example.pdf");
const targetPath = resolve(__dirname, "example_signed.pdf");

const urlImage = resolve(__dirname, "image.png");

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
    pfxPassword,
    sourcePath,
    targetPath,
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

```bash
  #OUTPUT
  {
    message: 'El pdf se firmó correctamente!',
    sourcePath: '<path>\\example.pdf',
    targetPath: '<path>\\example_signed.pdf'
  }
```

## Ejemplo Firma invisible

```ts
import { Signer } from "node-pdf-signer";

const pfxPath = resolve(__dirname, "cert.pfx");
const pfxPassword = "password";

const sourcePath = resolve(__dirname, "example.pdf");
const targetPath = resolve(__dirname, "example_signed.pdf");

const signer = new Signer({
  page: 1,
  visible: false,
  reason: "Yo soy el Firmante",
  location: "PE/PCL",
  positionX: 0,
  positionY: 0,
});

signer
  .sign({
    pfxPath,
    pfxPassword,
    sourcePath,
    targetPath,
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

```bash
  #OUTPUT
  {
    message: 'El pdf se firmó correctamente!',
    sourcePath: '<path>\\example.pdf',
    targetPath: '<path>\\example_signed.pdf'
  }
```

### Integración con react-pdf-signer

[React Pdf Signer](https://www.npmjs.com/package/react-pdf-signer)
