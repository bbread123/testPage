class Calculator{
    constructor(previousOutputTextElement,currentOutputTextElement){
        this.previousOutputTextElement=previousOutputTextElement;
        this.currentOutputTextElement=currentOutputTextElement;
        this.currentOutput='';
        this.previousOutput='';
    }

clear(){
    this.previousOutput='';
    this.currentOutput='';
    this.operation=undefined;
}
delete(){
    this.currentOutput=this.currentOutput.toString().slice(0,-1);

}
appendNumber(number){
    if(number === '.' && this.currentOutput.includes('.')) return;
    this.currentOutput= this.currentOutput.toString() + number.toString();
}
chooseOperation(operation){
    if(this.currentOutput === '') return;
    if(this.previousOutput !== ''){
        this.compute();
    }
    this.operation=operation;
    this.previousOutput=this.currentOutput;
    this.currentOutput='';

}
compute(){
    let computation;
    const prev=parseFloat(this.previousOutput);
    const current=parseFloat(this.currentOutput);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation){
        case '+':
        computation=prev+current;
        break;
        case '-':
        computation=prev-current;
        break;
        case '*':
        computation=prev*current;
        break;
        case '÷':
        computation=prev/current;
        break;
        default:
            return;
    }
    this.currentOutput=computation;
    this.previousOutput="";
    this.operation=undefined;


}
updateDisplay(){
    this.currentOutputTextElement.innerText=this.currentOutput;
    this.previousOutputTextElement.innerText=this.previousOutput;

}
}


const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const allClearButton=document.querySelector('[data-all-clear]');
const previousOutputTextElement=document.querySelector('[data-previous-output]');
const currentOutputTextElement=document.querySelector('[data-current-output]');

const calculator=new Calculator(previousOutputTextElement,currentOutputTextElement);

numberButtons.forEach(function(button){
    button.addEventListener('click',function(){
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(function(button){
    button.addEventListener('click',function(){
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click',function(button){
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',function(button){
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',function(button){
    calculator.delete();
    calculator.updateDisplay();
})