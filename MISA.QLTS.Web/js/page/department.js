/**
 * create class show property
 * PQ HUY 31.5.2021
 */
class Department extends BaseGrid{

    constructor(gridId) {
        super(gridId)

        let me = this;
        
        //save parent grid property
        me.grid = $(gridId);

    }

}

// init object status property
let department = new Department("#gridDepartment");