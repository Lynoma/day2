const toolbox = require('./toolbox');
const EventEmitter = require('events');

var myPromise = (num) => {
  return new Promise((resolve, reject) => {
    console.log(num);
    if (num > 0) resolve(num);
    else reject(num);
  });
};

function exo1(number) {
  var finalNumber = 0;

  myPromise(number)
    .then((num) => {
      number = num;
      number += 10;
      number = number * 5;
    })
    .catch((num) => console.log("The number should be positive: " + num))
    .finally(() => {
      console.log("number is equal to " + number);
    });
}

function exo2() {
    var myUrl = toolbox.splitUrl("http://www.mymainsite.com/somepath/path2/path3/path4");
    console.log(myUrl);

    console.log(toolbox.getOsInfo());
    console.log(toolbox.findPath());

    var eventEmitter = new EventEmitter();
    eventEmitter.on('yell', () => console.log("HEYYYYYYY !"));
    toolbox.emitThis(eventEmitter, 'yell');
}

// exo1(parseInt(process.argv[2]));
exo2();