# @bitsocial/captcha-canvas-challenge

Standalone captcha canvas challenge extracted from `pkc-js`, packaged with independent dependencies.

## Security Warning

This captcha can be brute-forced easily and should not be used to protect a real community.

## Status

- `@pkcprotocol/pkc-js` is a dev dependency used only for TypeScript types. It is not required at runtime.

## Requirements

- Node.js `>=22`
- ESM-only environment

## Install

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Usage

```ts
import PKC from "@pkcprotocol/pkc-js";
import { captchaCanvasChallenge } from "@bitsocial/captcha-canvas-challenge";

PKC.challenges["captcha-canvas-v3"] = captchaCanvasChallenge;
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
