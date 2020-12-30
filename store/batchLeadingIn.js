import { getBatchLeadingInDetail, loadCart } from '@/api'
import { multicastObservable } from '@/utils'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { baseURL } from '@/api/config'

const state = {
  batchTable: [{
    storeCode: '',
    name: '',
    specification: '',
    unit: '',
    realPrice: 0,
    skuNum: 0,
    skuId: 0,
    // 库存数量
    stock: 0,
    // 失效
    loseEfficacy: false,
    max: 0,
  }],
  multipleSelection: [],
}

const getters = {
  getBatchTable(state) {
    return state.batchTable
  },
  loadCartData(state) {
    console.log('loadCartData', state.multipleSelection);
    const arr = []
    state.multipleSelection.map(ele => {
      arr.push({
        skuId: ele.skuId,
        skuNum: ele.skuNum
      })
    })
    return arr
  },
  totalAmount(state) {
    let amount = 0
    for (let i of state.batchTable) {
      amount += i.realPrice * i.skuNum
    }
    return amount.toFixed(2)
  }
}

const mutations = {
  changeDetail(state, payload) {
    const { index, val, skuId, name, specification, unit, realPrice, loseEfficacy, stock, max, disable } = payload
    for (let ele in state.batchTable[index]) {
      state.batchTable[index][ele] = ''
    }
    console.log('payload', payload)
    state.batchTable[index].storeCode = val
    state.batchTable[index].skuId = skuId
    state.batchTable[index].name = name
    state.batchTable[index].specification = specification
    state.batchTable[index].unit = unit
    state.batchTable[index].realPrice = realPrice ? realPrice : 0
    state.batchTable[index].stock = stock
    state.batchTable[index].skuNum = 0
    state.batchTable[index].max = max
    state.batchTable[index].loseEfficacy = loseEfficacy
    if (loseEfficacy === true) {
      state.batchTable[index].name = '未匹配到商品，请重新确认领健商品编码'
      state.batchTable[index].max = 0
    }
  },
  clearLoseEfficacy(state) {
    state.batchTable = state.batchTable.filter(ele => {
      console.log('ele', ele)
      return ele.loseEfficacy === false
    })
  },
  addRowDatas(state) {
    state.batchTable.push({
      storeCode: '',
      name: '',
      specification: '',
      unit: '',
      realPrice: 0,
      skuNum: 0,
      skuId: 0,
      max: 0
    })
  },
  changeMultipleSelection(state, payload) {
    state.multipleSelection = payload
  },
  changeDeleteRow(state, index) {
    state.batchTable.splice(index, 1)
  },
  changeSkuNum(state, payload) {
    const { index, val} = payload
    state.batchTable[index].skuNum = val
  }
}

const actions = {
  // 获取商品信息
  getDetail({ commit, state }, payload) {
    const { val, index } = payload
    multicastObservable(getBatchLeadingInDetail({
      lcSkuCode: val,
      storeId: 5
    })).subscribe(res => {
      const { data, code } = res
      const { whileStocksLast, stock, purchaseLimit, goodLabel, oversold, onWayNum } = data
      let obj = {
        skuId: data.id,
        name: data.name,
        specification: data.specification,
        unit: data.unit,
        realPrice: data.realPrice,
        stock: data.stock,
        loseEfficacy: false,
        index,
        val
      }
      if (whileStocksLast === 1) {
        if (stock === 0) {
          MessageBox( {
            message: '商品售罄',
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          } )
          obj.max = 0
        } else {
          obj.max = stock
        }
      } else {
        if (goodLabel === 0) {
          if (purchaseLimit !== -1) {
            obj.max = purchaseLimit
          }
        } else {
          if (oversold === 0) {
            obj.max = stock
          } else if (oversold === 2) {
            obj.max = onWayNum ? (onWayNum + stock) : stock
            if (obj.max === 0) {
              MessageBox( {
                message: '商品售罄',
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
              } )
            }
          } 
        }
      }
      commit('changeDetail', obj)
    },
    reject => {
        const obj = {
          loseEfficacy: true, 
          index
        }
        commit('changeDetail', obj)
    })
  },
  // 批量导入购物车
  postUploads({ rootState, state }, file) {
    let data = new FormData();
    data.append('file', file.file);
    data.append('storeId', 5)
    data.append('tenantId', rootState.tenantId);
    data.append('userId', rootState.userId);
    data.append('clientType', 'PC');
    data.append('shoppingGroup', rootState.cart && rootState.cart.shoppingGroup)
    axios.post(`${baseURL}/business/cart/batchAddShoppingIntelligent`, data,
      {
        headers: { "Authorization": rootState.token }
      })
      .then(res => {
        if (res.data.code === 'A0000') {
          this.router.push({
            path: '/cart',
            query: {
              loadCartPurchase: true
            }
          })
        } else {
          MessageBox( {
            message: res.data.msg,
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          } )
        }
      })
  },
  // 录入导入购物车
  loadsCart({ getters, state }) {
    console.log('state.multipleSelection', state.multipleSelection)
    if (state.multipleSelection.length === 0) {
      return 'length'
    }
    for (let i of state.multipleSelection) {
      if (i.skuNum === 0) {
        return 'skuNum'
      }
    }
    multicastObservable(loadCart({ storeId: 5, skuInfo: getters.loadCartData, shoppingType: 0, })).subscribe(
      res => { if (res.code === 'A0000') {
        this.router.push({
          path: '/cart',
          query: {
            loadCartPurchase: true
          }
        })
      } }
    )
  },
  deleteRow({ commit }, index) {
    commit('changeDeleteRow', index)
  },
  // 批量删除
  async handDelte({ state }) {
    state.multipleSelection.forEach((item) => {
      state.batchTable.forEach((itemTable, indexTable) => {
        if (item === itemTable) {
          state.batchTable.splice(indexTable, 1);
        }
      });
      return true
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
