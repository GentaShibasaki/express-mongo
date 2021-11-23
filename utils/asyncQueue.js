const async = require("async");

const queue = async.queue((task, callback) => {
  console.log("Start queue task");
  callback();
}, 2);

queue.drain(() => {
  console.log("Finished all queue tasks!");
});

queue.error((err, task) => {
  console.log(
    `Task experienced an error, the error is ${err} happened at ${task}`
  );
});

module.exports = queue;
