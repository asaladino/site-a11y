# Site A11y

Uses [pa11y](https://github.com/pa11y/pa11y) with a login or without. This app works in conjunction
with [site-index](https://github.com/asaladino/site-index).

## Usage

```
./site-a11y --domain codingsimply.com --output /some/report/directory
```

```
Site A11y

  Generates accessibility reports for a domain.

Options

  --domain www.domain.com   (Required) Domain to run a11y reports on.
  --output file             (Required) Folder to output the reports to.
  --verbose                 Output information on the reporting.
  --remote                  Use url from index else html from index will be used.
  --help                    Print this usage guide.
```