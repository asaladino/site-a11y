# Site A11y

Use [pa11y](https://github.com/pa11y/pa11y) with a login or without. This app works in conjunction
with [site-index](https://github.com/asaladino/site-index).

## Usage

`npm install`

Create a urls and options json file in config.

Then create 2 json files in config with the convention:
```
options-test.json
urls-test.json
```

Where `test` can be any name that describes the environment. 

The `options-test.json` file might look like:
```
{
  "wait": 6000,
  "standard": "WCAG2AA",
  "ignore": [
    "notice", "warning"
  ],
  "actions": [
  ],
  "pa11yLoginOptions": {
    /* Number of urls to check at a given time. */
    "concurrency": 1,
    /* What url do you want to start on? */
    "startUrl": 0,
    /* What url do you want to end on? */
    "endUrl": 1
  }
}
```
And `urls-test.json` might look like:

```
[
  {
    "name": "www.codingsimply.com",
    "url": "https://www.codingsimply.com",
    /* a fragment can be used to indentify when a login redirect occurred. example: %23done  */
    /* note that # is encoded as %23 or the redirect won't work. */
    "fragment": ""
  }
]
```

Then run:

```
node index.js -test
```