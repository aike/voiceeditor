import Knob from 'react-canvas-knob';
import React from 'react';

class SmallKnob extends React.Component {
  state = {
  	value: this.props.value,
  	width:60,
  	height:60,
  	angleArc: 270,
  	angleOffset: -135,
  	className: 'smallknob-body',
  	fgColor:'#2EF',
  	bgColor:'#668'
  };

  handleChange = (newValue) => {
    this.setState({value: newValue});
  };

  render() {
    return (
      <div className="smallknob">
	      <Knob
	        value={this.state.value}
	        onChange={this.handleChange}
	        width={this.state.width}
	        height={this.state.height}
	        className={this.state.className}
	        bgColor={this.state.bgColor}
	        fgColor={this.state.fgColor}
	        angleArc={this.state.angleArc}
	        angleOffset={this.state.angleOffset}
	      />
	      <div className="smallknob-label">
	      {this.props.label}
	      </div>
      </div>
    );
  }
}

export default SmallKnob;
