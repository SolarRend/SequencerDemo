
window.onload = function() {
   
   var restSynth = new Tone.Synth().toMaster(); // resting instrument
   var synth = new Tone.Synth().toMaster(); // the instrument
   //var synth = new Tone.AMSynth().toMaster(); // the instrument
   //var synth = new Tone.DuoSynth().toMaster(); // the instrument
   //var synth = new Tone.MembraneSynth().toMaster(); // the instrument
   //var synth = new Tone.MonoSynth().toMaster(); // the instrument
   
   Tone.Transport.bpm.value = 300; //global tempo for relative n
   // 150, 250, 350 - SLOW 250, MEDIUM 300, FAST 350
   
   // basic note hit
   //synth.triggerAttackRelease("F#4", "2n", 0.05); // note, half-note, schedule   
   
   /*
   //looping notes
   var loop = new Tone.Loop(function(time){
	synth.triggerAttackRelease("F#4", "4n", time);
   }, "4n");
   
   //specified measures of note playing with respect global transport
   loop.start("1m").stop("2m");
   
   //start the loop
   Tone.Transport.start(); */

   //Tone.Transport.scheduleRepeat(function(time){
	//synth.triggerAttack("F#4", time); // note, half-note, schedule   
   //}, "2n");
   
   /*
   var i = 0;
   var seqLong = new Tone.Sequence(function(time, pitch) {
      
      //synth.triggerAttack(pitch, time);
      //synth.triggerRelease(time + 1);
      //synth.triggerAttackRelease(pitch, 0.75, time);
      if (i%3 === 0) {
          synth.triggerAttack("F5",time);
          console.log("hit long");
          i++;
      }  
   }, ["C3"], "1n");
   
   var seqMedium = new Tone.Sequence(function(time, pitch) {
      
      //synth.triggerAttack(pitch, time);
      //synth.triggerRelease(time + 1);
      //synth.triggerAttackRelease(pitch, 0.75, time);
     if (i%3 === 2) {
         synth.triggerAttack("E5", time);
         console.log("hit medium");
         i++;
      }
      
      
   }, ["C3"], "2n");
   
   var seqShort = new Tone.Sequence(function(time, pitch) {
      
      if (i%3 === 1) {
         synth.triggerAttack("C3", time);
         console.log("hit short");
         i++;
      }
      
      
   }, ["C3"], "4n");
   
   //seqLong.start("1");
   //seqMedium.start("1");
   //seqShort.start("1");
   //synth.triggerAttackRelease("F#4", "2n", 0.05); // note, half-note, schedule
   //synth.triggerAttackRelease("A#4", "2n", 0.05); // note, half-note, schedule
  
   */
  /**  BACKUP PLAN**/
   var i = 0;
   var loop = new Tone.Loop(function(time){
      if (i%4===0) {
         synth.triggerAttack("C4", time, 1); 
         synth.triggerRelease(time+0.25); 
      }
      if (i%4===1) {
         synth.triggerAttack("C4", time, 1); 
         synth.triggerRelease(time+0.25); 
      }
      if (i%4===2) {
         synth.triggerAttack("D5", time, 1); 
         synth.triggerRelease(time+0.25); 
      }
      if (i%4===3) {
         synth.triggerAttack("F3", time, 1); 
         synth.triggerRelease(time+0.25); 
      }
      i++;
      
   }, "4n");
   
   //loop.start(0.3);
   
  
  //var dispatchCounter = 0;
  
  /*
  var seqCounter = 0;
  var seqShort = new Tone.Loop(function(time) {
      
      
         synth.triggerAttackRelease(arrayOfNotes[dispatchCounter],"8n" ,time);
         seqCounter++;
         
            console.log("hit short");
            dispatchCounter++; 
            seqShort.stop();
            dispatch();
         
      
   }, "8n");
   
   var seqMedium = new Tone.Loop(function(time) {
      
      
         synth.triggerAttackRelease(arrayOfNotes[dispatchCounter], "4n", time);
         seqCounter++;
         
         
         console.log("hit medium"); 
         dispatchCounter++; 
         seqMedium.stop();
         dispatch();
      
      
   }, "4n");
   
   
   var seqLong = new Tone.Loop(function(time) {
      
      
         synth.triggerAttackRelease(arrayOfNotes[dispatchCounter],"2n" ,time);
         
         seqCounter++;
         
         console.log("hit long");
         dispatchCounter++; 
         dispatch();
         seqLong.stop();
      
      
   }, "2n");
   
  
  
  function dispatch() {
     
     if (dispatchCounter > arrayOfNotes.length) {
        dispatchCounter = 0;
        return;
     }
     
     if (arrayOfNotes[dispatchCounter] === "C4") {
        seqShort.start();
     } else if(arrayOfNotes[dispatchCounter] === "D4") {
        seqMedium.start();
     } else if(arrayOfNotes[dispatchCounter] === "E4") {
        seqLong.start();
     }
  }
  
  dispatch();
   */
  
  /** THIS IS IT - DURATION OF NOTES **/
  var arrayOfNotes = ["C4", "C5", "D5", "F3", "G4", "E4"];
  var noteLengths = ["4n", "4n", "2n", "1n", "4n", "4n"];
  var lengthString = "1.75"; // - add constant offset of 1.75 second
  var testingChord = new Tone.PolySynth(3, Tone.Synth).toMaster();
  
  for (var i = 0; i < arrayOfNotes.length*50; i++) {
     
     // - rest - > play C1 and set volume to 0 must be regular synth
     if (i%6 === 2) {
        
        restSynth.triggerAttack("C1", lengthString, 0);
        lengthString += " + " + noteLengths[i%6];
        restSynth.triggerRelease(lengthString);
        
     } else {
        
      
      synth.triggerAttack(arrayOfNotes[i%6], lengthString, 1);
      lengthString += " + " + noteLengths[i%6];
      synth.triggerRelease(lengthString);
         
      /* chord testing
      testingChord.triggerAttack([arrayOfNotes[i%6],arrayOfNotes[(i+1)%6],arrayOfNotes[(i+1)%6]], lengthString, 1);
      lengthString += " + " + noteLengths[i%6];
      testingChord.triggerRelease([arrayOfNotes[i%6],arrayOfNotes[(i+1)%6],arrayOfNotes[(i+1)%6]], lengthString);
      */
    }
     
     console.log(lengthString);
  }
  
  
  Tone.Transport.start();
   
};


