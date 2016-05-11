var LIBRARY = [
  {title: 'Happy Birthday', notes: 'D*2 D*2 E D G F# D*2 D*2 E D A F#' },
  {title: 'C Major Scale', notes: 'A B C D E F G' },
  {title: 'Chromatic Scale', notes: 'A A# B C C# D D# E F F# G G#' },
  {title: 'Random Song', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Adup Licate', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Yankee Doodle', notes: 'C F*4 C F*4 B C D A*2 B*2 A B*2 C' },
  {title: 'Descending Notes', notes: 'G F E D C B A G F E D C B A' }
];

var BPM = 600;

// Add a song with the given title and notes to the library.
var addSongToLibrary = function(title, notes) {
  $('#library-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
};


// Add all LIBRARY songs to the library.
var initializeLibrary = function() {
  for(var i=0; i < LIBRARY.length; i+=1) {
    addSongToLibrary(LIBRARY[i].title, LIBRARY[i].notes);
  }
};


// Play all songs in the playlist.
var playAll = function() {

  // Grab the top song in the queue, parse its notes and play them.
  // Then recurse until there are no more songs left in the queue.
  //
  var playNext = function() {
    var songItem = $('#playlist-list li:first-child');

    if (songItem.length == 0) {
      // No more songs.

      // Re-enable the play button.
      $('#play-button').attr('disabled', false).text('Play All');

      // Fade out the message.
      $('#message').fadeOut();
      return;
    }

    var title = songItem.find('.title').text();
    var notes = songItem.find('.notes').text();
    var song = parseSong(notes);

    $('#message').html("Now playing: <strong>" + title + "</strong>").show();

    playSong(song, BPM, function() {
      songItem.remove();
      $('#library-list').append(songItem);
      playNext();
    });
  };

  // Disable the play button to start.
  $('#play-button').attr('disabled', true).text('Playing');

  playNext();
}

var removeLibraryListItem = function() {
  $(this).remove();
};

var slideLibraryListItemUp = function() {
  $(this).parent().slideUp(500, removeLibraryListItem);
};

var showLibraryListItemNotes = function() {
  console.log("double-clicked");
  if ($(this).find(".notes").is(":visible"))
  {
    $(this).find(".notes").slideUp(300);
  }
  else {
    $(this).find(".notes").slideDown(300);
  }
};

//var messageFadeIntervalId;

//var fadeMessageOut = function() {
  //clearInterval(messageFadeIntervalId);
//  $('#message').fadeOut(800);
//}

var waitAfterMessageFade = function() {
  var message = $(this);
  //messageFadeIntervalId = setTimeout(fadeMessageOut, 3000);
  setTimeout(function(){
    message.fadeOut(800);
  }, 3000);
}

var filterSongs = function () {
  //console.log("filterSongs");
  // hide those songs that does not contain the filter-library text
  $( '#library-list li:not(:contains(' + $("#filter-library").val() + '))' ).hide();
  // show those songs that does contain the filter-library text
  $( '#library-list li:contains(' + $("#filter-library").val() + ')' ).show();

};

$(document).ready(function() {
  // Initialize the library with some songs.
  initializeLibrary();
  //$(".hidden").removeClass("hidden").hide();

  // Play all songs in the playlist when the "play" button is clicked.
  $('#play-button').on('click', playAll);
  // Add Your Code Here.


  // need to use delegated event
  //$('.fa-trash').on('click', slideLibraryListItemUp);
  $('#library-list').on('click', '.fa-trash', slideLibraryListItemUp);

  // need to use delegated event
  //$('#library-list li').on('dblclick', showLibraryListItemNotes);

  // event happens on li within #library-list
  // .container must exist when the document loads
  $("#library-list").on("dblclick", 'li', showLibraryListItemNotes);


  $('#message').fadeIn(800, waitAfterMessageFade);

  //$(".sortable").sortable();
  $("#library-list").sortable({connectWith: "#playlist-list"});
  $("#playlist-list").sortable({connectWith: "#library-list"});

  $("#filter-library").on("keyup", filterSongs);

  // make jquery contain case insentiive
  // https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
  $.expr[":"].contains = $.expr.createPseudo(function(arg) {
      return function( elem ) {
          return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
  });
});
