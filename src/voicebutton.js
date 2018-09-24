class VoicePad
{
	constructor(voice) {
		this.voice = voice;
		this.ctx = voice.ctx;
		this.downing = false;
		this.playing = false;
		this.posx = 0;
		this.posy = 0;
		this.consos = [];
	}

	init() {
		this.stop();
		this.downing = false;
		this.playing = false;
		this.posx = 0;
		this.posy = 0;
	}

	down(x, y) {
		this.downing = true;
		this.downtime = this.ctx.currentTime;
		this.posx = Math.min(Math.max(x, 0.0), 1.0);
		this.posy = Math.min(Math.max(y, 0.0), 1.0);
		this.voice.filter.F1.frequency.setValueAtTime(this.posx * 1000, this.ctx.currentTime);
		this.voice.filter.F2.frequency.setValueAtTime(this.posy * 3000, this.ctx.currentTime);
		for (var i = 0; i < this.consos.length; i++) {
			if (this.consos[i].isDown()) {
				this.consos[i].onVowelDown();
				return;
			}
		}
		this.play();
	}

	move(x, y) {
		this.posx = Math.min(Math.max(x, 0), 1);
		this.posy = Math.min(Math.max(y, 0), 1);
		this.voice.filter.F1.frequency.setValueAtTime(this.posx * 1000, this.ctx.currentTime);
		this.voice.filter.F2.frequency.setValueAtTime(this.posy * 3000, this.ctx.currentTime);
	}

	downFreq(f1, f2)
	{
		this.down(f1 / 1000, f2 / 3000);
	}

	moveFreq(f1, f2)
	{
		this.move(f1 / 1000, f2 / 3000);
	}


	up() {
		this.downing = false;
		this.stop();
	}

	play() {
		this.playing = true;
		//this.voice.play();
		this.voice.play_eg();
	}

	stop() {
		this.playing = false;
		this.voice.stop_eg();
	}

	isDown() {
		return this.downing;
	}

	isPlaying() {
		return this.playing;
	}

	addConso(c) {
		this.consos.push(c);
	}

}

class VoiceButton
{
	constructor(s, voice) {
		this.char = s;
		this.ctx = voice.ctx;
		this.vowel = null;
		this.downing = false;
		this.playing = false;
		this.consotime = 100;
		this.voice = voice;
	}

	init() {
		this.downing = false;
		this.playing = false;
	}

	down() {
		this.downing = true;
	}

	up() {
		this.downing = false;
	}

	onVowelDown() {
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
	}

	stop() {
		this.playing = false;
		this.voice.stop_eg();
	}

	isDown() {
		return this.downing;
	}

	isPlaying() {
		return this.playing;
	}

	addVowel(v) {
		this.vowel = v;
	}
}

class Htype_VoiceButton extends VoiceButton
{
	down() {
		this.downing = true;
		this.downtime = this.ctx.currentTime;
		if (this.vowel.isDown()) {
			this.play();
		}
	}

	up() {
		this.downing = false;
		this.stop();
	}

	onVowelDown() {
		this.play();
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
		if (!this.vowel.isPlaying()) {
			this.vowel.play();
		}
	}
}

class Ptype_VoiceButton extends VoiceButton
{
	down() {
		this.downing = true;
		this.downtime = this.ctx.currentTime;
		if (this.vowel.isDown()) {
			this.vowel.stop();
			this.play();
		}
	}

	onVowelDown() {
		this.play();
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
		setTimeout(()=> {
			this.stop();
			this.vowel.play();
		}, this.consotime);
	}
}

class Stype_VoiceButton extends VoiceButton
{
	constructor(s, voice) {
		super(s, voice);
		this.consotime = 200;
		this.overwraptime = 60;
	}

	down() {
		this.downing = true;
		this.downtime = this.ctx.currentTime;
		if (this.vowel.isDown()) {
			this.vowel.stop();
		}
		this.play();
	}

	up() {
		if (Math.abs(this.vowel.downtime - this.downtime) < 0.05) {
			return;
		}
		this.downing = false;
		if (this.vowel.isDown()) {
			this.vowel.play();
		}
		setTimeout(()=>{
			this.stop();
		}, this.overwraptime);
	}

	onVowelDown() {
		if (Math.abs(this.vowel.downtime - this.downtime) < 0.05) {
			setTimeout(()=> {
				setTimeout(()=>{
					this.stop();
				}, this.overwraptime);
				this.vowel.play();
			}, this.consotime);
		}
	}

	play() {
		console.log('s play');
		this.playing = true;
		this.voice.play_eg();
		if (this.vowel.isDown()
			&& Math.abs(this.vowel.downtime - this.downtime) < 0.05) {
			setTimeout(()=> {
				setTimeout(()=>{
					console.log('stop');
					this.stop();
				}, this.overwraptime);
				console.log('vowel');
				this.vowel.play();
			}, this.consotime);
		}
	}
}

export default VoiceButton;
export { VoicePad, Htype_VoiceButton, Ptype_VoiceButton, Stype_VoiceButton };
