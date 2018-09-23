import React from 'react';
import SmallKnob from './smallknob.js';

class ConsoPanel extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="panel">
        <SmallKnob label="Level" value={this.props.value.level} />
        <SmallKnob label="Attack" value={this.props.value.attack} />
        <SmallKnob label="Hold" value={this.props.value.hold} />
        <SmallKnob label="Release" value={this.props.value.release} />
        <br />
        Consonant
      </div>
    );
  }
}

export default ConsoPanel;
