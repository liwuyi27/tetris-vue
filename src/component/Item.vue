<template>
    <div :style="styleObject" :class="classObject"></div>
</template>
<script>
export default {
    props:['left','top','width','state'],
    computed:{
        styleObject:function(){
            return {
                position: 'absolute',
                top: this.top * this.width + 'px',
                left: this.left * this.width + 'px',
                width:this.width-1 + 'px',
                height: this.width-1 + 'px',
                boxSizing: 'border-box',
            }
        },
        classObject:function(){
            return {
                none:this.state == 0,
                done:this.state == 1,
                current:this.state == 2,
                nextnone:this.state == 3
            }
        }
    }
}
</script>
<style lang="less" scoped>
.none{
    background-color: greenyellow;
}

.nextnone{
    background-color: white;
}

.done{
    background-color: orangered;
    border: 1px solid black;
}

.current{
    background-color: orange;
    border: 1px solid black;
}
</style>