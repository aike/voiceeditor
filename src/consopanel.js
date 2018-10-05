import React from 'react';
import SmallKnob from './smallknob.js';

class ConsoPanel extends React.Component {
  render() {
    return (
      <div className="panel"
        style={{
          left:'0px', width:'340px', height:'170px', margin:'0px',
          paddingLeft:'10px',
          border:'solid 1px #2EF', borderRadius:'0.4rem'}}>
        <div style={{position:'absolute', top:'0px', left:'150px', fontSize:'11px'}}>Consonant</div>
        <div style={{position:'absolute', top:'95px', width:'330px', height:'60px', margin:'0px'}}>
          <SmallKnob label="Level"       onChange={(val)=>{this.props.onChange('level',   val);}} value={this.props.value.conso_param.level} />
          <SmallKnob label="Attack"      onChange={(val)=>{this.props.onChange('attack',  val);}} value={this.props.value.conso_param.attack} />
          <SmallKnob label="Hold"        onChange={(val)=>{this.props.onChange('hold',    val);}} value={this.props.value.conso_param.hold}
                                         readOnly={this.props.value.conso_type === 'h' ? true : false} />
          <SmallKnob label="Release"     onChange={(val)=>{this.props.onChange('release', val);}} value={this.props.value.conso_param.release} />
          <SmallKnob label="Vowel Delay" onChange={(val)=>{this.props.onChange('vdelay',  val);}} value={this.props.value.conso_param.vdelay} max={200} />
        </div>
        <div style={{position:'absolute', top:'20px', left:'200px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="BPF Freq (Hz)" onChange={(val)=>{this.props.onChange('bpf_freq', val);}} value={this.props.value.conso_param.bpf_freq} max={8000} log={true}
                                           readOnly={this.props.value.conso_type === 'h' ? true : false} />
          <SmallKnob label="BPF Q"         onChange={(val)=>{this.props.onChange('bpf_q',    val);}} value={this.props.value.conso_param.bpf_q} max={10}
                                           readOnly={this.props.value.conso_type === 'h' ? true : false} />
        </div>
      </div>
    );
  }
}

export default ConsoPanel;
