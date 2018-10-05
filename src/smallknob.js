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
    bgColor:'#668',
    rofgColor:'#255',
    robgColor:'#333'
  };

  handleChange = (val) => {
    this.setState({value: val});
    if (this.props.onChange) {
      this.props.onChange(val);
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
          angleArc={this.state.angleArc}
          angleOffset={this.state.angleOffset}
          log={this.props.log ? true : false}
          readOnly={this.props.readOnly}
          bgColor={this.props.readOnly ? this.state.robgColor : this.state.bgColor}
          fgColor={this.props.readOnly ? this.state.rofgColor : this.state.fgColor}
        />
        <div className="smallknob-label" style={{color: this.props.readOnly ? this.state.rofgColor : this.state.fgColor}}>
        {this.props.label}
        </div>
      </div>
    );
  }
}

export default SmallKnob;
