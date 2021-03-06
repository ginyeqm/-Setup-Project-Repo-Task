var ss =process.argv
var request = require('request');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

if(process.argv.length === 4){
  getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
    var callContributors = JSON.parse(result);
    callContributors.forEach(function(contributor){
      downloadImageByURL(contributor.avatar_url, "./avatars/"+contributor.login+".jpg");
    })
  })
}else{
  console.log("you did not put two arguments")
};

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function(err, res, body){
    cb(err, body);
  });
}


function downloadImageByURL(url, filePath) {
request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}


