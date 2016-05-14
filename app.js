// README:
// jukebox now has octave support
// Example: G^-2*4 (G to the power of negative 2 * 4 beats)
// In the example above, negative power of 2 means halving the frequency, so one octave lower
// A is the middle frequency of 440, defined in player.js
// Positive power of 2 means doubling the frequency, so one octave higher
// default beat is 4, which is the quarter note
// default BPM is 300, defined in this file
// volume is controlled in player.js, by the first parameter of
// gain.gain.linearRampToValueAtTime(1/i, startTime + 0.01);
// To play, define a song in LIBRARY or PLAYLIST, and drag the song to PLAYLIST
// and press 'Play all'

var LIBRARY = [
  {title: 'Happy Birthday One', notes: 'D*2 D*2 E*4 D*4 G*4 F#*8'},
  {title: 'Happy Birthday Two', notes: 'D*2 D*2 E*4 D*4 A^2*4 G*8'},
  {title: 'Happy Birthday Three', notes: 'D*2 D*2 D^2*4 B^2*4 G*4 F#*4 E*8'},
  {title: 'Happy Birthday Four', notes: 'C^2*2 C^2*2 B^2*4 G*4 A^2*4 G*8'},

  {title: 'Happy Birthday One Low', notes: 'D^-2*2 D^-2*2 E^-2*4 D^-2*4 G^-2*4 F#^-2*8'},
  {title: 'Happy Birthday Two Low', notes: 'D^-2*2 D^-2*2 E^-2*4 D^-2*4 A*4 G^-2*8'},
  {title: 'Happy Birthday Three Low', notes: 'D^-2*2 D^-2*2 D*4 B*4 G^-2*4 F#^-2*4 E^-2*8'},
  {title: 'Happy Birthday Four Low', notes: 'C*2 C*2 B*4 G^-2*4 A*4 G^-2*8'},


  {title: 'Happy Birthday All', notes: 'D*2 D*2 E*4 D*4 G*4 F#*8 ' +
   'D*2 D*2 E*4 D*4 A^2*4 G*8 ' +
   'D*2 D*2 D^2*4 B^2*4 G*4 F#*4 E*8 ' +
   'C^2*2 C^2*2 B^2*4 G*4 A^2*4 G*8' },
  {title: 'Happy Birthday All Low', notes: 'D^-2*2 D^-2*2 E^-2*4 D^-2*4 G^-2*4 F#^-2*8 ' +
   'D^-2*2 D^-2*2 E^-2*4 D^-2*4 A*4 G^-2*8 ' +
   'D^-2*2 D^-2*2 D*4 B*4 G^-2*4 F#^-2*4 E^-2*8 ' +
   'C*2 C*2 B*4 G^-2*4 A*4 G^-2*8' }

];

