
import { checkCertificateAuthCode } from "@/service/eCertificate";
const certificateMix = {
  data() {
    return {
      authCode: ''
    }
  },
  computed: {},
  methods: {

  },
  watch: {
    authCode() {
      this.init()
    }
  },
  created() {
    // 检查code是否存在
    checkCertificateAuthCode().then(({ success, data, errorCode }) => {
      if (success) {
        this.authCode = data.authCode;
      } else if (errorCode == 401) {
        this.$router.push({ name: 'login' })
      } else {
        this.$router.push({ name: 'certificateCertification', query: { ...this.$route.query, 'returnUrl': this.$route.fullPath, 'from': 'h5' } })
      }
    })
  }
}
export default certificateMix;