let answer = ["чашка", "цукерка", "гітара",
"сайт", "очки", "мишка", "школа", "клей"];
let was = [];
let progress = 0;
let num = Math.floor(Math.random() * answer.length);

$(document).ready(function() {
    $(".progress").knob({
        'min': 0,
        'max': 5,
        'readOnly': true,
        'width': '100%',
        'thickness': 0.2,
        'lineCap': 'round',
        'displayInput': false,
        'bgColor': 'lightskyblue',
        'fgColor': 'darkred',
        'angleOffset': -60,
        'angleArc': 120
    })

    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    })

    $("#btnTask").click(function () {
        let text = $("#text").val().toLowerCase();
        if (text == answer[num]) {
            alertify.success("Right answer");
            $("#text").val('');
            progress++;
            $(".progress").val(progress).trigger("change");
            was.push(num);
            if (progress < 5) {
                do {
                    num = Math.floor(Math.random() * answer.length);
                } while (was.includes(num))
                startRebus(num);
            } else {
                $(".img, #btnTask, #text").css({'display': 'none'});
                $("#btnNext").css({'display': 'flex'})
            }
        } else {
            alertify.error("Wrong answer. Try again")
        }
    })

    $("#image").click(function () {
        do {
            num = Math.floor(Math.random() * answer.length);
        } while (was.includes(num))
        startRebus(num);
    })

    startRebus(num)
})

function startRebus(arg) {
    $("#image").attr("src", "../img/" + arg + ".png");
}