var apiInstance;
var ocrCapture;
var DATA_CANNOT_PARSED = "10003"; //输入数据项无法解析
var SERVICE_SYSTEM_EXCEPTION = "10011"; //服务系统异常错误
var RECOGNITION_RESULT_EMPTY = "10100"; //识别结果为空
var CONNECTION_SERVICE_TIMEOUT = "10101"; //连接识别服务超时
var CONNECTION_RECOGNITION_EXCEPTION = "10102"; //连接识别服务异常
var SUCCESS = "0"; //识别成功
var RECOGNITION_FALSE = "-1";//识别错误

var sysTime = new Date().getTime();
var signKey = null;
var businessSource = null;
var userName = null;
var idNumber = null;
var isGetSignData = null;

var pdfKey = null;
var signCounts = null;
var keyWordSerialNums = null;
var sameTrajectory = null;
function ocrChange() {
    if($("#ocr").val() == "true") {
        $("#ocrUrl").show();
        $("#ocrUrlLable").show();
    } else {
        $("#ocrUrl").hide();
        $("#ocrUrlLable").hide();
    }
}

function signParameter(type, val) {
    document.getElementById("businessSource").value = "1111111111111";//和易签约定的渠道号
    document.getElementById("userName").value = "张山";
    document.getElementById("idNumber").value = "440901197502108337";
    document.getElementById("isGetSignData").value = "true";
    if (type == 1) {//单签名
        document.getElementById("pdfKey").value = val;
        document.getElementById("signCount").value = "1";
        document.getElementById("keyWordSerialNums").value = "1";
        document.getElementById("sameTrajectory").value = "true";
    } 
}

