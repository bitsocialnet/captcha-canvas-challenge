# @bitsocial/captcha-canvas-challenge

Standalone captcha canvas challenge extracted from `plebbit-js`, packaged with independent dependencies.

## Status

- Runtime peer dependency is currently `@plebbit/plebbit-js`.
- This package is expected to migrate to `@pkc/pkc-js` soon.

## Requirements

- Node.js `>=22`
- ESM-only environment

## Install

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Usage

```ts
import Plebbit from "@plebbit/plebbit-js";
import { captchaCanvasChallenge } from "@bitsocial/captcha-canvas-challenge";

Plebbit.challenges["captcha-canvas-v3"] = captchaCanvasChallenge;
```

## Challenge Options

- `characters`: Amount of characters of the captcha (default: `6`)
- `height`: Height of the captcha in pixels (default: `100`)
- `width`: Width of the captcha in pixels (default: `300`)
- `colors`: Colors of the captcha text as hex comma separated values (default: `#32cf7e`)

## Scripts

```bash
npm run typecheck
npm run build
npm test
```
