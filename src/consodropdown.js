import React from 'react';

class ConsoDropDown extends React.Component {
  render() {
    return (
      <select name="conso"
        onChange={(e)=>{this.props.onChange(e.target.value);}}
        style={{
          width:100,
          height:22,
          fontSize:'16px',
          marginBottom:'0px'
        }}>
        <option value="h">h</option>
        <option value="s">s</option>
        <option value="sy">sy</option>
        <option value="p">p</option>
        <option value="k">k</option>
        <option value="t">t</option>
      </select>
    );
  }
}

export default ConsoDropDown;

