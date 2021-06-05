class baseForm{
    constructor(formId) {
        let me = this;

        me.form = $(`${formId}`);

        me.initEventForm();
    }
    
    /**
     * init for form
     * PQ Huy 02.06.2021
     */
    initEventForm() {
        let me = this;

        me.initEventButtonClick();

    }

    /**
     * function set first letter after space uppercase
     * PQ Huy 04.06.2021
     * @param {*} string 
     * @returns 
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * function create event click save and cancel
     * PQ Huy 02.06.2021
     */
    initEventButtonClick() {
        let me = this;

        me.form.find(".action-form").on("click", function () {
            let command = $(this).attr("Command");
            
            switch (command) {
                case resource.CommandForm.Save:
                    me.save();
                    break;
                case resource.CommandForm.Cancel:
                    me.cancel();
                    break;
            }
        })
    }

    /**
     * function save
     * PQ Huy 03.06.2021
     */
    save() {

        let me = this,
            isValid = me.ValidateForm();
        
        if (isValid || me.FormMode == enumeration.FormModel.Delete) {
            let data = me.getDataForm();
            
            me.saveData(data);
        }

    }
    
    /**
     * function save data to api
     * PQ Huy 03.06.2021
     */
    saveData(data) {
        
        let me = this,
            url = me.Parent.urlAdd,
            method = resource.Method.Post,
            urlFull = `${constant.UrlPrefix}${url}`;
        
        /** set edit method */
        if (me.FormMode == enumeration.FormModel.Edit) {
            url = `${me.Parent.urlEdit}/${data[me.ItemId]}`;
            method = resource.Method.Put,
            urlFull = `${constant.UrlPrefix}${url}`;
        }

        /** set delete method */
        if (me.FormMode == enumeration.FormModel.Delete) {
            url = `${me.Parent.urlDelete}/${data[me.ItemId]}`;
            method = resource.Method.Delete,
            urlFull = `${constant.UrlPrefix}${url}`;
        }

        /**
         * call ajax action method
         */
        commonFn.Ajax(urlFull, method, data, function (response) {
            
            if(response){
                console.log("Cất dữ liệu thành công");

                me.cancel();
                me.Parent.getDataServer();
            }else{
                console.log("Có lỗi khi cất dữ liệu");
            }
        })
    }

    /**
     * get data in form
     * PQ Huy 03.06.2021
     */
    getDataForm() {
        let me = this,
            data = me.Record || {};

        me.form.find("[FieldName]").each(function () {
            let control = $(this),
                fieldName = control.attr("FieldName"),
                dataType = control.attr("DataType"),
                value = me.getValueControl(control, dataType);
            
            data[fieldName] = value;
        })

        return data;
    }

    getValueControl(control, dataType) {
        let me = this,
            value = control.val();
        
        switch (dataType) {
            case resource.DataTypeColumn.Date:
                value = new Date(value);
                break;
            case resource.DataTypeColumn.Number:
                value = parseInt(value);
                break;
            case resource.DataTypeColumn.Enum:
                value = parseInt(value);
                break;
        }

        return value;
        
    }

    /**
     * validate data before save data
     * PQ Huy 03.06.2021
     */
    ValidateForm() {
        let me = this,
            isvalid = me.validateRequire();
        
        if (isvalid) {
            isvalid = me.validateFieldPhone();
        }

        if (isvalid) {
            isvalid = me.validateEmail();
        }

        if (isvalid) {
            isvalid = me.validateFieldNumber();
        }

        if (isvalid) {
            isvalid = me.validateFieldDate();
        }

        if (isvalid) {
            isvalid = me.validateCode();
        }

        if (isvalid) {
            isvalid = me.validateCustom();
        }

        return isvalid;
    }

    /**
     * validate code each field
     * PQ Huy 04.06.2021
     */
    validateCode() {
        let me = this,
            isValid = true,
            formMode = me.FormMode;
            
        switch (formMode) {
            case enumeration.FormModel.Add:
                isValid = me.validateDuplicateAddCode();
                break;
            case enumeration.FormModel.Edit:
                isValid = me.validateDuplicateEditCode();
                break;
            case enumeration.FormModel.Delete:
                isValid = me.validateDeleteCode();
                break;
        }

        return isValid;
    }

    /**
     * function check exits id
     * PQ Huy 04.06.2021
     */
    validateDeleteCode() {
        let me = this,
            isValid = false,
            employeeId = me.Parent.getSelectedRecord().EmployeeId,
            value = me.Parent.dataGrid;
        
        value.filter(function (arr) {
            
            if (arr["EmployeeId"] == employeeId) {
                isValid = true;
            }
        })

        if (!isValid) {
            alert("This record is not exits");
        }

        return isValid;
    }

    /**
     * function validate edit data
     * PQ Huy 04.06.2021
     * @returns 
     */
    validateDuplicateEditCode() {
        let me = this,
            isValid = true,
            oldCode = me.Parent.getSelectedRecord().EmployeeCode,
            value = me.Parent.dataGrid;
        debugger
        me.form.find("[FieldName='EmployeeCode']").each(function () {
            let employeeCode = $(this);

            if (employeeCode.length > 0) {
                debugger
                    if (employeeCode.val() != oldCode) {
                        value.filter(function (arr) {
                        if (arr["EmployeeCode"] == employeeCode.val()) {
                            isValid = false;
                            alert("Duplicate Code, please choose another code");
                        }
                    })
                }
            }
        })

        return isValid;
    }

    /**
     * function validate add data
     * PQ Huy 04.06.2021
     * @returns 
     */
    validateDuplicateAddCode() {
        let me = this,
            isValid = true,
            value = me.Parent.dataGrid;
        
        me.form.find("[FieldName='EmployeeCode']").each(function () {
            let employeeCode = $(this);

            if (employeeCode.length > 0) {
                value.filter(function (arr) {
                    if (arr["EmployeeCode"] == employeeCode.val()) {
                        isValid = false;
                        alert("Duplicate Code, please choose another code");
                    }
                })
            }
        })

        return isValid;
    }

    /**
     * function validate email field
     * PQ Huy 04.06.2021
     */
    validateEmail() {
        let me = this,
            isValid = true;
        
        me.form.find("[DataType='Email']").each(function () {
            var control = $(this);
            let value = control.val();
            
            
            if (!me.isEmail(value)) {
                isValid = false; 
                control.addClass("notValidControl");
                control.attr("title", "Please enter a number phone!!!");
            } else {
                control.removeClass("notValidControl");
            }
        })

        return isValid;
    }

    /**
     * check is email
     * PQ Huy 04.06.2021
     * @param {*} email 
     * @returns 
     */
    isEmail(email) {

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(email);
    }

    /**
     * function validate phone number
     * PQ Huy 04.06.2021
     * @returns 
     */
    validateFieldPhone() {
        let me = this,
            isValid = true;
        
        me.form.find("[DataType='PhoneNumber']").each(function () {
            var control = $(this);
            let value = control.val();
            
            if (isNaN(value)) {
                isValid = false;
                control.addClass("notValidControl");
                control.attr("title", "Please enter a number phone!!!");
            } else {
                control.removeClass("notValidControl");
            }
        })

        return isValid;
    }

    /**
     * validate require true is not null
     * PQ Huy 03.06.2021
     */
    validateRequire() {
        let me = this,
            isValid = true;
        
        me.form.find("[Require='true']").each(function () {
            var control = $(this);
            let value = control.val();
            if (!value) {
                isValid = false;
                control.addClass("notValidControl");
                control.attr("title", "Please enter info!!!");
            } else {
                control.removeClass("notValidControl");
            }
        })

        return isValid;
    }

    /**
     * valideate input a number 
     * PQ Huy 03.06.2021
     */
    validateFieldNumber() {
        let me = this,
            isValid = true;
        
        me.form.find("[DataType='Number']").each(function () {
            var control = $(this);
            let value = control.val();
            
            if (!/^[0-9,.]*$/.test(value)) {
                isValid = false;
                control.addClass("notValidControl");
                control.attr("title", "Please enter a number salary!!!");
            } else {
                control.removeClass("notValidControl");
            }
        })

        return isValid;
    }

    /**
     * validate datime format
     * PQ Huy 03.06.2021
     */
    validateFieldDate() {
        let me = this,
            isValid = true;
        
        me.form.find("[DataType='Date']").each(function () {
            var control = $(this);
            let value = control.val();
            if (!commonFn.isDateFormat(value)) {
                isValid = false;
                control.addClass("notValidControl");
                control.attr("title", "Please enter a date time!!!");
            } else {
                control.removeClass("notValidControl");
            }
        })

        return isValid;
    }

    /**
     * function for override in each form
     * PQ Huy 03.06.2021
     * @returns 
     */
    validateCustom() {
        return true;
    }

    /**
     * Open popup dialog
     * PQ Huy 02.06.2021
     * @param {*} param 
     */
    open(param) {
        let me = this;

        Object.assign(me, param);

        me.showForm();


        if (me.FormMode == enumeration.FormModel.Edit || me.FormMode == enumeration.FormModel.Delete) {
            me.bindingData(me.Record);
        }

    }

    /**
     * Binding data for function edit
     * PQ Huy 02.06.2021
     * @param {*} data 
     */
    bindingData(data) {
        let me = this;

        me.form.find("[FieldName]").each(function () {
            let control = $(this),
                fieldName = $(this).attr("FieldName"), //get field name
                dataType = $(this).attr("DataType"), //get data type
                value = data[fieldName]; //get value with field name
            
            me.setValueControl(control, value, dataType);
        })
    }

    /**
     *  function set value control
     * PQ Huy 04.06.2021
     * @param {*} control 
     * @param {*} value 
     * @param {*} dataType 
     */
    setValueControl(control, value, dataType) {
        let me = this;

        switch (dataType) {
            case resource.DataTypeColumn.Date:
                value = commonFn.convertDate(value);
            // case resource.DataTypeColumn.Number:
            //     value = commonFn.formatMoney(value);
        }

        control.val(value);
    }

    /**
     * show form 
     * PQ Huy 04.06.2021
     */
    showForm() {
        let me = this;

        me.form.modal('show');
        
        me.resetForm();

        $('.modal-body > div').each(function(){
            if ($(this).find('input').first()) {
                $(this).focus();
                return false;
            }
        });
    }

    /**
     * function reset form
     * PQ Huy 02.06.2021
     */
    resetForm() {
        let me = this;

        me.form.find("[FieldName]").val('');

        me.form.find(".notValidControl").removeClass("notValidControl");
    }

    /**
     * function cancel
     * PQ Huy 03.06.2021
     */
    cancel() {
        let me = this;

        me.form.modal('hide');
    }
}

