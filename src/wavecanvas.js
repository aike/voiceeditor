import React from 'react';
import Recorder from './recorder.js';

class WaveCanvas extends React.Component {
  constructor() {
    super();

	window.AudioContext = window.webkitAudioContext || window.AudioContext;
	this.play = this.play.bind(this);
  }

  play() {
	let audioctx = new AudioContext();
    var osc = audioctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 110;
    var gain = audioctx.createGain();
    gain.gain.value = 0.2;
    osc.connect(gain);
    gain.connect(audioctx.destination);

	var rec = new Recorder(gain, {numChannels:1})

	console.log('-----');
	console.log(this);

	rec.clear();
	rec.record();
    osc.start(0);
    setTimeout(() => {
    	osc.stop();
    	console.log('end');
		rec.stop();
		rec.getBuffer((buf)=>{ this.drawWave(buf); });
	    rec.exportWAV(this.createDownloadLink);
    }, 100)
  }

  drawWave(buf) {
	var ch = buf[0];

	// clear
	var canvas = document.querySelector('#wavecanvas');
	var canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = 'rgb(20, 20, 60)';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	// draw
	canvasContext.strokeStyle = 'rgb(230, 230, 255)';
    canvasContext.beginPath();
    for (var i = 0, len = ch.length; i < len; i++) {
        var x = (i / len) * canvas.width;
        var y = (1 - ch[i] * 1.5) * canvas.height - canvas.height / 2;
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


  render() {
    return (
      <div>
	      <canvas
	        id="wavecanvas"
	        width="800"
	        height="400"
	        style={{
	        	backgroundColor:'rgb(20, 20, 60)',
	        	margin: '30px 0px 30px 0px',
	        	float:'left'
	        }}></canvas>
	      <div style={{float:'left'}}>
		      <button
		        onClick={this.play}
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
    );
  }
}

export default WaveCanvas;
