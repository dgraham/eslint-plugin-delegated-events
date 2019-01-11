# eslint-plugin-delegated-events

Disallow delegating high-frequency events.

The [delegated-events][events] library registers all event listeners on
`document`, using selectors to determine an observer's interest in each
event.

[events]: https://github.com/dgraham/delegated-events

```js
on('click', '.js-button', function(event) {
  console.log('clicked', this)
})
```

This is appropriate for most events, like `click` and `change`, but
events fired at a high rate need to be directly bound with
`element.addEventListener` to avoid performance problems.

This lint rule disallows delegated event listeners on the following events:

- input
- keydown
- keypress
- keyup
- mouseout
- mouseover
- mousemove
- scroll

# Top level listener registration

Registering a delegated event listener by calling `on` in a conditional branch,
loop, or function can result in duplicate registrations and invoking the
listener multiple times. The `global-on` lint rule requires `on` to be called
only in the top level module scope.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-delegated-events`:

```
$ npm install eslint-plugin-delegated-events --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-delegated-events` globally.

## Usage

Add `delegated-events` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "delegated-events"
  ],
  "rules": {
    "delegated-events/global-on": 2,
    "delegated-events/no-high-freq": 2
  }
}
```

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
