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
      case "vdelay":
        this.setState({vdelay: newValue});
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
      <div className="panel"
        style={{
          left:'0px', width:'340px', height:'170px', margin:'0px',
          paddingLeft:'10px',
          border:'solid 1px #2EF', borderRadius:'0.4rem'}}>
        <div style={{position:'absolute', top:'0px', left:'150px', fontSize:'11px'}}>Consonant</div>
        <div style={{position:'absolute', top:'20px', width:'330px', height:'60px', margin:'0px'}}>
          <SmallKnob label="Level"       onChange={(val)=>{ this.handleChange("level",  val); }} value={this.props.value.level} />
          <SmallKnob label="Attack"      onChange={(val)=>{ this.handleChange("attack", val); }} value={this.props.value.attack} />
          <SmallKnob label="Hold"        onChange={(val)=>{ this.handleChange("hold",   val); }} value={this.props.value.hold} />
          <SmallKnob label="Release"     onChange={(val)=>{ this.handleChange("release",val); }} value={this.props.value.release} />
          <SmallKnob label="Vowel Delay" onChange={(val)=>{ this.handleChange("vdelay" ,val); }} value={this.props.value.vdelay} max={200} />
        </div>
      </div>
    );
  }
}

export default ConsoPanel;
