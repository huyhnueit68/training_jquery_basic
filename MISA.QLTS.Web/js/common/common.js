var commonFn = commonFn || {};

/**
 * function fomat money
 * PQ Huy 02.06.2021
 * @param {*} money 
 * @returns 
 */
commonFn.formatMoney = money => {
    if(money &&!isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
}

/**
 * function fomat date
 * PQ Huy 02.06.2021
 * @param {*} dateSrc 
 * @returns 
 */
commonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getDate() + 1).toString().padStart(2, '0'),
        day = (date.getDate() + 1).toString().padStart(2, '0');
    
    return `${day}/${month}/${year}`;
}

/**
 * validate date fomatData
 * PQ Huy 03.06.2021
 * @param {*} date 
 * @returns 
 */
commonFn.isDateFormat = (date) => {
    let regex = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
    
    return regex.test(date);
}

/**
 * convert data to date format
 * PQ Huy 03.06.2021
 * @param {*} dateSrc 
 * @returns 
 */
commonFn.convertDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * function get value of a enum
 * @param {*} data 
 * @param {*} enumName 
 * @returns 
 */
commonFn.getValueEnum = (data, enumName) => {
    let enumGetData = enumeration[enumName], //get the corresonding enum in the enum File, return array
        resourceData = resource[enumName];
    
    for (value in enumGetData) {
        if (enumGetData[value] == data) {
            data = resourceData[value];
        }
    }

    return data;
}

/**
 * function get ajax  by url and return json data
 * PQ Huy 02.06.2021
 * 
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 * @param {*} fnCallback 
 * @param {*} async 
 */
commonFn.Ajax = (url, method, data, fnCallback, async = true) => {
    $.ajax({
        url: url,
        method: method,
        async:async,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        crossDomain: true, //connect frontend and backend and pass to server,
        connectType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallback(response);
        },
        error: function (errormessage) {
            console.log("Lỗi nè" + errormessage.responseText);
        }
    })
}


/**
 * PQ HUY 31.5.2021
 * show menu and hidden
 */
$("#main-menu, .sub-menu-icon").on("click", function () {
    if ($(".m-navbar").width() != 74) {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").slideToggle("slow");
        $(".m-navbar").width(74);
        $(".sub-menu").hide();
        $(".content").css('left', 76).css('width', '100%').css('width', '-=76px');
    } else {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").slideToggle("slow");
        $(".m-navbar").width(220);
        $(".content").css('left', 221).css('width', '100%').css('width', '-=221px');
        $(".header-menu").hide();
    }
})


/**
 * PQ HUY 31.5.2021
 * set action show sub menu 
 */
$("#sub-TS").on("click", function () {
    if ($(".m-navbar").width() != 74) {
        let value = $(this).find('.icon-option').css("transform");
        $(".sub-menu").fadeToggle(200);
        if (value === 'none' || value == 'matrix(1, 0, 0, 1, 0, 0)') {
            $(this).find('.icon-option').css('transform', 'rotate(-180deg)');
        } else {
            $(this).find('.icon-option').css('transform', 'rotate(0deg)');
        }
    }
})

/**
 * select all checkboxes
 * PQ Huy 31.5.2021
 */
function setCheckedAll() {
    $('thead').find('th').each(function () {
        $(this).find('input[type="checkbox"]').each(function () {
            if (this.checked) {
                $('tbody').find('th').each(function () {
                    $(this).find('input[type="checkbox"]').each(function () {
                        $(this).prop('checked', true);
                    });
                });
            } else {
                 $('tbody').find('th').each(function () {
                    $(this).find('input[type="checkbox"]').each(function () {
                        $(this).prop('checked', false);
                    });
                });
            }
        });
    });
}

/**
 * show sub menu went have small menu
 * PQ HUY 31.5.2021
 */
$(document).ready(function(){
    $("#sub-TS").mouseover(function () {
        if ($(".m-navbar").width() == 74) {
            $(".header-menu").fadeIn("slow");
        }
    });
    $(".header-menu").mouseleave(function () {
        $(".header-menu").fadeOut("slow");
    });
});


/**
 * responstive screen show small menu went screen have size less 1366x768
 * PQ HUY 31.5.2021
 */
$(window).resize(function(){
    if ($(window).width() <= 1366 || $(window).height() <= 768) {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").fadeOut();
        $(".m-navbar").width(74);
        $(".sub-menu").hide();
        $(".content").css('left', 76).css('width', '100%').css('width', '-=76px');
    } else {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").fadeIn();
        $(".m-navbar").width(220);
        $(".content").css('left', 221).css('width', '100%').css('width', '-=221px');
        $(".header-menu").hide();
    }  
});

/**
 * filter in table
 * PQ HUY 31.5.2021
 */
$(document).ready(function(){
  $(".search-property").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#propertyTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

/** show more option function */
$(".btn-arrow").on("click", function () {
    var checked = $(".btn-add").find(".rotate-left").length;
    console.log(checked);

    if (checked == 0) {
        $(".btn-arrow").addClass("rotate-left");
    } else {
        $(".btn-arrow").removeClass("rotate-left");
    }
    
    $(".btn-del, .btn-edit, .btn-ref").fadeToggle("slow");
})


/** set tooltip for icon*/
$(".header-refesh, .h-admin-bell, .h-admin-menu").tooltip();
$(".h-admin-question, .h-admin-option, .btn-name").tooltip();
$(".btn-more, .more-excel, .more-printer").tooltip();
$(".btn-arrow, .more-load-action, .btn-edit, .btn-del, .btn-ref").tooltip();
