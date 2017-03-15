var CronJob = require('cron').CronJob;

var job = new CronJob({
    cronTime : '* * * * * *',
    onTick : function(){
        console.log("event is executing");
    },
    start : false ,
    timeZone : 'America/Los_Angeles'
});
job.start();