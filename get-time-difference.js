const moment = require('moment')

const instances = require('./instances.json')



const pricing = {
    "r4.xlarge": "0.0774",
    "r4.2xlarge": "0.1569",
    "r4.4xlarge": "0.3015",
    "r4.8xlarge": "0.522",
    "m4.4xlarge": "0.3396",
    "m4.10xlarge": "0.6229",
}

const calculateCost = (seconds, instanceType) => {
    const pricePerSecond = pricing[instanceType]/60
    return seconds * pricePerSecond

}

const getTimeLapse = (instance) => {

    const startTime = moment(instance.launchTime)
    const terminationTime = instance.terminationTime ? instance.terminationTime[0] : null
    const endTime = moment.utc(terminationTime).local()
    const threshold = moment.utc("2021-07-19T07:20:00.000Z").local()


    // console.log("startTime > threshold: ", startTime.isAfter(threshold))
    // console.log("endTime.isValid(): " , endTime.isValid())
    const isAfterFifteenTwenty = startTime.isAfter(threshold)

    if (isAfterFifteenTwenty && endTime.isValid()) {
        console.log("----------------------------------------------------------")
        console.log("startTime: ", startTime.format())
        console.log("endTime: ", endTime.format())

        let billingInSeconds = endTime.diff(startTime, 'seconds')
        billingInSeconds = billingInSeconds > 60 ? billingInSeconds : 60
        console.log(`${instance.instanceType} was launched for ${billingInSeconds} seconds and cost $${calculateCost(billingInSeconds, instance.instanceType)}`);

        return calculateCost(billingInSeconds, instance.instanceType)
    }

    return 0

}

// const firstInstance = Object.keys(instances)[1]
// getTimeLapse(instances[firstInstance])

let totalCost = 0
Object.keys(instances).forEach((key) => {
    totalCost += getTimeLapse(instances[key])
})
console.log("----------------------------------------------------------")
console.log(`Total cost: $${totalCost}`)