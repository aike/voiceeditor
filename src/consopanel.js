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
          <SmallKnob label="Decay"     onChange={(val)=>{this.props.onChange('decay', val);}} value={this.props.value.conso_param.decay} />
          <SmallKnob label="S.Lev"     onChange={(val)=>{this.props.onChange('sustainLevel', val);}} value={this.props.value.conso_param.sustainLevel} />
          <SmallKnob label="S.Time"     onChange={(val)=>{this.props.onChange('sustainTime', val);}} value={this.props.value.conso_param.sustainTime} />
          <SmallKnob label="Release"     onChange={(val)=>{this.props.onChange('release', val);}} value={this.props.value.conso_param.release} />
          <SmallKnob label="Vowel Delay" onChange={(val)=>{this.props.onChange('vdelay',  val);}} value={this.props.value.conso_param.vdelay} max={200} />
        </div>
        <div style={{position:'absolute', top:'20px', left:'200px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="Filter Freq (Hz)" onChange={(val)=>{this.props.onChange('filter_freq', val);}} value={this.props.value.conso_param.filter_freq} max={8000} log={true}
                                              readOnly={this.props.value.conso_type === 'h' ? true : false} />
          <SmallKnob label="Filter Q"         onChange={(val)=>{this.props.onChange('filter_q',    val);}} value={this.props.value.conso_param.filter_q} max={20}
                                              readOnly={this.props.value.conso_type === 'h' ? true : false} />
        </div>
      </div>
    );
  }
}

export default ConsoPanel;
