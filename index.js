var numberSeqvence = [];
var level = 1;
var userEnteredSqvence = [];
var COLORS = ["green", "red", "yellow", "blue"];

$("#level-title").text("press A to start OR restart the game !")


$(document).keypress(function(event) {
  if (event.key == "a") {
    numberSeqvence = []
    userEnteredSqvence = []
    level = 1
    nextSeqvence()
    $("#level-title").text("LEVEL " + level)
  }
})

$(".btn").click(function EventListnersAdder() {
    var color = $(this).attr("id")
    userEnteredSqvence.push(color)

    pressed(color)

    isWin(userEnteredSqvence.length - 1)
    console.log("clicked " + color)
  })

function nextSeqvence() {
  userEnteredSqvence = []
  var randomNum = Math.floor(Math.random() * 4)
  var color = COLORS[randomNum]
  numberSeqvence.push(color)
  animator(color)
}

function animator(color) {
  $("#" + color).fadeOut();
  setTimeout(function(){
    $("#" + color).fadeIn()
  }, 100)
  console.log(color)

  var audio = new Audio("sounds/" + color + ".mp3")
  audio.play();
}

function pressed(colorid) {
  $("#" + colorid).addClass("pressed")
  setTimeout(function() {
    $("#" + colorid).removeClass("pressed");
  }, 100)
  var audio = new Audio("sounds/" + colorid + ".mp3")
  audio.play()
}


function isWin(current_level) {
  if (numberSeqvence[current_level] === userEnteredSqvence[current_level]) {
      if (numberSeqvence.length === userEnteredSqvence.length) {
        setTimeout(function () {
          nextSeqvence();
        }, 1000)
        level++
        $("#level-title").text("LEVEL " + level)
        console.log("you won !!!")
      }
  } else {
    animator("wrong")
    $("body").addClass("game-over")
    $("#level-title").text("Game Over, Please Any key to restart !")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}
