

// **REPLACE WITH JQUERY**
window.onload = function () {


   // all instruments supported by our sequencer
   // CLASSIC/REST 0, AM 1, DUO 2, MEMBRANE 3, MONO 4 
   var instruments = [new Tone.Synth().toMaster(),
      new Tone.AMSynth().toMaster(), new Tone.DuoSynth().toMaster(),
      new Tone.MembraneSynth().toMaster(), new Tone.MonoSynth().toMaster()];

   // chord version of instruments
   var chords = [new Tone.PolySynth(3, Tone.Synth).toMaster(),
      new Tone.PolySynth(3, Tone.AMSynth).toMaster(),
      new Tone.PolySynth(3, Tone.DuoSynth).toMaster(),
      new Tone.PolySynth(3, Tone.MembraneSynth).toMaster(),
      new Tone.PolySynth(3, Tone.MonoSynth).toMaster()];



   //global initial tempo - SLOW 250, MEDIUM 300, FAST 350
   Tone.Transport.bpm.value = 300;


   /**
    * sequencer note object
    * @param {number} instrument is an index in the instruments array
    * @param {array} notes contains all pitches to be played (length is 1,2,or3)
    * @param {string} duration is either 1n, 2n, or 4n
    * @returns {window.onload.SequencerNote} note object
    */
   function SequencerNote(instrument, notes, duration) {
      this.instrument = instrument;
      // if notes.length > 1 -> then it's a chord
      // C1 is a rest
      this.notes = notes;
      this.duration = duration;   
   };

   // array of SequencerNotes containing the song
   var sequencer = [];

   /**
    * playNote(2, ["C4", "D4", "E4"], "1n", "0"); 
    * plays a whole note chord using duo synth
    * @param {number} instrument
    * @param {array} notes
    * @param {string} duration
    * @param {string} offset make sure notes are played in sequence
    * @returns {undefined}
    */
   window.playNote = function(instrument, notes, duration, offset) {
      offset += " + 0.3";
      // if more than one note -> then it's a chord
      if (notes.length > 1) {
         // chord
         /*
         var typeOfInstrument;
         switch (instrument) {
            case 0:
               typeOfInstrument = Tone.Synth;
               break;
            case 1:
               typeOfInstrument = Tone.AMSynth;
               break;
            case 2:
               typeOfInstrument = Tone.DuoSynth;
               break;
            case 3:
               typeOfInstrument = Tone.MembraneSynth;
               break;
            case 4:
               typeOfInstrument = Tone.MonoSynth;
               break;
         }
         */


         //play the chord
         chords[instrument].triggerAttack(notes, offset, 1);
         chords[instrument].triggerRelease(notes, offset + " + " + duration);
         //console.log(offset);

      } else {

         // solo note
         instruments[instrument].triggerAttack(notes[0], offset, 1);
         instruments[instrument].triggerRelease(offset + " + " + duration);
         //console.log(offset);
      }
   };


   /**
    * Loops through sequencer array and plays all SequencerNote objects
    * 
    */
   window.playSequencer = function() {

      // keeps track of when a note should be played
      var lengthString = "1.5"; // - add constant offset of 1.5 second

      // play twice
      for (var i = 0; i < sequencer.length * 2; i++) {

         var seqNote = sequencer[i % sequencer.length];
         // - rest - > play C1 and set volume to 0 must be regular synth
         if (seqNote.notes[0] === "C1") {

            // play note now instead of adding 
            // rest playback functionality to playNote()
            instruments[0].triggerAttack("C4", lengthString + " + 0.3", 0);
            //console.log(lengthString + " + 0.3");
            lengthString += " + " + seqNote.duration; // update
            instruments[0].triggerRelease(lengthString + " + 0.3");



         } else {


            playNote(seqNote.instrument, seqNote.notes,
                    seqNote.duration, lengthString);
            lengthString += " + " + seqNote.duration; // update

         }
      }
   };
   
   /**
    * adds a sequencer note to the sequencer array
    * @param {number} instrument
    * @param {array} notes
    * @param {string} duration
    * 
    */
   window.addNote = function(instrument, notes, duration) {
      sequencer.push(new SequencerNote(instrument, notes, duration));
   };
   
   /**
    * removes the last note in the sequencer
    * 
    */
   window.undo = function() {
      if (sequencer.length > 0) {
         sequencer.pop();
      }
   };
   

   // start time
   Tone.Transport.start();

};
