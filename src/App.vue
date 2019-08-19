<template>
    <div class="app">
        <Game :current="current" @down="down" @left='left' @right='right' @rotate='rotate' @performNext="perform"></Game>
        <Next :next="next"></Next>
    </div>
</template>
<script>
import Game from "./component/Game.vue";
import Next from "./component/Next.vue";
const squareFactory = require("./js/squareFactory");
export default {
    created(){
        this.current = squareFactory.prototype.make(this.generateType());
        this.next = squareFactory.prototype.make(this.generateType());
    },
    data(){
        return{
            current:null,
            next:null
        }
    },
    computed:{
    },
    methods:{
        down:function(){
            this.current.origin.x = this.current.origin.x + 1;
        },
        left:function(){
            this.current.origin.y = this.current.origin.y - 1;
        },
        right:function(){
            this.current.origin.y = this.current.origin.y + 1;
        },
        rotate:function(){
            this.current.dir = (this.current.dir + 1)%4;
            var data = [];
            var temp;
            for(let i = 0;i<this.current.data.length;i++){
                temp = [];
                for(let j= 0;j< this.current.data[0].length;j++){
                    temp.push(this.current.rotates[this.current.dir][i][j]);
                }
                data.push(temp);
            }
            this.current.data = data;
        },
        perform:function(){
            this.current = this.next;
            this.next = squareFactory.prototype.make(this.generateType());
        },
        generateType:function(){
            return Math.ceil(Math.random()*7)-1;
        }
    },
    components: {
        Game,
        Next
    }
}
</script>
<style lang="less" scoped>
.app{
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
}
</style>