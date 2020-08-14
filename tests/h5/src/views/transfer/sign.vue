<template>
  <div>
    <NavBar :navTitle="title"/>
    <div style="width: 100%; height: 50px;"></div>
    <div v-show="canvasContainer" id="canvas-container">请将手机横屏再签</div>
    <center style="width: 100%;">
      <div id="dialog" class="hdialog">
        <!-- 显示签名区域-->
        <div id="anysign_title" style="display:none;" width="100%">
          请投保人
          <span style="font-size:20pt;">李 元</span>签名
        </div>
        <div id="container" onmousedown="return false;" style="margin-top: 30px;">
          <canvas id="anysignCanvas" width="2"></canvas>
        </div>

        <div id="single_scrollbar"></div>

        <div id="btnContainerOuter" width="100%">
          <div id="btnContainerInner" style="text-align: center;   font-size:5pt;" width="100%">
            <input
              id="btnOK"
              type="button"
              class="button orange"
              value="确 定"
              @click="signs"
            />
            <input
              id="btnClear"
              type="button"
              class="button orange"
              value="清 屏"
              @click="clear"
            />
            <input
              id="btnCancel"
              type="button"
              class="button orange"
              value="取 消"
              @click="cancel"
            />
          </div>
        </div>
      </div>

      <div class="signParameter" style="display: none;">
        <input id="businessSource" />
        <input id="signKey" readonly />
        <input id="userName" />
        <input id="idNumber" />
        <input id="pdfKey" />
        <input id="keyWordSerialNums" />
        <input id="signCount" />
        <select id="sameTrajectory">
          <option selected value="true">使用相同轨迹签名</option>
          <option value="false">使用不同轨迹签名</option>
        </select>
        <select id="isGetSignData">
          <option selected value="true">SIGN_DATA</option>
          <option value="false">加密JSON</option>
        </select>
      </div>
      <div id="popupDialog" style="display: none;"></div>
      <div style="width: 100%;">
        <img id="imgs" src="" style="width: 20%;"/>
      </div>
      <textarea id="result" rows="10" style="display: none;"></textarea>
    </center>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  data() {
    return {
      title: "转移登记",
      canvasContainer: true
    }
  },
  mounted() {
      this.$forceUpdate()
      this.adjustScreen()
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.adjustScreen, false);
      const signMap = new Map([['1', '义'], ['11', '义共'], ['2', '权'], ['12', '权共']])
      let signText = {}
      if (this.$route.params.names == '1') {
        signText = this.$store.state.applyinfo.adjustSign
      } else {
        signText = this.$store.state.applyinfo.adjustSigns
      }
			if (Object.keys(signText).length > 0) {
				for (let i in signText) {
					if (i == this.$store.state.transfer.signType) {
						document.getElementById('pdfKey').value = signMap.get(i) + (signText[i] + 1)	
					}
				}
			} else {
        document.getElementById('pdfKey').value = signMap.get(String(this.$store.state.transfer.signType)) + 1
			}
      let pdfKeyValue = document.getElementById('pdfKey').value
			let pdfKeyValueArr = pdfKeyValue.split('')
			pdfKeyValueArr.map((ele, index, pdfKeyValue) => {
				if (ele === '1') {
					pdfKeyValue[index] = '一'
				} else if (ele === '2') {
					pdfKeyValue[index] = '二'
				} else if (ele === '3') {
					pdfKeyValue[index] = '三'
				}
			})
      let pdfValStr = pdfKeyValueArr.join('')
      //document.getElementById('pdfKey').value = pdfValStr
      signParameter(1, pdfValStr);
      anySign();
      popupDialog(200);
  },
  methods: {
    signs() {
      sign_confirm() 
      this.imgSrc = document.getElementById('200')
      document.getElementById('imgs').src = this.imgSrc.src
      getSignData();
      const result = this.dataURLtoFile(document.getElementById('imgs').src, 'jpg')
      const form = new FormData()
      form.append('file', result)
      this.$store.dispatch('transfer/uploads', form)
    },
    cancel() {
      cancelSign()
      if (this.$route.params.names === 1) {
        this.$router.push('/transfer/apply')
      } else {
        this.$router.push('/transfer/contract')
      }
    },
    clear() {
      clear_canvas()
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      const arr = dataurl.split(','); 
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    },
    adjustScreen() {
      // let cw = document.body.clientWidth
      // let ch = document.body.clientHeight

      // window.addEventListener('deviceorientation', function(e){
      //   console.log('e', e)
      // });

      if (window.orientation == 180 || window.orientation == 0) {
        console.log('竖屏')
        this.canvasContainer = true
      }
      if (window.orientation == 90 || window.orientation == -90) {
        console.log('横屏')
        this.canvasContainer = false
      }
     
    }
  }
};
</script>

<style lang="less">
#canvas-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1999;
  text-align: center;
  line-height: 100vh;
  color: #da7c0c;
  font-size: 30px;
  background: rgba(0, 0, 0, .3);
}
.hdialog {
  overflow-y: auto;
  #container {
    overflow: hidden;
  }
}
// .hdialog {
//     #container {
//         position: absolute;
//         width: 80%;
//         right: 10px;
//         height: 100%;
//         top: 54%;
//         transform: translateY(-50%);
//     }
//     #btnContainerOuter {
//         position: absolute;
//         left: -32%;
//         top: 50%;
//         transform: translateY(-50%);
//         transform: rotate(90deg);
//     }
// }
</style>