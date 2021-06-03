/**
 * Class using fomat data table
 * PQ Huy 01.06.2021
 */
class PropertyFomatData {

    /**
     * init data
     * PQ Huy 01.06.2021
     * @param {*} data 
     */
    constructor(data) {
        this.data = data;
    }

        
    /**
     * function fomat data money
     * PQ Huy 30.5.2021
     * @param {data} money 
     * @returns 
     */
    formatMoney() {
        let money = this.data;
        if(!isNaN(money)){
            return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        }else{
            return money;
        }
    }

    /**
     * function fomat type property name
     * PQ Huy 31.5.2021
     * @param {*} data 
     * @returns 
     */
    formatTypeProperty() {
        let data = this.data;
        switch (data) {
            case 1:
                data = "Máy tính";
                break;
            case 2:
                data = "Máy in";
                break;
            case 3:
                data = "Bàn ghế";
                break;
            case 4:
                data = "Xe công";
                break;
            default:
                data = "Bàm phím, chuột";
                break;
        }
        return data;
    }

    /**
     * function fomat department name
     * PQ HUY 31.5.2021
     * @param {*} data 
     * @returns 
     */
    formatDepartmentUse() {
        let data = this.data;
        switch (data) {
            case 1:
                data = "Kế toán";
                break;
            case 2:
                data = "Nhân sự";
                break;
            case 3:
                data = "Điều hành";
                break;
            case 4:
                data = "Nghiên cứu";
                break;
            default:
                data = "Gia công PM";
                break;
        }
        return data;
    }

}