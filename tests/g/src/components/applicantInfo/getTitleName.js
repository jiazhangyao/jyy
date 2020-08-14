//获取每一级标题
//二手房买卖登记 1
//抵押权设立登记 2
//商品房转移登记 3
//抵押权注销登记 4
//商品房预告登记 5
//商品房预抵押登记 6
//商品房首次登记 10
//房产注销登记 11
//商品房预告登记+商品房预抵押登记 7
//商品房转移登记+抵押权设立登记 8
//二手房买卖登记+抵押权设立登记 9
//商品房预告登记转商品房预抵押登记 12
//商品房预抵押登记转抵押权设立登记 13
//抵押权设立登记转抵押权注销登记 14
//商品房预告登记+商品房预抵押登记转商品房转移登记+抵押权设立登记 15
export function getTitleName() {
  return [{
    id: "baxx",
    title: "备案信息"
  },
    {
      id: "ywr",
      title: "义务人"
    },
    {
      id: "qlr",
      title: "权利人",
    },
    {
      id: "dyr",
      title: "抵押人",
    },
    {
      id: "dyqr",
      title: "抵押权人",
    },
    {
      id: "fcxx",
      title: "产权信息",
    },
    {
      id: "dyxx",
      title: "抵押信息",
    },
    {
      id: "clsc",
      title: "材料上传",
    },
    {
      id: "yjfw",
      title: "邮寄服务"
    }
  ];
}

// 当前展示哪几种类型
export function getTitleType(registerType) {
  let hasownedWay = false//共有方式
  let hasObligorFamily = false //是否有义务人家庭信息
  let hasObligeeFamily = false //是否有权利人家庭信息
  let showmoreHouseInfo = false// 哪些有多房产 //y
  switch (registerType) {
    case 6:
    case 2:
    case 4:
    case 11:
      showmoreHouseInfo = true;
      break;
    case 1:
    case 8:
    case 9:
      hasObligorFamily = true;
      hasObligeeFamily = true;
      hasownedWay = true;
      break;
    case 3:
      hasObligeeFamily = true;
      hasownedWay = true;
      break;
    case 10:
    case 15:
      hasownedWay = true;
      break;
    default:
      break;
  }
  return {
    showmoreHouseInfo,
    hasownedWay,
    hasObligeeFamily,
    hasObligorFamily
  }
}

