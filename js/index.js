var bg = {
  night: {
    Partly: "http://cdn.weatheravenue.com/img/background/background-night.jpg",
    Overcast: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/pjHZZl4/night-cloudy-sky-natural-speed-of-the-clouds_svukdfr2_thumbnail-full01.png",
    Cloudy:
      "http://pre03.deviantart.net/cd6a/th/pre/i/2008/239/6/5/cloudy_night_sky_by_ramosburrito.jpg",
    Clear: "http://clear-night.com/img/clear-night-placeholder.jpg"
  },
  day: {
    Sunny:
      "https://report.az/storage/news/2d24481fa1ef4a20e1a703f88f8400c4/aee96c6d-d63a-4f9a-897e-3213b477b5fe.jpg",
    Patchy: "https://c1.staticflickr.com/7/6125/6001185409_9d8c770255_b.jpg",
    Partly:
      "https://ekonomski.mk/wp-content/uploads/2015/02/stabilno-vreme-so-umerena-oblachnost-184186.jpg",
    Light:
      "http://vunature.com/wp-content/uploads/2017/01/landscapes-nature-weather-sky-lightning-clouds-storm-rain-wallpaper-hd-for-phone-1920x1080.jpg",
    Moderate: "http://wlex.images.worldnow.com/images/8306772_G.jpg"
  }
};

function getTemp(location) {
  $.getJSON(
    "https://api.apixu.com/v1/current.json?key=cb76266898e44311ac560536172707&q=" +
      location,
    function(data) {
      var city = "",
        weather = "",
        condition = "",
        temp = "",
        test = "",
        str = "";

      fah = Math.round(data.current.temp_f);
      condition = data.current.condition.text;
      dayCheck = data.current.is_day;
      icon = data.current.condition.icon;
      icon = icon.slice(2);
      console.log(condition);
      test = condition.split(" ");
      str = test[0];

      var cel = Math.round((fah - 32) * (5 / 9));
      var html = "";

      html += "<h1> Current Temperature for: " + location + "</h1>";
      html += "<div class='container' id='con'>";
      html += "<h1 id='fah'>" + fah + " F</h1>";
      $("#f").prop("disabled", true);
      html += "</div>";
      html += "<img src='" + "https://" + icon + "' alt='" + condition + "'>";
      html += "<h2>" + condition + "</h2>";
      $(".weather").html(html);

      if (dayCheck == 0) {
        $("body").css("background-image", 'url("' + bg.night[str] + '")');
      } else {
        $("body").css("background-image", 'url("' + bg.day[str] + '")');
      }

      $("#c").click(function() {
        $(this).prop("disabled", true);
        $("#f").prop("disabled", false);
        $("#fah").remove();
        $("#con").append("<h1 id='cel'>" + cel + " C</h1>");
      });
      $("#f").click(function() {
        $(this).prop("disabled", true);
        $("#c").prop("disabled", false);
        $("#cel").remove();
        $("#con").append("<h1 id='fah'>" + fah + " F</h1>");
      });
    }
  );
}
$(document).ready(function() {
  $.getJSON("https://ipapi.co/json/", function(data) {
    city = data.city;
    getTemp(city);
  });
});