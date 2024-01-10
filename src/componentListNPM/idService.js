
class IdService {

    randomFiveDigitNumber() {
        let num = Math.floor(Math.random() * 90000) + 10000;
        num = num.toString();
        let randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        let randomPosition = Math.floor(Math.random() * 5);

        num = num.substring(0, randomPosition) + randomLetter + num.substring(randomPosition + 1);

        let randomagain = Math.floor(Math.random() * 2);
        if (randomagain === 1) {
            let randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Added let
            let randomPosition2;
            do {
                randomPosition2 = Math.floor(Math.random() * 5);
            } while (randomPosition2 === randomPosition); // Ensure different position for the second letter
            num = num.substring(0, randomPosition2) + randomLetter2 + num.substring(randomPosition2 + 1);
        }

        return num;
    }

    createId() {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);

        let num = this.randomFiveDigitNumber().toString() + month + day + year;
        return num;
    };

};

export default new IdService();