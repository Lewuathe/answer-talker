var util = require('util');
var Twitter = require('twitter');

function AnswerTalker() {
    var self = this;

    self.client = new Twitter({
        consumer_key: process.env["NODE_CONSUMER_KEY"],
        consumer_secret: process.env["NODE_CONSUMER_SECRET"],
        access_token_key: process.env["NODE_ACCESS_TOKEN_KEY"],
        access_token_secret: process.env["NODE_ACCESS_TOKEN_SECRET"]
    });

}

AnswerTalker.prototype.tweet = function(text, params, callback) {
    var self = this;
    self.client.updateStatus(text, params, function(data) {
        console.log(util.inspect(data));
        callback(data);
    });
}

AnswerTalker.prototype.getMentions = function(callback) {
    var self = this;
    self.client.get('/statuses/mentions_timeline.json', {include_entities:true},
                    function(data) {
                        callback(data);
                    });
}

module.exports = AnswerTalker;