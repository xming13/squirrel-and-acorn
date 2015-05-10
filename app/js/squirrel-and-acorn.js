var XMing = XMing || {};

XMing.GameStateManager = new

function() {
    var windowWidth = 0;
    var gameState;
    var userData;
    var roundNumber = 0;
    var nodes = [];
    var injectedStyleDiv;

    var VERSION_NUMBER = 1;
    var GAME_STATE_ENUM = {
        INITIAL: "initial",
        MENU: 'menu',
        START: "start",
        PAUSE: "pause",
        END: "end"
    };

    /**
     * This array provides the data of the nodes for each round of the game.
     *
     * Position of the nodes is as follows:
     * | 0| 1| 2| 3| 4|
     * | 5| 6| 7| 8| 9|
     * |10|11|12|13|14|
     * |15|16|17|18|19|
     * |20|21|22|23|24|
     *
     * acornNodes: an array of the position of the nodes that have acorn.
     *
     * directionNodes: Provides the initial direction of the node.
     * - index: position of the node.
     * - direction: 0 up, 1 right, 2 down, 3 left
     * - isFixed: if set to true, player cannot rotate the direction.
     *
     * disabledNodes: an array of the position of nodes that are disabled. Disabled nodes do not have direction.
     */
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
            direction: 0,
            isFixed: false
        }, {
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
        acornNodes: [5, 7, 9, 10, 12, 14, 15, 17, 19],
        directionNodes: [{
            index: 0,
            direction: 2,
            isFixed: false
        }, {
            index: 5,
            direction: 3,
            isFixed: false
        }, {
            index: 7,
            direction: 3,
            isFixed: true
        }, {
            index: 9,
            direction: 3,
            isFixed: false
        }, {
            index: 10,
            direction: 1,
            isFixed: true
        }, {
            index: 12,
            direction: 1,
            isFixed: true
        }, {
            index: 13,
            direction: 1,
            isFixed: true
        }, {
            index: 17,
            direction: 3,
            isFixed: true
        }, {
            index: 19,
            direction: 3,
            isFixed: false
        }, {
            index: 23,
            direction: 2,
            isFixed: false
        }],
        disabledNodes: []
    }, {
        acornNodes: [4, 12, 20],
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
            isFixed: true
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
        disabledNodes: [5, 8, 16, 19]
    }, {
        acornNodes: [1, 6, 11, 17, 18, 19],
        directionNodes: [{
            index: 0,
            direction: 3,
            isFixed: false
        }, {
            index: 1,
            direction: 1,
            isFixed: true
        }, {
            index: 6,
            direction: 0,
            isFixed: true
        }, {
            index: 11,
            direction: 1,
            isFixed: true
        }, {
            index: 17,
            direction: 2,
            isFixed: true
        }, {
            index: 18,
            direction: 0,
            isFixed: true
        }, {
            index: 19,
            direction: 2,
            isFixed: true
        }],
        disabledNodes: [15, 16, 20, 21]
    }, {
        acornNodes: [5, 7, 9, 16, 18, 21, 23],
        directionNodes: [{
            index: 0,
            direction: 1,
            isFixed: false
        }, {
            index: 1,
            direction: 0,
            isFixed: false
        }, {
            index: 5,
            direction: 2,
            isFixed: true
        }, {
            index: 7,
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
        acornNodes: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
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
            direction: 2,
            isFixed: true
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
            index: 12,
            direction: 1,
            isFixed: true
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
            direction: 0,
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
        acornNodes: [2, 4, 10, 12, 14, 20, 22],
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
            direction: 1,
            isFixed: true
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
            isFixed: true
        }, {
            index: 7,
            direction: 0,
            isFixed: false
        }, {
            index: 8,
            direction: 3,
            isFixed: true
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
            direction: 2,
            isFixed: true
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
            direction: 3,
            isFixed: true
        }, {
            index: 17,
            direction: 0,
            isFixed: false
        }, {
            index: 18,
            direction: 0,
            isFixed: true
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
            direction: 1,
            isFixed: true
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
        acornNodes: [4, 12, 20],
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
            direction: 2,
            isFixed: true
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
            isFixed: true
        }, {
            index: 12,
            direction: 0,
            isFixed: false
        }, {
            index: 13,
            direction: 1,
            isFixed: true
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
            direction: 3,
            isFixed: true
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
        acornNodes: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
        directionNodes: [{
            index: 0,
            direction: 1,
            isFixed: false
        }, {
            index: 1,
            direction: 0,
            isFixed: false
        }, {
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
            index: 6,
            direction: 2,
            isFixed: false
        }, {
            index: 7,
            direction: 3,
            isFixed: true
        }, {
            index: 10,
            direction: 2,
            isFixed: false
        }, {
            index: 11,
            direction: 3,
            isFixed: false
        }, {
            index: 14,
            direction: 0,
            isFixed: false
        }, {
            index: 15,
            direction: 3,
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

    /**
     * This array provides a list of directions that are not accessible by the nodes at the boundary.
     *
     * For example:
     * an object { nodeIndex: 0, direction: 0 } indicates that to move node 0 in the direction 0 (up) is not allowed
     * as it will be out of the grid.
     *
     * nodeIndex is the position of the node
     *
     * direction is
     * 0: up, 1: right, 2: down, 3: left
     */
    var directionExceptions = [{
        nodeIndex: 0,
        direction: 0
    }, {
        nodeIndex: 0,
        direction: 3
    }, {
        nodeIndex: 1,
        direction: 0
    }, {
        nodeIndex: 2,
        direction: 0
    }, {
        nodeIndex: 3,
        direction: 0
    }, {
        nodeIndex: 4,
        direction: 0
    }, {
        nodeIndex: 4,
        direction: 1
    }, {
        nodeIndex: 5,
        direction: 3
    }, {
        nodeIndex: 9,
        direction: 1
    }, {
        nodeIndex: 10,
        direction: 3
    }, {
        nodeIndex: 14,
        direction: 1
    }, {
        nodeIndex: 15,
        direction: 3
    }, {
        nodeIndex: 19,
        direction: 1
    }, {
        nodeIndex: 20,
        direction: 3
    }, {
        nodeIndex: 20,
        direction: 2
    }, {
        nodeIndex: 21,
        direction: 2
    }, {
        nodeIndex: 22,
        direction: 2
    }, {
        nodeIndex: 23,
        direction: 2
    }, {
        nodeIndex: 24,
        direction: 2
    }, {
        nodeIndex: 24,
        direction: 1
    }];

    this.getDirectionClass = function(direction) {
        switch (direction) {
            case 0:
                return "up";
            case 1:
                return "right";
            case 2:
                return "down";
            case 3:
                return "left";
            default:
                return "";
        }
    };
    this.addNodeDirectionClass = function(nodeIndex, direction) {
        var exceptionMatch = _.matches({
            nodeIndex: nodeIndex,
            direction: direction
        });
        var exception = _.filter(directionExceptions, exceptionMatch);
        if (exception.length > 0) {
            return;
        }
        nodes[nodeIndex].addClass(this.getDirectionClass(direction));
    };

    // This function handles adding/removing classes for the node based on its state
    // and returns true if game success condition is met
    this.checkPath = function() {
        var numAcornCollected = 0;
        var currentPath = [];
        var nodeIndex = 0;
        var directionFrom = -1;

        while (nodeIndex > -1) {
            var currentNode = nodes[nodeIndex];
            var classToCheck = this.isGameStateEnd() ? "node-gameover" : "node-disabled";
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
        var numAcornTotal = this.isGameStateEnd() ? 15 : nodeArray[roundNumber].acornNodes.length;

        // reach the last node
        if (_.indexOf(nodes, _.last(currentPath)) == 24) {
            // collected all acorns
            if (numAcornCollected === numAcornTotal) {
                return true;
            }
            // some acorns are not collected
            // so we add background color and animation to those acorns
            // as an indication to user that these acorns are missed out
            else {
                _.each(nodes, function(node) {
                    if (node.hasClass("node-acorn") && !node.hasClass("selected")) {
                        node.addClass("warning");

                        var imgAcorn = node.find(".acorn");
                        imgAcorn.addClass("animated flash");

                        imgAcorn.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            node.removeClass("warning");
                            imgAcorn.removeClass("animated flash");
                        });
                    }
                });

                return false;
            }
        }

        return false;
    };
    this.setupGrid = function() {
        $(".round-number").html("Round " + (roundNumber + 1));
        $(".board-grid").html("");
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
                        src: "images/acorn-big.png",
                        class: "acorn infinite animated rubberBand"
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
                            class: "infinite animated bounce"
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
            $(".board-grid").append(li);
        }
        this.checkPath();
        $(".board-grid").addClass("animated fadeIn");
        $(".board-grid.animated.fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(".board-grid.animated.fadeIn").removeClass("animated fadeIn");
        });
    };
    this.setupGameNode = function() {
        if (roundNumber === nodeArray.length) {
            this.endGame();
        } else {
            var self = this;
            this.setupGrid();
            $("ul.board-grid li:not(.node-fixed):not(.node-disabled)").click(function() {
                $(this).data("direction", ($(this).data("direction") + 1) % 4);
                $(this).find("img.arrow").transition({
                    rotate: '+=90deg'
                });
                if (self.checkPath()) {
                    if (userData.squirrel.level === roundNumber) {
                        // unlock the next level!
                        userData.squirrel.level++;

                        // we consider user has played the game
                        // if level 4 is cleared
                        if (!userData.played.squirrel && roundNumber === 4) {
                            userData.played.squirrel = true;
                        }

                        self.saveData(userData);
                    }

                    _.delay(function() {
                        swal({
                            title: "Congratulations!",
                            text: "Go to the next stage!",
                            type: "success",
                            confirmButtonText: "Next",
                            confirmButtonColor: "#59FF6D",
                            showCancelButton: true,
                            cancelButtonText: "Menu"
                        }, function(isConfirm) {
                            if (isConfirm) {
                                roundNumber++;
                                self.setupGameNode();
                            } else {
                                self.menuGame();
                            }
                        })
                    }, 300);
                }
            });

            $("ul.board-grid li.node-fixed").click(function() {
                $(this).addClass("animated shake");
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass("shake fadeIn");
                });
            });
        }
    };

    this.preloadImage = function() {
        var imgLove = new Image();
        imgLove.src = "images/love.png";

        var imgGreenEgg = new Image();
        imgGreenEgg.src = "images/green-egg.png";

        var imgBlueEgg = new Image();
        imgBlueEgg.src = "images/blue-egg.png";

        var imgNinjaEgg = new Image();
        imgNinjaEgg.src = "images/ninja-egg.png";
    };
    this.onResize = function() {
        if ($(window).width() != windowWidth) {
            windowWidth = $(window).width();

            if (injectedStyleDiv) {
                // undo custom style first so that we can get the original width based on percentage
                injectedStyleDiv.html("");
            }

            var lis = $(".grid").children("li");
            var liMaxWidth = _.max(lis, function(li) {
                return $(li).width();
            });

            // +2px for the li border
            var liWidth = $(liMaxWidth).width() + 2;

            var styles = "<style>"
                // +2px for the ul border
                + "ul.grid { width: " + (liWidth * 5 + 2) + "px; }" + ".grid li { width: " + liWidth + "px; height: " + liWidth + "px; }" + ".grid li .content { font-size: " + (liWidth / 2) + "px; }" + ".grid li span { font-size: " + (liWidth * 0.3) + "px; left: " + (liWidth * 0.1) + "px; }" + "</style>";
            if (injectedStyleDiv) {
                injectedStyleDiv.html(styles);
            } else {
                injectedStyleDiv = $("<div />", {
                    html: styles
                }).appendTo("body");
            }
        }
    };

    // Game state operation
    this.initGame = function() {
        var self = this;

        gameState = GAME_STATE_ENUM.INITIAL;

        FastClick.attach(document.body);

        window.addEventListener("resize", this.onResize.bind(this), false);

        self.preloadImage();

        userData = this.loadData();

        swal.setDefaults({
            confirmButtonColor: '#6EFD3D'
        });

        $(".mfb-component__button--main").click(function() {
            if ($(this).parent().parent().attr('data-mfb-state') === "open") {
                $(".overlay").addClass("active");
            } else {
                $(".overlay").removeClass("active");
            }
        });

        $(".icon-calculator").click(function(e) {
            if (!userData.easterEgg.squirrel) {
                var that = this;
                e.preventDefault();
                userData.easterEgg.squirrel = true;
                self.saveData(userData);
                swal({
                    title: "Congratulations!",
                    text: "You have found the Green Egg!",
                    imageUrl: "images/green-egg.png"
                }, function() {
                    window.open(that.href, '_blank');
                });
                $.ajax({
                    method: "POST",
                    url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                    contentType: "application/json",
                    data: JSON.stringify({
                        game_id: 12,
                        username: userData.uid,
                        score: 1
                    })
                });
            }
        });

        $(".btn-play").click(function() {
            $(".panel-main").hide();
            $(".panel-game").fadeIn();
            self.menuGame();
        });

        $(".btn-hall-of-fame").click(function() {
            self.showHallOfFame();
        });

        $(".icon-home").click(function() {
            $(".panel-game, .panel-hall-of-fame").hide();
            $(".panel-main").fadeIn();
        });

        $(".icon-menu").click(function() {
            if (roundNumber < nodeArray.length) {
                swal({
                    title: "Are you sure?",
                    text: "Progress for this round will not be saved!",
                    type: "warning",
                    showCancelButton: true
                }, function() {
                    self.menuGame();
                });
            } else {
                self.menuGame();
            }
        });

        this.checkPlayedEasterEgg();
    };
    this.menuGame = function() {
        var self = this;
        gameState = GAME_STATE_ENUM.MENU;

        $(".icon-home-holder, .menu").fadeIn();
        $(".icon-menu-holder, .board").fadeOut();
        $(".round-number").html("&nbsp;");

        // set to 0 to force resize
        windowWidth = 0;
        this.onResize();

        $(".menu-grid").html("");

        for (var i = 0; i < 25; i++) {
            var $li = $("<li>");
            if (i <= nodeArray.length - 1) {
                // level is locked
                if (i > userData.squirrel.level) {
                    $li.addClass('locked');
                } else {
                    if (i === userData.squirrel.level) {
                        $li.html('<img src="images/acorn.png" class="infinite animated tada"/><span>' + (i + 1) + '</span>');
                    } else {
                        $li.html('<img src="images/acorn.png" class="infinite"/><span>' + (i + 1) + '</span>');
                    }

                    (function clickHandler(index) {
                        $li.click(function() {
                            self.startGame(index);
                        })
                    })(i);
                }
            } else if (i === nodeArray.length) {
                // level is locked
                if (i > userData.squirrel.level) {
                    $li.addClass('locked');
                } else {
                    $li.html('<img src="images/acorn-big.png" class="infinite animated tada"/>');
                    $li.click(function() {
                        self.endGame();
                    });
                }
            } else {
                if (i === nodeArray.length + 1 && i - 1 === userData.squirrel.level) {
                    $li.html('<img src="images/squirrel.png" class="infinite animated bounce"/>');
                    $li.click(function() {
                        swal({
                            title: "Fun Fact",
                            text: "There are <b>8512</b> different paths for the squirrel to move from top left to bottom right!",
                            imageUrl: "images/main-squirrel.png",
                            html: true
                        });
                    });
                } else {
                    $li.addClass('disabled');
                }
            }

            $(".menu-grid").append($li);
        }

        $('html, body').animate({
            scrollTop: $(".panel-container").offset().top
        }, 'fast');
    };
    this.startGame = function(index) {
        gameState = GAME_STATE_ENUM.START;

        $(".icon-menu-holder, .board").fadeIn();
        $(".menu").hide();

        roundNumber = index;
        this.setupGameNode();

        $('html, body').animate({
            scrollTop: $(".panel-container").offset().top
        }, 'fast');
    };
    this.endGame = function() {
        gameState = GAME_STATE_ENUM.END;
        var self = this;

        roundNumber = nodeArray.length;

        $(".round-number").html("Last Round");
        $(".icon-menu-holder").show();
        $(".menu").hide();
        $(".board").show();

        $(".board-grid").html("");
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
                index: 0,
                direction: 1,
                isFixed: false
            }, {
                index: 1,
                direction: 0,
                isFixed: false
            }, {
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

        nodes = [];
        for (var i = 0; i < 25; i++) {
            var li = $("<li>");
            var img;
            // last node - assign Big Acorn
            if (i == 24) {
                img = $("<img>", {
                    src: "images/acorn-big.png",
                    class: "acorn infinite animated rubberBand"
                });
                li.append(img);
            } else {
                var letterNodes = _.filter(gameOverNode.letterNodes, _.matches({
                    index: i
                }));
                // check if it is letter node
                if (letterNodes.length > 0) {
                    var div = $("<div>", {
                        class: "content animated fadeIn letter",
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
                            class: "infinite animated bounce"
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
            $(".board-grid").append(li);
        }
        this.checkPath();

        $("ul.board-grid li:not(.node-fixed):not(.node-disabled)").click(function() {
            $(this).data("direction", ($(this).data("direction") + 1) % 4);
            $(this).find("img.arrow").transition({
                rotate: '+=90deg'
            });
            if (self.checkPath()) {
                swal({
                    title: "Congratulations!",
                    text: "You have completed all the levels!",
                    imageUrl: "images/acorn-big.png",
                    closeOnConfirm: userData.squirrel.inHallOfFame
                }, function() {
                    var postingInProgress = false;
                    swal({
                        title: "Thanks for playing!!!",
                        imageUrl: "images/love.png",
                        type: "input",
                        text: "Write your name here! It will appear in the Hall of Fame!",
                        closeOnConfirm: false
                    }, function(playerName) {
                        if (playerName == "") {
                            swal.showInputError("You need to write something! A nickname is fine too!");
                            return false;
                        }

                        if (postingInProgress) {
                            return false;
                        } else {
                            postingInProgress = true;
                            $.ajax({
                                method: "POST",
                                url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    game_id: 1,
                                    username: playerName,
                                    score: roundNumber
                                })
                            }).success(function(data) {
                                swal("Congratulations!", "You are the " + data.rank_text + " one to solve all the puzzles!", "success");
                                userData.squirrel.inHallOfFame = true;
                                userData.username = playerName;
                                self.saveData(userData);
                            }).fail(function() {
                                swal("Oops...", "Something went wrong!", "error");
                            });
                        }
                    });
                    $('.sweet-alert input[type=text]:first').val(userData.username);
                });
            }
        });

        $(".letter").click(function() {
            $(this).addClass("shake");
        });
        $(".letter").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass("shake fadeIn");
        });

        $('html, body').animate({
            scrollTop: $(".panel-container").offset().top
        }, 'fast');
    };
    this.showHallOfFame = function() {
        $(".panel-main").hide();
        $(".panel-hall-of-fame, .icon-home, .loader").fadeIn();

        $(".highscore-list").html("");

        if (!userData.leaderboard.squirrel) {
            userData.leaderboard.squirrel = true;
            this.saveData(userData);
            this.checkLeaderboardEasterEgg();
        }

        $.get("http://weiseng.redairship.com/leaderboard/api/1/highscore.json?game_id=1", function(data) {
            $(".loader").fadeOut(700);

            var numDummyData = 10 - data.length;
            for (var i = 0; i < numDummyData; i++) {
                data.push({
                    username: '----------'
                });
            }

            _.each(data, function(highscore, index) {
                setTimeout(function() {
                    $(".highscore-list").append('<li class="animated slideInUp">' + highscore.username + '</li>');
                }, index * 200);
            });
        }).fail(function() {
            swal("Oops...", "Something went wrong!", "error");
        });
    };

    // Check game state
    this.isGameStateInitial = function() {
        return gameState == GAME_STATE_ENUM.INITIAL;
    };
    this.isGameStateStart = function() {
        return gameState == GAME_STATE_ENUM.START;
    };
    this.isGameStateEnd = function() {
        return gameState == GAME_STATE_ENUM.END;
    };

    // Easter Egg
    this.checkPlayedEasterEgg = function() {
        if (!userData.easterEgg.allGames) {
            if (_.every(userData.played)) {
                userData.easterEgg.allGames = true;
                this.saveData(userData);
                swal({
                    title: 'Congratulations!',
                    text: 'You have found the Blue Egg!',
                    imageUrl: 'images/blue-egg.png'
                });
                $.ajax({
                    method: "POST",
                    url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                    contentType: "application/json",
                    data: JSON.stringify({
                        game_id: 13,
                        username: userData.uid,
                        score: 1
                    })
                });
            }
        }
    };
    this.checkLeaderboardEasterEgg = function() {
        if (!userData.easterEgg.allLeaderboard) {
            if (_.every(userData.leaderboard)) {
                userData.easterEgg.allLeaderboard = true;
                this.saveData(userData);
                swal({
                    title: 'Congratulations!',
                    text: 'You have found the Ninja Egg!',
                    imageUrl: 'images/ninja-egg.png'
                });
                $.ajax({
                    method: "POST",
                    url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                    contentType: "application/json",
                    data: JSON.stringify({
                        game_id: 15,
                        username: userData.uid,
                        score: 1
                    })
                });
            }
        }
    };

    // Local storage
    this.saveData = function(userData) {
        if (window.localStorage) {
            window.localStorage.setItem('data', btoa(encodeURIComponent(JSON.stringify(userData))));
        }
    };
    this.loadData = function() {
        if (window.localStorage) {
            var data = window.localStorage.getItem('data');
            if (data) {
                var parsedData = JSON.parse(decodeURIComponent(atob(data)));
                // make sure version is the same
                if (parsedData.version === VERSION_NUMBER) {
                    return parsedData;
                }
            }
        }

        var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        var data = {
            played: {
                bunny: false,
                specialOne: false,
                mushrooms: false,
                word: false,
                numbers: false,
                squirrel: false
            },
            leaderboard: {
                bunny: false,
                specialOne: false,
                mushrooms: false,
                word: false,
                numbers: false,
                squirrel: false
            },
            squirrel: {
                level: 0,
                inHallOfFame: false
            },
            easterEgg: {
                allGames: false,
                allLeaderboard: false,
                word: false,
                numbers: false,
                specialOne: false,
                mushrooms: false,
                squirrel: false
            },
            collectAll: false,
            uid: uid,
            username: '',
            version: VERSION_NUMBER
        };

        this.saveData(data);

        return data;
    };
};

$(function() {
    XMing.GameStateManager.initGame();
});
