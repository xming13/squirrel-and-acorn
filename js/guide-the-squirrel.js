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
            acornNodes: [12],
            directionNodes: [
                { index: 1, direction: 0, isFixed: false},
                { index: 2, direction: 0, isFixed: false},
                { index: 3, direction: 0, isFixed: false},
                { index: 4, direction: 0, isFixed: false},
                { index: 5, direction: 0, isFixed: false},
                { index: 6, direction: 0, isFixed: false},
                { index: 7, direction: 0, isFixed: false},
                { index: 8, direction: 0, isFixed: false},
                { index: 9, direction: 0, isFixed: false},
                { index: 10, direction: 0, isFixed: false},
                { index: 11, direction: 0, isFixed: false},
                { index: 12, direction: 0, isFixed: false},
                { index: 13, direction: 0, isFixed: false},
                { index: 14, direction: 0, isFixed: false},
                { index: 15, direction: 0, isFixed: false},
                { index: 16, direction: 0, isFixed: false},
                { index: 17, direction: 0, isFixed: false},
                { index: 18, direction: 0, isFixed: false},
                { index: 19, direction: 0, isFixed: false},
                { index: 20, direction: 0, isFixed: false},
                { index: 21, direction: 0, isFixed: false},
                { index: 22, direction: 0, isFixed: false},
                { index: 23, direction: 0, isFixed: false},
                { index: 24, direction: 0, isFixed: false}
            ],
            disabledNodes: []
        },
        {
            acornNodes: [2, 12, 14],
            directionNodes: [
                { index: 1, direction: 1, isFixed: true},
                { index: 2, direction: 0, isFixed: false},
                { index: 3, direction: 1, isFixed: true},
                { index: 4, direction: 0, isFixed: false},
                { index: 5, direction: 2, isFixed: true},
                { index: 6, direction: 0, isFixed: false},
                { index: 7, direction: 2, isFixed: true},
                { index: 8, direction: 0, isFixed: false},
                { index: 9, direction: 2, isFixed: true},
                { index: 10, direction: 0, isFixed: false},
                { index: 11, direction: 1, isFixed: true},
                { index: 12, direction: 0, isFixed: false},
                { index: 13, direction: 1, isFixed: true},
                { index: 14, direction: 0, isFixed: false},
                { index: 15, direction: 2, isFixed: true},
                { index: 16, direction: 0, isFixed: false},
                { index: 17, direction: 2, isFixed: true},
                { index: 18, direction: 0, isFixed: false},
                { index: 19, direction: 2, isFixed: true},
                { index: 20, direction: 0, isFixed: false},
                { index: 21, direction: 1, isFixed: true},
                { index: 22, direction: 0, isFixed: false},
                { index: 23, direction: 1, isFixed: true},
                { index: 24, direction: 0, isFixed: false}
            ],
            disabledNodes: []
        },
        {
            acornNodes: [2, 4, 10, 12, 14, 20, 22],
            directionNodes: [{ index: 12, direction: 0, isFixed: true}],
            disabledNodes: [6, 8, 16, 18]
        },
        {
            acornNodes: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
            directionNodes: [
                { index: 11, direction: 2, isFixed: true},
                { index: 13, direction: 0, isFixed: true}
            ],
            disabledNodes: []
        },
        {
            acornNodes: [2, 4, 6, 8, 10, 14, 16, 18, 20, 22],
            directionNodes: [
                { index: 1, direction: 1, isFixed: true},
                { index: 5, direction: 2, isFixed: true},
                { index: 6, direction: 2, isFixed: false},
                { index: 7, direction: 3, isFixed: true},
                { index: 11, direction: 3, isFixed: false },
                { index: 17, direction: 1, isFixed: true},
                { index: 19, direction: 2, isFixed: true},
                { index: 23, direction: 1, isFixed: true}
            ],
            disabledNodes: [12]
        }
    ];

    this.init = function() {
        window.addEventListener("resize", this.onResize.bind(this), false);
        this.initGame();
    };

    this.checkEndGamePath = function() {
        var numAcornCollected = 0;
        var currentPath = [];
        var nodeIndex = 0;

        while (nodeIndex > -1) {
            var currentNode = nodes[nodeIndex];
            if (!_.contains(currentPath, currentNode) && !currentNode.hasClass("node-gameover")) {
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
            node.addClass("selected");
        });
        _.each(_.difference(nodes, currentPath), function(node) {
            node.removeClass("selected");
        });

        var numAcornTotal = 17;
        return _.indexOf(nodes, _.last(currentPath)) == 24 && numAcornCollected == numAcornTotal;
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
            node.addClass("selected");
        });
        _.each(_.difference(nodes, currentPath), function(node) {
            node.removeClass("selected");
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
                var img = $("<img>", { src: i == 24 ? "images/acorn_big.png"  : "images/arrow.png", class: "arrow" });

                var directionNodes = _.filter(node.directionNodes, _.matches({ index: i}));
                if (directionNodes.length > 0) {
                    var directionNode = directionNodes[0];
                    img.transition({ rotate: (directionNode.direction * 90) + 'deg' });
                    li.data("direction", directionNode.direction);

                    if (directionNode.isFixed) {
                        li.addClass("fixed");
                    }
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
                _.delay(function() {
                    swal({
                        title: "Well done!",
                        confirmButtonText: "Next"
                    }, function() {
                        self.loadNextRound();
                    })
                }, 300);
            }
        });
    };

    this.loadNextRound = function() {
        var self = this;

        if (++roundNumber == nodeArray.length) {
            self.endGame();
        }
        else {
            self.loadData();
        }
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

        var gameover = [
            "", "", "", "", "",
            "G", "A", "M", "E", "",
            "", "", "", "", "",
            "", "O", "V", "E", "R",
            "", "", "", "", ""
        ];

        nodes = [];
        _.each(gameover, function(letter, index) {
            var li = $("<li>");

            if (letter == "") {
                var img = $("<img>", { src: index == 24 ? "images/acorn_big.png"  : "images/arrow.png", class: "arrow" });
                var direction = index == 0 ? 0 : _.random(3);
                img.transition({ rotate: (direction * 90) + 'deg' });
                li.append(img);
                li.data("direction", direction);

                var imgAcorn = $("<img>", { src: "images/acorn.png" });
                li.append(imgAcorn);
                li.addClass("acorn");
            }
            else {
                var div = $("<div>", { class: "content animated fadeIn", html: letter });
                li.append(div);
                li.addClass("node-gameover");
            }

            nodes.push(li);
            $(".game-grid").append(li);
        });

        $("#timer").hide();
        $("#replay").show();
        $("#score-value").html(score);

        $("ul.game-grid li:not(.fixed):not(.disabled)").click(function() {
            $(this).data("direction", ($(this).data("direction") + 1) % 4);
            $(this).find("img.arrow").transition({ rotate: '+=90deg' });
            if (self.checkEndGamePath()) {
                swal({
                    title: "Thanks for playing!!!",
                    imageUrl: "images/love.png"
                })
            }
        });
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