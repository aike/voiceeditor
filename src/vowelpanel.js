import React from 'react';
import SmallKnob from './smallknob.js';

class VowelPanel extends React.Component {

  render() {
    return (
      <div className="panel"
        style={{
          left:'360px', width:'420px', height:'170px', margin:'0px',
          paddingLeft:'10px',
          border:'solid 1px #2EF', borderRadius:'0.4rem'}}>
        <div style={{position:'absolute', top:'0px', left:'200px', fontSize:'11px'}}>Vowel</div>
        <div style={{position:'absolute', top:'95px', width:'200px', height:'60px', margin:'0px'}}>
          <SmallKnob label="Level"       onChange={(val)=>{this.props.onChange('level',  val);}} value={this.props.value.level} />
          <SmallKnob label="Attack"      onChange={(val)=>{this.props.onChange('attack', val);}} value={this.props.value.attack} />
          <SmallKnob label="Release"     onChange={(val)=>{this.props.onChange('release',val);}} value={this.props.value.release} />
        </div>
        <div style={{position:'absolute', top:'20px', left:'220px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="pre F1 (ms)" onChange={(val)=>{this.props.onChange('pre_time1',val);}} value={this.props.value.pre_time1} max={200} />
          <SmallKnob label="pre F1 (Hz)" onChange={(val)=>{this.props.onChange('pre_f1',  val);}}  value={this.props.value.pre_f1} max={1000} />
          <SmallKnob label="F1 (Hz)"     onChange={(val)=>{this.props.onChange('f1',      val);}}  value={this.props.value.f1} max={1000} />
        </div>
        <div style={{position:'absolute', top:'95px', left:'220px', width:'200px', height:'60px', clear:'both'}}>
          <SmallKnob label="pre F2 (ms)" onChange={(val)=>{this.props.onChange('pre_time2',val);}} value={this.props.value.pre_time2} max={200} />
          <SmallKnob label="pre F2 (Hz)" onChange={(val)=>{this.props.onChange('pre_f2',  val);}}  value={this.props.value.pre_f2} max={3000} />
          <SmallKnob label="F2 (Hz)"     onChange={(val)=>{this.props.onChange('f2',      val);}}  value={this.props.value.f2} max={3000} />
        </div>
      </div>
    );
  }
}

export default VowelPanel;
