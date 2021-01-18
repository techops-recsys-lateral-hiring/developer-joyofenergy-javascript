# Welcome to PowerDale

PowerDale is a small town with around 100 residents. Most houses have a smart meter installed that can save and send information about how much energy a house has used.

There are three major providers of energy in town that charge different amounts for the power they supply.

-   _Dr Evil's Dark Energy_
-   _The Green Eco_
-   _Power for Everyone_

# Introducing JOI Energy

JOI Energy is a new start-up in the energy industry. Rather than selling energy they want to differentiate themselves from the market by recording their customers' energy usage from their smart meters and recommending the best supplier to meet their needs.

You have been placed into their development team, whose current goal is to produce an API which their customers and smart meters will interact with.

Unfortunately, two members of the team are on annual leave, and another one has called in sick! You are left with another ThoughtWorker to progress with the current user stories on the story wall. This is your chance to make an impact on the business, improve the code base and deliver value.

## Story Wall

At JOI energy the development team use a story wall or Kanban board to keep track of features or "stories" as they are worked on.

The wall you will be working from today has 7 columns:

-   Backlog
-   Ready for Dev
-   In Dev
-   Ready for Testing
-   In Testing
-   Ready for sign off
-   Done

Examples can be found here [https://leankit.com/learn/kanban/kanban-board/](https://leankit.com/learn/kanban/kanban-board/)

## Users

To trial the new JOI software 5 people from the JOI accounts team have agreed to test the service and share their energy data.

| User    | Smart Meter ID  | Power Supplier        |
| ------- | --------------- | --------------------- |
| Sarah   | `smart-meter-0` | Dr Evil's Dark Energy |
| Peter   | `smart-meter-1` | The Green Eco         |
| Charlie | `smart-meter-2` | Dr Evil's Dark Energy |
| Andrea  | `smart-meter-3` | Power for Everyone    |
| Alex    | `smart-meter-4` | The Green Eco         |

These values are used in the code and in the following examples too.

## Getting started
❗️ The project requires at least node v10.
### Install dependencies

```
npm install
```

### Run the application


```console
$ npm start
```
_Application will start on port `8080`._

### Run the application with reload on save

```console
$ npm run dev
```
_Application will start on port `8080`._

### Run the tests

```console
$ npm t
```

_Tests will run in watch mode._


## API

Below is a list of API endpoints with their respective input and output. Please note that the application needs to be running. For more information about how to run the application, please refer to [run the application](#run-the-application) section below.

---
### ➡️
### Get readings
```
GET /readings/read/<smartMeterId>
```

Parameters

| Parameter      | Description       |
| -------------- | ----------------- |
| `smartMeterId` | Id of smart meter |

### Example with CURL

```console
$ curl "http://localhost:8080/readings/read/smart-meter-0"
```

Example output

```json
[
  { "time": 1607686125, "reading": 0.0503 },
  { "time": 1607685125, "reading": 0.0213 },
  ...
]
```

---
### ➡️
### Store readings
```
POST /readings/store
```

Payload should be in this format

```json
{
    "smartMeterId": <smartMeterId>,
    "electricityReadings": [
        { "time": <time>, "reading": <reading> },
        { "time": <time>, "reading": <reading> },
        ...
    ]
}
```

Parameters

| Parameter      | Description                     |
| -------------- | ------------------------------- |
| `smartMeterId` | Id of the smart meter           |
| `time`         | The time when the reading taken |
| `reading`      | The measured kW load            |

Example readings

| Date (`Epoch time`) | Reading (`kW`) |
| ------------------- | -------------: |
| `1607686125`        |         0.0503 |
| `1607685125`        |         0.0213 |

### Example with CURL

```console
$ curl \
  -X POST \
  -H "Content-Type: application/json" \
  "http://localhost:8080/readings/store" \
  -d '{"smartMeterId":"smart-meter-0","electricityReadings":[{"time":1607686125,"reading":0.0503},{"time":1607685125,"reading":0.0213}]}'
```

The above command returns 200 OK and all the readings for the smart meter.

---
### ➡️
### View current price plan and compare usage cost against all price plans

Endpoint

```
GET /price-plans/compare-all/<smartMeterId>
```

Parameters

| Parameter      | Description       |
| -------------- | ----------------- |
| `smartMeterId` | Id of smart meter |

### Example with CURL

```console
$ curl "http://localhost:8080/price-plans/compare-all/smart-meter-0"
```

Example output

```json
{
  "smartMeterId": "smart-meter-0",
  "pricePlanComparisons": [
    {
      "price-plan-0": 1.3096450044345258
    },
    {
      "price-plan-1": 0.2619290008869052
    },
    {
      "price-plan-2": 0.1309645004434526
    }
  ]
}
```

---
### ➡️
### View recommended price plans for usage

Endpoint

```
GET /price-plans/recommend/<smartMeterId>
```

Parameters

| Parameter      | Description       |
| -------------- | ----------------- |
| `smartMeterId` | Id of smart meter |


### Example with CURL

```console
$ curl "http://localhost:8080/price-plans/recommend/smart-meter-0"
```

Example output

```json
[
  {
    "price-plan-2": 0.00010327563922623473
  },
  {
    "price-plan-1": 0.00020655127845246946
  },
  {
    "price-plan-0": 0.0010327563922623473
  }
]
```


