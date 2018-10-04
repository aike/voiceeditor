import React from 'react';
import SmallKnob from './smallknob.js';

class ConsoPanel extends React.Component {
  state = this.props.value;

  componentWillReceiveProps(props) {
    this.setState(props.value);
  }

  handleChange(key, newValue) {
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
      case "bpf_freq":
        this.setState({bpf_freq: newValue});
        break;
      case "bpf_q":
        this.setState({bpf_q: newValue});
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
        <div style={{position:'absolute', top:'95px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="BPF Freq (Hz)" onChange={(val)=>{ this.handleChange("bpf_freq",val); }} value={this.props.value.bpf_freq} min={100} max={8000} />
          <SmallKnob label="BPF Q"         onChange={(val)=>{ this.handleChange("bpf_q",   val); }} value={this.props.value.bpf_q} max={10} />
        </div>
      </div>
    );
  }
}

export default ConsoPanel;
