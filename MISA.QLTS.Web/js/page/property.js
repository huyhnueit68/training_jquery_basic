/**
 * create class show property
 * PQ HUY 31.5.2021
 */
class Property extends BaseGrid{

    constructor(gridId) {
        super(gridId)

        let me = this;
        
        //save parent grid property
        me.grid = $(gridId);

        this.config();
    }

    // Cấu hình các url 
     config(){
        let me = this,
            config = {
                urlAdd: "v1/Employees",
                urlEdit: "v1/Employees",
                urlDelete: "v1/Employees"
            };
 
        Object.assign(me, config);
     }

    /**
     * function init form
     * PQ Huy 02.06.2021
     * @param {*} formId 
     */
    initFormDetails(formId) {
        let me = this;

        me.formDetail = new propertyDetail(formId);
    }

    /**
     * 
     */
    add() {
        
    }
}

// init object status property
let property = new Property("#gridProperty");

// init form detail
property.initFormDetails("#modalAction");
