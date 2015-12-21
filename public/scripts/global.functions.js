'use strict';

if (!String.prototype.format) {
    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };
}

function pd(v, size) {
    var s = v + '';
    while (s.length < (size || 2)) {
        s = '0' + s;
    }
    return s;
}

// check number rrn and lottery
function isNumberV(obj) {
    var reg = new RegExp(/^\d+$/);

    return reg.test(obj);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
}

var accTypeGlob;
var processing;

//Формын өгөгдлийг keyup хийхэд өгөгдлийг шалгах
function formValid(name, regex, message) {
    var field = $('[name="' + name + '"]');
    var fieldValue = field.val();
    var errorHide = $('[id="' + name + '"]');
    if (fieldValue == '' || fieldValue == undefined) {
        errorHide.html('Та энэ хэсгийг заавал бөглөнө үү?');
    }
    else {
        errorHide.html(message);
    }
    if (regex == '') {

        if (fieldValue == '') {
            errorHide.css('display', 'block');
            field.css('border', '1px solid red');
        } else {
            errorHide.css('display', 'none');
            errorHide.html('aldaa shvv');
            field.css('border', '1px solid #66afe9');
        }
    } else {
        var exp = new RegExp(regex);
        if (exp.test(fieldValue) == true) {
            errorHide.css('display', 'none');
            field.css('border', '1px solid #66afe9');
        } else {
            errorHide.css('display', 'block');
            field.css('border', '1px solid red');
        }
    }
}

//Формын өгөгдлийг сабмит хийхээс өмөнө шалгах
function formValidBeforeSubmit(name, regex, message) {
    var field = $('[name="' + name + '"]');
    var fieldValue = field.val();
    var errorHide = $('[id="' + name + '"]');
    if (fieldValue == '' || fieldValue == undefined) {
        var reg = /^[a-zA-Z]*$/;
        if (reg.test(message) == false) {
            errorHide.html('feeel feild');
        } else {
            errorHide.html('Та энэ хэсгийг заавал бөглөнө үү?');
        }

    }
    else {
        errorHide.html(message);
    }
    if (regex == '') {
        if (fieldValue == '') {
            errorHide.css('display', 'block');
            field.css('border', '1px solid red');
            return false;
        } else {
            errorHide.css('display', 'none');
            field.css('border', '1px solid #66afe9');
            return true;
        }
    } else {
        var exp = new RegExp(regex);
        if (exp.test(fieldValue) == true) {
            errorHide.css('display', 'none');
            field.css('border', '1px solid #66afe9');
            return true;
        } else {
            errorHide.css('display', 'block');
            field.css('border', '1px solid red');
            return false;
        }
    }
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
});

function pageTop(time) {
    var scroll_time = (time == undefined) ? 0 : parseInt(time);
    $('html, body').animate({
        scrollTop: 0
    }, scroll_time);
    return false;
}

function monthBySearch(date) {
    var begin = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var lotteryBegin = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate();
    var lotteryEnd = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
    return {begin: lotteryBegin, end: lotteryEnd};
}

function getExportDataHtml(JSONData, ReportTitle, ShowLabel){
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    //console.log(arrData);
    var CSV = '<html><head><meta charset="UTF-8"></head><body>' +
        '<div>' + ReportTitle;
    CSV += '<table border="1">';

    if (ShowLabel) {
        var row = '<thead><tr>';

        for (var index in arrData[0]) {
            row += '<td style="padding:0 10px 0 10px;background-color:silver;text-align:center">' + index + '</td>';
        }

        row.slice(0, row.length - 1);
        CSV += row + '</tr></thead>';
    }

    CSV += '<tbody>';
    for (var i = 0; i < arrData.length; i++) {
        var row1 = '<tr>';
        for (var index in arrData[i]) {
            row1 += '<td>' + arrData[i][index] + '</td>';
        }

        row1.slice(0, row1.length - 1);
        CSV += row1 + '</tr>';
    }

    if (CSV == '') {
        return;
    }
    CSV += '</tbody>';
    CSV += '</table>';
    CSV += '</div></body></html>';
    return CSV;
}

function jsonToExcelConverter(JSONData, ReportTitle, ShowLabel) {

   var html = getExportDataHtml(JSONData, ReportTitle, ShowLabel);

    var blob = new Blob([html], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    jsonToExcel(blob, ReportTitle + '.xls');
}

function jsonToPdfConverter(JSONData, ReportTitle, ShowLabel) {

    var pdf = new jsPDF('P', 'pt', 'a4');
    var html = getExportDataHtml(JSONData, ReportTitle, ShowLabel);

    pdf.addHTML(html, function() {
        pdf.save("caravan.pdf");
    });

    pdf.fromHTML(html, 15, 15, {
        'width': 170
    });
    //pdf.autoPrint()
    pdf.output('dataurlnewwindow');
}


function printDiv(id) {
    $('#' + id).hide();
    var orginalContent = document.body.innerHTML;
    var printContents = $('#' + id).html();
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = orginalContent;
    window.location.reload();
}
