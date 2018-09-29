import React from 'react';
import SmallKnob from './smallknob.js';

class VowelPanel extends React.Component {
  state = this.props.value;

  componentWillReceiveProps(props) {
    this.setState(props.value);
  }

  handleChange(key, val) {
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
      <div className="panel"
        style={{
          left:'360px', width:'420px', height:'170px', margin:'0px',
          paddingLeft:'10px',
          border:'solid 1px #2EF', borderRadius:'0.4rem'}}>
        <div style={{position:'absolute', top:'0px', left:'200px', fontSize:'11px'}}>Vowel</div>
        <div style={{position:'absolute', top:'20px', width:'200px', height:'60px', margin:'0px'}}>
          <SmallKnob label="Level"       onChange={(val)=>{ this.handleChange("level",   val); }} value={this.props.value.level} />
          <SmallKnob label="Attack"      onChange={(val)=>{ this.handleChange("attack",  val); }} value={this.props.value.attack} />
          <SmallKnob label="Release"     onChange={(val)=>{ this.handleChange("release", val); }} value={this.props.value.release} />
        </div>
        <div style={{position:'absolute', top:'20px', left:'220px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="pre F1 (ms)" onChange={(val)=>{ this.handleChange("pre_time1",val);}} value={this.props.value.pre_time1} max={200} />
          <SmallKnob label="pre F1 (Hz)" onChange={(val)=>{ this.handleChange("pre_f1",  val); }} value={this.props.value.pre_f1} max={1000} />
          <SmallKnob label="F1 (Hz)"     onChange={(val)=>{ this.handleChange("f1",      val); }} value={this.props.value.f1} max={1000} />
        </div>
        <div style={{position:'absolute', top:'95px', left:'220px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="pre F2 (ms)" onChange={(val)=>{ this.handleChange("pre_time2",val);}} value={this.props.value.pre_time2} max={200} />
          <SmallKnob label="pre F2 (Hz)" onChange={(val)=>{ this.handleChange("pre_f2",  val); }} value={this.props.value.pre_f2} max={3000} />
          <SmallKnob label="F2 (Hz)"     onChange={(val)=>{ this.handleChange("f2",      val); }} value={this.props.value.f2} max={3000} />
        </div>
      </div>
    );
  }
}

export default VowelPanel;
