"use strict";

var sequence = [];

var isPlaying = false;
var ctx = new (window.AudioContext || window.webkitAudioContext)();
// var pianoSound = new Audio("./PianoA.mp3");
// pianoSound.crossOrigin = "anonymous";
const audio = document.getElementById("soundfile");
audio.setAttribute("src", "200174__bronxio__drumloop-classic-breakbeat-amen-break-at-120-bpm.wav");
audio.setAttribute("loop", true)
var osc;
var amp = ctx.createGain();
var amplitude = 0.1;
audio.volume = 20/60.0;
amp.gain.value = 0;
// var source = ctx.createMediaElementSource(pianoSound);
// source.connect(amp);
osc = ctx.createOscillator();
osc.connect(amp);
osc.start(ctx.currentTime);
amp.connect(ctx.destination);

/**
 * Creates oscillators for a note based on the number of semitones from A440.
 * @param {Number} semitones 
 */
function createTone(semitones) {
    osc.frequency.linearRampToValueAtTime(440.0 * (2.0**(semitones/12.0)), ctx.currentTime+0.05);
}

function dbtoa(decibels) {
    return Math.pow(10.,decibels*0.05);
}

function setAmplitude(value) {
    if (value == -60) {
        amplitude = 0.0;
        audio.volume = 0;
    }
    else {
        amplitude = dbtoa(value);
        audio.volume = value/-60.0;
    }
    console.log(amplitude)
    
    amp.gain.linearRampToValueAtTime(amplitude, ctx.currentTime+0.1);
    // document.getElementById("amplitude").innerText = value;
}

/**
 * Creates oscillators for each note and plays the sequence of notes
 */
function play(seq, i, dur) {
    createTone(seq[i])
    setTimeout(function() {
        if (seq[i+1]) {
            play(seq, i+1, dur)
        }
    }, dur)
    return true
}

const noteC = document.getElementById("C");
noteC.pos = 1
noteC.note = 3
const noteD = document.getElementById("D");
noteD.pos = 2
noteD.note = 5
const noteE = document.getElementById("E");
noteE.pos = 3
noteE.note = 7
const noteF = document.getElementById("F");
noteF.pos = 4
noteF.note = 8
const noteG = document.getElementById("G");
noteG.pos = 5
noteG.note = 10
const noteA = document.getElementById("A");
noteA.pos = 6
noteA.note = 12
const noteB = document.getElementById("B");
noteB.pos = 7
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
        var btn = document.getElementById("play");
        btn.disabled = true
        btn.innerHTML = "Playing..."
        amp.gain.setValueAtTime(amplitude, ctx.currentTime);
        ctx.resume();
        amp.gain.linearRampToValueAtTime(amplitude, ctx.currentTime+0.1);

        audio.play()
        play(sequence, 0, 250)

        setTimeout(function() {
            amp.gain.setValueAtTime(amplitude, ctx.currentTime);
            amp.gain.linearRampToValueAtTime(0., ctx.currentTime+0.1);
            setTimeout(function() {
                ctx.suspend();
                audio.pause();
            }, 125);
            btn.disabled = false
            btn.innerHTML = "Play Jingle"
        }, 250*(document.getElementById("notes").rows.length-1))
    } else {
        window.alert("Your jingle is empty!")
    }
}

function noteClick(event) {
    // console.log(event.currentTarget.note);
    sequence.push(event.currentTarget.note);
    addRow(event.currentTarget.pos);
}

function clearSequence() {
    sequence = []
    clearTable();
    window.alert("Jingle cleared!")
}


function addRow(note) {
    var table = document.getElementById("notes");
    var rowCount = table.rows.length
    var colCount = table.rows[0].cells.length;
    var row = table.insertRow(rowCount);
    for(var i = 0; i < colCount; i++) {
        row.insertCell(i);
    }
    table.rows[rowCount].cells[0].innerHTML = "" + rowCount;
    table.rows[rowCount].cells[note].innerHTML = '<div class="noteCell"></div>';
}

function clearTable() {
    var table = document.getElementById("notes");
    for(var i = table.rows.length-1; i > 0; i--) {
        table.deleteRow(i);
    }
}