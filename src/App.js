import React, { Component } from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ConsoPanel from './consopanel.js';
import VowelPanel from './vowelpanel.js';
import WaveCanvas from './wavecanvas.js';


const TipRange = Slider.createSliderWithTooltip(Slider.Range);

class App extends Component {
  state = {
    value:10,

    conso_start: 0,
    conso_end: 20,
    vowel_start: 20,
    vowel_end: 50,

    conso_param: {level: 50, attack: 10, hold: 40, release: 10},
    vowel_param: {level: 50, attack: 10, release: 10, f1: 50, f2: 50, apitch: 0},
  }

  handleChange = (newValue) => {
    this.setState({value: newValue});
  };


  render() {
    return (
      <div className="App">
        <select name="conso" style={{width:100, height:30, fontSize:'20px', marginBottom:'20px'}}>
          <option value="h">h</option>
          <option value="s">s</option>
          <option value="sy">sy</option>
          <option value="p">p</option>
          <option value="k">k</option>
          <option value="t">t</option>
        </select>

        <div className="slider-wrapper">
          <TipRange defaultValue={[this.state.conso_start, this.state.conso_end]}/>
        </div>
        <div className="slider-wrapper">
          <TipRange defaultValue={[this.state.vowel_start, this.state.vowel_end]}/>
        </div>
        <div>
          <WaveCanvas />
        </div>
        <div>
          <ConsoPanel value={this.state.conso_param}/>
          <VowelPanel value={this.state.vowel_param}/>
        </div>
      </div>
    );
  }

}

export default App;
