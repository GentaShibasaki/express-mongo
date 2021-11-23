const async = require("async");

const queue = async.queue((task, callback) => {
  callback();
}, 2);

queue.error((err, task) => {
  console.log(
    `Task experienced an error, the error is ${err} happened at ${task}`
  );
});

module.exports = queue;
