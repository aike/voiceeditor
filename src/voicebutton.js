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
		this.voice.f1 = this.posx * 1000;
		this.voice.f2 = this.posx * 3000;
		this.voice.filter.F1.frequency.setValueAtTime(this.voice.f1, this.ctx.currentTime);
		this.voice.filter.F2.frequency.setValueAtTime(this.voice.f2, this.ctx.currentTime);
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
		this.voice.f1 = this.posx * 1000;
		this.voice.f2 = this.posx * 3000;
		this.voice.filter.F1.frequency.setValueAtTime(this.voice.f1, this.ctx.currentTime);
		this.voice.filter.F2.frequency.setValueAtTime(this.voice.f2, this.ctx.currentTime);
	}

	setFormantMove(pre_f1, pre_f2, pre_time) {
		this.voice.pre_f1 = pre_f1;
		this.voice.pre_f2 = pre_f2;
		this.voice.pre_time = pre_time;
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
		console.log('vowel play');
		this.playing = true;
		//this.voice.play();
		this.voice.play_eg();
	}

	delayedPlay(delay) {
		console.log('vowel delayed play');
		this.playing = true;
		this.voice.play_delayed_eg(delay);
	}

	stop() {
		console.log('vowel stop');
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
		this.vowel.delayedPlay(this.voice.vowel_delay);
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

	up() {
		this.downing = false;
		this.playing = false;
	}

	onVowelDown() {
		this.play();
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
		this.vowel.delayedPlay(this.voice.vowel_delay);
	}
}

class Stype_VoiceButton extends VoiceButton
{
	down() {
		this.downing = true;
		this.downtime = this.ctx.currentTime;
		if (this.vowel.isDown()) {
			this.vowel.stop();
		}
		this.play();
	}

	up() {
		this.downing = false;
		if (!this.playing) {
			// 同時押しでstop済みのとき
			return;
		}
		this.stop();
		if (this.vowel.isDown()) {
			this.vowel.delayedPlay(this.voice.vowel_delay);
		}
	}

	onVowelDown() {
		if (Math.abs(this.vowel.downtime - this.downtime) < 0.05) {
			setTimeout(()=> {
				this.stop();
				this.vowel.delayedPlay(this.voice.vowel_delay);
			}, (this.voice.attack + this.voice.hold) * 1000);
		}
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
		if (this.vowel.isDown()
			&& Math.abs(this.vowel.downtime - this.downtime) < 0.05) {
			setTimeout(()=> {
				this.stop();
				this.vowel.delayedPlay(this.voice.vowel_delay);
			}, (this.voice.attack + this.voice.hold) * 1000);
		}
	}
}

export default VoiceButton;
export { VoicePad, Htype_VoiceButton, Ptype_VoiceButton, Stype_VoiceButton };
