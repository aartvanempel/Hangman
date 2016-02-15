// ready
$(document).ready(function() {
  // globale variabelen
  var word;
  var letters;

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
    // als de geraden letter in het woord zit
    if ($.inArray($(".guess-input").val(), letters) != -1) {
      var letterIndex = [];
      $.each(letters, function(index, value) {
        if ( value == $(".guess-input").val() ) {
          letterIndex.push(index);
        }
      });
      $.each(letterIndex, function(index, value) {
        $(".star:eq("+ value +")").text($(".guess-input").val()).addClass("correct-letter");
      });
      // als de geraden letter niet in het woord zit
    } else {
      $(".wrong-caption").show();
      $("<span class='wrong-letter'>"+ $(".guess-input").val() +"</span>").appendTo(".wrong");
    }
  });

}); // ready