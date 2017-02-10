require('es6-promise').polyfill();
require('isomorphic-fetch');
require('process');

var fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}
var dictionary = new Promise( (resolve) => {
  readJSONFile(process.cwd() + '/dictionary.json', (data) => {
    console.log(data);
    resolve(data);
  });
});

var generate = function(req, res, next) {
  console.log(req.query);
  var loremipsum = '';
  dictionary.then((dict) => {
    loremipsum += dict.starting_sentence + " ";
    if (req.query.type==="words") {
      for (var i = 0; i <= Number(req.query.count)-1; i++) {
        loremipsum += dict.words[Math.floor(Math.random() * dict.words.length)];
        if (i < Number(req.query.count)-1) {
          loremipsum += " ";
        } 
      }
    }
    if (req.query.type === "sentences") {
      for (var i = 0; i <= Number(req.query.count)-1; i++) {
        for (var j = 0; j <= Number(req.query.count)-1; j++) {
          loremipsum += dict.words[Math.floor(Math.random() * dict.words.length)];
          loremipsum += j < Number(req.query.count)-1 ? " " : "";
        }
        loremipsum += ". "
      }
    }
    res.send(loremipsum);
  });
};


module.exports = generate;