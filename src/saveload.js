import React from 'react';

class SaveLoad extends React.Component {
  state = this.props.value;


  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      if (this.props.onChange) {
        this.props.onChange(json.state, json.conso_params);
      }
    };

    this.file = document.querySelector('#load');
    this.file.addEventListener('change', (e)=> {
      this.reader.readAsText(e.target.files[0]);
      e.preventDefault();
    }, false);
  }

  handleDownload() {
    var parent = document.querySelector('#savelink');
    if (parent.firstChild != null) {
      parent.removeChild(parent.firstChild);
    }

    var data = this.props.value;
    var blob = new Blob([JSON.stringify(data, null , '  ')], { type: 'application\/json' });

    var url = URL.createObjectURL(blob);
    var div = document.createElement('div');
    var link = document.createElement('a');
    link.href = url;
    link.download = 'export.json';
    link.innerHTML = 'download';
    div.appendChild(link);
    parent.appendChild(div);
  }

  render() {
    return (
      <div className="panel" style={{position:'absolute',top:'900px',left:'100px'}}>
        <input type="file" id="load" />
        <button id="save" download="test.json" onClick={()=>{this.handleDownload();}}>Export</button>
        <div id="savelink"></div>
      </div>
    );
  }
}

export default SaveLoad;
