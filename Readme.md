### Description

Image from HTML is a simple form to transform a HTML element to canvas and image. 

### Installing

```
$ npm install image-from-html
```

or

```
$ yarn add image-from-html
```

### Using

```
import imageFromHtml from 'image-from-html';
imageFromHtml.toCanvas('test');
```

- The param `test` would be the HTML element ID that you need transform.

### React Example

```
import React, { useEffect } from "react";
import imageFromHtml from "image-from-html";

export default function App() {
  useEffect(() => {
    imageFromHtml.toCanvas("test");
  }, []);

  return (
    <div className="App" id="test">
      <h1>Title to Image</h1>
      <h2>Subtitle here!</h2>
    </div>
  );
}

```
