import React from 'react';
import SmallKnob from './smallknob.js';

class VowelPanel extends React.Component {
  state = this.props.value;

  handleChange = (key, val) => {
    switch (key) {
      case "level":
        this.setState({level: val});
        break;
      case "attack":
        this.setState({attack: val});
        break;
      case "release":
        this.setState({release: val});
        break;
      case "pre_f1":
        this.setState({pre_f1: val});
        break;
      case "pre_f2":
        this.setState({pre_f2: val});
        break;
      case "pre_time1":
        this.setState({pre_time1: val});
        break;
      case "pre_time2":
        this.setState({pre_time2: val});
        break;
      case "f1":
        this.setState({f1: val});
        break;
      case "f2":
        this.setState({f2: val});
        break;
      default:
        break;
    }
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  render() {
    return (
      <div className="panel">
        <SmallKnob label="Level"       onChange={(val)=>{ this.handleChange("level",   val); }} value={this.props.value.level} />
        <SmallKnob label="Attack"      onChange={(val)=>{ this.handleChange("attack",  val); }} value={this.props.value.attack} />
        <SmallKnob label="Release"     onChange={(val)=>{ this.handleChange("release", val); }} value={this.props.value.release} />
        <SmallKnob label="pre F1 (ms)" onChange={(val)=>{ this.handleChange("pre_time1",val);}} value={this.props.value.pre_time1} max={200} />
        <SmallKnob label="pre F1 (Hz)" onChange={(val)=>{ this.handleChange("pre_f1",  val); }} value={this.props.value.pre_f1} max={1000} />
        <SmallKnob label="pre F2 (ms)" onChange={(val)=>{ this.handleChange("pre_time2",val);}} value={this.props.value.pre_time2} max={200} />
        <SmallKnob label="pre F2 (Hz)" onChange={(val)=>{ this.handleChange("pre_f2",  val); }} value={this.props.value.pre_f2} max={3000} />
        <SmallKnob label="F1 (Hz)"     onChange={(val)=>{ this.handleChange("f1",      val); }} value={this.props.value.f1} max={1000} />
        <SmallKnob label="F2 (Hz)"     onChange={(val)=>{ this.handleChange("f2",      val); }} value={this.props.value.f2} max={3000} />
        <div style={{position:'absolute', top:'87px', left:'600px', fontSize:'11px'}}>Vowel</div>
      </div>
    );
  }
}

export default VowelPanel;
