import ServiceBaseClass from "./serviceBaseClass";


  class MathService extends ServiceBaseClass {
    constructor(props){
      super(props);
  
  
    }
  
    doMath(val){
       // Remove spaces from the input string
    val = val.replace(/\s+/g, '');

    // Regular expression to match the basic mathematical operations
    const operatorPattern = /(\d+)([+\-*/])(\d+)/;
    const match = val.match(operatorPattern);

    if (!match) {
        throw new Error('Invalid input');
    }

    // Extract the operands and operator from the matched pattern
    const num1 = parseFloat(match[1]);
    const operator = match[2];
    const num2 = parseFloat(match[3]);

    

    // Perform the appropriate mathematical operation
    let mathJson={
      "+": num1 + num2,
      "-":num1 - num2,
      "*":num1 * num2,
      "/":num1 / num2
    }
    let result= mathJson[operator];

    return result;

    }
  


  }

export default new MathService()