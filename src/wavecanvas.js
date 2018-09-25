import React from 'react';
import Recorder from './recorder';
import Slider from 'rc-slider';
import VoiceApp from './voiceapp';

class WaveCanvas extends React.Component {
  constructor() {
    super();

  	window.AudioContext = window.webkitAudioContext || window.AudioContext;

    this.voice = null;
    this.rec = null;
    this.state = {
      startpos: 0,
      endpos: 100,
      boost: 0
    }
  }

  componentDidMount() {
    this.clearBg();
    this.voice = new VoiceApp();
    this.rec = new Recorder(this.voice.out, {numChannels:1});
  }

  clearBg() {
    var canvas = document.querySelector('#bgcanvas');
    if (canvas == null) return;

    var canvasContext = canvas.getContext('2d');
    // clear
    canvasContext.fillStyle = 'rgb(20, 20, 60)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // grid
    canvasContext.strokeStyle = 'rgb(60, 60, 80)';
    for (var y = 0; y < 10; y++) {
      canvasContext.beginPath();
      canvasContext.moveTo(0, canvas.height / 10 * y);
      canvasContext.lineTo(canvas.width, canvas.height / 10 * y);
      canvasContext.stroke();
    }
    for (var x = 0; x < 20; x++) {
      canvasContext.beginPath();
      canvasContext.moveTo(canvas.width / 20 * x, 0);
      canvasContext.lineTo(canvas.width / 20 * x, canvas.height);
      canvasContext.stroke();
    }

    canvasContext.strokeStyle = 'rgb(80, 80, 100)';
    canvasContext.beginPath();
    canvasContext.moveTo(0, canvas.height / 2);
    canvasContext.lineTo(canvas.width, canvas.height / 2);
    canvasContext.stroke();
  }

  clearWave() {
    var canvas = document.querySelector('#wavecanvas');
    if (canvas == null) return;

    var canvasContext = canvas.getContext('2d');
    // clear
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  }

  play() {
    document.querySelector('#playbutton').disabled = true;

    const vp = this.props.value.vowel_param;
    this.voice.vowel.voice.level = vp.level / 100.0;
    this.voice.vowel.voice.attack = vp.attack / 1000.0;
    this.voice.vowel.voice.release = vp.release / 1000.0;

    const cp = this.props.value.conso_param;
    const c = this.props.value.conso_type;
    this.voice.conso[c].voice.level   = cp.level / 100.0;
    this.voice.conso[c].voice.attack  = cp.attack / 1000.0;
    this.voice.conso[c].voice.hold    = cp.hold / 1000.0;
    this.voice.conso[c].voice.release = cp.release / 1000.0;
    this.voice.conso[c].voice.vowel_delay = cp.vdelay / 1000.0;

    console.log('conso_start:' + this.props.value.conso_start);
    console.log('vowel_start:' + this.props.value.vowel_start);
    console.log('conso_end:' + this.props.value.conso_end);
    console.log('vowel_end:' + this.props.value.vowel_end);

    this.rec.clear();
    this.rec.record();
    setTimeout(() => {
      console.log('conso down');
      this.voice.conso[c].down();
    }, 1000 * this.props.value.conso_start);
    setTimeout(() => {
      console.log('vowel down');
      this.voice.vowel.downFreq(vp.f1, vp.f2);
    }, 1000 * this.props.value.vowel_start);
    setTimeout(() => {
      console.log('conso up');
      this.voice.conso[c].up();
    }, 1000 * this.props.value.conso_end);
    setTimeout(() => {
      console.log('vowel up');
      this.voice.vowel.up();
    }, 1000 * this.props.value.vowel_end);
    setTimeout(() => {
      this.rec.stop();
      this.rec.getBuffer((buf)=>{ this.drawWave(buf, this.state.startpos, this.state.endpos); });
      this.rec.exportWAV(this.createDownloadLink);
      document.querySelector('#playbutton').disabled = false;
    }, 1000);
  }


  drawWave(buf, startpos, endpos) {
	  var ch = buf[0];

    this.clearWave();
    var canvas = document.querySelector('#wavecanvas');
    var canvasContext = canvas.getContext('2d');

	  // draw
	  canvasContext.strokeStyle = 'rgb(255, 255, 255)';
    canvasContext.beginPath();
    var wavlength = ch.length;
    var zoomstart = Math.floor(wavlength * startpos / 100);
    var zoomend = Math.floor(wavlength * endpos / 100);
    var len = zoomend - zoomstart;
    for (var i = 0; i < len; i++) {
        var idx = zoomstart + i;
        var x = (i / len) * canvas.width;
        var y = (1 - ch[idx] * Math.pow(2, this.state.boost)) * canvas.height - canvas.height / 2;
        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }
    }
    canvasContext.stroke();
  }

  createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var div = document.createElement('div');
    var link = document.createElement('a');

    link.href = url;
    link.download = 'audio.wav';
    link.innerHTML = 'download';
    div.appendChild(link);

    var parent = document.querySelector('#wavlink');
  	if (parent.firstChild == null) {
  	    parent.appendChild(div);
  	} else {
  		parent.replaceChild(div, parent.firstChild);
  	}
  }

  setTimeZoom(val) {
    this.setState({
      startpos: val[0],
      endpos: val[1]
    });
    if (this.rec) {
      this.rec.getBuffer((buf)=>{ this.drawWave(buf, this.state.startpos, this.state.endpos); });
    }
  }

  setLevelZoom(val) {
    this.setState({
      boost: val
    });
    if (this.rec) {
      this.rec.getBuffer((buf)=>{ this.drawWave(buf, this.state.startpos, this.state.endpos); });
    }
  }

  render() {
    return (
      <div>
        <div>
          <canvas
            id="bgcanvas"
            width="800"
            height="400"
            style={{
              position: 'absolute',
              top: '170px',
              left: '100px',
              backgroundColor:'rgb(120, 20, 60)',
              zIndex: '0'
            }}></canvas>
  	      <canvas
  	        id="wavecanvas"
  	        width="800"
  	        height="400"
  	        style={{
              position: 'absolute',
              top: '170px',
              left: '100px',
              zIndex: '1'
  	        }}></canvas>
  	      <div style={{float:'left'}}>
  		      <button id='playbutton'
  		        onClick={() => { this.play(); }}
  		        style={{
                position: 'absolute',
                top: '170px',
                left: '920px',
  		        	width:'100px',
  		        	height:'30px',
  		        }}>Play</button>
  		      <div id="wavlink"
  		        style={{
                position: 'absolute',
                top: '220px',
                left: '920px',
  		        }}
                />
            <div
              style={{
                position: 'absolute',
                top: '320px',
                left: '960px',
                width: '30px',
                height: '200px'
              }}
            >
              <Slider
                vertical={true}
                defaultValue={this.state.boost}
                step={0.1}
                min={-2}
                max={4}
                onChange={(value) => {this.setLevelZoom(value);}}
              />
            </div>
  		    </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '570px',
            left: '100px',
            width:'800px'
        }}>
          <Slider.Range
            defaultValue={[0, 100]}
            allowCross={false}
            onChange={(value) => {this.setTimeZoom(value);}}
          />
        </div>
      </div>
    );
  }
}

export default WaveCanvas;
