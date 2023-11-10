         

class DiceService {
    constructor() {
    }

    makeNumber(string) {
        let maxSides = 100; // Define max number of sides
        let maxDice = 99; // Define max number of dice
            let cleanMessage = string.replace(/\/(r|roll)\s*/, '').replace(/\s/g, '');
           
            let diceRegex = /^(\d+)?d(\d+)((\+|\-)\d+)?$/;
            let match = cleanMessage.match(diceRegex);

            if (!match) {
                throw new Error("'" + string + "' is not valid dice notation.");
            }

            // Default numDice to 1 if not provided
            let numDice = match[1] ? parseInt(match[1], 10) : 1;
            let numSides = parseInt(match[2], 10);
            let modifier = match[3] ? parseInt(match[3], 10) : 0;
                
        // Check if the number of sides is within the allowed range
        if (numSides > maxSides) {
          throw new Error("The number of sides cannot exceed " + maxSides + ".");
        }

        if (numDice > maxSides) {
            throw new Error("The number of dice cannot exceed " + maxDice + ".");
          }
      
        let rollTotal = this.performRoll(numDice, numSides);
        return rollTotal + modifier;
      }
      
      performRoll(numDice, numSides) {
        let total = 0;
        for (let i = 0; i < numDice; i++) {
          // Use the current time to alter the randomness slightly
          let timeFactor = new Date().getTime() % numSides;
          total += Math.floor((Math.random() * numSides) + timeFactor) % numSides + 1;
        }
        return total;
      }

        rollDice(message){
            let total
            total = this.makeNumber(message);
            return total.toString();
            }


      

  };
  export default new DiceService();