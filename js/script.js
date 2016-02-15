// ready
$(document).ready(function() {
  // globale variabelen
  var word;
  var letters;
  var guessedLetters = [];

  // type een woord om te beginnen
  $(".word-input").keyup(function() {
    if (!$(".word-input").val()) {
      $(".start").removeClass("button-active");
    } else {
      $(".start").addClass("button-active");
    }
  });

  // klik op start
  $(".start").click(function() {
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
  $(".guess").click(function() {

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
      $.each(letterIndex, function(index, value) {
        $(".star:eq("+ value +")").text($(".guess-input").val()).addClass("correct-letter");
      });
      guessedLetters.push($(".guess-input").val());
      // als je het woord hebt geraden
      if ($(".star").text() == word) {
        $(".guessed-word h1").text("Jaa het woord is " + word + "!!");
        $(".guessed-word").addClass("message-active");
      }
    // als je een foute letter raadt
    } else {
      $(".wrong").addClass("wrong-active");
      $("<span class='wrong-letter'>"+ $(".guess-input").val() +"</span>").appendTo(".wrong");
      guessedLetters.push($(".guess-input").val());
    }
  });

  // klik het message scherm weg
  $(".message").click(function() {
    $(this).removeClass("message-active");
  });

}); // ready
