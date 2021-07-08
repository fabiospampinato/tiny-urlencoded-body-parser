# Tiny URL-encoded Body Parser

A tiny middleware that parses URL-encoded request bodies.

## Install

```sh
npm install --save tiny-urlencoded-body-parser
```

## Usage

```ts
import express from 'express';
import urlencoded from 'tiny-urlencoded-body-parser';

const app = express ();

app.use ( urlencoded ({ limit: 100_000 }) ); // 100KB limit

app.post ( '/', req => {

  console.log ( req.body ); // The result of URL-decoding the body

});
```

## License

MIT © Fabio Spampinato
