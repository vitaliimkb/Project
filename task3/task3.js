let progress = 0;
let timeStorage = localStorage;
let time;
let firstCard = null;
let secondCard = null;

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"))
} else {
    time = 200;
    timeStorage.setItem("time", time)
}

let cards = [
    {
        name: 'java',
        img: 'cards/java.png',
        id: 1
    },
    {
        name: 'c#',
        img: 'cards/c sharp.png',
        id: 2
    },
    {
        name: 'html',
        img: 'cards/html.png',
        id: 3
    },
    {
        name: 'css',
        img: 'cards/css.png',
        id: 4
    },
    {
        name: 'ruby',
        img: 'cards/ruby.png',
        id: 5
    },
    {
        name: 'c++',
        img: 'cards/c plus plus.png',
        id: 6
    },
    {
        name: 'dart',
        img: 'cards/dart.png',
        id: 7
    },
    {
        name: 'kotlin',
        img: 'cards/kotlin.png',
        id: 8
    },
    {
        name: 'python',
        img: 'cards/python.png',
        id: 9
    },
    {
        name: 'go',
        img: 'cards/go.png',
        id: 10
    },
    {
        name: 'php',
        img: 'cards/php.png',
        id: 11
    },
    {
        name: 'sql',
        img: 'cards/sql.png',
        id: 12
    }
]

$(document).ready(function () {
    $(".progress").knob({
        'min': 0,
        'max': 12,
        'readOnly': true,
        'width': '100%',
        'thickness': 0.2,
        'lineCap': 'round',
        'displayInput': false,
        'bgColor': 'lightgreen',
        'fgColor': 'green',
        'angleOffset': -60,
        'angleArc': 120
    })

    $(".time").knob({
        'min': 0,
        'max': 200,
        'readOnly': true,
        'width': '100%',
        'thickness': 0.2,
        'displayInput': false,
        'bgColor': 'lightcoral',
        'fgColor': 'purple',
        'angleOffset': 0,
        'angleArc': 360
    })

    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    })

    $("#start").click(function () {
        $("#start").hide();
        $("#gameBoard").css("display", "grid");
        fillBoard();
        $(".card").on("click", cardClicked)
        startTime();
    })
})

function fillBoard() {
    let board = shuffle([...cards, ...cards])
    for (let i = 0; i < board.length; i++) {
        let cardHtml = `
            <div class='card' data-id='${board[i].id}' id=${i}>
                <div class='front'>
                    ROBOCODE
                </div>
                <div class='back'>
                    <img src='${board[i].img}' alt='${board[i].name}'>
                </div>
            </div>
        `;
        $("#gameBoard").append(cardHtml)
    }
}

function shuffle(array) {
    let counter = array.length;
    let temp;
    let index;
    // While there are elements in the array 
    while (counter > 0) {
        // Pick a random index 
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1 
        counter--;
        // And swap the last element with it 
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function cardClicked() {
    if (secondCard || $(this).hasClass("matched")) {
        return
    }

    if (!firstCard) {
        firstCard = $(this)
        firstCard.addClass("flip")
        return
    }

    if (firstCard) {
        secondCard = $(this)
        secondCard.addClass("flip")

        if (firstCard.attr("data-id") == secondCard.attr("data-id") &&
            firstCard.attr("id") != secondCard.attr("id")) {
            firstCard.addClass("matched")
            secondCard.addClass("matched")
            firstCard = null
            secondCard = null
            progress++
            $(".progress").val(progress).trigger("change")
            if (progress == 12) {
                win()
            }
            return
        } else {
            setTimeout(function () {
                firstCard.removeClass("flip")
                secondCard.removeClass("flip")
                firstCard = null
                secondCard = null
            }, 1000)
        }
    }
}

function win() {
    $("#gameBoard").hide()
    $("#win").css({'display' : 'flex'})
    localStorage.removeItem("time")
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

