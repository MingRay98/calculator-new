import React from 'react';
import './App.css';
import DisplayBlock from './component/DisplayBlock'
import Buttons from './component/Buttons'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaytext: '0', //運算數值
      strictMode: 'false' //符號檢查模式
    };
  }

  checkOverFloat = () => { //檢查是否超出可顯示介面 回傳布林值
    if (this.state.displaytext.toString().length >= 12) {
      alert('OverFlow');
      return true;
    } else
      return false;
  }

  lastCharIsNaN = () => { //檢查最後一個字元是否為符號
    const temp = this.state.displaytext.toString();
    const lastChar = temp.charAt(temp.length - 1);
    return isNaN(lastChar);
  }

  handleNumClick = (e) => {

    const temp = e.target.value;
    const dispStr = this.state.displaytext.toString();

    //嚴格模式下  數字 +06  || /09 || *00005 || - 00687 會導致 eval函數出錯，運算元後的 0 只能加小數點否則會跳出警告。 
    if (this.state.strictMode === 'true' && dispStr.charAt(dispStr.length - 1) === '0' && Number(temp) && dispStr.length > 2) {
      return alert('運算符號後的0只能加小數點')
    }
    if (isNaN(temp) === true && this.lastCharIsNaN() === true)  // 無效化連續符號
      return
    if (isNaN(temp)) {  //按運算元時，檢查是否雙重小數點，及開啟嚴格模式
      if (temp === '.')
        try {
          isNaN(eval(this.state.displaytext + "."))
        }
        catch (e) {
          return alert('雙重點數點');
        } else
          this.state.strictMode = 'true';
    }
    if (isNaN(temp) === false && temp !== '0') { //按非零時數字，解除嚴格模式。
      this.state.strictMode = 'false';
    }
    if (this.checkOverFloat() === true) //textbox 檢查是否過長
      return
    if (temp === '0' && this.state.displaytext === '0') // 為零時，按0無效
      return
    if (temp === '%') {  //%運算元 如果eval計算出來是數字，則一次%完 停止做以下事情
      let temp = eval(this.state.displaytext) / 100
      this.setState({ displaytext: Number(temp.toFixed(10)).toString() });
      return
    }

    this.state.displaytext === '0' && isNaN(temp) === false ?
      this.setState({ displaytext: temp }) : //為0時，數字時直接覆蓋
      this.setState({ displaytext: this.state.displaytext + temp }); //非0時，直接加上去
    console.log(e.target.value);
  }

  handleDelete = () => {
    let temp = this.state.displaytext.toString().slice(0, -1);
    this.state.displaytext.toString().length === 1 ?
      this.setState({ displaytext: '0' }) :
      this.setState({ displaytext: temp })
  }

  handleClear = () => {
    this.setState({ displaytext: '0' })
  }

  handleCalculate = () => {
    let temp = eval(this.state.displaytext.toString());
    if (temp.toString().indexOf('.') == true) {
      temp = Number(parseFloat(temp).toFixed(10));
    }
    this.setState({ displaytext: temp.toString() })
  }

  render() {
    return (
      <div alignContent="center">
        <div className='FirstContainer' >
          <DisplayBlock Component={this.state.displaytext} />
          <Buttons handleCalculate={this.handleCalculate} handleClear={this.handleClear} handleDelete={this.handleDelete} handleNumClick={this.handleNumClick} />
        </div>
      </div>
    );
  }
}

export default App;
