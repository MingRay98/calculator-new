import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaytext: '0',
      strictMode:'false'
    };

  }

  checkOverFloat = () => {
    if (this.state.displaytext.toString().length >= 12) {
      alert('OverFlow');
      return true;
    }
    else {
      return false;
    }
  }

  lastCharIsNaN = () => {
    const temp = this.state.displaytext.toString();
    const lastChar = temp.charAt(temp.length - 1);
    return isNaN(lastChar);
  }

  handleNumClick = (e) => {

    const temp = e.target.value;
    const dispStr = this.state.displaytext.toString();

    if(this.state.strictMode ==='true' && dispStr.charAt(dispStr.length - 1)==='0'&& Number(temp)&& dispStr.length >2){
        return alert('運算符號後的0只能加小數點')
    }

    if (isNaN(temp) === true && this.lastCharIsNaN() === true)  // 連續符號
      return

    if (isNaN(temp) === true && this.state.displaytext === '0'  ) // 為零時不能有符號
      return temp!=='%' ? this.setState({ displaytext: '0' + temp }) : null;

    if (isNaN(temp)) { 

      this.state.strictMode = 'true';

      if (temp === '.')
        try {
          isNaN(eval(this.state.displaytext + "."))
        }
        catch (e) {
          return alert('雙重點數點');
        }
    }

    if(Number(temp)&& temp!=='0' ){

      this.state.strictMode ='false';

    }

    if (this.checkOverFloat() === true) //textbox 檢查是否過長
      return


    if (temp === '0' && this.state.displaytext === '0') // 為零時，按0無效
      return

    if (temp === '%' && Number(eval(this.state.displaytext))) {  //%運算元 如果eval計算出來是數字，則一次%完 停止做以下事情
      this.setState({ displaytext: eval(this.state.displaytext) / 100 });
      // console.log('%%%')
      return
    }

    this.state.displaytext === '0' ? //為零時，按數字直接等於display的state，非零時用字串加上去。
      this.setState({ displaytext: temp }) :
      this.setState({ displaytext: this.state.displaytext + temp });
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


  btnStyle = {
    borderRadius: '5rem',
    backgroundColor: 'rgb(255, 123, 0)',

  }

  render() {





    return (

      <div alignContent="center">
        <div className='FirstContainer' >
          <div className='DisplayBlock' >
            {this.state.displaytext}
          </div>
          <div className='OperationTopBtn' >
            <button className='Btn' onClick={this.handleClear} style={{ borderRadius: '5rem', backgroundColor: 'white', color: 'red' }}>C</button>
            <button className='Btn' onClick={this.handleNumClick} value='%' style={this.btnStyle}>%</button>
            <button className='Btn' onClick={this.handleNumClick} value='/' style={this.btnStyle}>/</button>
            <button className='Btn' onClick={this.handleNumClick} value='*' style={this.btnStyle}>X</button>
          </div>
          <div className='SecondContainer' >
            <div className='NumBtnDiv'>
              <div className='NumBtnInColumn'>
                <button className='Btn' onClick={this.handleNumClick} value='1'>1</button>
                <button className='Btn' onClick={this.handleNumClick} value='2'>2</button>
                <button className='Btn' onClick={this.handleNumClick} value='3'>3</button>
              </div>

              <div className='NumBtnInColumn'>
                <button className='Btn' onClick={this.handleNumClick} value='4'>4</button>
                <button className='Btn' onClick={this.handleNumClick} value='5'>5</button>
                <button className='Btn' onClick={this.handleNumClick} value='6'>6</button>
              </div>

              <div className='NumBtnInColumn'>
                <button className='Btn' onClick={this.handleNumClick} value='7'>7</button>
                <button className='Btn' onClick={this.handleNumClick} value='8'>8</button>
                <button className='Btn' onClick={this.handleNumClick} value='9'>9</button>
              </div>

              <div className='NumBtnInColumn' >
                <button onClick={this.handleDelete} style={{ backgroundColor: 'rgb(52, 56, 106)', borderRadius: '5rem', border: 'none', width: '95%' }} >←</button>
                <button onClick={this.handleNumClick} className='Btn' value='0'>0</button>
                <button onClick={this.handleNumClick} className='Btn' value='.'>．</button>
              </div>


            </div>
            <div className='OperationRigthBtn'>
              <div className='OperationRigthBtnPM'>
                <button className='Btn' onClick={this.handleNumClick} value='+' style={this.btnStyle} >+</button>
                <button className='Btn' onClick={this.handleNumClick} value='-' style={this.btnStyle} >-</button>
              </div>

              <button className='BigEnter' onClick={this.handleCalculate} >=</button>


            </div>
          </div>
        </div >
      </div>
    );
  }
}

export default App;
