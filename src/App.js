import React, { Component } from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ConsoPanel from './consopanel';
import VowelPanel from './vowelpanel';
import WaveCanvas from './wavecanvas';
import ConsoDropDown from './consodropdown';
import Info from './info';
import SaveLoad from './saveload';
import axios from 'axios';

const TipRange = Slider.createSliderWithTooltip(Slider.Range);

class App extends Component {
  state = {
    conso_type: 'h',
    conso_start: 0,
    conso_end: 0,
    vowel_start: 0,
    vowel_end: 0,
    conso_param: {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
    vowel_param: {
      level: 0, attack: 0, release: 0,
      pre_time1: 0, pre_f1: 0, f1: 0,
      pre_time2: 0, pre_f2: 0, f2: 0}
  };
  conso_params = {
    h:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
    s:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
    sy: {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
    p:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
    k:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
    t:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0},
  };

  componentWillMount() {
    axios.get('./voicedata.json')
      .then((res) => {
        this.handleImport(res.data.state, res.data.conso_params);
      });
  }

  // Consonant Dropdown List
  handleChangeDropDown(c) {
    this.setState({
      conso_type: c,
      conso_param: this.conso_params[c],
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
    this.conso_params[c].vdelay  = val.vdelay;
  }

  // Vowel Knobs
  handleChangeVowel(val) {
    this.setState({vowel_param: val});
  }

  handleImport(st, cp)
  {
    this.setState(st);
    this.conso_params = cp;
  }

  render() {
    return (
      <div className="App">
        <div className="Logo">voice editor</div>
        <ConsoDropDown value={this.state.conso_type} onChange={(val)=>{this.handleChangeDropDown(val);}} />
        <div className="slider-wrapper">
          <div>Consonant Button Push/Release</div>
          <TipRange
            max={1}
            step={0.01}
            value={[this.state.conso_start, this.state.conso_end]}
            tipFormatter={value => `${value} sec`}
            onChange={(value) => {this.setConsoTiming(value);}}
          />
        </div>
        <div className="slider-wrapper">
          <div>Vowel Button Push/Release</div>
          <TipRange
            max={1}
            step={0.01}
            value={[this.state.vowel_start, this.state.vowel_end]}
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
        <SaveLoad value={{state:this.state, conso_params:this.conso_params}} onChange={(st, cp)=>{this.handleImport(st, cp);}} />
        <Info value={this.state.conso_type} />
        <div id="github"><a href="https://github.com/aike/voiceeditor" target="_blank">about</a></div>
      </div>
    );
  }

}

export default App;
