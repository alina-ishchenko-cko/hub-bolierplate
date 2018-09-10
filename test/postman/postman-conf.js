const newman = require('newman'),
      file = require('./postman-tests.json');
var env = process.env.POST_ENV.toUpperCase();

for (var i in file.tests) {
    var test = file.tests[i];
  //  var environment = file.tests[i].environment;
  var environment = env + '.automation.postman_environment.json';

    newman.run({
        collection: test.url,
        environment: environment,
        reporters: 'cli'
    }, function (err) {
        if (err) throw err;

        console.log('collection run complete!');
    });
}