var PLAYLIST = [
  //  {title: 'River Flow in You', notes: //'D^-2*1 F#^-2*1 D*2 C#*2 D*2 C#*2 D*2 A*2 D*2 G^-2*10 ' +
  // 'D^-2*1 F#^-2*1 D*2 C#*2 D*2 C#*2 D*2 A*2 D*2 G^-2*10 ' +
  // 'D^-2*1 F#^-2*1 D*2 C#*2 D*2 C#*2 D*2 A*2 D*2 G^-2*2 F#^-2*2 G^-2*2 A*2 F#^-2*2 E^-2-*10 ' +
  // 'D^-2*1 C#^-2*1 D^-2*8 D^-2*1 E^-2*1 F#^-2*8 F#^-2*1 G^-2*1 A*8 G^-2*1 F#^-2*1 E^-2*10 ' +
  // 'D*1 E*1 D*1 C#*1 D*2 A*2 D*1 E*1 D*1 C#*1 D*2 A*2 D*1 E*1 D*1 C#*1 D*1 E*1 F#*1 G*1 A^2*1 F#*1 E*1 D*1 C#*2 A*2 ' +
  // 'D*1 E*1 D*1 C#*1 D*2 A*2 D*1 E*1 D*1 C#*1 D*2 A*2 D*1 E*1 D*1 C#*1 D*1 E*1 F#*1 G*1 A^2*1 F#*1 E*1 D*1 C#*2 E^-2*2 C#^-2*2 A^-2*2'
  // }
  //  {title: 'Happy Birthday All', notes: 'D*2 D*2 E*4 D*4 G*4 F#*8 ' +
  //  'D*2 D*2 E*4 D*4 A^2*4 G*8 ' +
  //  'D*2 D*2 D^2*4 B^2*4 G*4 F#*4 E*8 ' +
  //  'C^2*2 C^2*2 B^2*4 G*4 A^2*4 G*8' }

  // {title: 'Mad World', notes:
  // 'B*2 G^-2*2 B*2 G^-2*2 B*2 G^-2*2 B*2 G^-2*2 ' +
  // 'C*2 G^-2*2 C*2 G^-2*2 C*2 G^-2*2 C*2 G^-2*2 ' +
  // 'D*2 G^-2*2 D*2 G^-2*2 D*2 G^-2*2 D*2 G^-2*2 ' +
  // 'B*2 G^-2*2 B*2 G^-2*2 A*2 F#^-2*2 A*2 F#^-2*2 ' +
  //
  // 'D*2 G^-2*2 D*2 G^-2*2 D*2 G^-2*2 D*2 G^-2*2 ' +
  // 'C*2 G^-2*2 C*2 G^-2*2 C*2 G^-2*2 C*2 G^-2*2 ' +
  // 'D*2 G^-2*2 D*2 G^-2*2 D*2 G^-2*2 D*2 G^-2*2 ' +
  // 'B*2 G^-2*2 B*2 G^-2*2 A*2 F#^-2*2 A*6 ' +
  //
  // 'D*4 D*6 B*2 C*4 C*2 B*2 C*2 B*2 A*2 G^-2*6 ' +
  // 'D*4 D*6 B*2 C*4 C*2 B*2 C*2 B*2 A*8 ' +
  // 'D*4 D*6 B*2 C*4 C*2 B*2 C*2 B*2 A*2 G^-2*6 ' +
  // 'E*10 D*6 ' +
  //
  // 'G^-2*2 G^-2*2 A*2 C*10 G^-2*2 D*8 ' +
  // 'C*2 D*2 E*8 A*6 E*4 E*2 E*2 F*2 E*4 D*4 ' +
  // 'C*10 G^-2*2 D*8 C*2 D*2 E*8 A*6 ' +
  // 'E*4 E*2 E*2 F*2 E*4 D*4 E*12 ' +
  // 'E*4 E*2 E*2 F*2 E*4 D*4 E*12 ' +
  // 'E*4 E*2 E*2 F*2 G*4 A^2*4 E*16 ' +
  // 'C*2 D*2 C*2 F*10 E*8 ' +
  //
  // 'F^-2*1 C*2 F^-2*1 C*2 F^-2*1 C*2 A#*2 A*2 F^-2*2 ' +
  // 'F^-2*1 C*2 F^-2*1 C*2 F^-2*1 C*2 A#*2 A*2 F^-2*2 ' +
  // 'F^-2*1 C*2 F^-2*1 C*2 F^-2*1 C*2 A#*2 A*2 F^-2*2 ' +
  // 'F^-2*1 G^-2*2 F^-2*1 G^-2*2 F^-2*1 G^-2*2 A*2 A#*2 A*2 ' +
  //
  // 'F^-2*1 C*2 F^-2*1 C*2 F^-2*1 C*2 A#*2 A*2 F^-2*2 ' +
  // 'F^-2*1 C*2 F^-2*1 C*2 F^-2*1 C*2 A#*2 A*2 F^-2*2 ' +
  // 'F^-2*1 C*2 F^-2*1 C*2 F^-2*1 C*2 A#*2 A*2 C^*2 ' +
  // 'F^-2*1 D*2 F^-2*1 D*2 F^-2*1 D*2 D*2 E*2 F*2'
  // }
];

var BPM = 500;

// Add a song with the given title and notes to the library.
var addSongToLibrary = function(title, notes) {
  $('#library-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
};

var addSongToPlaylist = function(title, notes) {
  $('#playlist-list').append("<li>" +
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


var initializePlaylist = function() {
  for(var i=0; i < PLAYLIST.length; i+=1) {
    addSongToPlaylist(PLAYLIST[i].title, PLAYLIST[i].notes);
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
  initializePlaylist();

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
