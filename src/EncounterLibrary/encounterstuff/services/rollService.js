import ServiceBaseClass from "./serviceBaseClass";


  class RollService extends ServiceBaseClass {
    constructor(props){
      super(props);
  
  
    }
  
    rollDice(n, mod){
      mod = mod === undefined?0:parseInt(mod)
     let roll = Math.floor(Math.random() * n)
      roll = roll === 0? 1:roll;
      roll = roll + mod
      return roll
    }
  


  }

export default new RollService()