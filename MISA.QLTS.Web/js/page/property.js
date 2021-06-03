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

    add() {
        
    }
}

// init object status property
let property = new Property("#gridProperty");

// init form detail
property.initFormDetails("#modalAction");
