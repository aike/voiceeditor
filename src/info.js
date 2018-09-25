import React from 'react';

class Info extends React.Component {
  constructor(props) {
    super();
    this.text = {}
    this.text['h_type'] = new Array(4);
    this.text['s_type'] = new Array(4);
    this.text['p_type'] = new Array(4);

    this.text['h_type'][0] = '子音ボタンと母音ボタンを同時に押した場合、子音と母音が両方鳴り続けます。';
    this.text['h_type'][1] = '子音ボタンのみを押した場合は発音せず、子音ボタンを押したまま母音ボタンを押すと子音と母音が鳴ります。';
    this.text['h_type'][2] = 'これは子音ボタンだけだとF1F2が決められないためです。';
    this.text['h_type'][3] = '子音のHoldは使用しません。'

    this.text['s_type'][0] = '子音ボタンと母音ボタンを同時に押した場合、Attack+Hold+Releaseの時間だけ子音が鳴り母音に切り替わります。';
    this.text['s_type'][1] = '子音は子音ボタンを押した瞬間から発音開始します。';
    this.text['s_type'][2] = '母音ボタンを押して子音ボタンを離すと子音が停止し、母音に切り替わります。';
    this.text['s_type'][3] = ''

    this.text['p_type'][0] = '子音ボタンと母音ボタンを同時に押した場合、瞬間的に子音が鳴り、すぐ母音に切り替わります。';
    this.text['p_type'][1] = '子音ボタンのみを押した場合は発音しません。'
    this.text['p_type'][2] = '子音ボタンを押したまま母音ボタンを押すと、母音ボタンを押した瞬間子音が鳴り、すぐ母音に切り替わります。';
    this.text['p_type'][3] = '子音のエンベロープはAttack,Hold,Releaseの台形になります。'
  }

  getType(c)
  {
    switch (c) {
      case 'h':
        return 'h_type';
        break;
      case 's':
      case 'sy':
        return 's_type';
        break;
      case 'p':
      case 'k':
      case 't':
        return 'p_type';
        break;
    }
  }

  render() {
    return (
      <div className="info">
        <div>[{this.props.value}]</div>
        <div>{this.text[this.getType(this.props.value)][0]}</div>
        <div>{this.text[this.getType(this.props.value)][1]}</div>
        <div>{this.text[this.getType(this.props.value)][2]}</div>
        <div>{this.text[this.getType(this.props.value)][3]}</div>
      </div>
    );
  }
}

export default Info;

