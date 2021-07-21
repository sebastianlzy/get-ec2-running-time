

async function main(){
    const fs = require('fs');
    const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");

    const client = new EC2Client({ region: "ap-southeast-1" });

    const command = new DescribeInstancesCommand({
        Filters: [{
            Name: "tag:aws:autoscaling:groupName",
            Values: ["AWSBatch-spot-ce-asg-9f9a9643-0767-3a55-bedc-6ca76341492f"]
        }],
        MaxResults: 1000
    });
    const responses = await client.send(command)
    const instances = {}
    responses.Reservations.forEach((response) => {

        
        
        const stateTransitionReason = response.Instances["0"]["StateTransitionReason"]
        const timeOfTermination = stateTransitionReason.match(/\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}\:\d{2}/g)


        instances[response.Instances["0"]["InstanceId"]] = {
            instanceType:response.Instances["0"]["InstanceType"],
            launchTime: response.Instances["0"]["LaunchTime"],
            terminationTime: timeOfTermination
        }
    })


    const text = fs.readFileSync('/Users/leesebas/workplace/get-ec2-running-time/instances.json','utf8')
    const newText = JSON.stringify({
        ...JSON.parse(text),
        ...instances
    })
    console.log(`Number of instances used: ${Object.keys(JSON.parse(newText)).length}`)
    const write = fs.writeFileSync('/Users/leesebas/workplace/get-ec2-running-time/instances.json', newText)
    console.log(newText)
    // fs.readFile('/Users/leesebas/workplace/get-ec2-running-time/instances.json',  function(err, data) {
    //     fs.writeFile('instances.json', {
    //         ...data,
    //         instances
    //     }, function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });
    // });


    // console.log(JSON.stringify(instances))
}


setInterval(async () => {
    console.log(Date.now())
    await main()
}, 5000)

