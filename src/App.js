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
    info0: '[h]の場合',
    info1: '子音ボタンと母音ボタンを同時に押した場合、子音と母音が両方鳴り続けます。',
    info2: '子音ボタンのみを押した場合は発音せず、子音ボタンを押したまま母音ボタンを押すと子音と母音が鳴ります。',
    info3: 'これは子音ボタンだけだとF1F2が決められないためです。',
    info4: '子音のHoldは使用しません。',

    conso_type: 'h',

    conso_start: 0,
    conso_end: 0.5,
    vowel_start: 0.2,
    vowel_end: 0.8,

    conso_param: {level: 80, attack: 10, hold: 40, release: 10, vdelay: 20},
    vowel_param: {level: 80, attack: 10, release: 10, f1: 800, f2: 1200, apitch: 0},
  };
  conso_params = {
    h:  {level: 80, attack: 10, hold: 40, release: 10, vdelay: 20},
    s:  {level: 80, attack: 10, hold: 40, release: 10, vdelay: 20},
    sy: {level: 80, attack: 10, hold: 40, release: 10, vdelay: 20},
    p:  {level: 90, attack:  0, hold: 10, release: 10, vdelay: 20},
    k:  {level: 80, attack: 10, hold: 40, release: 10, vdelay: 20},
    t:  {level: 85, attack:  0, hold: 12, release:  6, vdelay: 20},
  };

  // Consonant Dropdown List
  handleChangeConsoType(event) {
    const c = event.target.value;
    var info0, info1, info2, info3, info4;

    switch (c) {
      case 'h':
        info0 = '[' + c + ']の場合';
        info1 = '子音ボタンと母音ボタンを同時に押した場合、子音と母音が両方鳴り続けます。';
        info2 = '子音ボタンのみを押した場合は発音せず、子音ボタンを押したまま母音ボタンを押すと子音と母音が鳴ります。';
        info3 = 'これは子音ボタンだけだとF1F2が決められないためです。';
        info4 = '子音のHoldは使用しません。'
        break;
      case 's':
      case 'sy':
        info0 = '[' + c + ']の場合';
        info1 = '子音ボタンと母音ボタンを同時に押した場合、Attack+Hold+Releaseの時間だけ子音が鳴り母音に切り替わります。';
        info2 = '子音は子音ボタンを押した瞬間から発音開始します。';
        info3 = '母音ボタンを押して子音ボタンを離すと子音が停止し、母音に切り替わります。';
        info4 = ''
        break;
      case 'p':
      case 'k':
      case 't':
        info0 = '[' + c + ']の場合';
        info1 = '子音ボタンと母音ボタンを同時に押した場合、瞬間的に子音が鳴り、すぐ母音に切り替わります。';
        info2 = '子音ボタンのみを押した場合は発音しません。'
        info3 = '子音ボタンを押したまま母音ボタンを押すと、母音ボタンを押した瞬間子音が鳴り、すぐ母音に切り替わります。';
        info4 = '子音のエンベロープはAttack,Hold,Releaseの台形になります。'
        break;
    }


    this.setState({
      conso_type: c,
      conso_param: this.conso_params[c],
      info0: info0,
      info1: info1,
      info2: info2,
      info3: info3,
      info4: info4
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

  render() {
    const current = this.state.conso_param;

    return (
      <div className="App">
        <div className="Logo">voice editor</div>
        <select name="conso"
          onChange={(e)=>{this.handleChangeConsoType(e);}}
          style={{
            width:100,
            height:22,
            fontSize:'16px',
            marginBottom:'0px'
          }}>
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
        <div className="info">
          <div>{this.state.info0}</div>
          <div>{this.state.info1}</div>
          <div>{this.state.info2}</div>
          <div>{this.state.info3}</div>
          <div>{this.state.info4}</div>
        </div>
      </div>
    );
  }

}

export default App;
