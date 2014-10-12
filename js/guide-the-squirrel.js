var XMing = XMing || {};

XMing.GameStateManager = new function() {

    var gameState;
    var gameTimer;
    var remainingTime;
    var score = 0;
    var roundNumber = 0;

    var nodes = [];

    var injectedStyleDiv;

    var GAME_STATE_ENUM = {
        INITIAL: "initial",
        START: "start",
        PAUSE: "pause",
        END: "end"
    };

    var nodeArray = [
        {
            acornNodes: [2, 20],
            fixedNodes: [{ index: 3, direction: 2}],
            disabledNodes: [5, 14]
        },
        {
            acornNodes: [2, 4, 10, 12, 14, 20, 22, 24],
            fixedNodes: [],
            disabledNodes: [6, 8, 16, 18]
        }
    ];

    this.init = function() {
        window.addEventListener("resize", this.onResize.bind(this), false);
        this.initGame();
    };

    this.checkPath = function() {
        var numAcornCollected = 0;
        var currentPath = [];
        var nodeIndex = 0;

        while (nodeIndex > -1) {
            var currentNode = nodes[nodeIndex];
            if (!_.contains(currentPath, currentNode) && !currentNode.hasClass("disabled")) {
                currentPath.push(currentNode);

                if (currentNode.hasClass("acorn")) {
                    numAcornCollected++;
                }
                if (nodeIndex == 24) {
                    // reach the last node, so break the while loop
                    nodeIndex = -1;
                }
                else {
                    var currentDirection = currentNode.data("direction");
                    switch (currentDirection) {
                        case 0:
                            nodeIndex = (nodeIndex <= 4) ? -1 : nodeIndex - 5;
                            break;
                        case 1:
                            nodeIndex = (nodeIndex % 5 == 4) ? -1 : nodeIndex + 1;
                            break;
                        case 2:
                            nodeIndex = (nodeIndex >= 20) ? -1 : nodeIndex + 5;
                            break;
                        case 3:
                            nodeIndex = (nodeIndex % 5 == 0) ? -1 : nodeIndex - 1;
                            break;
                    }
                }
            }
            else {
                nodeIndex = -1;
            }
        }

        _.each(currentPath, function(node) {
            console.log(_.indexOf(nodes, node));
            node.addClass("selected");
        });
        _.each(_.difference(nodes, currentPath), function(node) {
            node.removeClass("selected");
            console.log("remove: " + node);
        });

        var numAcornTotal = nodeArray[roundNumber].acornNodes.length;

        return _.indexOf(nodes, _.last(currentPath)) == 24 && numAcornCollected == numAcornTotal;
    };

    this.loadGrid = function() {

        $(".game-grid").html("");
        nodes = [];

        for (var i = 0; i < 25; i++) {
            var node = nodeArray[roundNumber];

            var li = $("<li>");

            if (_.contains(node.disabledNodes, i)) {
                li.addClass("disabled");
            }
            else {
                var img = $("<img>", { src: "images/arrow.png", class: "arrow" });

                var filtered = _.filter(node.fixedNodes, _.matches({ index: i}));
                if (filtered.length > 0) {
                    img.transition({ rotate: (filtered[0].direction * 90) + 'deg' });
                    li.data("direction", filtered[0].direction);
                    li.addClass("fixed");
                }
                else {
                    var direction = i == 0 ? 0 : _.random(3);
                    img.transition({ rotate: (direction * 90) + 'deg' });
                    li.data("direction", direction);
                }
                li.append(img);
            }

            if (_.contains(node.acornNodes, i)) {
                li.addClass("acorn");

                var imgAcorn = $("<img>", { src: "images/acorn.png" });
                li.append(imgAcorn);
            }

            $(".game-grid").append(li);

            nodes.push(li);
        }

        $(".game-grid").addClass("animated fadeIn");
        $(".game-grid.animated.fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(".game-grid.animated.fadeIn").removeClass("animated fadeIn");
        });
    };

    this.loadData = function() {
        var self = this;

        this.loadGrid();

        remainingTime = roundNumber + 3.5;
        remainingTime = 999999;
        $("#timer-value").html(Math.floor(remainingTime));

        (function countdown() {
            remainingTime -= 0.5;
            $("#timer-value").html(Math.ceil(remainingTime));
            $("#timer-value").addClass("animated fadeIn");
            $("#score-value").html(score);

            if (remainingTime <= 0) {
                clearTimeout(gameTimer);

                $("#result-content")
                    .html("Time's up!")
                    .addClass('animated bounceIn')
                    .css("color", "rgba(17, 189, 255, 255)");
                $("#timer-value").removeClass("animated fadeIn");

                self.loadNextRound();
            } else {
                gameTimer = setTimeout(countdown, 500);
            }
        })();

        $("ul.game-grid li:not(.fixed):not(.disabled)").click(function() {
            $(this).data("direction", ($(this).data("direction") + 1) % 4);
            $(this).find("img.arrow").transition({ rotate: '+=90deg' });
            if (self.checkPath()) {
                swal({
                    title: "Well done!",
                    confirmButtonText: "Next"
                }, function() {
                    self.loadNextRound();
                })
            }
        });
    };

    this.loadNextRound = function() {
        var self = this;

        var gameGrid = $("ul.game-grid");
        $("#result")
            .width(gameGrid.width())
            .height(gameGrid.height())
            .show();

        _.delay(function() {
            $("#result").hide();

            if (++roundNumber == nodeArray.length) {
                self.endGame();
            }
            else {
                self.loadData();
            }
        }, 1000);
    };

    this.onResize = function(event) {
        var lis = $(".game-grid").children("li");

        var liMaxWidth = _.max(lis, function(li) {
            return $(li).width();
        });
        var maxWidth = $(liMaxWidth).width();

        _.each(lis, function(li) {
            $(li).height(maxWidth);
        });

        var styles = "<style>" + ".game-grid li { height: " + maxWidth + "px; } " + ".game-grid li .content { font-size: " + (maxWidth * 0.5) + "px; } " + "#result-content { font-size: " + (maxWidth * 0.8) + "px; } " + ".game-letters span { font-size: " + (maxWidth * 0.2) + "px; margin-left: " + (maxWidth * 0.1) + "px; } " + "</style>";

        if (injectedStyleDiv) {
            injectedStyleDiv.html(styles);
        } else {
            injectedStyleDiv = $("<div />", {
                html: styles
            }).appendTo("body");
        }
    };

    this.preloadImage = function() {
        var imgLove = new Image();
        imgLove.src = "images/love.png";
    };

    // game status operation
    this.initGame = function() {
        gameState = GAME_STATE_ENUM.INITIAL;
        this.preloadImage();

        var self = this;
        $(".icon-repeat").click(function() {
            self.startGame();
        });
    };

    this.startGame = function() {
        gameState = GAME_STATE_ENUM.START;
        var self = this;

        score = 0;
        roundNumber = 0;

        $("#timer").show();
        $("#replay").hide();
        this.onResize();
        self.loadData();
    };

    this.endGame = function() {
        gameState = GAME_STATE_ENUM.END;

        var self = this;

        $(".game-grid").html("");

        var gameover = ["G", "A", "M", "E", "O", "V", "E", "R"];

        _.each(gameover, function(letter) {
            $(".game-grid").append("<li><div class='content animated fadeIn'>" + letter + "</li>");
        });

        $("#timer").hide();
        $("#replay").show();
        $("#score-value").html(score);
    };

    // check game state
    this.isGameStateInitial = function() {
        return gameState == GAME_STATE_ENUM.INITIAL;
    };

    this.isGameStateStart = function() {
        return gameState == GAME_STATE_ENUM.START;
    };

    this.isGameStateEnd = function() {
        return gameState == GAME_STATE_ENUM.END;
    };
};