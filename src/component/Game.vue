<template>
  <div class="game" :style="styleObject">
    <Item
      v-for="item in gameDataMain"
      :key="item.id"
      :top="item.top"
      :left="item.left"
      :width="width"
      :state="item.state"
    ></Item>
  </div>
</template>
<script>
import Item from "./Item.vue";
import { setInterval } from 'timers';
export default {
  created() {
    this.initGameData();
    document.onkeydown = this.bindKeyEvent;
    this.timer = setInterval(this.drop,this.speed);
  },
  props: ["current"],
  data() {
    return {
      row: 20,
      column: 10,
      width: 30,
      speed:500,
      timer:null,
      changer:0,
      gameData: []
    };
  },
  components: {
    Item
  },
  computed: {
    styleObject: function() {
      return {
        width: this.column * this.width + "px",
        height: this.row * this.width + "px"
      };
    },
    gameDataMain: function() {
        var obj = [];
      for (let i = 0; i < this.current.data.length; i++) {
        for (let j = 0; j < this.current.data[0].length; j++) {
          if (this.current.data[i][j] != 0) {
            var index = (i+this.current.origin.x)*this.column + this.current.origin.y + j;
            this.gameData[index].state = this.current.data[i][j];
          }
        }
      }
      return this.gameData;
    }
  },
  methods: {
    gameDataMain1: function() {
      for (let i = 0; i < this.current.data.length; i++) {
        for (let j = 0; j < this.current.data[0].length; j++) {
          if (this.current.data[i][j] != 0) {
            this.gameData[
              (i + this.current.origin.x) * this.column +
                j +
                this.current.origin.y
            ].state = this.current.data[i][j];
          }
        }
      }
      return this.gameData.slice();
    },  
    initGameData: function() {
      var obj;
      for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.column; j++) {
          obj = {
            id: i * this.row + j,
            state: 0,
            left: j,
            top: i
          };
          this.gameData.push(obj);
        }
      }
    },
    bindKeyEvent: function(e) {
      switch (e.keyCode) {
        case 38: //up
        this.rotate();
          break;
        case 39: //right
        this.right();
          break;
        case 40: //down
        this.down();
          break;
        case 37: //left
        this.left();
          break;
        case 32: //space
          break;
        default:
          break;
      }
    },
    checkDown:function(){
        var x = this.current.origin.x + 1;
        var y = this.current.origin.y;
        for(let i = 0;i<this.current.data.length;i++){
            for(let j = 0;j<this.current.data[0].length;j++){
                if(this.current.data[i][j]!=0){
                    if(x+i>=this.row){
                        return false;
                    }
                    var index = (i+x)*this.column + j + y;
                    if(this.gameData[index].state == 1){
                        return false;
                    }
                }
            }
        }
        return true;
    },
    checkLeft:function(){
        var x = this.current.origin.x;
        var y = this.current.origin.y-1;
        if(y<0){
            return false;
        }
        for(let i = 0;i<this.current.data.length;i++){
            for(let j = 0;j<this.current.data[0].length;j++){
                if(this.current.data[i][j]!=0){
                    var index = (i+x)*this.column + j + y;
                    if(this.gameData[index].state == 1){
                        return false;
                    }
                }
            }
        }
        return true;
    },
    checkRight:function(){
        var x = this.current.origin.x;
        var y = this.current.origin.y + 1;
        for(let i = 0;i<this.current.data.length;i++){
            for(let j = 0;j<this.current.data[0].length;j++){
                if(this.current.data[i][j]!=0){
                    if(y+j>=this.column){
                        return false;
                    }
                    var index = (i+x)*this.column + j + y;
                    if(this.gameData[index].state == 1){
                        return false;
                    }
                }
            }
        }
        return true;
    },
    checkRotate:function(){
        var dir = (this.current.dir + 1)%4;
        var x = this.current.origin.x;
        var y = this.current.origin.y;
        for(let i = 0;i<this.current.data.length;i++){
            for(let j = 0;j<this.current.data[0].length;j++){
                if(this.current.rotates[dir][i][j]!=0){
                    if(y+j>=this.column ){
                        return false;
                    }
                    if(x+i>=this.row){
                        return false;
                    }
                    var index = (i+x)*this.column + j + y;
                    if(this.gameData[index].state == 1){
                        return false;
                    }
                }
            }
        }
        return true;
        
    },
    clearPre:function(){
        var x = this.current.origin.x;
        var y = this.current.origin.y;
        for(let i = 0;i<this.current.data.length;i++){
            for(let j = 0;j<this.current.data[0].length;j++){
                if(this.current.data[i][j]!=0){
                    this.gameData[(i+x)*this.column + j+y].state = 0;
                }
            }
        }
        return true;
    },
   
    down:function(){
         if(this.checkDown()){
            this.clearPre();
            this.$emit('down');
        }
    },
    left:function(){
        if(this.checkLeft()){
            this.clearPre();
            this.$emit('left');
        }
    },
    right:function(){
        if(this.checkRight()){
            this.clearPre();
            this.$emit('right');
        }
    },
    rotate:function(){
        if(this.checkRotate()){
            this.clearPre();           
            this.$emit('rotate');
        }
    },
    setData:function(){
        this.changer++;
        for(let i=0;i<this.current.data.length;i++){
            for(let j=0;j<this.current.data[0].length;j++){
                if(this.current.data[i][j] != 0){
                    let index = (this.current.origin.x + i) * this.column + j + this.current.origin.y;                      
                    this.gameData[index].state = 1;                
                }
            }
        }
    },
    drop:function(){
        if(this.checkDown()){
            this.clearPre();
            this.$emit('down');
        }else{
            this.setData();
            this.checkFullRow();
            this.$emit('performNext');
        }
    },
    checkFullRow:function(){
        for(let i=0;i<this.row;i++){
            let clear = false;
            for(let j=0;j<this.column;j++){
                let index = i*this.column + j;
                if(this.gameData[index].state!=1){
                    break;
                }
                if(j==this.column-1){
                    this.clearFullRow(i);
                }
            }
        }
    },
    clearFullRow:function(row){
        for(let i=row;i>0;i--){
            for(let j=0;j<this.column;j++){
                let index = i*this.column + j;
                let preIndex = (i-1)*this.column + j;
                this.gameData[index].state = this.gameData[preIndex].state;               
            }
        }

        for(let i=0;i<this.column;i++){
            this.gameData[i].state = 0;
        }
    }
  }
};
</script>
<style lang="less" scoped>
.game {
  position: relative;
  border: 3px solid red;
  background-color: greenyellow;
}
</style>