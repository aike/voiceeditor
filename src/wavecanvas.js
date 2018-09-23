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
      voice: null,
      startpos: 0,
      endpos: 100
    }
  }

  componentDidMount() {
    this.clear();
    this.voice = new VoiceApp();
    this.rec = new Recorder(this.voice.out, {numChannels:1});
  }

  clear() {
    var canvas = document.querySelector('#wavecanvas');
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

  play() {
    this.rec.clear();
    this.rec.record();
    this.voice.vowel.down(0.5, 0.5);
    //osc.start(0);
    setTimeout(() => {
      this.voice.vowel.up();
      //osc.stop();
      this.rec.stop();
      this.rec.getBuffer((buf)=>{ this.drawWave(buf, this.state.startpos, this.state.endpos); });
      this.rec.exportWAV(this.createDownloadLink);
    }, 100)
  }

  drawWave(buf, startpos, endpos) {
	  var ch = buf[0];

    this.clear();
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
        var y = (1 - ch[idx] * 1.5) * canvas.height - canvas.height / 2;
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

  setZoom(val) {
    this.setState({
      startpos: val[0],
      endpos: val[1]
    });
    if (this.rec) {
      this.rec.getBuffer((buf)=>{ this.drawWave(buf, this.state.startpos, this.state.endpos); });
    }
  }

  render() {
    this.clear();
    return (
      <div>
        <div>
  	      <canvas
  	        id="wavecanvas"
  	        width="800"
  	        height="400"
  	        style={{
  	        	backgroundColor:'rgb(20, 20, 60)',
  	        	margin: '30px 10px 0px 0px',
  	        	float:'left'
  	        }}></canvas>
  	      <div style={{float:'left'}}>
  		      <button
  		        onClick={() => { this.play(); }}
  		        style={{
  		        	width:'100px',
  		        	height:'30px',
  		        	margin:'30px 20px 20px 20px'
  		        }}>Play</button>
  		      <div id="wavlink"
  		        style={{
  		        	margin:'10px 20px'
  		        }} 
                />
  		    </div>
        </div>
        <div style={{clear:'both', width:'800px'}}>
          <Slider.Range defaultValue={[0, 100]} allowCross={false} onChange={(value) => {this.setZoom(value);}} />
        </div>
      </div>
    );
  }
}

export default WaveCanvas;
