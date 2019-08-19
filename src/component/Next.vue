<template>
    <div class="next">
        <Item v-for="item in nextDataMain" :key="item.id" :top="item.top" :left="item.left" :width="23" :state="item.state"></Item>
    </div>
</template>
<script>
import Item from './Item.vue'
export default {
    created(){
        this.initNextData();
    },
    props:['next'],
    data(){
        return{
             nextData:[]
        }   
    },
    components:{
        Item
    },
    computed:{
        nextDataMain:function(){
            for(let i=0;i<this.next.data.length;i++){
                for(let j=0;j<this.next.data[0].length;j++){
                    let index = i*4+j;
                    if(this.next.data[i][j] != 0){                       
                        this.nextData[index].state = this.next.data[i][j];
                    }else{
                        this.nextData[index].state = 3;
                    }
                }
            }
            return this.nextData;
        }
    },
    methods:{
        initNextData:function(){
            for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                    let obj = {
                        id:i*4+j,
                        state:0,
                        top:i,
                        left:j
                    };
                    this.nextData.push(obj);
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.next{
    position: relative;
    width: 80px;
    height: 80px;
    margin: 40px;
}
</style>