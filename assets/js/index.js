window.onload = function() {
  var canvas = document.getElementById('biohazard');
  $("#start").click(function() {
    $("#startFloat").hide();
    setTimeout(function() {
      new Game(canvas).start();
    }, 0);
  });
};