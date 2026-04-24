# @bitsocial/captcha-canvas-challenge

Standalone captcha canvas challenge extracted from `pkc-js`, packaged with independent dependencies.

## Security Warning

This captcha can be brute-forced easily and should not be used to protect a real community.

## Status

- `@pkcprotocol/pkc-js` is a dev dependency used only for TypeScript types. It is not required at runtime.

## Requirements

- Node.js `>=22`
- ESM-only environment

## Using captcha-canvas in your community

Community owners add the captcha-canvas challenge to their community settings. When enabled, every publication (post, reply, vote) requires the author to solve a captcha. The challenge is published as [`@bitsocial/captcha-canvas-challenge`](https://www.npmjs.com/package/@bitsocial/captcha-canvas-challenge) on npm.

The challenge name is the npm package name, `@bitsocial/captcha-canvas-challenge`, on every install path — that's the key in `PKC.challenges` and the value passed as `community.settings.challenges[].name`. `bitsocial challenge install` registers it this way automatically; manual registration should match.

### With pkc-js over RPC

If your RPC server is already running, first install the challenge on the server:

```bash
bitsocial challenge install @bitsocial/captcha-canvas-challenge
```

Then from your RPC client, connect and set the challenge on your community by name — no npm install or challenge registration needed on the client side:

```ts
import PKC from "@pkcprotocol/pkc-js";

const pkc = await PKC({
  pkcRpcClientsOptions: ["ws://localhost:9138"]
});

const community = await pkc.createCommunity({ address: "your-community-address.bso" });

await community.edit({
  settings: {
    challenges: [
      {
        name: "@bitsocial/captcha-canvas-challenge",
        options: {
          characters: "6",
          width: "300",
          height: "100",
          colors: "#32cf7e"
        }
      }
    ]
  }
});
```

### With pkc-js (TypeScript)

Install the challenge package:

```bash
npm install @bitsocial/captcha-canvas-challenge
```

Register the challenge and configure your community:

```typescript
import PKC from '@pkcprotocol/pkc-js'
import { captchaCanvasChallenge } from '@bitsocial/captcha-canvas-challenge'

// Register the challenge so it can be referenced by name
PKC.challenges['@bitsocial/captcha-canvas-challenge'] = captchaCanvasChallenge

const pkc = await PKC({ /* your pkc options */ })
const community = await pkc.createCommunity({ address: 'your-community.bso' })

await community.edit({
  settings: {
    challenges: [{
      name: '@bitsocial/captcha-canvas-challenge',
      options: {
        characters: '6',
        width: '300',
        height: '100',
        colors: '#32cf7e',
      }
    }]
  }
})
```

#### Challenge options

All option values must be strings (pkc-js challenge convention).

| Option | Default | Description |
|--------|---------|-------------|
| `characters` | `"6"` | Amount of characters of the captcha |
| `height` | `"100"` | Height of the captcha in pixels |
| `width` | `"300"` | Width of the captcha in pixels |
| `colors` | `"#32cf7e"` | Colors of the captcha text as hex comma separated values |

### With bitsocial-cli

Install the challenge package:

```bash
bitsocial challenge install @bitsocial/captcha-canvas-challenge
```

Edit your community to use the challenge:

```bash
bitsocial community edit your-community.bso \
  '--settings.challenges[0].name' @bitsocial/captcha-canvas-challenge \
  '--settings.challenges[0].options.characters' '6' \
  '--settings.challenges[0].options.width' '300' \
  '--settings.challenges[0].options.height' '100' \
  '--settings.challenges[0].options.colors' '#32cf7e'
```

See the [bitsocial-cli documentation](https://github.com/bitsocialnet/bitsocial-cli) for full CLI reference.

## Scripts

```bash
npm run typecheck
npm run build
npm test
```
