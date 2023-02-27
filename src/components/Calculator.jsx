import { useState } from "react";

const calculatorButtons = [
    { id: 1, description: 'AC' },
    { id: 2, description: '+/-' },
    { id: 3, description: '%' },
    { id: 4, description: '÷' },
    { id: 5, description: '7' },
    { id: 6, description: '8' },
    { id: 7, description: '9' },
    { id: 8, description: 'X' },
    { id: 9, description: '4' },
    { id: 10, description: '5' },
    { id: 11, description: '6' },
    { id: 12, description: '-' },
    { id: 13, description: '1' },
    { id: 14, description: '2' },
    { id: 15, description: '3' },
    { id: 16, description: '+' },
    { id: 17, description: '0' },
    { id: 18, description: '.' },
    { id: 19, description: '=' },
];

const Calculator = () => {
    const [allButtons, setAllButtons] = useState(calculatorButtons);
    const [operation, setOperation] = useState([]);
    const [result, setResult] = useState();

    const handleClick = id => {
        const btn = allButtons.find(button => button.id === id);
        setOperation(prevOperation => {
            return [...prevOperation, btn.description];
        });
    }

    const handleCalculate = () => {
        const stringOp = operation.join('');
        let sign = '';
        let leftAndRight = [];
        stringOp.split('').map(c => {
            if(isNaN(c)){
                sign = c;
            }else{
                leftAndRight.push(c);
            }
        })
        if(sign == '=' || sign == 'AC'){
            console.log('= or AC button clicked!');
            stringOp = '';
            setOperation(null);
        }
        const left = Number(stringOp.split(sign)[0]);
        const right = Number(stringOp.split(sign)[1]);

        switch(sign){
            case '÷':
                setResult(left / right);
                break;
            case 'X':
                setResult(left * right);
                break;
            case '-':
                setResult(left - right);
                break;
            case '+':
                setResult(left + right);
                break;
            case '%':
                setResult(left % right);
                break;
            default: return;
        }
    }
    
    return ( 
        <div className="grid w-1/4 grid-cols-4 h-1/2">
            <div className="col-span-4 bg-gray-400">
                <p className="text-right">{operation && operation.join('').split('=')}</p>
                <p className="text-right">{result}</p>
            </div>
            {allButtons.map(button => (
                <div 
                    key={button.id} 
                    className={`border border-gray-300 self-center w-full h-full flex items-center justify-center cursor-pointer ${button.id === 17 && 'col-span-2'} ${button.id % 4 === 0 || button.id === calculatorButtons.length ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`} 
                    onClick={() => {
                        button.description != '=' && button.description != '+/-' && button.description != 'AC' ? handleClick(button.id) : handleCalculate()
                    }}
                >{button.description}</div>
            ))}
        </div>
    );
}
 
export default Calculator;