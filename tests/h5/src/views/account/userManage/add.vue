<template>
  <div class="user-add">
    <NavBar navTitle="新增机构用户" />
    <AutoForm v-model="formData" :data="data" @save="add">
      <div slot="mobile" class="get-code" @click="getRegisterCode">获取验证码</div>
    </AutoForm>
   </div> 
</template>
<script>
  import AutoForm from "@/common/AutoForm/components/AutoForm";
  import { addUsers, registerUsers, codeLogin, codeVerify, getUserPwd } from "@/service/userManage";
  import { Toast, Dialog } from 'vant';
  export default {
    data() {
      return {
        formData: {},
        data: [
          {
            type: 1, //输入框 , 必填
            key: 'name', //key, 必填
            inputType: 'text', //输入框类型, 可选
            label: '姓名', //label, 可选
            value: '', //初始值, 可选
            // value: '梁秀贵', //初始值, 可选
            required: true //是否必填, 可选
          },
          {
            type: 3, //输入框 , 必填
            key: 'type', //key, 必填
            label: '证件类型', //描述
            value: 0, //命中值
            show: false, //设为true可以让初始化时就显示
            data: [
              '身份证'
            ],
            callback: (value, index, item) => {
              console.log(`选中项=${value},索引${index}`, item)
              // item.value = index + 1
            }
          },
          {
            type: 1, //输入框 , 必填
            key: 'identity', //key, 必填
            inputType: 'text', //输入框类型, 可选
            label: '身份证号', //label, 可选
            value: '', //初始值, 可选
            // value: '612422198602113216', //初始值, 可选
            required: true //是否必填, 可选
          },
          {
            type: 1, //输入框 , 必填
            key: 'mobile', //key, 必填
            class: 'mobile',
            inputType: 'text', //输入框类型, 可选
            label: '手机号码', //label, 可选
            value: '', //初始值, 可选
            // value: '19921609171', //初始值, 可选
            required: true //是否必填, 可选
          },
          {
            type: 1, //输入框 , 必填
            key: 'msgAuthCode', //key, 必填
            inputType: 'text', //输入框类型, 可选
            label: '验证码', //label, 可选
            value: '', //初始值, 可选
            required: true //是否必填, 可选
          },
          {
            type: 7, //一个按钮
            label: '确定',
            readonly: false,
            class: 'search_btn', //自定义样式,类
            hidden: false, //隐藏字段
            bgcolor: '#309de5',
            color: '#fff',
            callback: form => form
          }
        ]
      };
    },
    created() {
    },
    methods: {
      add(data) {
        data.type = 1;
        const params = {
          ...data,
          sourceType: 0
        }
        this.getCodeVerify(params);
      },
      // 填写短信时的验证码
      getRegisterCode() {
        const {mobile} = this.formData;
        if(!(/^1[3456789]\d{9}$/.test(mobile))){ 
          Toast("手机号码有误，请重填");  
          return false; 
        }
        console.log('获取验证码', mobile);
        const params = {
          type: 1, // 1-注册
          mobile
        };
        codeLogin(params).then(res => {
          const {success, msg} = res;
          if (success) {
            Toast('短信发送成功');
          }else {
            Toast(msg);
          }
        })
      },
      // 验证短信
      getCodeVerify(params) {
        codeVerify(params).then(res => {
          const { success, msg } = res;
          if(success){
            this.getUserPassword()
          }else{
            Toast(msg);
          }
        });
      },
      // 获取密码
      getUserPassword() {
        getUserPwd().then(res => {
          const { success, msg, data } = res;
          if(success){
            this.password = data;
            this.isManagerCreateUser = 1;
            this.setUser();
          }else{
            Toast(msg);
          }
        })
      },
      // 注册用户
      setUser() {
        const {password, isManagerCreateUser} = this; 
        const {identity, mobile, name} = this.formData;
        const params = {
          password,
          isManagerCreateUser,
          identity,
          name,
          mobile,
          sourceType: 0
        }
        registerUsers(params).then(res => {
          const { success, msg, data } = res;
          if(success){
            this.addUser();
          }else{
            Toast(msg);
          } 
        })
      },
      // 添加机构用户
      addUser() {
        const params = {
          ...this.formData,
          cardNo: this.formData.identity,
          password: this.password,
          status: 1
        }
        addUsers(params).then(res => {
          const { success, msg, data } = res;
          if(success){
            Toast('添加成功');
            this.$router.push('list');
          }else{
            Toast(msg);
          } 
        })
      }
    },
    components: { AutoForm }
  }
</script>
<style lang="less" scoped>
  .user-add {
    padding: 16px;
    padding-bottom: 100px;

    /deep/.get-code {
      height: 0;
      color: #309DE5;
      font-size: 14px;
      position: relative;
      top: -40px;
      left: 270px;
    }

    .btn-wrap {
      position: fixed;
      padding-bottom: 16px;
      padding-top: 16px;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #f5f5f5;
      text-align: center;

      .add-btn {
        width: 343px;
        background-color: #309de5;
        border-radius: 4px;
        font-size: 18px;
        color: #fff; 
        line-height: 48px;
      }
    }

  }
</style>
