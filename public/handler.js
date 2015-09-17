window.onload = function () { 
  var room = location.search && location.search.split('?')[1];

  var webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remotes',
      autoRequestMedia: true,
      log: true
    });

  webrtc.on('readyToCall', function() {
    if (room) webrtc.joinRoom(room);
  });


  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 30; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function setRoom(name) {
    $('#form').remove();
    $('#roomLink').text('Room Sharing Link: ' + location.href);
    $('body').addClass('active');
  }

  if (room) {
    setRoom(room);
  } else {  
    $('#new').click(function(e) {
      e.preventDefault();
      var val = makeid().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
      webrtc.createRoom(val, function(err, name) {
        var newUrl = location.pathname + '?' + name;
        if (!err) {
          history.replaceState({foo: 'bar'},null, newUrl);
          setRoom(name);
        }
      });
      return false;
    });
    $('#new_').click(function(e) {
      e.preventDefault();
      var val = makeid().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
      webrtc.createRoom(val, function(err, name) {
        var newUrl = location.pathname + '?' + name;
        if (!err) {
          history.replaceState({foo: 'bar'},null, newUrl);
          setRoom(name);
        }
      });
      return false;
    });
  }

  webrtc.on('videoAdded', function (video, peer) {
    var remotes = document.getElementById('remotes').children;
    console.log(remotes);
  });
}