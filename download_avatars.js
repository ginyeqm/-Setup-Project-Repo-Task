var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  var callContributors = JSON.parse(result);
  callContributors.forEach(function(contributor){
    console.log(contributor.avatar_url);
  })
});

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}