// 获取横向的tabs
export function getTitleTabs(registerType) {
  let tabItems = [];
  //没有抵押人抵押权人
  switch (+registerType) {
    case 1:
    case 3:
      tabItems = // 无家庭 无共有
        [
          {
            id: "baxx",
            title: "交易备案信息"
          },
          {
            id: "ywr",
            title: "义务人"
          },
          {
            id: "qlr",
            title: "权利人",
          },
          // {
          //   id: "dyr",
          //   title: "抵押人",
          // },
          // {
          //   id: "dyqr",
          //   title: "抵押权人",
          // },
          {
            id: "fcxx",
            title: "产权信息",
          },
          // {
          //   id: "dyxx",
          //   title: "抵押信息",
          // },
          {
            id: "clsc",
            title: "材料上传",
          },
          {
            id: "yjfw",
            title: "邮寄服务"
          }
        ]
      break;
    case 2:
      tabItems = // 无家庭 无共有
        [
          //   {
          //   id: "baxx",
          //   title: "备案信息"
          // },
          // {
          //   id: "ywr",
          //   title: "义务人"
          // },
          // {
          //   id: "qlr",
          //   title: "权利人",
          // },
          {
            id: "dyr",
            title: "抵押人",
          },
          {
            id: "dyqr",
            title: "抵押权人",
          },
          {
            id: "fcxx",
            title: "产权信息",
          },
          {
            id: "dyxx",
            title: "抵押信息",
          },
          {
            id: "clsc",
            title: "材料上传",
          },
          {
            id: "yjfw",
            title: "邮寄服务"
          }
        ]
      break;
    case 4:
      tabItems = [
        //   {
        //   id: "baxx",
        //   title: "备案信息"
        // },
        // {
        //   id: "ywr",
        //   title: "义务人"
        // },
        // {
        //   id: "qlr",
        //   title: "权利人",
        // },
        {
          id: "dyr",
          title: "抵押人",
        },
        {
          id: "dyqr",
          title: "抵押权人",
        },
        {
          id: "fcxx",
          title: "产权信息",
        },
        {
          id: "dyxx",
          title: "抵押信息",
        },
        {
          id: "clsc",
          title: "材料上传",
        },
        // {
        //   id: "yjfw",
        //   title: "邮寄服务"
        // }
      ];
      break;
    case 5:
      tabItems = [
        //   {
        //   id: "baxx",
        //   title: "备案信息"
        // },
        {
          id: "ywr",
          title: "义务人"
        },
        {
          id: "qlr",
          title: "权利人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        // {
        //   id: "dyqr",
        //   title: "抵押权人",
        // },
        {
          id: "fcxx",
          title: "产权信息",
        },
        // {
        //   id: "dyxx",
        //   title: "抵押信息",
        // },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ]
      break;
    case 6:
    case 13:
      tabItems = [
        //   {
        //   id: "baxx",
        //   title: "备案信息"
        // },
        // {
        //   id: "ywr",
        //   title: "义务人"
        // },
        // {
        //   id: "qlr",
        //   title: "权利人",
        // },
        {
          id: "dyr",
          title: "抵押人",
        },
        {
          id: "dyqr",
          title: "抵押权人",
        },
        {
          id: "fcxx",
          title: "产权信息",
        },
        {
          id: "dyxx",
          title: "抵押信息",
        },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ]
      break;
    case 10:
      tabItems = [
        //   {
        //   id: "baxx",
        //   title: "备案信息"
        // },
        // {
        //   id: "ywr",
        //   title: "义务人"
        // },
        {
          id: "qlr",
          title: "权利人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        // {
        //   id: "dyqr",
        //   title: "抵押权人",
        // },
        {
          id: "fcxx",
          title: "土地信息",
        },
        // {
        //   id: "dyxx",
        //   title: "抵押信息",
        // },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ]
      break;
    case 11:
      tabItems = [
        //   {
        //   id: "baxx",
        //   title: "备案信息"
        // },
        // {
        //   id: "ywr",
        //   title: "义务人"
        // },
        {
          id: "qlr",
          title: "权利人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        // {
        //   id: "dyqr",
        //   title: "抵押权人",
        // },
        {
          id: "fcxx",
          title: "产权信息",
        },
        // {
        //   id: "dyxx",
        //   title: "抵押信息",
        // },
        {
          id: "clsc",
          title: "材料上传",
        },
        // {
        //   id: "yjfw",
        //   title: "邮寄服务"
        // }
      ]
      break;
    case 7:
      tabItems = [
        // {
        //   id: "baxx",
        //   title: "交易备案信息"
        // },
        {
          id: "ywr",
          title: "预告义务人"
        },
        {
          id: "qlr",
          title: "预告权利人/抵押人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        {
          id: "dyqr",
          title: "预告抵押权人",
        },
        {
          id: "fcxx",
          title: "产权信息",
        },
        {
          id: "dyxx",
          title: "抵押信息",
        },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ];
      break;
    case 8:
      tabItems = [
        {
          id: "baxx",
          title: "交易备案信息"
        },
        {
          id: "ywr",
          title: "义务人"
        },
        {
          id: "qlr",
          title: "权利人/抵押人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        {
          id: "dyqr",
          title: "抵押权人",
        },
        {
          id: "fcxx",
          title: "产权信息",
        },
        {
          id: "dyxx",
          title: "抵押信息",
        },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ];
      break;
    case 9:
      tabItems = [
        {
          id: "baxx",
          title: "交易备案信息"
        },
        {
          id: "ywr",
          title: "义务人"
        },
        {
          id: "qlr",
          title: "权利人/抵押人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        {
          id: "dyqr",
          title: "抵押权人",
        },
        {
          id: "fcxx",
          title: "产权信息",
        },
        {
          id: "dyxx",
          title: "抵押信息",
        },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ];
      break;
    case 12:
      tabItems = [
        //   {
        //   id: "baxx",
        //   title: "备案信息"
        // },
        {
          id: "ywr",
          title: "义务人"
        },
        // {
        //   id: "qlr",
        //   title: "权利人",
        // },
        {
          id: "dyr",
          title: "抵押人",
        },
        // {
        //   id: "dyqr",
        //   title: "抵押权人",
        // },
        {
          id: "fcxx",
          title: "产权信息",
        },
        // {
        //   id: "dyxx",
        //   title: "抵押信息",
        // },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ]
      break;
    case 14:
      tabItems = // 无家庭 无共有
        [
          //   {
          //   id: "baxx",
          //   title: "备案信息"
          // },
          // {
          //   id: "ywr",
          //   title: "义务人"
          // },
          // {
          //   id: "qlr",
          //   title: "权利人",
          // },
          {
            id: "dyr",
            title: "抵押人",
          },
          {
            id: "dyqr",
            title: "抵押权人",
          },
          {
            id: "fcxx",
            title: "产权信息",
          },
          {
            id: "dyxx",
            title: "抵押信息",
          },
          {
            id: "clsc",
            title: "材料上传",
          },
          // {
          //   id: "yjfw",
          //   title: "邮寄服务"
          // }
        ]
      break;
    case 15:
      tabItems = [
        {
          id: "baxx",
          title: "交易备案信息"
        },
        {
          id: "ywr",
          title: "义务人"
        },
        {
          id: "qlr",
          title: "权利人/抵押人",
        },
        // {
        //   id: "dyr",
        //   title: "抵押人",
        // },
        {
          id: "dyqr",
          title: "抵押权人",
        },
        {
          id: "fcxx",
          title: "产权信息",
        },
        {
          id: "dyxx",
          title: "抵押信息",
        },
        {
          id: "clsc",
          title: "材料上传",
        },
        {
          id: "yjfw",
          title: "邮寄服务"
        }
      ];
      break;
    default:
      tabItems = getTitleName()
      break;
  }
  return tabItems;
}