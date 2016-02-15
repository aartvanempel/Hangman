// ready
$(document).ready(function() {
  // globale variabelen
  var word;
  var letters;
  var guessedLetters = [];
  var guessesLeft = 7;
  $(".guess-count span").text(guessesLeft);

  // type een woord om te beginnen
  $(".word-input").focus();
  $(".word-input").keyup(function() {
    if (!$(".word-input").val()) {
      $(".start").removeClass("button-active");
    } else {
      $(".start").addClass("button-active");
    }
  });

  // klik op start
  $(".start").click(function(e) {
    e.preventDefault();
    word = $(".word-input").val();
    letters = word.split("");

    $(".word-input").hide();
    $(".start").hide();

    $(".guess-caption").show();

    $.each(letters, function() {
      $("<span class='star'>*</span>").appendTo(".stars");
      $(".stars").addClass("show-stars");
    });

    $(".guess-input").show();
  });

  // voer een letter in
  $(".guess-input").focus(function() {
    $(this).select();
    $(".guess-input").addClass("guess-input-small").attr("placeholder", "");
  });

  // maak 'raad-button' zichtbaar
  $(".guess-input").keyup(function() {
    if (!$(".guess-input").val()) {
      $(".guess").removeClass("button-active");
    } else {
      $(".guess").addClass("button-active");
    }
  });

  // raad een letter
  $(".guess").click(function(e) {
    e.preventDefault();
    //
    $(".guess-input").focus();
    // als je een letter al geprobeerd hebt
    if ($.inArray($(".guess-input").val(), guessedLetters) != -1) {
      $(".already-guessed-letters").addClass("message-active");
    // als de geraden letter in het woord zit
    } else if ($.inArray($(".guess-input").val(), letters) != -1) {
      var letterIndex = [];
      $.each(letters, function(index, value) {
        if (value == $(".guess-input").val()) {
          letterIndex.push(index);
        }
      });
      // laat de letter zien op de juiste positie
      $.each(letterIndex, function(index, value) {
        $(".star:eq("+ value +")").text($(".guess-input").val()).addClass("correct-letter");
      });
      guessedLetters.push($(".guess-input").val());
      // als je het woord hebt geraden
      if ($(".star").text() == word) {
        $(".guess-count").text("Je hebt gewonnen!");
        $(".guessed-word h1").text("Jaa het woord is " + word + "!");
        $(".guessed-word").addClass("message-active");
      }
    // als je een foute letter raadt
    } else {
        guessesLeft--;
      if (guessesLeft == 0) {
        gameOver();
      }
      $(".wrong").addClass("wrong-active");
      $("<span class='wrong-letter'>"+ $(".guess-input").val() +"</span>").appendTo(".wrong");
      guessedLetters.push($(".guess-input").val());
      //
      $(".guess-count span").text(guessesLeft);
    }
  });

  // klik het message scherm weg
  $(".message").click(function() {
    $(this).removeClass("message-active");
    if (!$(this).hasClass("already-guessed-letters")) {
      $(".game").remove();
      $(".restart").addClass("button-active animated tada");
    } else {
      $(".guess-input").focus();
    }
  });

  // game over screen
  function gameOver() {
    $(".guess-count").text("Je hebt verloren!");
    $(".game-over").addClass("message-active");
    $(".game-over h2 span").text(word);
    $(".game-over h2").addClass("animated bounceInDown");
  }

}); // ready
