$(document).ready(function() {
  var x = 0;
  var color = ["#DD0000", "#FF6600", "#DDBB00", "#008800", "#0000AA", "#0077FF", "#6600CC"];

  function change() {
    var magic = color[x];
    $(".bg").css("background-color", magic);

    $(".qbox").css("color", magic);
    $(".btn").css("color", magic);
    if (x > 5) {
      x = 0;
    } else {
      x += 1;
    }
  }

  $(".btn").click(function() {
    $(".words").fadeOut();
    $.getJSON("https://random-quote-generator.herokuapp.com/api/quotes/", function(json) {
      var html = "";
      var box = [];
      var qa = "";
      json.forEach(function(val) {
        if (val.hasOwnProperty('quote')) {
          box.push(val);
        }
      });
      var n = Math.floor(Math.random() * box.length);
      json = json.filter(function(val) {
        return (val === box[n]);
      });
      json.forEach(function(val) {
        html += '"' + val.quote + '"<br><br>-<em>' + val.author + "</em>";
        qa = '"' + val.quote + '" -' + val.author;
      });
      $('.qbox p').fadeOut();
      $('button b').fadeOut();
      $('.bg').fadeOut('slow', function(){
        change();
        $('.qbox p').html(html).fadeIn();
        $('.bg').fadeIn();
        $('button b').fadeIn();
      });
      $('a').attr("href", 'https://twitter.com/intent/tweet?text=' + qa);
    });
  });
});
