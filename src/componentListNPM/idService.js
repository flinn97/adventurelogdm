
class IdService {

    randomFourDigitNumber() {
        let num = Math.floor(Math.random() * 9000) + 1000;
        while(num < 1000 || num > 9999) {
            num = Math.floor(Math.random() * 9000) + 1000;
        }
        return num;
    }

    createId(){
            const currentDate = new Date();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            let num = this.randomFourDigitNumber().toString()+month+day;
            return num
        };
        
    };
    
export default new IdService();