import React from 'react';

class ConsoDropDown extends React.Component {
  render() {
    return (
      <select name="conso"
        onChange={(e)=>{this.props.onChange(e.target.value);}}
        value={this.props.value}
        style={{
          position: 'absolute',
          top: '490px',
          left: '125px',
          zIndex: 1,
          width:100,
          height:26,
          fontSize:'18px',
          marginBottom:'0px'
        }}>
        <option value="h">h</option>
        <option value="s">s</option>
        <option value="sy">sy</option>
        <option value="p">p</option>
        <option value="k">k</option>
        <option value="t">t</option>
        <option value="c">c</option>
        <option value="ts">ts</option>
      </select>
    );
  }
}

export default ConsoDropDown;

