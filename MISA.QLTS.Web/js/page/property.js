/**
 * page property
 * PQ Huy 30.5.2021
 */
class Property {

    constructor(gridId) {
        let me = this;
        
        //save parent grid property
        me.grid = $(gridId);

        //init event page
        me.initEvent();
    }

    /**
     * create event page
     * PQ Huy 30.5.2021
     */
    initEvent() {
        let me = this;
    }

    /**
     * Function render list property from data
     * PQ HUY 30.5.2021
     */
    loadDataGrid(propertyData) {
        let me = this,
            tableRender = $("<table class='table'></table>"),
            theadRender = me.renderHeader(),
            tbodyRender = me.renderTbody(propertyData);
            
        // append html after render html from data
        tableRender.append(theadRender);
        tableRender.append(tbodyRender);

        // refesh old content before append new html
        me.grid.find("table").remove();
        me.grid.append(tableRender);
    }

    /**
     * function display header table
     * PQ Huy 30.5.2021
     * @returns theader html
     */
    renderHeader() {
        let me = this,
            theadRender = $("<thead></thead>"),
            rowRender = $("<tr class='custom-color'></tr>");
        // append column stt and checkbox
        let stt = `<th><input type="checkbox" id="checkall" name="checkall" value="checkall" onchange="setCheckedAll()"></th><th>STT</th>`;
        rowRender.append(stt);
        // foreach row for build header
        me.grid.find(".col").each(function () {
            //get text header
            let textHeader = $(this).text(),
                th = $("<th></th>");
            //set text header for tag th
            th.text(textHeader);
            rowRender.append(th);
        });

        //append for theader
        theadRender.append(rowRender);

        return theadRender;
    }


    /**
     * PQ Huy 30.5.2021
     * @param {dataJson} dataJson 
     * @returns tbody html
     */
    renderTbody(dataForm) {
        var count = 0;
        let me = this,
            tbodyRender = $("<tbody id='propertyTable'></tbody>");
        
        /* check data nan */
        if(dataForm && dataForm.length > 0){
            dataForm.filter(function(item){
                let row = $("<tr></tr>");
                let checkbox = `<th><input type="checkbox" id="" name="" class="checkedValue" value="${item[0]}"><th>${++count}</th>`;
                row.append(checkbox);
                
                /* for loop each row and set to each field name */
                me.grid.find(".col").each(function(){
                    let fieldName = $(this).attr("FieldName"),
                        dataType = $(this).attr("DataType"),
                        data = item[fieldName],
                        cell = $("<td></td>"),
                        className = me.getClassFormat(dataType),
                        value = me.getValue(data, dataType);

                    /** set value for row */
                    cell.text(value);
                    cell.addClass(className);
                    row.append(cell);
                });

                tbodyRender.append(row);
            });
        }

        return tbodyRender;
    }

    /**
     * function get class need add for display 
     * PQ Huy 30.5.2021
     * @param {function get class} dataType 
     */
    getClassFormat(dataType) {
        let me = this,
            className = "";
        
        switch (dataType) {
            case "Number":
            case "Price":
                className = "align-right";
                break;
            case "Data":
                className = "align-center";
                break;
        }

        return className;
    }

    /**
     * function get class need add for display 
     * PQ Huy 30.5.2021
     * @param {function} dataType 
     */
    getValue(data, dataType) {
        let me = this;
        
        switch (dataType) {
            case "Price":
                data = formatMoney(data);
                break;
            case "TypeProperty":
                data = formatTypeProperty(data);
                break;
            case "DepartmentUse":
                data = formatDepartmentUse(data);
                break;
        }
        
        return data;
    }
}

// init object status property
let property = new Property("#gridProperty");

// load data grid
property.loadDataGrid(propertyData);