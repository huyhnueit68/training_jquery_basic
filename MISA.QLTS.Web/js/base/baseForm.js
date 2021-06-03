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
    }

    /**
     * 
     * @param {*} param 
     */
    open(param) {
        let me = this;

        Object.assign(me, param);

        me.show();

        if (me.FormMode = enumeration.FormModel.Edit) {
            me.bindingData(me.Record);
        }
    }

    bindingData(data) {
        let me = this;

        me.form.find("[FieldName]").each(function () {
            let control = $(this),
                fieldName = $(this).attr("FieldName"),
                dataType = $(this).attr("DataType"),
                value = data[fieldName];
            
            me.setValueControl(control, value, dataType);
        })
    }

    /**
     * 
     * @param {*} control 
     * @param {*} value 
     * @param {*} dataType 
     */
    setValueControl(control, value, dataType) {
        let me = this;

        switch (dataType) {
            case resource.DataTypeColumn.Date:
                value = commonFn.formatDate(value);
        }

        control.val(value);
    }

    /**
     * 
     */
    show() {
        let me = this;

        me.form.show();
        
        me.resetForm();
    }

    /**
     * 
     */
    resetForm() {
        let me = this;

        me.form.find("[FieldName]").val('');

        me.form.find(".notValidControl").removeClass("notValidControl");
    }

    /**
     * 
     */
    cancel() {
        let me = this;

        me.form.hide();
    }

    
}