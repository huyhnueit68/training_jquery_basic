/**
 * function fomat data money
 * PQ Huy 30.5.2021
 * @param {data} money 
 * @returns 
 */
function formatMoney(money) {
    if(!isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
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
        $(".content").css('left', 76).css('width', '100%').css('width', '-=86px');

    } else {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").slideToggle("slow");
        $(".m-navbar").width(220);
        $(".content").css('left', 221).css('width', '100%').css('width', '-=221px');
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
        $(".content").css('left', 76).css('width', '100%').css('width', '-=86px');
    } else {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").fadeIn();
        $(".m-navbar").width(220);
        $(".content").css('left', 221).css('width', '100%').css('width', '-=221px');
    }  
});