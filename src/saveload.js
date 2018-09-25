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
  }

  handleImport() {
    var dialog = document.querySelector('#importdialog');
    dialog.showModal();

    var parent = document.querySelector('#importform');
    if (parent.firstChild != null) {
      parent.removeChild(parent.firstChild);
    }

    var input = document.createElement('input');
    input.type='file';
    input.id='importfile'
    parent.appendChild(input);

    input.addEventListener('change', (e)=> {
      e.preventDefault();
      this.reader.readAsText(e.target.files[0]);
      setTimeout(()=>{
        var parent = document.querySelector('#importform');
        if (parent.firstChild != null) {
          parent.removeChild(parent.firstChild);
        }
        var dialog = document.querySelector('#importdialog');
        dialog.close();
      }, 500);
    }, false);
  }

  handleExport() {
    var dialog = document.querySelector('#exportdialog');
    dialog.showModal();

    var parent = document.querySelector('#exportlink');
    if (parent.firstChild != null) {
      parent.removeChild(parent.firstChild);
    }

    var data = this.props.value;
    var blob = new Blob([JSON.stringify(data, null , '  ')], { type: 'application/json' });

    var url = URL.createObjectURL(blob);
    var div = document.createElement('div');
    var link = document.createElement('a');
    link.href = url;
    link.download = 'voicedata.json';
    link.innerHTML = 'download';
    div.appendChild(link);
    parent.appendChild(div);
  }

  render() {
    return (
      <div className="panel" style={{position:'absolute',top:'870px',left:'100px'}}>
        <button id="import" onClick={()=>{this.handleImport();}} style={{marginLeft:'250px'}}>Import</button>
        <button id="export" onClick={()=>{this.handleExport();}} style={{marginLeft: '100px'}}>Export</button>

        <dialog
          id="importdialog"
          style={{
          }}>
          <div className="dialogheader">
          Import Voice Data
          </div>
          <div className="dialogbody">
            インポートするファイルを選択してください
          <div style={{fontSize:'9px', color:'#AAA'}}>ブラウザで処理されるだけで、外部に送信はされません</div>
          </div>
          <div id="importform" style={{marginTop:'5px'}}>
          </div>
          <div className="dialogfooter">
            <button onClick={()=>{document.querySelector('#importdialog').close();}}>Close</button>
          </div>
        </dialog>

        <dialog
          id="exportdialog"
          style={{
          }}>
          <div className="dialogheader">
          Export Voice Data
          </div>
          <div className="dialogbody">
            リンクをクリックして保存してください
          </div>
          <div id="exportlink" style={{fontSize:'18px'}}></div>
          <div className="dialogfooter">
            <button onClick={()=>{document.querySelector('#exportdialog').close();}}>Close</button>
          </div>
        </dialog>

      </div>
    );
  }
}

export default SaveLoad;
