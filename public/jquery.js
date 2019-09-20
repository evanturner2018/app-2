$(document).ready(() => {
    const s = 100;

    stackLetterFrameAcadia();
    stackSkySun();
    positionNames();
    centerMaster();

    $("#root").animate({
        color: "black"
    }, 2000, () => go());

    function go() {
        let offset = $("#acadiaFrame").offset().left-$("#master").offset().left;
        translate("#sunFrame", offset+"px", "17.5%");
        translate("#skyFrame", offset+"px", 0);
        $("#sun").toggleClass("active spun");
        $("#sky").toggleClass("active");
        $("#w").toggleClass("active");
        $(".mountain").toggleClass("active");
        $("#frame").toggleClass("active");
        $("#firstNameFrame").toggleClass("active");
        $("#lastNameFrame").toggleClass("active");
        $("#master").animate({
            top: "20px"
        }, 1500, () => {
            $("#master").css("transition-delay", "0s");
            $("#content").animate({
                opacity: "1"
            }, 1000);
            $(".tab").animate({
                opacity: "1"
            }, 1000, () => {
                $("#master").css("transition", "0s");
            });
            setTimeout(() => {
                $("#title").text("W Photography");
            }, 400);
            setTimeout(() => {
                $("#title").text("Wu Photography");
            }, 600);
            
        });
    }

    function translate(selector, dx, dy) {
        $(selector).css("transform","translate("+dx+", "+dy+")");
    }

    function stackLetterFrameAcadia() {
        $("#acadiaFrame").css("left",-1*s+"px");
        $("#wFrame").css("left",-2*s+"px");
        $("#frameFrame").css("left",-3*s+"px");
    }
    function stackSkySun() {
        $("#sunFrame").css("left", -1*s+"px");
    }
    function positionNames() {
        $("#firstNameFrame").css("left", -1*s);
        $("#lastNameFrame").css("left", -3*s).css("top", "10px");
        $("h1").css("left", -1*s+"px");
    }
    function centerMaster() {
        let w = $(window).width();
        let h = $(window).height();
        $("#master").css("left", w/2-250+"px");
    }
    $(window).resize(() => {
        centerMaster();
    });
    $(".next").click(() => {
        $("#main").toggleClass("hidden", true);
        $("#main").toggleClass("visible", false);
        setTimeout(() => {
            $("#main").toggleClass("hidden", false);
            $("#main").toggleClass("visible", false);
        }, 500);
    });
});