function initData() {
    var signCount = document.getElementById("signCount").value;
    if (signCount != null) {
        signCount = Number(signCount);
    }
    //设置业务流水号
    businessSource = document.getElementById("businessSource").value;
    signKey = businessSource + "_" + sysTime;//唯一的业务流水号 每次请求都需要随机生成 建议加上渠道号 方便定位问题
    document.getElementById("signKey").value = signKey;
    userName = document.getElementById("userName").value;
    idNumber = document.getElementById("idNumber").value;

    signCounts = initSignCounts(signCount);

    isGetSignData = document.getElementById("isGetSignData").value;
    isGetSignData = isGetSignData == "true" ? true : false;

    sameTrajectory = document.getElementById("sameTrajectory").value;
    sameTrajectory = sameTrajectory == "true" ? true : false;

    pdfKey = document.getElementById("pdfKey").value;

    pdfKey = pdfKey.split(",");

    keyWordSerialNums = document.getElementById("keyWordSerialNums").value;
    keyWordSerialNums = keyWordSerialNums.split(",");
    for (var i in keyWordSerialNums) {
        keyWordSerialNums[i] = Number(keyWordSerialNums[i]);
    }
}
function anySign() {
    if (document.getElementById("businessSource").value == "" ||
        document.getElementById("userName").value == "" ||
        document.getElementById("idNumber").value == "" ||
        document.getElementById("isGetSignData").value == "" ||
        document.getElementById("pdfKey").value == "" ||
        document.getElementById("signCount").value == "" ||
        document.getElementById("keyWordSerialNums").value == "" ||
        document.getElementById("sameTrajectory").value == "") {
        alert("未选择签名方案");
        return;
    }
    initData();
    var res;
    //识别回调接口
    var identify_callback = function (errCode) {
        if (errCode == SUCCESS) {
            return;
        }
        if (errCode == DATA_CANNOT_PARSED) {
            console.log("输入数据项无法解析！");
        } else if (errCode == SERVICE_SYSTEM_EXCEPTION) {
            console.log("服务系统异常错误！");
        } else if (errCode == RECOGNITION_RESULT_EMPTY) {
            console.log("识别结果为空！");
        } else if (errCode == CONNECTION_SERVICE_TIMEOUT) {
            console.log("连接识别服务超时！");
        } else if (errCode == CONNECTION_RECOGNITION_EXCEPTION) {
            console.log("连接识别服务异常！");
        } else if (errCode == RECOGNITION_FALSE) {
            console.log("书写错误！");
        } else {
            console.log(errCode);
        }
    }
    var callback = function (context_id, context_type, val) {
        if (context_type == CALLBACK_TYPE_START_RECORDING || context_type == CALLBACK_TYPE_STOP_RECORDING) {
            return;
        }
        if (context_type == CALLBACK_TYPE_SIGNATURE) {
            //签名回显
            for (var i = 0; i < signCounts.length; i++) {
                var aImg = document.getElementById(signCounts[i]);
                if (aImg && context_id == signCounts[i]) {
                    aImg.src = "data:image/png;base64," + val;
                }
            }
        }
        else if (context_type == CALLBACK_TYPE_COMMENTSIGN) {
            console.log(CALLBACK_TYPE_COMMENTSIGN, val);
        }
        else if (context_type == CALLBACK_TYPE_ON_PICTURE_TAKEN) {//拍照 占未实现
            console.log(CALLBACK_TYPE_ON_PICTURE_TAKEN, val);
        } else if (context_type == CALLBACK_TYPE_ON_MEDIA_DATA) {//录音 占未实现
            console.log(CALLBACK_TYPE_ON_MEDIA_DATA, val);
            /*var audio = document.createElement("audio");
             if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")) {
             audio.src = "data:image/gif;base64," + val;
             audio.play();
             }*/
        }
    };//测试回调，将回调数据显示
    ////////////////////////////////////////////////
    EncAlgType.EncAlg = "SM2";//设置签名算法，默认为RSA(RSA存在漏洞,RSA即将下线请使用SM2)，可以设置成SM2
    apiInstance = new AnySignApi();
    //初始化签名接口
    res = apiInstance.initAnySignApi(callback, businessSource);
    if (!res) {
        console.log("init error");
    } else {
    }
    ////////////////////////////////////////////////
    //开启识别
    window.ocrTimeOut = 5000;//OCR识别超时时间
    ocrCapture = new OCRCapture();
    ocrCapture.text = "a";
    //ocrCapture.IPAdress = "http://60.247.77.116:11203/HWR/RecvServlet";
    ocrCapture.IPAdress = $("#ocrUrl").val();
    ocrCapture.appID = "123";
    ocrCapture.count = 5;
    ocrCapture.language = Language.CHS;
    ocrCapture.resolution = 80;
    ocrCapture.serviceID = "999999";
    //apiInstance.startOCR(ocrCapture);
    setIdentifyCallBack(identify_callback);
    ///////////////////////////////////////////////
    var testPopupDialogHtml = new Array();
    //注册签字对象
    for (var i = 0; i < signCounts.length; i++) {
        testPopupDialogHtml.push('<input type="button" name="签署签名对象' + signCounts[i] + '" value="签署签名对象' + signCounts[i] + '" style="width: 180px" onclick="javascript:popupDialog(' + signCounts[i] + ');">');
        testPopupDialogHtml.push("<br />");
        testPopupDialogHtml.push("<br />");
        testPopupDialogHtml.push('<img id="' + signCounts[i] + '"/>');
        testPopupDialogHtml.push("<br />");
        testPopupDialogHtml.push("<br />");
        res = addSignatureObj(signCounts[i], i);
        if (!res) {
            console.log("testAddSignatureObj error");
        } else {
        }
    }
    if (sameTrajectory) {
        testPopupDialogHtml = new Array();
        testPopupDialogHtml.push('<input type="button" name="签署签名对象' + signCounts.join(",") + '" value="签署签名对象' + signCounts.join(",") + '" style="width: 180px" onclick="javascript:popupDialog(' + signCounts[0] + ');">');
        testPopupDialogHtml.push("<br />");
        testPopupDialogHtml.push("<br />");
        testPopupDialogHtml.push('<img id="' + signCounts[0] + '"/>');
        testPopupDialogHtml.push("<br />");
        testPopupDialogHtml.push("<br />");
    }
    document.getElementById("popupDialog").innerHTML = testPopupDialogHtml.join("");
    if (Array.isArray(pdfKey)) {
        pdfKey = pdfKey.join("|");
    }
    res = addCommentObj(30);
    if (!res) {
        console.log("testAddCommentObj error");
    } else {

    }
    ////////////////////////////////////////////////
    //注册一个单位签章
    /*var signer = new Signer(userName, idNumber);
     /!**
     * 使用服务器规则配置签名
     * @param tid 服务器端生成的配置规则
     * @constructor
     *!/
     var signerRule = new SignRule_Tid("888888");
     var cachet_config = new CachetConfig(signer, signerRule, false);
     res = apiInstance.addCachetObj(cachet_config);
     if (!res) {
     console.log("addCachetObj error");
     } else {

     }*/
    ////////////////////////////////////////////////

    //将配置提交
    res = apiInstance.commitConfig();
    if (res) {
        console.log("Init ALL 初始化成功");
    } else {
        console.log("Init ALL 初始化失败");
    }

    res = apiInstance.setTemplate(TemplateType.PDF, "<html />", signKey, 4000);
    if (res) {
        console.log("setTemplateData signKey success signKey is ", signKey);
        return res;
    }
    else {
        console.log("setTemplateData signKey error");
        return res;
    }
    ////////////////////////////////////////////////
}
//初始化签名对象 200-299
function initSignCounts(count) {
    if (count > 100) {
        console.log("只支持 100个签名");
        return;
    }
    var signCountsArray = new Array();
    for (var i = 200; i < 200 + count; i++) {
        signCountsArray.push(i);
    }
    return signCountsArray;
}
//添加单签签名框
function addSignatureObj(objId, index) {
    keyWordSerialNums = keyWordSerialNums || [1];
    var keyWordSerialNum = keyWordSerialNums[index] || 1;//关键字序号(第几次出现)，从1开始
    var context_id = objId;
    var signer = new Signer(userName, idNumber);

    /*选择一种签名方式（默认关键字签名） 坐标定位或者关键字定位*/
    var signerRule;
    if (Array.isArray(pdfKey) && pdfKey.length == 1) {
        signerRule = new SignRule_KeyWordV2(pdfKey[0], "0", 10, keyWordSerialNum, 1);
    } else if (Array.isArray(pdfKey) && pdfKey.length > 1) {
        signerRule = new SignRule_KeyWordV2(pdfKey[index], "0", 10, keyWordSerialNum, 1);
    } else {
        signerRule = new SignRule_KeyWordV2(pdfKey, "0", 10, keyWordSerialNum, 1);
    }

    /**
     * 根据坐标定位签名方式
     * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param keyWordSerialNum 关键字序号，从1开始
     * @param unit 坐标系单位，目前支持"dp"和"pt"
     * @constructor
     */
    //var signerRule = new SignRule_XYZ(100.0, 150.1, 180.2, 50.3, 2, "pt");

    /**
     * 关键字定位方式，寻找PDF中的关键字，根据关键字位置放置签名图片
     * @param keyword 关键字
     * @param xOffset x轴偏移量，单位pt
     * @param yOffset y轴偏移量，单位pt
     * @param keyWordSerialNum 关键字序号，eg:2（关键字第2次出现的位置）
     * @param KWIndex KWIndex 写死 1
     * @constructor
     */
    //var signerRule = new SignRule_KeyWordV2("关键字", "0", 10, 1,1);
    var titleLeft = "请投保人";
    var titleRight = '签字';
    var title = titleLeft + userName + titleRight;
    var signatureConfig = new SignatureConfig(signer, signerRule);
    //1:时间在上、2：时间在下、3：时间在右
    //signatureConfig.timeTag = new TimeTag(1, "yyMMdd hh:mm;ss");
    signatureConfig.singleWidth = 200;
    signatureConfig.singleHeight = 200;
    signatureConfig.title = title;
    signatureConfig.titleSpanFromOffset = titleLeft.length;
    signatureConfig.titleSpanToOffset = titleLeft.length + userName.length - 1;
    signatureConfig.penColor = "#000";//签名字体颜色
    signatureConfig.isTSS = false;//是否开始时间戳服务
    signatureConfig.signatureImgRatio = 3.0;//签名清晰度
    signatureConfig.nessesary = true;//是否为必签项,设置为true时必须进行签名
    if($("#ocr").val()=="true"){
    	signatureConfig.isdistinguish = true;//
    }else{
    	signatureConfig.isdistinguish = false;//
    }
    //signatureConfig.isdistinguish = $("#ocr").val();//是否开启识别 
    signatureConfig.ocrCapture = ocrCapture;//识别参数
    var res = apiInstance.addSignatureObj(context_id, signatureConfig);
    if (res) {
        console.log("addSignatureObj " + context_id + " success");
        return res;
    }
    else {
        console.log("addSignatureObj " + context_id + " error");
        return res;
    }
}

