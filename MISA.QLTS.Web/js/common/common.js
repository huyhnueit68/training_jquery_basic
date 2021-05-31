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
 * set action show sub menu 
 */
var checkSubMenu = true;

$("#sub-TS").on("click", function () {
    $(".sub-menu").fadeToggle(200);
})

// show menu and hidden
$("#main-menu, .sub-menu-icon").on("click", function () {
    if (checkSubMenu) {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").slideToggle("slow");
        $(".m-navbar").width(74);
        $(".sub-menu").hide();
        $(".content").css('left', 76);
        $(".content").css('width', '100%').css('width', '-=86px');
        
        checkSubMenu = false;
    } else {
        $(".main-title, .nav-item-text, #main-menu, .sub-menu-text").slideToggle("slow");
        $(".m-navbar").width(220);
        $(".content").css('left', 221);
        $(".content").css('width', '100%').css('width', '-=221px');
        checkSubMenu = true;
    }
    console.log(checkSubMenu);
})