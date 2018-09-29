import Voice, { Noise, LPFNoise, VowelFilter } from './voice';
import { VoicePad, Htype_VoiceButton, Ptype_VoiceButton, Stype_VoiceButton } from './voicebutton';


class VoiceApp {
  constructor() {
	window.AudioContext = window.webkitAudioContext || window.AudioContext;
	this.audioContext = new AudioContext();

	this.out = this.audioContext.createGain();
	this.out.gain.value = 1.0;
	this.out.connect(this.audioContext.destination);

	var vf = new VowelFilter(this.audioContext, this.out);
	var noise = new Noise(this.audioContext);
	var fnoise = new LPFNoise(this.audioContext);

	this.vowel = new VoicePad(new Voice(this.audioContext, "a", vf, noise, fnoise, this.out));
	this.conso = {};
	this.conso["h" ] = new Htype_VoiceButton("h" , new Voice(this.audioContext, "h" ,  vf, noise, fnoise, this.out));
	this.conso["s" ] = new Stype_VoiceButton("s" , new Voice(this.audioContext, "s" ,  vf, noise, fnoise, this.out));
	this.conso["sy"] = new Stype_VoiceButton("sy", new Voice(this.audioContext, "sy",  vf, noise, fnoise, this.out));
	this.conso["t" ] = new Ptype_VoiceButton("t" , new Voice(this.audioContext, "t" ,  vf, noise, fnoise, this.out));
	this.conso["k" ] = new Ptype_VoiceButton("k" , new Voice(this.audioContext, "k" ,  vf, noise, fnoise, this.out));
	this.conso["p" ] = new Ptype_VoiceButton("p" , new Voice(this.audioContext, "p" ,  vf, noise, fnoise, this.out));

	for (var c in this.conso) {
		this.vowel.addConso(this.conso[c]);
		this.conso[c].addVowel(this.vowel);
	}
  }
}

export default VoiceApp;

