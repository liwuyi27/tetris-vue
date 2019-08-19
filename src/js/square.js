var Square = function(){
    //方块矩阵
    this.data = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ];
    // 原点
    this.origin = {
        x:0,
        y:0
    };
    this.dir  = 0;
    this.rotates = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]
}

Square.prototype.canRotate = function(isValid){
    var d = (this.dir + 1) % 4;
    return isValid(this.origin,this.rotates[d]);
}

Square.prototype.rotate = function(num){
    var i,j;
    if(!num) num = 1;
    this.dir = (this.dir + num) % 4;
    for(i=0;i<this.data.length;i++){
        for(j=0;j<this.data[0].length;j++){
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }
}

Square.prototype.canDown = function(isValid){
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test,this.data);
}

Square.prototype.down = function(){
    this.origin.x ++;
}

Square.prototype.canLeft = function(isValid){
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test,this.data);
}

Square.prototype.left = function(){
    this.origin.y --;
}

Square.prototype.canRight = function(isValid){
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test,this.data);
}

Square.prototype.right = function(){
    this.origin.y ++;
}

module.exports = Square;