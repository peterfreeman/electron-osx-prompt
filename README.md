# electron-osx-prompts

Electron macOS-style prompts. Intended for use on a mac.\
Behaves like a modal that blocks other interaction.

<img src="https://i.imgur.com/l7rcbrE.png">

## Install

```
$ npm install electron-osx-prompt
```

## Usage

```js
// From renderer or main process, doesn't matter
const userPrompt = require('electron-osx-prompt');

const icon = __dirname + '/icon.png';

userPrompt('Label text', 'Placeholder text', icon)
  .then(input => {
    console.log(input);
  })
  .catch(err => {
    console.log(err);
  });
```

## Options

You can change the label text and the textbox placeholder text.\
You can also provide a PNG or JPEG image for the prompt icon. It's size should be about 60 x 60 px.

### userPrompt([label, placeholder, icon])

| Parameter |   Type  | Description | Default  |
|--------------|-------|------------------------------------------------|---------|
| `label` | `string` | The label text of the input field. | `'Please enter a value'` |
| `placeholder`    | `string`  | The placeholder text inside the input field.   | `''` |
| `icon`    | `string`  | Path to your custom (app) icon.   | Electron's default icon. |

Returns a Promise with the user input. Clicking `Cancel` will return `null`.

## Licence

MIT © Peter Freeman

Uses css from `photon` by [@connors](https://github.com/connors)
