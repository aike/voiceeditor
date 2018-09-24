class Noise
{
  constructor(ctx)
  {
    this.buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var data = this.buf.getChannelData(0);
    for (var i = 0; i < this.buf.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.osc = ctx.createBufferSource();
    this.osc.buffer = this.buf;
    this.osc.loop = true;
    this.init = false;
  }

  connect(dest)
  {
    this.osc.connect(dest);
  }

  start(time)
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
  }
}

class LPFNoise extends Noise
{
  constructor(ctx)
  {
    super(ctx);
    this.buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var data = this.buf.getChannelData(0);
    data[0] = Math.random() * 2 - 1;
    for (var i = 1; i < this.buf.length; i++) {
      data[i] = ((Math.random() * 2 - 1) + 0.98 * data[i - 1]) * 0.5;
    }
    this.osc = ctx.createBufferSource();
    this.osc.buffer = this.buf;
    this.osc.loop = true;
    this.init = false;
  }
}

class VowelFilter
{
  constructor(ctx, dest){
    this.F1 = ctx.createBiquadFilter();
    this.F1.type = "bandpass";
    this.F1.frequency.value = 500;
    this.F1.Q.value = 10;

    this.F2 = ctx.createBiquadFilter();
    this.F2.type = "bandpass";
    this.F2.frequency.value = 1500;
    this.F2.Q.value = 10;

    this.F1.connect(dest);
    this.F2.connect(dest);
  }
}

class Voice
{
  constructor(ctx, s, vowelFilter, noise, lpf_noise, dest)
  {
    this.ctx = ctx;
    this.init = false;
    this.filter = null;

    var f0 = 125;

    this.char = s;

    switch (s)
    {
      case "a":
        this.osc = ctx.createOscillator();
        this.osc.type = "sawtooth";
        this.osc.frequency.value = f0;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.filter = vowelFilter;
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.5;
        this.eg_t=[0, 0.01];
        this.eg_a=[0, 1   ];
        this.attack = 0.01;
        this.hold    = -1;
        this.release = 0.01;
        break;
      case "h":
        this.osc = lpf_noise;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.4;
        this.eg_t=[0, 0.05, 0.1, 0.15];
        this.eg_a=[0,    1,    1,   0];
        this.attack  = 0.05;
        this.hold    = 0.1;
        this.release = 0.05;
        break;
      case "s":
        this.osc = noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 8000;
        this.consoFilter.Q.value = 5;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.1;
        this.eg_t=[0, 0.1, 0.3];
        this.eg_a=[0, 1,     1];
        this.attack  = 0.1;
        this.hold    = -1;
        this.release = 0.01;
        break;
      case "sy":
        this.osc = noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 4000;
        this.consoFilter.Q.value = 5;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.1;
        this.eg_t=[0, 0.1, 0.3];
        this.eg_a=[0, 1,     1];
        this.attack  = 0.1;
        this.hold    = -1;
        this.release = 0.01;
        break;
      case "t":
        this.osc = noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 200;
        this.consoFilter.Q.value = 5;
        this.boost = ctx.createGain();
        this.boost.gain.value = 6.0;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.boost);
        this.boost.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.8;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        this.attack  = 0.01;
        this.hold    = 0.0;
        this.release = 0.01;
        break;
      case "k":
        this.osc = noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 500;
        this.consoFilter.Q.value = 2;
        this.boost = ctx.createGain();
        this.boost.gain.value = 2.0;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.boost);
        this.boost.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.5;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        this.attack  = 0.01;
        this.hold    = 0.0;
        this.release = 0.01;
        break;
      case "p":
        this.osc = noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 200;
        this.consoFilter.Q.value = 5;
        this.boost = ctx.createGain();
        this.boost.gain.value = 6.0;
        this.gain = ctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.boost);
        this.boost.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.8;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        this.attack  = 0.01;
        this.hold    = 0.0;
        this.release = 0.01;
        break;
      default:
        break;
    }

  }

  play()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    this.gain.gain.setValueAtTime(this.level, this.ctx.currentTime);
  }

  play_eg()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    var t0 = this.ctx.currentTime;
    //this.gain.gain.setValueAtTime(0.0000001, this.ctx.currentTime);

    // this.gain.gain.setTargetAtTime(this.eg_a[0] * this.level, t0, this.eg_t[0]);
    // for (let i = 1; i < this.eg_t.length; i++) {
    //   this.gain.gain.setTargetAtTime(
    //     this.eg_a[i] * this.level,
    //     t0 + this.eg_t[i],
    //     (this.eg_t[i] - this.eg_t[i - 1]));
    // }

    // linearRampToValueAtTime(value, endTime)
    // exponentialRampToValueAtTime(value, endTime)
    // setTargetAtTime(target, startTime, timeConstant)

    // this.gain.gain.setValueAtTime(0.0000001, t0);
    // this.gain.gain.setTargetAtTime(this.level, t0, this.attack);
    // if ((this.char == 'p') || (this.char == 'k') || (this.char == 't')) {
    //   this.gain.gain.setTargetAtTime(this.level, t0 + this.attack, this.hold);
    //   this.gain.gain.setTargetAtTime(0.0000001, t0 + this.attack + this.hold, this.release);
    // }
    this.gain.gain.setValueAtTime(0.0000001, t0);
    this.gain.gain.setTargetAtTime(this.level, t0, this.attack);
    if ((this.char == 'p') || (this.char == 'k') || (this.char == 't')) {
      this.gain.gain.setTargetAtTime(this.level, t0 + this.attack, this.hold);
      this.gain.gain.setTargetAtTime(0.0000001, t0 + this.attack + this.hold, this.release);
    }
  }

  stop()
  {
    this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gain.gain.setValueAtTime(0.0000001, this.ctx.currentTime);
  }

  stop_eg()
  {
    var t0 = this.ctx.currentTime;
    // if (this.release == null) {
    //   this.gain.gain.setValueAtTime(0.0000001, t0);
    //   return;
    // }
    // this.gain.gain.setValueAtTime(this.gain.gain.value, t0);
    // this.gain.gain.setTargetAtTime(
    //   0.0000001,
    //   t0 + this.release,
    //   this.release);

    // this.gain.gain.setValueAtTime(this.gain.gain.value, t0);
    // this.gain.gain.setTargetAtTime(
    //   0.0000001,
    //   t0 + this.release,
    //   this.release);
    this.gain.gain.setValueAtTime(this.gain.gain.value, t0);
    this.gain.gain.setTargetAtTime(
      0.0000001,
      t0,
      this.release);
  }
}

export default Voice;
export { Noise, LPFNoise, VowelFilter };
