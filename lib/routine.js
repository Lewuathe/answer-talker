var AnswerTalker = require('./AnswerTalker.js');
var plugins = require('./plugins');

function parse(text) {
    var re = /:([a-zA-Z]+)\.([a-zA-Z]+)/
    var ret = re.exec(text);
    if (ret) {
        var source = ret[1];
        var action = ret[2];
        return {source: source, action: action};
    } else {
        return null;
    }
}

function routine() {
    var talker = new AnswerTalker();
    talker.getMentions(function(data) {
        console.log(data.length);
        for(var i = 0; i < 1; i++) {
            var id = data[i]['id_str'];
            var inReplyToStatusId = data[i]['in_reply_to_status_id'];
            var screenName = data[i]['user']['screen_name'];
            var text = data[i]['text'];
            var ret = parse(text);
            if (ret) {
                var reply = plugins[ret.source][ret.action]();
                var params = {in_reply_to_status_id: id};
                talker.tweet('@' + screenName + ' ' + reply, params, function(data) {
                    console.log(data.id);
                });
            }
        }
    });
}

module.exports = routine;