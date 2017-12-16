var comicCon = ['batman', 'superman', 'joker']

function renderButtons() {
  $("#buttonPanel").empty();

  for (var i = 0; i < comicCon.length; i++) {
    var button = $("<button>");
    button.addClass("comicButton");
    button.attr("data-comic", comicCon[i]);
    button.text(comicCon[i]);

    $("#buttonPanel").append(button);
  }
}

$("#add-comic").on("click", function(event) {
  event.preventDefault();

  var comic = $("#comic-input").val().trim();

  comicCon.push(comic);
  $("#comic-input").val("");

  renderButtons();
});

function getComicGifs() {
  var comicName = $(this).attr("data-comic");
  var comicStr = comicName.split(" ").join("+");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comicStr +
                 "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function(result) {
    var dataArray = result.data;

    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("comicGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#gifPanel").append(newDiv);
    }
  });
}

function animateComic() {
  var state = $(this).find("img").attr("data-state");

  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".comicButton", getComicGifs);

$(document).on("click", ".comicGif", animateComic);
