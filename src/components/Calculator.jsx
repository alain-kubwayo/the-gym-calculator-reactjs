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
    return ( 
        <div className="bg-sky-500 h-1/2 w-1/4 grid grid-cols-4">
            {calculatorButtons.map(button => <div key={button.id} className={`bg-violet-900 border border-black self-center w-full h-full ${button.id === 17 ? 'col-span-2' : ''}`}>{button.description}</div>)}
        </div>
    );
}
 
export default Calculator;