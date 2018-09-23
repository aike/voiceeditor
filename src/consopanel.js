import React from 'react';
import SmallKnob from './smallknob.js';

class ConsoPanel extends React.Component {
  state = this.props.value;

  handleChange = (key, newValue) => {
    console.log('consopanel handleChange ' + key);
    switch (key) {
      case "level":
        this.setState({level: newValue});
        break;
      case "attack":
        this.setState({attack: newValue});
        break;
      case "hold":
        this.setState({hold: newValue});
        break;
      case "release":
        this.setState({release: newValue});
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
        <SmallKnob label="Level"   onChange={(val)=>{ this.handleChange("level",  val); }} value={this.props.value.level} />
        <SmallKnob label="Attack"  onChange={(val)=>{ this.handleChange("attack", val); }} value={this.props.value.attack} />
        <SmallKnob label="Hold"    onChange={(val)=>{ this.handleChange("hold",   val); }} value={this.props.value.hold} />
        <SmallKnob label="Release" onChange={(val)=>{ this.handleChange("release",val); }} value={this.props.value.release} />
        <br />
        Consonant
      </div>
    );
  }
}

export default ConsoPanel;
