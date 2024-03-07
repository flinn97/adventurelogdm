         

class RandomTextService {
    constructor() {
    }

    
    pickName() {
        let names =["Adult Blue Dragon", "Pterodactyl", "Slothking Druid", "Undead Druid", "Anxious Warrior", "Barbalang", 
        "Violinist Devil", "Hedgehog Demon", "Sir Dante Rabbitlord", "Duke Dean", "Clifford the Floofy Giant"];
        let randomNumber = Math.floor(Math.random() * (names.length));
        let chosenName = names[randomNumber];
  
        return chosenName;
  
      };

      pickTag() {
        let names =["dungeon","tavern","chromatic dragon","halloween","one-shot","map pack","orcs","illustration","snow","spells","feywild","druid"];
        let randomNumber = Math.floor(Math.random() * (names.length));
        let chosenName = names[randomNumber];
  
        return chosenName;
  
      };

      pickCharacterName() {
        let names =["Thomas the Tank Eladrin",
            "Barry the Brief Aarakocra",
        "Aasimar-a-Lago",
        "Bugbear Grylls",
        "Iam, Centaur of Attention",
        "Changeling Tatum",
        "Newlee the Dragonborn",
        "Closse the Dwarf",
        "Elfish Presley",
        "Githyanki Doodle Dandy",
        "Gnome Chomsky",
        "Kenku-Ky, Fried Chicken",
        "Kobold as Ice",
        "Lizardfolk Hero",
        "Minotaur de Force",
        "Orc-a-Cola",
        "Tabaxi Driver",
        "Tiefling on the Roof",
        "Triton Heston",
        "Leonin Richie",
        "Goblin Hood",
        "Aarakocracadabra",
        "Toofront Tiefling",
        "Aasimartha Stewart",
        "Centaurio Dawson",
        "Changela Lansbury",
        "Kenku Reeves",
        "Loxodon Trump",
        "Minotaurrence Olivier",
        "Orcson Welles",
        "Tabaxi Sutherland",
        "Triton Fonda",
        "Vedalken Ackroyd",
        "Warforged Gump",
        "Yuan-ti Python",
        "Satyros Connery",
        "Leonin DiCaprio",
        "Aasimark Wahlberg"
      ];
        
        let randomNumber = Math.floor(Math.random() * (names.length));;
        let chosenName = names[randomNumber];
  
        return chosenName;
  
      }

      pickHPNotation(){
        const isDiceNotation = Math.random() < 0.58; // 58% chance
        if (isDiceNotation) {
          // Generate dice notation
          let dice = [4, 6, 6, 8, 8, 8, 10, 10, 10, 12, 12, 12];
          let diceIndex = Math.floor(Math.random() * dice.length);
          let dCount = Math.floor(Math.random() * 10) + 1;
          let maxRoll = dCount * dice[diceIndex];
          let modifier;
          modifier = Math.floor(Math.random() * (2 * maxRoll + 1)) - maxRoll; // Modifier range: -maxRoll to +maxRoll
          if (modifier < -2){
            modifier = diceIndex;
          }
          return `${dCount}d${dice[diceIndex]}${modifier >= 0 ? `+${modifier}` : modifier}`;
        } else {
          // Return an integer
          return (Math.floor(Math.random() * 50) + Math.floor(Math.random() * 100)).toString();
        }
      };

      pickFromArray(arr){

      let randomNumber = Math.floor(Math.random() * (arr.length));
      return  arr[randomNumber];
    }


      

  };
  export default new RandomTextService();