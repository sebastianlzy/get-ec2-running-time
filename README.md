# Context
Currently, AWS cost explorer takes ~1 days to be updated with latest information. 
In order to have a faster turn around time in estimating cost, we can record the running time of ec2 instances.
Combined with estimated information of the cost per instance * duration, we will be able to derive the final estimated cost 

# Objective
To get an estimate on cost for a single AWS batch job

# How to start
## When a batch job is started
1. run `npm run start:recording` to start recording

```
{
  "i-0eda113ad8fbb530c": {
    "instanceType": "r4.4xlarge",
    "launchTime": "2021-07-19T05:50:34.000Z",
    "terminationTime": "2021-07-19 06:37:18"
  },
  "i-009ecfcd208e98b98": {
    "instanceType": "r4.4xlarge",
    "launchTime": "2021-07-19T06:14:13.000Z",
    "terminationTime": "2021-07-19 06:57:04"
  },
  "i-0e5bca325f59c4213": {
    "instanceType": "r4.4xlarge",
    "launchTime": "2021-07-19T06:49:54.000Z",
    "terminationTime": "2021-07-19 06:53:59"
  },
  "i-012b6900e3c8899c7": {
    "instanceType": "r4.4xlarge",
    "launchTime": "2021-07-19T06:35:31.000Z",
    "terminationTime": "2021-07-19 06:51:53"
  },
  "i-08acb111d3cfa462d": {
    "instanceType": "r4.2xlarge",
    "launchTime": "2021-07-19T07:25:04.000Z",
    "terminationTime": [
      "2021-07-19 07:33:09"
    ]
  },
  "i-0f9606d8713e0cfc3": {
    "instanceType": "r4.2xlarge",
    "launchTime": "2021-07-19T07:24:43.000Z",
    "terminationTime": [
      "2021-07-19 07:36:39"
    ]
  },
  "i-0475c83ece3dd95c3": {
    "instanceType": "r4.xlarge",
    "launchTime": "2021-07-19T07:24:42.000Z",
    "terminationTime": [
      "2021-07-19 07:28:57"
    ]
  },
  "i-0326d5a3946e57bce": {
    "instanceType": "r4.xlarge",
    "launchTime": "2021-07-19T07:24:43.000Z",
    "terminationTime": [
      "2021-07-19 07:26:56"
    ]
  },
  "i-0463acf9aa980b1fd": {
    "instanceType": "r4.2xlarge",
    "launchTime": "2021-07-19T07:29:16.000Z",
    "terminationTime": [
      "2021-07-19 07:33:10"
    ]
  },
  "i-0f64ddf96298f4f24": {
    "instanceType": "m4.4xlarge",
    "launchTime": "2021-07-19T07:30:20.000Z",
    "terminationTime": [
      "2021-07-19 07:33:10"
    ]
  },
  "i-04d32d7e9beeae444": {
    "instanceType": "r4.8xlarge",
    "launchTime": "2021-07-19T07:36:58.000Z",
    "terminationTime": [
      "2021-07-19 08:23:09"
    ]
  },
  "i-0f251d5c3aec4dc4b": {
    "instanceType": "r4.4xlarge",
    "launchTime": "2021-07-19T07:37:20.000Z",
    "terminationTime": [
      "2021-07-19 08:25:12"
    ]
  },
  "i-06575ad227f934128": {
    "instanceType": "r4.xlarge",
    "launchTime": "2021-07-19T07:24:43.000Z",
    "terminationTime": [
      "2021-07-19 07:26:56"
    ]
  }
}
```

## When a batch job is done
1. `ctrl c` to kill the previous run
2. run `npm run get:cost` to get the final cost

```
----------------------------------------------------------
startTime:  2021-07-19T16:48:28+08:00
endTime:  2021-07-19T16:56:40+08:00
r4.2xlarge was launched for 492 seconds and cost $1.28658
----------------------------------------------------------
startTime:  2021-07-19T16:48:07+08:00
endTime:  2021-07-19T17:45:58+08:00
r4.2xlarge was launched for 3471 seconds and cost $9.076665
----------------------------------------------------------
startTime:  2021-07-19T16:48:07+08:00
endTime:  2021-07-19T16:50:11+08:00
r4.xlarge was launched for 124 seconds and cost $0.15996
----------------------------------------------------------
startTime:  2021-07-19T16:48:07+08:00
endTime:  2021-07-19T16:52:20+08:00
r4.xlarge was launched for 253 seconds and cost $0.32637
----------------------------------------------------------
startTime:  2021-07-19T16:57:52+08:00
endTime:  2021-07-19T17:45:58+08:00
m4.4xlarge was launched for 2886 seconds and cost $16.33476
----------------------------------------------------------
startTime:  2021-07-19T16:59:33+08:00
endTime:  2021-07-19T17:14:20+08:00
m4.10xlarge was launched for 887 seconds and cost $9.208538333333333
----------------------------------------------------------
startTime:  2021-07-19T16:48:07+08:00
endTime:  2021-07-19T16:50:12+08:00
r4.xlarge was launched for 125 seconds and cost $0.16124999999999998
----------------------------------------------------------
Total cost: $36.55412333333334

```

# Things to note
1. You will need to update the cost information in `get-cost-based-on-recordings.js` to reflect the latest pricing