var signCountsCursor = 0;
//弹出签名框签名
function popupDialog(context_id) {
    if (!apiInstance) {
        console.log("信手书接口没有初始化");
        return;
    }
    var msg;
    if (sameTrajectory) {
        msg = '开始签署-->签名对象' + signCounts.join(",");
    } else {
        msg = '开始签署-->签名对象' + context_id;
    }

    // if (window.confirm(msg)) {
    //     if (signCountsCursor > 0) {
    //         signCountsCursor = 0;
    //     } else {
    //         signCountsCursor--;
    //     }
    // } else {
    //     return;
    // }
    switch (apiInstance.showSignatureDialog(context_id)) {
        case RESULT_OK:
            console.log(context_id);
            //document.getElementById("other").style.display = "none";
            break;
        case EC_API_NOT_INITED:
            console.log("信手书接口没有初始化");
            break;
        case EC_WRONG_CONTEXT_ID:
            console.log("没有配置相应context_id的签字对象");
            break;
    }
    signCountsCursor++;
}
//添加批签签名框
function addCommentObj(objId) {
    var context_id = objId;
    var signer = new Signer(userName, idNumber);

    /*选择一种签名方式（默认关键字签名） 坐标定位或者关键字定位*/
    var signerRule = new SignRule_KeyWordV2("签名关键字", "0", 10, 1, 1);

    /**
     * 根据坐标定位签名方式
     * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
     * @param keyWordSerialNum 关键字序号，从1开始
     * @param unit 坐标系单位，目前支持"dp"和"pt"
     * @constructor
     */
    //var signerRule = new SignRule_XYZ(84.0, 523.0, 150.0, 477.0, 2, "dp");
    /**
     * 关键字定位方式，寻找PDF中的关键字，根据关键字位置放置签名图片
     * @param keyword 关键字
     * @param xOffset x轴偏移量，单位pt
     * @param yOffset y轴偏移量，单位pt
     * @param keyWordSerialNum 关键字序号，eg:2（关键字第2次出现的位置）
     * @param KWIndex KWIndex 写死 1
     * @constructor
     */
    //var signerRule = new SignRule_KeyWordV2("签名关键字", "0", 10, 1,1);

    var commentConfig = new CommentConfig(signer, signerRule);//1:时间在上、2：时间在下、3：时间在右
    //signatureConfig.timeTag = new TimeTag(1, "yyMMdd hh:mm;ss");
    commentConfig.isTSS = false;//是否开始时间戳服务
    commentConfig.commitment = "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。";
    //commentConfig.commitment = "本";
    //commentConfig.commitmentTextSize = 20+"px";
    commentConfig.mass_word_height = 50;
    commentConfig.mass_word_width = 50;
    commentConfig.mass_words_in_single_line = 4;
    commentConfig.penColor = "#FF0000";
    commentConfig.nessesary = false;
    commentConfig.isdistinguish = false;
    commentConfig.isShowBgText = true;
    commentConfig.currentEditBarTextColor = "#FF0000";
    commentConfig.ocrCapture = ocrCapture;
    var res = apiInstance.addCommentObj(context_id, commentConfig);
    if (res) {
        console.log("addCommentObj " + context_id + " success");
        return res;
    }
    else {
        console.log("addCommentObj " + context_id + " error");
        return res;
    }
}
//弹出批注签名框
function showCommentDialog(context_id) {
    if (!apiInstance) {
        console.log("信手书接口没有初始化");
        return;
    }
    switch (apiInstance.showCommentDialog(context_id)) {
        case RESULT_OK:
            document.getElementById("other").style.display = "none";
            break;
        case EC_API_NOT_INITED:
            console.log("信手书接口没有初始化");
            break;
        case EC_WRONG_CONTEXT_ID:
            console.log("没有配置相应context_id的签字对象");
            break;
        case EC_COMMENT_ALREADY_SHOW:
            console.log("批注签名框已弹出，请勿重复操作！");
    }
}
//配置回调函数
function setIdentifyCallBack(callback) {
    if (!apiInstance) {
        console.log("信手书接口没有初始化");
        return;
    }
    apiInstance.setIdentifyCallBack(callback);
}
//生成调用平安易签数据
function getSignData() {
    //上传数据是否准备就绪
    if (!apiInstance.isReadyToUpload()) {
        alert("签名对象未全部签署！");
        return
    } else {
        initData();
    }
    var res = document.getElementById('result');
    try {
        res.value = apiInstance.getUploadDataGram(isGetSignData);
        //console.log('res.value', res.value)
    }
    catch (err) {
        console.log(err);
    }
}
//获取SDK版本信息
function getSDKVersion() {
    document.getElementById('result').value = apiInstance.getVersion();
}
//获取设备操作系统信息
function getOsInfo() {
    var osInfo = "";
    osInfo += apiInstance.getOSInfo();
    osInfo += navigator.userAgent;
    osInfo += window.__wxjs_is_wkwebview;
    document.getElementById('result').value = osInfo;
}