/*
 * @Description: listCard组件的mixin。
 * @Autor: jixuelian
 * @Date: 2019-06-18 10:20:36
 */
const listCard = {
  data() {
    return {
      list: [],
      finished: false,
      pageLoading: true,
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    init() {
      this.getData();
    },
    handleInitRes(res) {
      this.pageLoading = false;
      if (res.success) {
        this.list = [...this.list, ...res.data.list];
        if (res.data.total <= this.pageData.pageNo * this.pageData.pageSize) {
          this.finished = true;
        }
        this.pageData.pageNo++;
      }
    },
    onLoad() {
      this.pageLoading = true;
      this.getData();
    }
  },
  mounted() {
    this.init();
  }

};

export default listCard;