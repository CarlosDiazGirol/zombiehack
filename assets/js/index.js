window.onload = function() {
  var canvas = document.getElementById('biohazard');
  $("#start").click(function() {
    $("#startFloat").css('top','-100%');
    setTimeout(function() {
      new Game(canvas).start();
    }, 0);
  });
};