"use strict";

var sequence = [];

var isPlaying = false;
var ctx = new (window.AudioContext || window.webkitAudioContext)();
var osc;
var amp = ctx.createGain();
amp.gain.value = 0.1;

/**
 * Creates oscillators for a note based on the number of semitones from A440.
 * @param {Number} semitones 
 */
function createTone(semitones) {
    osc = ctx.createOscillator();
    osc.frequency.value = 440.0 * (2.0**(semitones/12.0));          
    osc.connect(amp);
    amp.connect(ctx.destination);
}

/**
 * Creates oscillators for each note and plays the sequence of notes
 */
function play(seq, i, dur) {
    osc = ctx.createOscillator();
    createTone(seq[i])
    osc.start(ctx.currentTime);
    setTimeout(function() {
        osc.stop(ctx.currentTime);
        if (seq[i+1]) {
            play(seq, i+1, dur)
        }
    }, dur)
}

const noteC = document.getElementById("C");
noteC.note = 3
const noteD = document.getElementById("D");
noteD.note = 5
const noteE = document.getElementById("E");
noteE.note = 7
const noteF = document.getElementById("F");
noteF.note = 8
const noteG = document.getElementById("G");
noteG.note = 10
const noteA = document.getElementById("A");
noteA.note = 12
const noteB = document.getElementById("B");
noteB.note = 14

noteC.addEventListener("click", noteClick);
noteD.addEventListener("click", noteClick);
noteE.addEventListener("click", noteClick);
noteF.addEventListener("click", noteClick);
noteG.addEventListener("click", noteClick);
noteA.addEventListener("click", noteClick);
noteB.addEventListener("click", noteClick);

function start() {
    if (sequence.length > 0) {
        play(sequence, 0, 250)
    } else {
        window.alert("Your jingle is empty!")
    }
}

function noteClick(event) {
    console.log(event.currentTarget.note)
    sequence.push(event.currentTarget.note)
}

function clearSequence() {
    sequence = []
    window.alert("Jingle cleared!")
}