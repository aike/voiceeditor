import React from 'react';
import SmallKnob from './smallknob.js';

class VowelPanel extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="panel">
        <SmallKnob label="Level" value={this.props.value.level} />
        <SmallKnob label="Attack" value={this.props.value.attack} />
        <SmallKnob label="Release" value={this.props.value.release} />
        <SmallKnob label="F1" value={this.props.value.f1} />
        <SmallKnob label="F2" value={this.props.value.f2} />
        <SmallKnob label="A.Pitch" value={this.props.value.apitch} />
        <br />
        Vowel
      </div>
    );
  }
}

export default VowelPanel;
