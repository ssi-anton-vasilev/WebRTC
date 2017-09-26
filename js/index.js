(function() {
  AdapterJS.options.forceSafariPlugin = true;
  AdapterJS.webRTCReady(function(isUsingPlugin) {
    var video = document.getElementById('video'),
      audio = document.getElementById('audio'),
      vendorURL = window.URL || window.webkitURL,
      canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d');

    if (isUsingPlugin) {
      console.log('Using plugin!');
    } else {
      console.log('Native webRTC support');
    }

    navigator.getMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;
    // capture video
    navigator.getMedia({
      video: true,
      audio: true
    }, function(stream) {
      if (!isUsingPlugin) {
        video.srcObject = stream;
      } else {
        attachMediaStream(video, stream);
      }
      video.play();
    }, function(error) {
      console.log('error: ', error);
    });

    video.addEventListener('play', function() {
      draw(this, context, 400, 300);
    }, false);

    function render() {
      requestAnimationFrame(render);
    }

    function draw(video, context, width, height) {
      var image, data;
      context.drawImage(video, 0, 0, width, height);
      render();
      setTimeout(function() {
        draw(video, context, width, height);
      }, 41);
    }
  });
})();
