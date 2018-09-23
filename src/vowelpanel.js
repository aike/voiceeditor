import React from 'react';
import SmallKnob from './smallknob.js';

class VowelPanel extends React.Component {
  state = {
    level: 50,
    attack: 10,
    release: 10,
    f1: 50,
    f2: 50,
    apitch: 0
  };

  handleChange = (key, newValue) => {
    switch (key) {
      case "level":
        this.setState({level: newValue});
        break;
      case "attack":
        this.setState({attack: newValue});
        break;
      case "release":
        this.setState({release: newValue});
        break;
      case "f1":
        this.setState({f1: newValue});
        break;
      case "f2":
        this.setState({f2: newValue});
        break;
      case "apitch":
        this.setState({apitch: newValue});
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
        <SmallKnob label="Level"   onChange={(val)=>{ this.handleChange("level",   val); }} value={this.props.value.level} />
        <SmallKnob label="Attack"  onChange={(val)=>{ this.handleChange("attack",  val); }} value={this.props.value.attack} />
        <SmallKnob label="Release" onChange={(val)=>{ this.handleChange("release", val); }} value={this.props.value.release} />
        <SmallKnob label="F1"      onChange={(val)=>{ this.handleChange("f1",      val); }} value={this.props.value.f1} max={1000} />
        <SmallKnob label="F2"      onChange={(val)=>{ this.handleChange("f2",      val); }} value={this.props.value.f2} max={3000} />
        <SmallKnob label="A.Pitch" onChange={(val)=>{ this.handleChange("apitch",  val); }} value={this.props.value.apitch} />
        <br />
        Vowel
      </div>
    );
  }
}

export default VowelPanel;
