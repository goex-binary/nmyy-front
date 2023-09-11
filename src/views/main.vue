<template>
    <div class="main-con-box">
        <part1 />
        <part2 />
        <part3 />
    </div>
</template>

<script>
import part1 from '@/views/art-college/overview/part1/index'
import part2 from '@/views/art-college/overview/part2/index'
import part3 from '@/views/art-college/overview/part3/index'


export default {
    components: {
        part1,
        part2,
        part3
    },
    data () {
        return {

        }
    },
    methods: {

    },
    mounted () {

    },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.main-con-box {
    height: 1080px;
    width: 5760px;

    @include flex();
}
</style>

