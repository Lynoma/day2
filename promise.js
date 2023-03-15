const toolbox = require('./toolbox');
const EventEmitter = require('events');
const yup = require('yup');
const dayjs = require('dayjs');

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

function exo3() {
    let userSchema = yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required().positive().integer(),
        email: yup.string().email(),
        password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/),
    });

    const person = {
        name: "Philippes",
        age: 18,
        email: "email.test@gmail.com",
        password: "testtest123"
    };

    userSchema.validate(person).then((value) => {
        console.log('User is valid');
    }).catch((err) => {
        console.log('User is invalid');
    });

    console.log(dayjs().format('YYYY/MM/DD'));
}

// exo1(parseInt(process.argv[2]));
// exo2();
exo3();