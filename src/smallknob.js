//import Knob from 'react-canvas-knob';
import Knob from './knob';
import React from 'react';

class SmallKnob extends React.Component {
  state = {
  	value: this.props.value,
    max: this.props.max,
  	width:48,
  	height:48,
  	angleArc: 270,
  	angleOffset: -135,
  	className: 'smallknob-body',
  	fgColor:'#2EF',
  	bgColor:'#668'
  };

  handleChange = (newValue) => {
    this.setState({value: newValue});
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  };

  render() {
    return (
      <div className="smallknob">
	      <Knob
	        value={this.props.value}
          max={this.state.max}
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
