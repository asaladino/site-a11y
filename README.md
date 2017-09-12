# pa11y with Login

Use pa11y with a login or without.

## Usage

`npm install`

Create a urls and options json file in config.

Then set the variables in `index.js`

```ecmascript 6
// Number of urls to check at a given time.
const concurrency = 1;
// Corresponds to the config option and url files to use.
const env = '-sample';
// What url do you want to start on?
const startUrl = 0;
// How many urls do you want after the start url?
const howManyUrls = 1;
```

Then run:

```
node index.js
```