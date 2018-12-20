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
    timestamp: '00000000000000',
    conso_type: 'h',
    conso_start: 0,
    conso_end: 0,
    vowel_start: 0,
    vowel_end: 0,
    conso_param: {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    vowel_param: {
      level: 0, attack: 0, release: 0,
      pre_time1: 0, pre_f1: 0, f1: 0,
      pre_time2: 0, pre_f2: 0, f2: 0}
  };
  conso_params = {
    h:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    s:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    sy: {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    p:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    k:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    t:  {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    cy: {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
    ts: {level: 0, attack: 0, hold: 0, release: 0, vdelay: 0, bpf_freq: 0, bpf_q: 0},
  };

  componentDidMount() {
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
  handleChangeConso(key, val) {
    const conso = Object.assign(this.state.conso_param, {[key]: val});
    this.setState({
      conso_param: conso
    });
    this.conso_params[this.state.conso_type][key] = val;
  }

  // Vowel Knobs
  handleChangeVowel(key, val) {
    const vowel = Object.assign(this.state.vowel_param, {[key]: val});
    this.setState({vowel_param: vowel});
  }

  handleImport(stat, conso)
  {
    this.setState(stat);
    this.conso_params = conso;
  }

  render() {
    return (
      <div className="App">
        <div className="Logo">voice editor</div>
        <ConsoDropDown value={this.state.conso_type} onChange={(val)=>{this.handleChangeDropDown(val);}} />
        <div style={{
            position: 'absolute',
            top: '40px',
            fontSize: '11px',
            width: '800px',
            margin: '8px 0px 8px 0px'
          }}>
          <div>Consonant Button Push/Release</div>
          <TipRange
            max={1}
            step={0.01}
            value={[this.state.conso_start, this.state.conso_end]}
            tipFormatter={value => `${value} sec`}
            onChange={(value) => {this.setConsoTiming(value);}}
          />
        </div>
        <div style={{
            position: 'absolute',
            top: '80px',
            fontSize: '11px',
            width: '800px',
            margin: '8px 0px 8px 0px'
          }}>
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
          <ConsoPanel value={this.state} onChange={(key, val)=>{this.handleChangeConso(key, val);}} />
          <VowelPanel value={this.state.vowel_param} onChange={(key, val)=>{this.handleChangeVowel(key, val);}} />
        </div>
        <SaveLoad value={{state:this.state, conso_params:this.conso_params, property:this.property}} onChange={(st, cp, pr)=>{this.handleImport(st, cp, pr);}} />
        <Info value={this.state.conso_type} />
        <div id="timestamp">data update: {this.state.timestamp}</div>
        <div id="github"><a href="https://github.com/aike/voiceeditor" target="_blank" rel="noopener noreferrer">about</a></div>
      </div>
    );
  }

}

export default App;
