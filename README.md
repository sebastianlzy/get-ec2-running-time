# Context
Currently, AWS cost explorer takes ~1 days to be updated with latest information. 
In order to have a faster turn around time in estimating cost, we can record the running time of ec2 instances.
Combined with estimated information of the cost per instance * duration, we will be able to derive the final estimated cost 

# Objective
To get an estimate on cost for a single AWS batch job

# How to start
## When a batch job is started
1. run `npm run start:recording` to start recording

## When a batch job is done
1. `ctrl c` to kill the previous run
2. run `npm run get:cost` to get the final cost

# Things to note
1. You will need to update the cost information in `get-cost-based-on-recordings.js` to reflect the latest pricing


