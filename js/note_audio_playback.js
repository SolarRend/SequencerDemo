window.onload = function () {

   MIDI.loadPlugin({
      //soundfontUrl: "./js/midi-js-soundfonts/FluidR3_GM/",
      soundfontUrl: "./js/MIDIjs/examples/soundfont/", //better sounding
      instrument: "acoustic_grand_piano",
      onprogress: function (state, progress) {
      },
      onsuccess: function () {
         //var note = 50; // the MIDI note
         //var velocity = 127; // how hard the note hits
         //var delay = 0; // play one note every quarter second
         //MIDI.setVolume(0, 127);
         
         //intervalID = setInterval(playNotes, 500, velocity, delay);
      }
   });
   
  
};

function playNoteAudio(note) {
      MIDI.noteOn(0, note, 127, 0); //piano
      MIDI.noteOff(0, note, 0.2);
  }

