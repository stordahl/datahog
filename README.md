# Datahog 🐷
Datahog is a template repo, configured to collect historical performance data on your products via Lighhouse CI & Github Actions.

## Setup

Click "Use this template" to clone this repo to your Github account. Ensure Github Actions are enabled on your repo, and follow the configuration guidelines below.

## Configuration

The only config you'll need to edit is the config object in `datahog.config.js`.

### Config Object

| Property | Description                                       | Type                      |
|----------|---------------------------------------------------|---------------------------|
| urls     | Full urls that you want to run Lighthouse against | `Array<string>`           |
| runs     | Number of Lighthouse runs per page                | `number`                  |
| output   | Formats to output data to                         | `Array<'json' \| 'html'>` |

## Development

Clone the repo to your local env, install dependancies and run 

```shell
npm i && npm run lh
```

To run the parser without running Lighthouse again, run

```shell
npm run lh:parse
```

To clean the `.lighthouseci` directory, run

```shell
npm run lh:clean
```
