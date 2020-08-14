<template>
<section class="seal-up-lists">
    <slot name="listWrap" :cls="listWrapCls" :text="listWrapText"></slot>
    <ul>
        <li v-for="(list, index) in listData" :key="index">
            <span class="label">{{list[0]}}</span>
            <span>{{list[1] ? list[1] : '-'}}</span>
        </li>
    </ul>
</section>
</template>

<script>
export default {
  props: {
      listData: {
          type: Array
      },
      listWrapCls: {
          type: Object
      },
      listWrapText: {
          type: Object
      },
  }
};
</script>
<style lang='less' scoped>
.seal-up-lists {
    font-size: 13px;
    padding: 16px;
    // background: #fff;
    position: relative;
    padding-bottom: 0;
    //字体居中
    .font-wh {
        width: 94px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        right: 30px;
        position: absolute;
    }
    .info {
        .font-wh;
        top: 0px;
        background-image: linear-gradient(90deg, #52BAFE 18%, #46CAEB 100%);
        border-radius: 0 0 2px 2px; 
        color: #fff;
    }
    .detail {
        .font-wh;
        bottom: 20px;
        border: 1px solid #309DE5;
        color: #309DE5;
    }
    .del {
        .font-wh;
        bottom: 20px;
        border: 1px solid #C66F6F;
        color: #C66F6F;
    }
    ul {
        margin-top: 10px;
        background: #fff;
        padding: 16px;
        li {
            display: flex;
            color: #333;
            padding: 4px 0;
            span {
                display: inline-block;
                &:first-child {
                    width: 34%;
                    text-align: left;
                    font-size: 14px;
                    color: #666;
                }
                &:last-child {
                    width: 60%;
                    text-align: left;
                    margin-left:20px; flex:1;
                    color: #333;
                }
            }
        }
    }
}

</style>