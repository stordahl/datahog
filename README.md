# Datahog 🐷
Datahog is a template repo, configured to collect historical performance data on your products via Lighhouse CI & Github Actions.

## Setup

Click "Use this template" to clone this repo to your Github account. Ensure Github Actions are enabled on your repo, and follow the configuration guidelines below.

## Configuration

The only config you'll need to edit is the config object in `datahog.config.js`.

### Config Object

| Property | Description                                       | Type                                      |
|----------|---------------------------------------------------|-------------------------------------------|
| urls     | Full urls that you want to run Lighthouse against | `Array<string>`                           |
| runs     | Number of Lighthouse runs per page                | `number`                                  |
| output   | Formats to output data to                         | `Array<'json'>` (only JSON at the moment) |

## Development

Clone the repo to your local env, install dependancies and run 

```shell
# First install Lighthouse CI globally on your machine
npm install -g @lhci/cli@0.8.x
# Then install local deps
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
