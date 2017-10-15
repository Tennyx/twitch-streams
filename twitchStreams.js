var ellip = function(str){
  if (str.length > 50){
    str = str.substr(0, 50) + '...' 
    return str
  }
  else{
    return str
  }
};

$(document).ready(function() {
 
  var streamList = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "ESL_SC2", "brunofin", "comster404"];
  
  streamList.forEach(function(user){
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + user + "?callback=?",  function(json){
      var jstring = JSON.stringify(json)
      if(jstring[3] == 'r'){                      // 'r' being 3rd indice in 'error'
        $("#" + user).css({"opacity": "0.5","font-style": "italic", "color":"white", "border-color": "white"});
        $("#d" + user).html("<em>Account Closed or Does Not Exist</em>");
      }
      else{
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?", function(json2){
          if (json2['stream']){
            $("#" + user).css({"background": "#5DC44C"});
            var game = json2.stream.game;
            var status = json2.stream.channel.status;
            if (game == false){
              game = "Unknown Game";
            }
            if (status == false){
              status == "No Description Available";
            }
            $("#d" + user).html(ellip(game + ' | ' + status));
      }
    }); 
    }
  });
 }); 
});  