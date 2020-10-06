$(document).ready(function () {


    /* If statement checking what level are we in and set score based previous score */
    if (document.body.id === "levelOne") {
        localStorage.setItem("finalScore", 0);
        localStorage.setItem("levelOneScore", 0);
        localStorage.setItem("levelTwoScore", 0);
        score = 0;
        count = 120;
    
    } else if (document.body.id === "levelTwo") {
        score = localStorage.getItem("levelOneScore");
        count = 240;
    } else if (document.body.id === "levelThree") {
        score = localStorage.getItem("levelTwoScore");
        count = 480;
    } else {
        score = 0;
        
    }



   
    counter = setInterval(function(){
            if (count > 0) {
            count--;   
            $("#timer").text(count + " secs")
            }    
    }, 1000);
    
    
    var checkNum = 0;

    /* Score field filled with current score and making sure its a number*/
    $("#score").text(score);
    score = parseInt(($("#score").text()), 10);

    /* colour data saved in arrays in an object. With that I can make future changes easier and add more features, such as randomly generated rows*/
    /* data in row helps us to identify location of specific cube for colour. Colour array makes easier to connect specific colours */
    var colorData = {
        row1: [".row1column1", ".row1column2", ".row1column3", ".trueCheck1"],
        row2: [".row2column1", ".row2column2", ".row2column3", ".trueCheck2"],
        row3: [".row3column1", ".row3column2", ".row3column3", ".trueCheck3"],
        row4: [".row4column1", ".row4column2", ".row4column3", ".trueCheck4"],
        row5: [".row5column1", ".row5column2", ".row5column3", ".trueCheck5"],
        row6: [".row6column1", ".row6column2", ".row6column3", ".trueCheck6"],
        row7: [".row7column1", ".row7column2", ".row7column3", ".trueCheck7"],
        row8: [".row8column1", ".row8column2", ".row8column3", ".trueCheck8"],
        row9: [".row9column1", ".row9column2", ".row9column3", ".trueCheck9"],
        cyan: ["rgb(0, 0, 255)", "rgb(0, 255, 0)"],
        magenta: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"],
        yellow: ["rgb(255, 0, 0)", "rgb(0, 255, 0)"],
        orange: ["rgb(255, 0, 0)", "rgb(255, 255, 0)"],
        springGreen: ["rgb(0, 255, 0)", "rgb(0, 255, 255)"],
        chartreuseGreen: ["rgb(0, 255, 0)", "rgb(255, 255, 0)"],
        azure: ["rgb(0, 255, 255)", "rgb(0, 0, 255)"],
        violet: ["rgb(255, 0, 255)", "rgb(0, 0, 255)"],
        rose: ["rgb(255, 0, 255)", "rgb(255, 0, 0)"],
    };

    

    





    /* Functions that counts how many drops were made. If 2 drops were made in one row, if statement checks if colour are correct. If they are, disable current row, add score +1 and runs function trueCheck. If colours in the row are not correct, 
    reset their background colour */
    function colorMixing() {
        /* setTimeout to prevent errors with very first drag&drop event*/
        setTimeout(function () {
            checkNum += 1;
            if (checkNum >= 2) {
                $(colorData[currentRow][3]).text(function () {
                    if ((($(colorData[currentRow][0]).css("background-color") === colorData[currentColor][0] && $(colorData[currentRow][1]).css("background-color")) === colorData[currentColor][1]) ||
                        (($(colorData[currentRow][0]).css("background-color") === colorData[currentColor][1] && $(colorData[currentRow][1]).css("background-color")) === colorData[currentColor][0])) {
                        $(colorData[currentRow][3]).text("true");
                        score += 1;
                        $("#score").text(score);
                        currentDrop = colorData[currentRow][0] + "," + colorData[currentRow][1];
                        $(currentDrop).droppable('disable');
                        checkNum = 0;
                        trueCheck();
                    } else {
                        $(colorData[currentRow][3]).text("false")
                        $(colorData[currentRow][0]).css({
                            'background-color': ''
                        });
                        $(colorData[currentRow][1]).css({
                            'background-color': ''
                        });
                        checkNum = 0;
                    }
                });
            }
        }, 0);
    }


    /* Function that runs after each drop to the box. If all colours are mixed in the right way, link to the second level is displayed */
    function trueCheck() {

        if (document.body.id === "levelOne") {
            if ($(".trueCheck1").text() === "true" && $(".trueCheck2").text() === "true" && $(".trueCheck3").text() === "true") {
                clearInterval(counter); 
                $("#score").text(score + count);
                $(".levelOne-nextRound__button").css("display", "block");
                localStorage.setItem("levelOneScore", score + count);
               
            }
        } else if (document.body.id === "levelTwo") {
            if ($(".trueCheck1").text() === "true" && $(".trueCheck2").text() === "true" && $(".trueCheck3").text() === "true" && $(".trueCheck4").text() === "true" && $(".trueCheck5").text() === "true" && $(".trueCheck6").text() === "true") {
                clearInterval(counter); 
                $("#score").text(score + count);
                $(".levelOne-nextRound__button").css("display", "block");
                localStorage.setItem("levelTwoScore", score + count);
            }
        } else if (document.body.id === "levelThree") {
            if ($(".trueCheck1").text() === "true" && $(".trueCheck2").text() === "true" && $(".trueCheck3").text() === "true" && $(".trueCheck4").text() === "true" && $(".trueCheck5").text() === "true" && $(".trueCheck6").text() === "true" && $(".trueCheck7").text() === "true" && $(".trueCheck8").text() === "true" && $(".trueCheck9").text() === "true") {
                clearInterval(counter); 
                $("#score").text(score + count);
                $(".levelOne-nextRound__button").css("display", "block");



                /* GET AND SAVE DATA FOR SCOREBOARD */
                localStorage.setItem("mostRecentScore", score + count);
                const finalScore = document.getElementById("scoreboard");
                const mostRecentScore = localStorage.getItem("mostRecentScore");
                finalScore.innerText = mostRecentScore;
                

                document.getElementById("saveScoreBtn").addEventListener("click", saveHighScore);

                /* FUNCTION TO SAVE SCORE OBJECT INTO LOCAL STORAGE */
                function saveHighScore(username){
                    var username = document.getElementById("username");
                    const score = {
                        score: mostRecentScore,
                        name: username.value
                    };


                    highscores.push(score);
                    highscores.sort((a, b) => b.score - a.score);

                    localStorage.setItem("highScores", JSON.stringify(highscores));
                    

                    
                }
            }
        }
    }









    /* There are data for function colorMixing so it knows what row is currently played */


    /* ***************** CYAN ***************** */
    /* getColorData variable contain div class attributes for jQuery getElement function. I put them in the variable because jQuery syntax doesnt allow to put them into $() directly */
    getColorData = colorData["row1"][0] + "," + colorData["row1"][1];
    $(getColorData).on("drop", function () {
        /* currentRow variable tells colorMixing function what array in the object to work with. This way I can use only one function for all rows, save space and 
        in case I want to change something for all rows I can change it in 1 place (function), not for each row separately */
        currentRow = "row1";
        currentColor = "cyan";
        colorMixing();
    });

    /* ***************** MAGENTA ***************** */
    getColorData = colorData["row2"][0] + "," + colorData["row2"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row2";
        currentColor = "magenta";
        colorMixing();
    });

    /* ***************** YELLOW ***************** */
    getColorData = colorData["row3"][0] + "," + colorData["row3"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row3";
        currentColor = "yellow";
        colorMixing();
    });

    /* ***************** ORANGE ***************** */
    getColorData = colorData["row4"][0] + "," + colorData["row4"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row4";
        currentColor = "orange";
        colorMixing();
    });

    /* ***************** SPRING GREEN ***************** */
    getColorData = colorData["row5"][0] + "," + colorData["row5"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row5";
        currentColor = "springGreen";
        colorMixing();
    });

    /* ***************** CHARTREUSE  GREEN ***************** */
    getColorData = colorData["row6"][0] + "," + colorData["row6"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row6";
        currentColor = "chartreuseGreen";
        colorMixing();
    });

    /* ***************** AZURE ***************** */
    getColorData = colorData["row7"][0] + "," + colorData["row7"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row7";
        currentColor = "azure";
        colorMixing();
    });

    /* ***************** VIOLET ***************** */
    getColorData = colorData["row8"][0] + "," + colorData["row8"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row8";
        currentColor = "violet";
        colorMixing();
    });

    /* ***************** ROSE ***************** */
    getColorData = colorData["row9"][0] + "," + colorData["row9"][1];
    $(getColorData).on("drop", function () {
        currentRow = "row9";
        currentColor = "rose";
        colorMixing();
    });







    /* GAME DRAG DROP*/
    $(".dragArea").draggable({
        snap: ".dropArea",
        snapMode: "inner",
        cursor: "move",
        helper: function () {
            return $("<div class='helper' style='background-color: " + $(this).css("background-color") + "'></div>")
        },
    });
    $(".dropArea").droppable({
        accept: ".dragArea",
        tolerance: "intersect",
        drop: function (event, ui) {
            $(this).css("background-color", $(ui.draggable).css("background-color"))
        },
    });




    /* AVATAR */
    /* getting avatar image player picked from localStorage */
    $("#avatarLevel").css("background-image", localStorage.getItem("avatar"));


    /* SCOREBOARD GLOBAL TO PREVENT ERRORS*/
    const highscores = JSON.parse(localStorage.getItem("highScores")) || [];




/*


    var modalContent = document.getElementById("helpModal");
    var openModal = document.getElementById("btnModal");
    var closeModal = document.getElementsByClassName("close")[0];
    
    // open modal button
    openModal.onclick = function() {
        modalContent.style.display = "block";
    }
    
    // x close modal
    closeModal.onclick = function() {
        modalContent.style.display = "none";
    }
    
    // click anywhere close modal
    window.onclick = function(event) {
      if (event.target == modalContent) {
        modalContent.style.display = "none";
      }
    }
*/

})