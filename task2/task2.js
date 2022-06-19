let answer = [
    ["гарі потер", "гарри поттер"],
    ["джек горобець", "пірати карибського моря", "пірати"],
    ["один дома", "один вдома", "сам вдома"],
    ["шрек", "shrek", "самбаді", "somebody"]
]

let was = [];
let progress = 0;
let num = Math.floor(Math.random() * answer.length);
let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"))
} else {
    time = 30;
    timeStorage.setItem("time", time)
}

$(document).ready(function() {
    $(".progress").knob({
        'min': 0,
        'max': 4,
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

    $(".time").knob({
        'min': 0,
        'max': 30,
        'readOnly': true,
        'width': '100%',
        'thickness': 0.2,
        'displayInput': false,
        'bgColor': 'lightskyblue',
        'fgColor': 'navy',
        'angleOffset': 0,
        'angleArc': 360
    })

    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    })

    $("#start").click(function () {
        $("#start").hide();        
        $(".sound").show();        
        startMusic(num);   
        startTime();   
    })                             

    $("#btnTask").click(function () {
        console.log(answer[num]);
        let text = $("#text").val().toLowerCase();
        if (answer[num].indexOf(text) != -1) { 
            alertify.success("Right answer");
            $("#text").val('');
            progress++;
            $(".progress").val(progress).trigger("change");
            was.push(num);
            if (progress < 4) {
                do {
                    num = Math.floor(Math.random() * answer.length);
                } while (was.includes(num))
                startMusic(num);
            } else {
                $(".sound, #btnTask, #text").css({'display': 'none'});
                $("#btnNext").css({'display': 'flex'})
                timeStorage.removeItem("time")
            }
        } else {
            alertify.error("Wrong answer. Try again")
        }
    })

    $("#refresh").click(function () {
        do {
            num = Math.floor(Math.random() * answer.length);
        } while (was.includes(num))
        startMusic(num);
    })
    
})

function startMusic(arg) {
    $("#audio").attr("src", "../audio/" + arg + ".mp3");
}

function startTime() {
    setInterval(function () {
        time = parseInt(timeStorage.getItem("time")) - 1
        $(".time").val(time).trigger("change")

        if (time == 0) {
            alertify.error("Time is out")
            setTimeout(() => window.open("../task1/task1.html", "_self"), 2000)
            timeStorage.removeItem("time")
        } else if (time > 0) {
            timeStorage.setItem("time", time)
        }
    }, 1000)
}