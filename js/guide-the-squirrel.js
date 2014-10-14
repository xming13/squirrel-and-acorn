var XMing = XMing || {};

XMing.GameStateManager = new function() {

    var gameState;
    var roundNumber = 0;

    var nodes = [];

    var injectedStyleDiv;

    var GAME_STATE_ENUM = {
        INITIAL: "initial",
        START: "start",
        PAUSE: "pause",
        END: "end"
    };

    var nodeArray = [{
        acornNodes: [2, 4, 14],
        directionNodes: [{
            index: 0,
            direction: 1,
            isFixed: false
        }, {
            index: 1,
            direction: 0,
            isFixed: false
        }, {
            index: 2,
            direction: 0,
            isFixed: false
        }, {
            index: 3,
            direction: 0,
            isFixed: false
        }, {
            index: 4,
            direction: 0,
            isFixed: false
        }, {
            index: 5,
            direction: 0,
            isFixed: false
        }, {
            index: 6,
            direction: 0,
            isFixed: false
        }, {
            index: 7,
            direction: 0,
            isFixed: false
        }, {
            index: 8,
            direction: 0,
            isFixed: false
        }, {
            index: 9,
            direction: 0,
            isFixed: false
        }, {
            index: 10,
            direction: 0,
            isFixed: false
        }, {
            index: 11,
            direction: 0,
            isFixed: false
        }, {
            index: 12,
            direction: 0,
            isFixed: false
        }, {
            index: 13,
            direction: 0,
            isFixed: false
        }, {
            index: 14,
            direction: 0,
            isFixed: false
        }, {
            index: 15,
            direction: 0,
            isFixed: false
        }, {
            index: 16,
            direction: 0,
            isFixed: false
        }, {
            index: 17,
            direction: 0,
            isFixed: false
        }, {
            index: 18,
            direction: 0,
            isFixed: false
        }, {
            index: 19,
            direction: 0,
            isFixed: false
        }, {
            index: 20,
            direction: 0,
            isFixed: false
        }, {
            index: 21,
            direction: 0,
            isFixed: false
        }, {
            index: 22,
            direction: 0,
            isFixed: false
        }, {
            index: 23,
            direction: 0,
            isFixed: false
        }, {
            index: 24,
            direction: 0,
            isFixed: false
        }],
        disabledNodes: []
    }, {
        acornNodes: [6, 12, 18],
        directionNodes: [{
            index: 0,
            direction: 1,
            isFixed: false
        }, {
            index: 1,
            direction: 1,
            isFixed: true
        }, {
            index: 2,
            direction: 0,
            isFixed: false
        }, {
            index: 5,
            direction: 2,
            isFixed: true
        }, {
            index: 14,
            direction: 1,
            isFixed: false
        }, {
            index: 18,
            direction: 0,
            isFixed: false
        }, {
            index: 19,
            direction: 2,
            isFixed: true
        }, {
            index: 22,
            direction: 2,
            isFixed: false
        }, {
            index: 23,
            direction: 1,
            isFixed: true
        }],
        disabledNodes: []
    }, {
        acornNodes: [2, 4, 10, 12, 14, 20, 22],
        directionNodes: [{
            index: 0,
            direction: 1,
            isFixed: false
        }, {
            index: 1,
            direction: 1,
            isFixed: true
        }, {
            index: 2,
            direction: 0,
            isFixed: false
        }, {
            index: 3,
            direction: 1,
            isFixed: true
        }, {
            index: 4,
            direction: 0,
            isFixed: false
        }, {
            index: 5,
            direction: 2,
            isFixed: true
        }, {
            index: 6,
            direction: 0,
            isFixed: false
        }, {
            index: 7,
            direction: 0,
            isFixed: true
        }, {
            index: 8,
            direction: 0,
            isFixed: false
        }, {
            index: 9,
            direction: 2,
            isFixed: true
        }, {
            index: 10,
            direction: 0,
            isFixed: false
        }, {
            index: 11,
            direction: 1,
            isFixed: false
        }, {
            index: 12,
            direction: 2,
            isFixed: false
        }, {
            index: 13,
            direction: 3,
            isFixed: false
        }, {
            index: 14,
            direction: 0,
            isFixed: false
        }, {
            index: 15,
            direction: 2,
            isFixed: true
        }, {
            index: 16,
            direction: 0,
            isFixed: false
        }, {
            index: 17,
            direction: 0,
            isFixed: true
        }, {
            index: 18,
            direction: 0,
            isFixed: false
        }, {
            index: 19,
            direction: 2,
            isFixed: true
        }, {
            index: 20,
            direction: 0,
            isFixed: false
        }, {
            index: 21,
            direction: 1,
            isFixed: true
        }, {
            index: 22,
            direction: 0,
            isFixed: false
        }, {
            index: 23,
            direction: 1,
            isFixed: true
        }, {
            index: 24,
            direction: 0,
            isFixed: false
        }],
        disabledNodes: [11, 13]
    }, {
        acornNodes: [5, 7, 9, 16, 18, 21, 23],
        directionNodes: [{
            index: 5,
            direction: 2,
            isFixed: true
        }, {
            index:  7,
            direction: 2,
            isFixed: true
        }, {
            index: 9,
            direction: 2,
            isFixed: true
        }, {
            index: 16,
            direction: 0,
            isFixed: true
        }, {
            index: 18,
            direction: 0,
            isFixed: true
        }, {
            index: 21,
            direction: 1,
            isFixed: true
        }, {
            index: 23,
            direction: 1,
            isFixed: true
        }],
        disabledNodes: []
    }, {
        acornNodes: [2, 4, 6, 8, 10, 14, 16, 18, 20, 22],
        directionNodes: [{
            index: 0,
            direction: 1,
            isFixed: false
        }, {
            index: 1,
            direction: 1,
            isFixed: true
        }, {
            index: 2,
            direction: 0,
            isFixed: false
        }, {
            index: 3,
            direction: 1,
            isFixed: true
        }, {
            index: 4,
            direction: 0,
            isFixed: false
        }, {
            index: 5,
            direction: 2,
            isFixed: true
        }, {
            index: 6,
            direction: 0,
            isFixed: false
        }, {
            index: 7,
            direction: 2,
            isFixed: false
        }, {
            index: 8,
            direction: 0,
            isFixed: false
        }, {
            index: 9,
            direction: 2,
            isFixed: true
        }, {
            index: 10,
            direction: 0,
            isFixed: false
        }, {
            index: 11,
            direction: 0,
            isFixed: false
        }, {
            index: 13,
            direction: 0,
            isFixed: false
        }, {
            index: 14,
            direction: 0,
            isFixed: false
        }, {
            index: 15,
            direction: 2,
            isFixed: true
        }, {
            index: 16,
            direction: 0,
            isFixed: false
        }, {
            index: 17,
            direction: 2,
            isFixed: false
        }, {
            index: 18,
            direction: 0,
            isFixed: false
        }, {
            index: 19,
            direction: 2,
            isFixed: true
        }, {
            index: 20,
            direction: 0,
            isFixed: false
        }, {
            index: 21,
            direction: 1,
            isFixed: true
        }, {
            index: 22,
            direction: 0,
            isFixed: false
        }, {
            index: 23,
            direction: 1,
            isFixed: true
        }, {
            index: 24,
            direction: 0,
            isFixed: false
        }],
        disabledNodes: [12]
    }, {
        acornNodes: [2, 4, 10, 12, 14, 20, 22],
        directionNodes: [{
            index: 12,
            direction: 3,
            isFixed: true
        }, {
            index: 19,
            direction: 0,
            isFixed: false
        }, {
            index: 23,
            direction: 3,
            isFixed: false
        }],
        disabledNodes: [6, 8, 16, 18]
    }, {
        acornNodes: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
        directionNodes: [{
            index: 11,
            direction: 2,
            isFixed: true
        }, {
            index: 13,
            direction: 0,
            isFixed: true
        }, {
            index: 19,
            direction: 0,
            isFixed: false
        }, {
            index: 23,
            direction: 3,
            isFixed: false
        }],
        disabledNodes: []
    }, {
        acornNodes: [2, 4, 6, 8, 10, 14, 16, 18, 20, 22],
        directionNodes: [{
            index: 1,
            direction: 1,
            isFixed: true
        }, {
            index: 5,
            direction: 2,
            isFixed: true
        }, {
            index: 6,
            direction: 2,
            isFixed: false
        }, {
            index: 7,
            direction: 3,
            isFixed: true
        }, {
            index: 11,
            direction: 3,
            isFixed: false
        }, {
            index: 14,
            direction: 0,
            isFixed: false
        }, {
            index: 17,
            direction: 1,
            isFixed: true
        }, {
            index: 18,
            direction: 3,
            isFixed: false
        }, {
            index: 19,
            direction: 2,
            isFixed: true
        }, {
            index: 23,
            direction: 1,
            isFixed: true
        }],
        disabledNodes: [12]
    }];

    var directionExceptions = [
        { nodeIndex: 0, direction: 0 },
        { nodeIndex: 0, direction: 3 },
        { nodeIndex: 1, direction: 0 },
        { nodeIndex: 2, direction: 0 },
        { nodeIndex: 3, direction: 0 },
        { nodeIndex: 4, direction: 0 },
        { nodeIndex: 4, direction: 1 },
        { nodeIndex: 5, direction: 3 },
        { nodeIndex: 9, direction: 1 },
        { nodeIndex: 10, direction: 3 },
        { nodeIndex: 14, direction: 1 },
        { nodeIndex: 15, direction: 3 },
        { nodeIndex: 19, direction: 1 },
        { nodeIndex: 20, direction: 3 },
        { nodeIndex: 20, direction: 2 },
        { nodeIndex: 21, direction: 2 },
        { nodeIndex: 22, direction: 2 },
        { nodeIndex: 23, direction: 2 },
        { nodeIndex: 24, direction: 2 },
        { nodeIndex: 24, direction: 1 }
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
                if (currentNode.hasClass("node-acorn")) {
                    numAcornCollected++;
                }
                if (nodeIndex == 24) {
                    // reach the last node, so break the while loop
                    nodeIndex = -1;
                } else {
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
            } else {
                nodeIndex = -1;
            }
        }

        _.each(currentPath, function(node) {
            node.addClass("selected");
        });
        _.each(_.difference(nodes, currentPath), function(node) {
            node.removeClass("selected");
        });

        var numAcornTotal = 15;
        return _.indexOf(nodes, _.last(currentPath)) == 24 && numAcornCollected == numAcornTotal;
    };

    this.getDirectionClass = function(direction) {
        var directionClass = "";
        switch (direction) {
            case 0:
                directionClass = "up";
                break;
            case 1:
                directionClass = "right";
                break;
            case 2:
                directionClass = "down";
                break;
            case 3:
                directionClass = "left";
                break;
        }
        return directionClass;
    };

    this.addNodeDirectionClass = function(nodeIndex, direction) {

        var exceptionMatch = _.matches({nodeIndex: nodeIndex, direction: direction});
        var exception = _.filter(directionExceptions, exceptionMatch);

        if (exception.length > 0) {
            return;
        }

        nodes[nodeIndex].addClass(this.getDirectionClass(direction));
    };

    this.checkPath = function(isGameOverScreen) {
        var numAcornCollected = 0;
        var currentPath = [];
        var nodeIndex = 0;
        var directionFrom = -1;

        while (nodeIndex > -1) {

            var currentNode = nodes[nodeIndex];
            var classToCheck = isGameOverScreen ? "node-gameover" : "node-disabled";
            if (!_.contains(currentPath, currentNode) && !currentNode.hasClass(classToCheck)) {
                currentNode.removeClass("up right down left");
                currentNode.addClass("selected");
                this.addNodeDirectionClass(nodeIndex, directionFrom);
                currentPath.push(currentNode);

                if (currentNode.hasClass("node-acorn")) {
                    numAcornCollected++;
                }

                if (nodeIndex == 24) {
                    // reach the last node, so break the while loop
                    nodeIndex = -1;
                } else {
                    var currentDirection = currentNode.data("direction");
                    this.addNodeDirectionClass(nodeIndex, currentDirection);

                    switch (currentDirection) {
                        case 0:
                            nodeIndex = (nodeIndex <= 4) ? -1 : nodeIndex - 5;
                            directionFrom = 2;
                            break;
                        case 1:
                            nodeIndex = (nodeIndex % 5 == 4) ? -1 : nodeIndex + 1;
                            directionFrom = 3;
                            break;
                        case 2:
                            nodeIndex = (nodeIndex >= 20) ? -1 : nodeIndex + 5;
                            directionFrom = 0;
                            break;
                        case 3:
                            nodeIndex = (nodeIndex % 5 == 0) ? -1 : nodeIndex - 1;
                            directionFrom = 1;
                            break;
                    }
                }
            } else {
                var prevNode = currentPath[currentPath.length - 1];
                var prevDirection = prevNode.data("direction");
                var currDirection = currentNode.data("direction");

                // not pointing to each other
                // then we keep the border in that direction by removing the direction class
                if (Math.abs(currDirection - prevDirection) != 2) {
                    prevNode.removeClass(this.getDirectionClass(prevDirection));
                }

                nodeIndex = -1;
            }
        }

        _.each(_.difference(nodes, currentPath), function(node) {
            node.removeClass("selected up right down left");
        });

        var numAcornTotal = isGameOverScreen ? 15 : nodeArray[roundNumber].acornNodes.length;

        return _.indexOf(nodes, _.last(currentPath)) == 24 && numAcornCollected == numAcornTotal;
    };

    this.loadGrid = function() {

        $(".game-grid").html("");
        nodes = [];

        for (var i = 0; i < 25; i++) {
            var node = nodeArray[roundNumber];

            var li = $("<li>");

            if (_.contains(node.disabledNodes, i)) {
                li.addClass("node-disabled");
            } else {
                var img;

                if (i == 24) {
                    img = $("<img>", {
                        src: "images/acorn_big.png",
                        class: "acorn"
                    });
                    li.append(img);
                } else {
                    img = $("<img>", {
                        src: "images/arrow.png",
                        class: "arrow"
                    });
                    var directionNodes = _.filter(node.directionNodes, _.matches({
                        index: i
                    }));
                    if (directionNodes.length > 0) {
                        var directionNode = directionNodes[0];
                        img.transition({
                            rotate: (directionNode.direction * 90) + 'deg'
                        });
                        li.data("direction", directionNode.direction);

                        if (directionNode.isFixed) {
                            li.addClass("node-fixed");
                        }
                    } else {
                        var direction = i == 0 ? 0 : _.random(3);
                        img.transition({
                            rotate: (direction * 90) + 'deg'
                        });
                        li.data("direction", direction);
                    }
                    li.append(img);

                    if (i == 0) {
                        var imgSquirrel = $("<img>", {
                            src: "images/squirrel.png",
                            class: "squirrel animated bounce"
                        });
                        li.append(imgSquirrel);
                    }
                }
            }

            if (_.contains(node.acornNodes, i)) {
                li.addClass("node-acorn");

                var imgAcorn = $("<img>", {
                    src: "images/acorn.png",
                    class: "acorn"
                });
                li.append(imgAcorn);
            }

            nodes.push(li);
            $(".game-grid").append(li);
        }
        this.checkPath(false);

        $(".game-grid").addClass("animated fadeIn");
        $(".game-grid.animated.fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(".game-grid.animated.fadeIn").removeClass("animated fadeIn");
        });
    };

    this.loadData = function() {
        var self = this;

        this.loadGrid();

        $("ul.game-grid li:not(.node-fixed):not(.node-disabled)").click(function() {
            $(this).data("direction", ($(this).data("direction") + 1) % 4);
            $(this).find("img.arrow").transition({
                rotate: '+=90deg'
            });

            if (self.checkPath(false)) {
                _.delay(function() {
                    swal({
                        title: "Well done!",
                        confirmButtonText: "Next"
                    }, function() {
                        self.loadNextRound();
                        $('html, body').animate({
                            scrollTop: $("#panel-container").offset().top
                        }, 'fast');
                    })
                }, 300);
            }
        });
    };

    this.loadNextRound = function() {
        var self = this;

        if (++roundNumber == nodeArray.length) {
            self.endGame();
        } else {
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

        $("ul.game-grid").width(maxWidth * 5);

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

        roundNumber = 0;

        $("#replay").hide();
        this.onResize();
        self.loadData();
    };

    this.endGame = function() {
        gameState = GAME_STATE_ENUM.END;

        var self = this;

        $(".game-grid").html("");

        var gameOverNode = {
            acornNodes: [1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23],
            letterNodes: [{
                index: 5,
                letter: "G"
            }, {
                index: 6,
                letter: "A"
            }, {
                index: 7,
                letter: "M"
            }, {
                index: 8,
                letter: "E"
            }, {
                index: 16,
                letter: "O"
            }, {
                index: 17,
                letter: "V"
            }, {
                index: 18,
                letter: "E"
            }, {
                index: 19,
                letter: "R"
            }],
            directionNodes: [{
                index: 4,
                direction: 2,
                isFixed: true
            }, {
                index: 10,
                direction: 2,
                isFixed: true
            }, {
                index: 14,
                direction: 3,
                isFixed: true
            }, {
                index: 20,
                direction: 1,
                isFixed: true
            }, {
                index: 23,
                direction: 3,
                isFixed: false
            }]
        };
        1
        nodes = [];

        for (var i = 0; i < 25; i++) {
            var li = $("<li>");
            var img;

            // last node - assign Big Acorn
            if (i == 24) {
                img = $("<img>", {
                    src: "images/acorn_big.png",
                    class: "acorn"
                });
                li.append(img);
            } else {
                var letterNodes = _.filter(gameOverNode.letterNodes, _.matches({
                    index: i
                }));

                // check if it is letter node
                if (letterNodes.length > 0) {
                    var div = $("<div>", {
                        class: "content animated fadeIn",
                        html: letterNodes[0].letter
                    });
                    li.append(div);
                    li.addClass("node-gameover");
                }
                // arrow node
                else {
                    img = $("<img>", {
                        src: "images/arrow.png",
                        class: "arrow"
                    });
                    var directionNodes = _.filter(gameOverNode.directionNodes, _.matches({
                        index: i
                    }));
                    if (directionNodes.length > 0) {
                        var directionNode = directionNodes[0];
                        img.transition({
                            rotate: (directionNode.direction * 90) + 'deg'
                        });
                        li.data("direction", directionNode.direction);

                        if (directionNode.isFixed) {
                            li.addClass("node-fixed");
                        }
                    } else {
                        var direction = i == 0 ? 0 : _.random(3);
                        img.transition({
                            rotate: (direction * 90) + 'deg'
                        });
                        li.data("direction", direction);
                    }
                    li.append(img);

                    // add squirrel for first node
                    if (i == 0) {
                        var imgSquirrel = $("<img>", {
                            src: "images/squirrel.png",
                            class: "squirrel animated bounce"
                        });
                        li.append(imgSquirrel);
                    }
                }
            }

            // acorn node
            if (_.contains(gameOverNode.acornNodes, i)) {
                li.addClass("node-acorn");

                var imgAcorn = $("<img>", {
                    src: "images/acorn.png",
                    class: "acorn"
                });
                li.append(imgAcorn);
            }

            nodes.push(li);
            $(".game-grid").append(li);
        }

        $("#replay").show();

        var hasAlertedThank = false;
        $("ul.game-grid li:not(.node-fixed):not(.node-disabled)").click(function() {
            $(this).data("direction", ($(this).data("direction") + 1) % 4);
            $(this).find("img.arrow").transition({
                rotate: '+=90deg'
            });
            if (self.checkPath(true) && !hasAlertedThank) {
                swal({
                    title: "Thanks for playing!!!",
                    text: "There are 8512 different paths for the squirrel to move from top left to bottom right!",
                    imageUrl: "images/love.png"
                });
                hasAlertedThank = true;
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