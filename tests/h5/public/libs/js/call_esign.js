var pdfFileBase64;
function loadPdfData() {
    var file = document.getElementById("pdfData").files[0];
    var reader = new FileReader;
    reader.onload = function () {
        pdfFileBase64 = this.result.split(",")[1]
    };
    reader.readAsDataURL(file)
}
function callEsign(el) {
    var signData = document.getElementById("result").value;
    var signDatas = signData.split("|");
    if (signDatas.length < 3) {
        alert("未生成调用平安易签数据！");
        return
    }
    if (document.getElementById("pdfData").files.length <= 0) {
        alert("未选择PDF");
        return
    }
    el.disabled = true;
    var data = {
        businessSource: document.getElementById("businessSource").value,
        signKey: signKey,
        signData: apiInstance.getUploadDataGram(true),
        pdfFileBase64: pdfFileBase64
    };
    getPDF(JSON.stringify(data), el)
}
function getPDF(data, el) {
    function getHttpRequest() {
        var xmlHttpRequest;
        if (window.XMLHttpRequest) {
            xmlHttpRequest = new XMLHttpRequest;
            if (xmlHttpRequest.overrideMimeType) {
                xmlHttpRequest.overrideMimeType("text/xml")
            }
        } else if (window.ActiveXObject) {
            var activexName = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (var i = 0; i < activexName.length; i++) {
                try {
                    xmlHttpRequest = new ActiveXObject(activexName[i]);
                    if (xmlHttpRequest) {
                        break
                    }
                } catch (e) {
                }
            }
        }
        return xmlHttpRequest
    }

    var req = getHttpRequest();
    if (req) {
        var url = document.getElementById("selsctDev").value + "dscscoreweb/api/signTest.do";
        req.open("POST", url, true);
        req.setRequestHeader("Content-Type", "application/json;charset:utf-8;");
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    getPDFCallback(req.responseText, el)
                } else {
                    if(Math.floor(req.status / 100) != 5) {
                        alert("请参考 chrome浏览器的跨域设置.mht");
                    }
                    el.disabled = false;
                    throw new Error("POST ERROR ["+req.status+"] [" + url + "]");
                }
            }
        };
        req.send(data)
    }
}
function getPDFCallback(data, el) {
    try {
        data = JSON.parse(data)
    } catch (e) {
        console.error("to JOSN error")
    }
    if (data && data.errorCode == "0") {
        if (data.res && data.res.resultPdf) {
            var bytes = window.atob(data.res.resultPdf);
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i)
            }
            $("#downloadPdf").attr("href", window.URL.createObjectURL(new Blob([ab], {type: "application/pdf"})));
            $("#downloadPdf span").click()
        }
    } else if (data && data.errorCode == "99") {
        alert(data.errorMessage)
    }
    el.disabled = false
}