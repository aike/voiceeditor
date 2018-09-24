import React, { Component } from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ConsoPanel from './consopanel';
import VowelPanel from './vowelpanel';
import WaveCanvas from './wavecanvas';


const TipRange = Slider.createSliderWithTooltip(Slider.Range);

class App extends Component {
  state = {
    value:10,

    conso_type: 'h',

    conso_start: 0,
    conso_end: 0.5,
    vowel_start: 0.2,
    vowel_end: 0.8,

    conso_param: {level: 80, attack: 10, hold: 40, release: 10},
    vowel_param: {level: 80, attack: 10, release: 10, f1: 500, f2: 1500, apitch: 0},
  };
  conso_params = {
    h:  {level: 80, attack: 10, hold: 40, release: 10},
    s:  {level: 80, attack: 10, hold: 40, release: 10},
    sy: {level: 80, attack: 10, hold: 40, release: 10},
    p:  {level: 80, attack: 10, hold: 40, release: 10},
    k:  {level: 80, attack: 10, hold: 40, release: 10},
    t:  {level: 80, attack: 10, hold: 40, release: 10},
  };

  // Consonant Dropdown List
  handleChangeConsoType(event) {
    const c = event.target.value;
    this.setState({
      conso_type: c,
      conso_param: this.conso_params[c]
    });
  }

  // Consonant Slider
  setConsoTiming(val) {
    this.setState({
      conso_start: val[0],
      conso_end: val[1]
    });
  }

  // Vowel Slider
  setVowelTiming(val) {
    this.setState({
      vowel_start: val[0],
      vowel_end: val[1]
    });
  }

  // Consonant Knobs
  handleChangeConsoValue(val) {
    this.setState({
      conso_param: val
    });
    const c = this.state.conso_type;
    this.conso_params[c].level   = val.level;
    this.conso_params[c].attack  = val.attack;
    this.conso_params[c].hold    = val.hold;
    this.conso_params[c].release = val.release;
  }

  // Vowel Knobs
  handleChangeVowel(val) {
    this.setState({vowel_param: val});
  }

  render() {
    const current = this.state.conso_param;

    return (
      <div className="App">
        <select name="conso" onChange={(e)=>{this.handleChangeConsoType(e);}} style={{width:100, height:30, fontSize:'20px', marginBottom:'20px'}}>
          <option value="h">h</option>
          <option value="s">s</option>
          <option value="sy">sy</option>
          <option value="p">p</option>
          <option value="k">k</option>
          <option value="t">t</option>
        </select>

        <div className="slider-wrapper">
          <div>Consonant Button Push/Release</div>
          <TipRange
            max={1}
            step={0.01}
            defaultValue={[this.state.conso_start, this.state.conso_end]}
            tipFormatter={value => `${value} sec`}
            onChange={(value) => {this.setConsoTiming(value);}}
          />
        </div>
        <div className="slider-wrapper">
          <div>Vowel Button Push/Release</div>
          <TipRange
            max={1}
            step={0.01}
            defaultValue={[this.state.vowel_start, this.state.vowel_end]}
            tipFormatter={value => `${value} sec`}
            onChange={(value) => {this.setVowelTiming(value);}}
          />
        </div>
        <div>
          <WaveCanvas value={this.state} />
        </div>
        <div className="panelarea">
          <ConsoPanel value={this.state.conso_param} onChange={(val)=>{this.handleChangeConsoValue(val);}} />
          <VowelPanel value={this.state.vowel_param} onChange={(val)=>{this.handleChangeVowel(val);}} />
        </div>
      </div>
    );
  }

}

export default App;
