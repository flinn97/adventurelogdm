         

class RandomTextService {
    constructor() {
    }

    pickName() {
        let names =["Adult Blue Dragon", "Pterodactyl", "Slothking Druid", "Undead Druid", "Anxious Warrior", "Barbalang", "Violinist Devil", "Hedgehog Demon", "Sir Dante Rabbitlord", "Duke Dean", "Clifford the Floofy Giant"];
        let randomNumber = Math.floor(Math.random() * (names.length));
        let chosenName = names[randomNumber];
  
        return chosenName;
  
      }

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
        
        let randomNumber = Math.floor(Math.random() * (names.length));
        let chosenName = names[randomNumber];
  
        return chosenName;
  
      }


      

  };
  export default new RandomTextService();