import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

function App() {

  const [preState, setPreState] =  useState('');
  const [currState, setCurrState] = useState('');
  const [inputVal, setInputVal] = useState('0');
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(false);

  const handleDigit = e => {
    // no need to have two dots as decimal
    if(currState.includes('.') && e.target.innerText === '.') return;
    if(result){
      setPreState("");
    }
    // allow users to type two or more similar digits/nums
    currState 
      ? setCurrState(prevCurrState => prevCurrState + e.target.innerText) 
      : setCurrState(e.target.innerText);

    // set result back to false to get ready for the next calculation
    setResult(false);
  }

  useEffect(() => {
    setInputVal(currState);
  }, [currState])

  useEffect(() => {
    setInputVal('0');
  }, [])

  const handleClear = () => {
    setPreState('');
    setCurrState('');
    setInputVal('0');
  }

  const handlePercent = () => {
    preState ? setCurrState(String(parseFloat(currState) / 100 * preState)) : setCurrState(String(parseFloat(currState) / 100));
  }

  const handleMinusPlus = () => {
    if(currState.charAt(0) === '-'){
      setCurrState(currState.substring(1))
    }else{
      setCurrState('-' + currState);
    }
  }

  const operatorType = e => {
    setResult(false);
    setOperator(e.target.innerText);
    if(currState === '') return;
    if(preState !== ''){
      handleEquals();
    }else{
      setPreState(currState);
      setCurrState('');
    }
  }

  const handleEquals = e => {
    if(e?.target.innerText === '='){
      setResult(true);
    }

    let res;
    switch(operator){
      case '÷':
        res = String(parseFloat(preState) / parseFloat(currState));
        break;
      case '+':
        res = String(parseFloat(preState) + parseFloat(currState));
        break;
      case 'X':
        res = String(parseFloat(preState) * parseFloat(currState));
        break;
      case '-':
        res = String(parseFloat(preState) - parseFloat(currState));
        break;
      default: return;
    }
    setInputVal('');
    setPreState(res);
    setCurrState('')
  }
  return (
    <div className="container">
      <div className="container__wrapper">
        <div className="container__screen">
          {
            inputVal !== '' || inputVal === '0' 
              ?   
              <NumericFormat  
                value={inputVal} 
                displayType={'text'} 
                thousandSeparator={true} 
              /> 
              : 
              <NumericFormat 
                value={preState} 
                displayType={'text'} 
                thousandSeparator={true} 
              />
          }
        </div>
        <div className="container__btn" onClick={handleClear}>AC</div>
        <div className="container__btn" onClick={handleMinusPlus}>+/-</div>
        <div className="container__btn" onClick={handlePercent}>%</div>
        <div className="container__btn container__btn--orange" onClick={operatorType}>÷</div>
        <div className="container__btn" onClick={handleDigit}>7</div>
        <div className="container__btn" onClick={handleDigit}>8</div>
        <div className="container__btn" onClick={handleDigit}>9</div>
        <div className="container__btn container__btn--orange" onClick={operatorType}>X</div>
        <div className="container__btn" onClick={handleDigit}>4</div>
        <div className="container__btn" onClick={handleDigit}>5</div>
        <div className="container__btn" onClick={handleDigit}>6</div>
        <div className="container__btn container__btn--orange" onClick={operatorType}>-</div>
        <div className="container__btn" onClick={handleDigit}>1</div>
        <div className="container__btn" onClick={handleDigit}>2</div>
        <div className="container__btn" onClick={handleDigit}>3</div>
        <div className="container__btn container__btn--orange" onClick={operatorType}>+</div>
        <div className="container__btn container__zero" onClick={handleDigit}>0</div>
        <div className="container__btn" onClick={handleDigit}>.</div>
        <div className="container__btn container__btn--orange" onClick={handleEquals}>=</div>
      </div>
    </div>
  );
}

export default App;
