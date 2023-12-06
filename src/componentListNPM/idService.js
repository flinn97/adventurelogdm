
class IdService {

    randomFiveDigitNumber() {
        let num = Math.floor(Math.random() * 90000) + 10000;
        return num;
    };
    
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