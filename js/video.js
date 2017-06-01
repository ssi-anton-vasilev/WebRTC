(function() {
  var video = document.getElementById('video'),
      vendorURL = window.URL || window.webkitURL,
      canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      capturer = new CCapture({
        format: 'webm',
        framerate: 30,
        // verbose: true,
        // display: true,
        timeLimit: 10
      });

  navigator.getMedia = navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia;
  // capture video
  navigator.getMedia({
    video: true,
    audio: false
  }, function(stream) {
    video.src = vendorURL.createObjectURL(stream);
    video.play();
  }, function(error) {
    console.log('error: ', error);
  });

  video.addEventListener('play', function() {
    capturer.start();
    draw(this, context, 400, 300);
  }, false);

  function render() {
    requestAnimationFrame(render);
    capturer.capture(canvas);
  }

  function draw(video, context, width, height) {
    var image, data;
    context.drawImage(video, 0, 0, width, height);
    render();
    setTimeout(function() {
      draw(video, context, width, height);
    }, 41);
  }

  document.getElementById('capture').addEventListener('click', function() {
    capturer.stop();
    capturer.save();
  });
})();
