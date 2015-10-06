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


function getDropdownBankList() {
    return [
        {id: '02', name: 'Капитал банк', path: '/media/images/logos/02.png'},
        {id: '04', name: 'Худалдаа хөгжлийн банк', path: '/media/images/logos/04.png'},
        {id: '05', name: 'ХААН банк', path: '/media/images/logos/05.png'},
        {id: '15', name: 'Голомт банк', path: '/media/images/logos/15.png'},
        {id: '19', name: 'Тээвэр хөгжлийн банк', path: '/media/images/logos/empty_icon.png'},
        {id: '21', name: 'Ариг банк', path: '/media/images/logos/21.png'},
        {id: '22', name: 'Кредит банк', path: '/media/images/logos/empty_icon.png'},
        {id: '26', name: 'Улаанбаатар банк', path: '/media/images/logos/26.png'},
        {id: '30', name: 'Капитрон', path: '/media/images/logos/30.png'},
        {id: '32', name: 'Хас банк', path: '/media/images/logos/32.png'},
        {id: '33', name: 'Чингис хаан банк', path: '/media/images/logos/33.png'},
        {id: '34', name: 'ҮХО-н банк', path: '/media/images/logos/34.png'},
        {id: '35', name: 'Төрийн банк', path: '/media/images/logos/35.png'},
        {id: '37', name: 'Хөрөнгө оруулалтын банк', path: '/media/images/logos/empty_icon.png'}

    ];
}
function getAimag() {
    return [
        {'ADAH_NAME': 'Архангай', 'ADAH_CODE': '65'},
        {'ADAH_NAME': 'Баян-өлгий', 'ADAH_CODE': '83'},
        {'ADAH_NAME': 'Булган', 'ADAH_CODE': '63'},
        {'ADAH_NAME': 'Баянхонгор', 'ADAH_CODE': '64'},
        {'ADAH_NAME': 'Говь-Алтай', 'ADAH_CODE': '82'},
        {'ADAH_NAME': 'Дорноговь', 'ADAH_CODE': '44'},
        {'ADAH_NAME': 'Дундговь', 'ADAH_CODE': '48'},
        {'ADAH_NAME': 'Дорнод', 'ADAH_CODE': '21'},
        {'ADAH_NAME': 'Завхан', 'ADAH_CODE': '81'},
        {'ADAH_NAME': 'Өвөрхангай', 'ADAH_CODE': '62'},
        {'ADAH_NAME': 'Өмнөговь', 'ADAH_CODE': '46'},
        {'ADAH_NAME': 'Сүхбаатар', 'ADAH_CODE': '22'},
        {'ADAH_NAME': 'Сэлэнгэ', 'ADAH_CODE': '43'},
        {'ADAH_NAME': 'Төв', 'ADAH_CODE': '41'},
        {'ADAH_NAME': 'Увс', 'ADAH_CODE': '85'},
        {'ADAH_NAME': 'Ховд', 'ADAH_CODE': '84'},
        {'ADAH_NAME': 'Хөвсгөл', 'ADAH_CODE': '67'},
        {'ADAH_NAME': 'Хэнтий', 'ADAH_CODE': '23'},
        {'ADAH_NAME': 'Дархан-Уул', 'ADAH_CODE': '45'},
        {'ADAH_NAME': 'Орхон', 'ADAH_CODE': '61'},
        {'ADAH_NAME': 'Улаанбаатар', 'ADAH_CODE': '11'},
        {'ADAH_NAME': 'Говьсүмбэр', 'ADAH_CODE': '42'}
    ];
}
function getSum(aimagId) {


    var sum = [
        {
            'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Зуунмод', 'ADSD_CODE': '4101'
        }, {
            'ADSD_ADAH_CODE': '42',
            'ADSD_NAME': 'Сүмбэр',
            'ADSD_CODE': '4201'
        }, {
            'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Сүхбаатар', 'ADSD_CODE': '4301'
        }, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Сайншанд',
            'ADSD_CODE': '4401'
        }, {
            'ADSD_ADAH_CODE': '45', 'ADSD_NAME': 'Дархан', 'ADSD_CODE': '4501'
        }, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Даланзадгад',
            'ADSD_CODE': '4601'
        }, {
            'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Сайнцагаан', 'ADSD_CODE': '4801'
        }, {
            'ADSD_ADAH_CODE': '61',
            'ADSD_NAME': 'Баян-өндөр',
            'ADSD_CODE': '6101'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Арвайхээр', 'ADSD_CODE': '6201'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Булган',
            'ADSD_CODE': '6301'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Баянхонгор', 'ADSD_CODE': '6401'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Эрдэнэбулган',
            'ADSD_CODE': '6501'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Мөрөн', 'ADSD_CODE': '6701'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Улиастай',
            'ADSD_CODE': '8101'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Есөнбулаг', 'ADSD_CODE': '8201'}, {
            'ADSD_ADAH_CODE': '83',
            'ADSD_NAME': 'өлгий',
            'ADSD_CODE': '8301'
        }, {'ADSD_ADAH_CODE': '84', 'ADSD_NAME': 'Жаргалант', 'ADSD_CODE': '8401'}, {
            'ADSD_ADAH_CODE': '85',
            'ADSD_NAME': 'Улаангом',
            'ADSD_CODE': '8501'
        }, {'ADSD_ADAH_CODE': '11', 'ADSD_NAME': 'Багахангай', 'ADSD_CODE': '1104'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Баяндун',
            'ADSD_CODE': '2104'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Асгат', 'ADSD_CODE': '2204'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Батноров',
            'ADSD_CODE': '2304'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Алтанбулаг', 'ADSD_CODE': '4104'}, {
            'ADSD_ADAH_CODE': '42',
            'ADSD_NAME': 'Баянтал',
            'ADSD_CODE': '4204'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Алтанбулаг', 'ADSD_CODE': '4304'}, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Айраг',
            'ADSD_CODE': '4404'
        }, {'ADSD_ADAH_CODE': '45', 'ADSD_NAME': 'Орхон', 'ADSD_CODE': '4504'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Баяндалай',
            'ADSD_CODE': '4604'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Адаацаг', 'ADSD_CODE': '4804'}, {
            'ADSD_ADAH_CODE': '61',
            'ADSD_NAME': 'Жаргалант',
            'ADSD_CODE': '6104'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Баруунбаян-Улаан', 'ADSD_CODE': '6204'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Баян-Агт',
            'ADSD_CODE': '6304'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Баацагаан', 'ADSD_CODE': '6404'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Батцэнгэл',
            'ADSD_CODE': '6504'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Алаг-Эрдэнэ', 'ADSD_CODE': '6704'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Алдархаан',
            'ADSD_CODE': '8104'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Алтай', 'ADSD_CODE': '8204'}, {
            'ADSD_ADAH_CODE': '83',
            'ADSD_NAME': 'Алтай',
            'ADSD_CODE': '8304'
        }, {'ADSD_ADAH_CODE': '84', 'ADSD_NAME': 'Алтай', 'ADSD_CODE': '8404'}, {
            'ADSD_ADAH_CODE': '85',
            'ADSD_NAME': 'Баруунтуруун',
            'ADSD_CODE': '8504'
        }, {'ADSD_ADAH_CODE': '11', 'ADSD_NAME': 'Баянгол', 'ADSD_CODE': '1107'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Баянтүмэн',
            'ADSD_CODE': '2107'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Баяндэлгэр', 'ADSD_CODE': '2207'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Батширээт',
            'ADSD_CODE': '2307'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Аргалант', 'ADSD_CODE': '4107'}, {
            'ADSD_ADAH_CODE': '42',
            'ADSD_NAME': 'Шивээговь',
            'ADSD_CODE': '4207'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Баруунбүрэн', 'ADSD_CODE': '4307'}, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Алтанширээ',
            'ADSD_CODE': '4407'
        }, {'ADSD_ADAH_CODE': '45', 'ADSD_NAME': 'Хонгор', 'ADSD_CODE': '4507'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Баян-Овоо',
            'ADSD_CODE': '4607'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Баянжаргалан', 'ADSD_CODE': '4807'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Бат-Өлзий',
            'ADSD_CODE': '6207'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Баяннуур', 'ADSD_CODE': '6307'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Баянбулаг',
            'ADSD_CODE': '6407'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Булган', 'ADSD_CODE': '6507'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Арбулаг',
            'ADSD_CODE': '6707'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Асгат', 'ADSD_CODE': '8107'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Баян-Уул',
            'ADSD_CODE': '8207'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Алтанцөгц', 'ADSD_CODE': '8307'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Булган',
            'ADSD_CODE': '8407'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Бөхмөрөн', 'ADSD_CODE': '8507'}, {
            'ADSD_ADAH_CODE': '11',
            'ADSD_NAME': 'Баянзүрх',
            'ADSD_CODE': '1110'
        }, {'ADSD_ADAH_CODE': '21', 'ADSD_NAME': 'Баян-Уул', 'ADSD_CODE': '2110'}, {
            'ADSD_ADAH_CODE': '22',
            'ADSD_NAME': 'Дарьганга',
            'ADSD_CODE': '2210'
        }, {'ADSD_ADAH_CODE': '23', 'ADSD_NAME': 'Баян-Адарга', 'ADSD_CODE': '2310'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Архуст',
            'ADSD_CODE': '4110'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Баянгол', 'ADSD_CODE': '4310'}, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Даланжаргалан',
            'ADSD_CODE': '4410'
        }, {'ADSD_ADAH_CODE': '45', 'ADSD_NAME': 'Шарын Гол', 'ADSD_CODE': '4510'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Булган',
            'ADSD_CODE': '4610'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Говь-Угтаал', 'ADSD_CODE': '4810'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Баянгол',
            'ADSD_CODE': '6210'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Бугат', 'ADSD_CODE': '6310'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Баянговь',
            'ADSD_CODE': '6410'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Жаргалант', 'ADSD_CODE': '6510'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Баянзүрх',
            'ADSD_CODE': '6710'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Баянтэс', 'ADSD_CODE': '8110'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Бигэр',
            'ADSD_CODE': '8210'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Баяннуур', 'ADSD_CODE': '8310'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Буянт',
            'ADSD_CODE': '8410'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Давст', 'ADSD_CODE': '8510'}, {
            'ADSD_ADAH_CODE': '11',
            'ADSD_NAME': 'Налайх',
            'ADSD_CODE': '1113'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Мөнххаан', 'ADSD_CODE': '2213'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Баянмөнх',
            'ADSD_CODE': '2313'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Батсүмбэр', 'ADSD_CODE': '4113'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Ерөө',
            'ADSD_CODE': '4313'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'Дэлгэрэх', 'ADSD_CODE': '4413'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Гурвантэс',
            'ADSD_CODE': '4613'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Гурвансайхан', 'ADSD_CODE': '4813'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Баян-өндөр',
            'ADSD_CODE': '6213'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Бүрэгхангай', 'ADSD_CODE': '6313'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Баянлиг',
            'ADSD_CODE': '6413'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Их Тамир', 'ADSD_CODE': '6513'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Бүрэнтогтох',
            'ADSD_CODE': '6713'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Баянхайрхан', 'ADSD_CODE': '8113'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Бугат',
            'ADSD_CODE': '8213'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Бугат', 'ADSD_CODE': '8313'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Дарви',
            'ADSD_CODE': '8413'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Завхан', 'ADSD_CODE': '8513'}, {
            'ADSD_ADAH_CODE': '11',
            'ADSD_NAME': 'Сонгинохайрхан',
            'ADSD_CODE': '1116'
        }, {'ADSD_ADAH_CODE': '21', 'ADSD_NAME': 'Гурванзагал', 'ADSD_CODE': '2116'}, {
            'ADSD_ADAH_CODE': '22',
            'ADSD_NAME': 'Наран',
            'ADSD_CODE': '2216'
        }, {'ADSD_ADAH_CODE': '23', 'ADSD_NAME': 'Баян-Овоо', 'ADSD_CODE': '2316'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Баян',
            'ADSD_CODE': '4116'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Жавхлант', 'ADSD_CODE': '4316'}, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Замын-үүд',
            'ADSD_CODE': '4416'
        }, {'ADSD_ADAH_CODE': '46', 'ADSD_NAME': 'Мандал-Овоо', 'ADSD_CODE': '4616'}, {
            'ADSD_ADAH_CODE': '48',
            'ADSD_NAME': 'Дэлгэрхангай',
            'ADSD_CODE': '4816'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Богд', 'ADSD_CODE': '6216'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Гурван Булаг',
            'ADSD_CODE': '6316'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Баян-Овоо', 'ADSD_CODE': '6416'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Өгийнуур',
            'ADSD_CODE': '6516'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Галт', 'ADSD_CODE': '6716'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Дөрвөлжин',
            'ADSD_CODE': '8116'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Дарив', 'ADSD_CODE': '8216'}, {
            'ADSD_ADAH_CODE': '83',
            'ADSD_NAME': 'Булган',
            'ADSD_CODE': '8316'
        }, {'ADSD_ADAH_CODE': '84', 'ADSD_NAME': 'Дөргөн', 'ADSD_CODE': '8416'}, {
            'ADSD_ADAH_CODE': '85',
            'ADSD_NAME': 'Зүүнговь',
            'ADSD_CODE': '8516'
        }, {'ADSD_ADAH_CODE': '11', 'ADSD_NAME': 'Сүхбаатар', 'ADSD_CODE': '1119'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Дашбалбар',
            'ADSD_CODE': '2119'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Онгон', 'ADSD_CODE': '2219'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Баянхутаг',
            'ADSD_CODE': '2319'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Баяндэлгэр', 'ADSD_CODE': '4119'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Зүүнбүрэн',
            'ADSD_CODE': '4319'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'Иххэт', 'ADSD_CODE': '4419'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Манлай',
            'ADSD_CODE': '4619'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Дэлгэрцогт', 'ADSD_CODE': '4819'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Бүрд',
            'ADSD_CODE': '6219'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Дашинчилэн', 'ADSD_CODE': '6319'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Баян-өндөр',
            'ADSD_CODE': '6419'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Өлзийт', 'ADSD_CODE': '6519'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Жаргалант',
            'ADSD_CODE': '6719'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Завханмандал', 'ADSD_CODE': '8119'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Дэлгэр',
            'ADSD_CODE': '8219'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Буянт', 'ADSD_CODE': '8319'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Дуут',
            'ADSD_CODE': '8419'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Зүүнхангай', 'ADSD_CODE': '8519'}, {
            'ADSD_ADAH_CODE': '11',
            'ADSD_NAME': 'Хан-Уул',
            'ADSD_CODE': '1122'
        }, {'ADSD_ADAH_CODE': '21', 'ADSD_NAME': 'Матад', 'ADSD_CODE': '2122'}, {
            'ADSD_ADAH_CODE': '22',
            'ADSD_NAME': 'Сүхбаатар',
            'ADSD_CODE': '2222'
        }, {'ADSD_ADAH_CODE': '23', 'ADSD_NAME': 'Биндэр', 'ADSD_CODE': '2322'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Баянжаргалан',
            'ADSD_CODE': '4122'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Мандал', 'ADSD_CODE': '4322'}, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Мандах',
            'ADSD_CODE': '4422'
        }, {'ADSD_ADAH_CODE': '46', 'ADSD_NAME': 'Ноён', 'ADSD_CODE': '4622'}, {
            'ADSD_ADAH_CODE': '48',
            'ADSD_NAME': 'Дэрэн',
            'ADSD_CODE': '4822'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Гучин-Ус', 'ADSD_CODE': '6222'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Могод',
            'ADSD_CODE': '6322'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Баянцагаан', 'ADSD_CODE': '6422'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Өндөр-Улаан',
            'ADSD_CODE': '6522'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Их-Уул', 'ADSD_CODE': '6722'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Идэр',
            'ADSD_CODE': '8122'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Жаргалан', 'ADSD_CODE': '8222'}, {
            'ADSD_ADAH_CODE': '83',
            'ADSD_NAME': 'ДэлҮҮн',
            'ADSD_CODE': '8322'
        }, {'ADSD_ADAH_CODE': '84', 'ADSD_NAME': 'Зэрэг', 'ADSD_CODE': '8422'}, {
            'ADSD_ADAH_CODE': '85',
            'ADSD_NAME': 'Малчин',
            'ADSD_CODE': '8522'
        }, {'ADSD_ADAH_CODE': '11', 'ADSD_NAME': 'Чингэлтэй', 'ADSD_CODE': '1125'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Сэргэлэн',
            'ADSD_CODE': '2125'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Түвшинширээ', 'ADSD_CODE': '2225'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Галшар',
            'ADSD_CODE': '2325'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Баян-өнжүүл', 'ADSD_CODE': '4125'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Орхон',
            'ADSD_CODE': '4325'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'өргөн', 'ADSD_CODE': '4425'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Номгон',
            'ADSD_CODE': '4625'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Луус', 'ADSD_CODE': '4825'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Есөн Зүйл',
            'ADSD_CODE': '6225'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Орхон', 'ADSD_CODE': '6325'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Богд',
            'ADSD_CODE': '6425'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Тариат', 'ADSD_CODE': '6525'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Рашаант',
            'ADSD_CODE': '6725'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Их-Уул', 'ADSD_CODE': '8125'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Тайшир',
            'ADSD_CODE': '8225'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Ногооннуур', 'ADSD_CODE': '8325'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Манхан',
            'ADSD_CODE': '8425'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Наранбулаг', 'ADSD_CODE': '8525'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Халхгол',
            'ADSD_CODE': '2128'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Түмэнцогт', 'ADSD_CODE': '2228'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Дадал',
            'ADSD_CODE': '2328'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Баянхангай', 'ADSD_CODE': '4128'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Орхонтуул',
            'ADSD_CODE': '4328'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'Сайхандулаан', 'ADSD_CODE': '4428'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Сэврэй',
            'ADSD_CODE': '4628'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Өлзийт', 'ADSD_CODE': '4828'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'ЗҮҮнбаян-Улаан',
            'ADSD_CODE': '6228'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Рашаант', 'ADSD_CODE': '6328'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Бөмбөгөр',
            'ADSD_CODE': '6428'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Төвшрүүлэх', 'ADSD_CODE': '6528'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Рэнчинлхүмбэ',
            'ADSD_CODE': '6728'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Нөмрөг', 'ADSD_CODE': '8128'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Тонхил',
            'ADSD_CODE': '8228'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Сагсай', 'ADSD_CODE': '8328'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Мөнххайрхан',
            'ADSD_CODE': '8428'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Өлгий', 'ADSD_CODE': '8528'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Хөлөнбуйр',
            'ADSD_CODE': '2131'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Уулбаян', 'ADSD_CODE': '2231'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Дархан',
            'ADSD_CODE': '2331'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Баянцагаан', 'ADSD_CODE': '4131'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Сайхан',
            'ADSD_CODE': '4331'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'Улаанбадрах', 'ADSD_CODE': '4431'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Ханбогд',
            'ADSD_CODE': '4631'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Өндөршил', 'ADSD_CODE': '4831'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Нарийнтээл',
            'ADSD_CODE': '6231'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Сайхан', 'ADSD_CODE': '6331'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Бууцагаан',
            'ADSD_CODE': '6431'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Хайрхан', 'ADSD_CODE': '6531'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Тариалан',
            'ADSD_CODE': '6731'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Отгон', 'ADSD_CODE': '8131'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Төгрөг',
            'ADSD_CODE': '8231'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Толбо', 'ADSD_CODE': '8331'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Мөст',
            'ADSD_CODE': '8431'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Өмнөгөвь', 'ADSD_CODE': '8531'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Цагаан-Овоо',
            'ADSD_CODE': '2134'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Халзан', 'ADSD_CODE': '2234'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Дэлгэрхаан',
            'ADSD_CODE': '2334'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Баянцогт', 'ADSD_CODE': '4134'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Сант',
            'ADSD_CODE': '4334'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'Хатанбулаг', 'ADSD_CODE': '4434'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Ханхонгор',
            'ADSD_CODE': '4634'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Сайхан-Овоо', 'ADSD_CODE': '4834'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Өлзийт',
            'ADSD_CODE': '6234'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Сэлэнгэ', 'ADSD_CODE': '6334'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Галуут',
            'ADSD_CODE': '6434'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Хангай', 'ADSD_CODE': '6534'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Тосонцэнгэл',
            'ADSD_CODE': '6734'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Сантмаргац', 'ADSD_CODE': '8134'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Халиун',
            'ADSD_CODE': '8234'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Улаанхус', 'ADSD_CODE': '8334'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Мянгад',
            'ADSD_CODE': '8434'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'өндөрхангай', 'ADSD_CODE': '8534'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Чойбалсан',
            'ADSD_CODE': '2137'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Эрдэнэцагаан', 'ADSD_CODE': '2237'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Жаргалтхаан',
            'ADSD_CODE': '2337'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Баянчандмань', 'ADSD_CODE': '4137'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Түшиг',
            'ADSD_CODE': '4337'
        }, {'ADSD_ADAH_CODE': '44', 'ADSD_NAME': 'Хөвсгөл', 'ADSD_CODE': '4437'}, {
            'ADSD_ADAH_CODE': '46',
            'ADSD_NAME': 'Хүрмэн',
            'ADSD_CODE': '4637'
        }, {'ADSD_ADAH_CODE': '48', 'ADSD_NAME': 'Хулд', 'ADSD_CODE': '4837'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Сант',
            'ADSD_CODE': '6237'
        }, {'ADSD_ADAH_CODE': '63', 'ADSD_NAME': 'Тэшиг', 'ADSD_CODE': '6337'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Гурванбулаг',
            'ADSD_CODE': '6437'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Хашаат', 'ADSD_CODE': '6537'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Төмөрбулаг',
            'ADSD_CODE': '6737'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Сонгино', 'ADSD_CODE': '8137'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Хөхморьт',
            'ADSD_CODE': '8237'
        }, {'ADSD_ADAH_CODE': '83', 'ADSD_NAME': 'Цэнгэл', 'ADSD_CODE': '8337'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Үенч',
            'ADSD_CODE': '8437'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Сагил', 'ADSD_CODE': '8537'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Чулуунхороот',
            'ADSD_CODE': '2140'
        }, {'ADSD_ADAH_CODE': '23', 'ADSD_NAME': 'Мөрөн', 'ADSD_CODE': '2340'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Борнуур',
            'ADSD_CODE': '4140'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Хүдэр', 'ADSD_CODE': '4340'}, {
            'ADSD_ADAH_CODE': '44',
            'ADSD_NAME': 'Эрдэнэ',
            'ADSD_CODE': '4440'
        }, {'ADSD_ADAH_CODE': '46', 'ADSD_NAME': 'Цогт-Овоо', 'ADSD_CODE': '4640'}, {
            'ADSD_ADAH_CODE': '48',
            'ADSD_NAME': 'Цагаандэлгэр',
            'ADSD_CODE': '4840'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Тарагт', 'ADSD_CODE': '6240'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Хангал',
            'ADSD_CODE': '6340'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Жаргалант', 'ADSD_CODE': '6440'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Хотонт',
            'ADSD_CODE': '6540'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Түнэл', 'ADSD_CODE': '6740'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Тосонцэнгэл',
            'ADSD_CODE': '8140'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Цогт', 'ADSD_CODE': '8240'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Ховд',
            'ADSD_CODE': '8440'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Тариалан', 'ADSD_CODE': '8540'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Норовлин',
            'ADSD_CODE': '2343'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Бүрэн', 'ADSD_CODE': '4143'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Хушаат',
            'ADSD_CODE': '4343'
        }, {'ADSD_ADAH_CODE': '46', 'ADSD_NAME': 'Цогтцэций', 'ADSD_CODE': '4643'}, {
            'ADSD_ADAH_CODE': '48',
            'ADSD_NAME': 'Эрдэнэдалай',
            'ADSD_CODE': '4843'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Төгрөг', 'ADSD_CODE': '6243'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Хишиг-өндөр',
            'ADSD_CODE': '6343'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Жинст', 'ADSD_CODE': '6443'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Цахир',
            'ADSD_CODE': '6543'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Улаан-Уул', 'ADSD_CODE': '6743'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Түдэвтэй',
            'ADSD_CODE': '8143'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Цээл', 'ADSD_CODE': '8243'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Цэцэг',
            'ADSD_CODE': '8443'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Түргэн', 'ADSD_CODE': '8543'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Өмнөдэлгэр',
            'ADSD_CODE': '2346'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Дэлгэрхаан', 'ADSD_CODE': '4146'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Цагааннуур',
            'ADSD_CODE': '4346'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Уянга', 'ADSD_CODE': '6246'}, {
            'ADSD_ADAH_CODE': '63',
            'ADSD_NAME': 'Хутаг-Өндөр',
            'ADSD_CODE': '6346'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Заг', 'ADSD_CODE': '6446'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Цэнхэр',
            'ADSD_CODE': '6546'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Ханх', 'ADSD_CODE': '6746'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Тэлмэн',
            'ADSD_CODE': '8146'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Чандмань', 'ADSD_CODE': '8246'}, {
            'ADSD_ADAH_CODE': '84',
            'ADSD_NAME': 'Чандмань',
            'ADSD_CODE': '8446'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Тэс', 'ADSD_CODE': '8546'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Цэнхэрмандал',
            'ADSD_CODE': '2349'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Жаргалант', 'ADSD_CODE': '4149'}, {
            'ADSD_ADAH_CODE': '43',
            'ADSD_NAME': 'Шаамар',
            'ADSD_CODE': '4349'
        }, {'ADSD_ADAH_CODE': '62', 'ADSD_NAME': 'Хайрхандулаан', 'ADSD_CODE': '6249'}, {
            'ADSD_ADAH_CODE': '64',
            'ADSD_NAME': 'Өлзийт',
            'ADSD_CODE': '6449'
        }, {'ADSD_ADAH_CODE': '65', 'ADSD_NAME': 'Цэцэрлэг', 'ADSD_CODE': '6549'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Цагааннуур',
            'ADSD_CODE': '6749'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Тэс', 'ADSD_CODE': '8149'}, {
            'ADSD_ADAH_CODE': '82',
            'ADSD_NAME': 'Шарга',
            'ADSD_CODE': '8249'
        }, {'ADSD_ADAH_CODE': '84', 'ADSD_NAME': 'Эрдэнэбүрэн', 'ADSD_CODE': '8449'}, {
            'ADSD_ADAH_CODE': '85',
            'ADSD_NAME': 'Ховд',
            'ADSD_CODE': '8549'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Заамар', 'ADSD_CODE': '4152'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Хархорин',
            'ADSD_CODE': '6252'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Хүрээмарал', 'ADSD_CODE': '6452'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Чулуут',
            'ADSD_CODE': '6552'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Цагаан-Уул', 'ADSD_CODE': '6752'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Ургамал',
            'ADSD_CODE': '8152'
        }, {'ADSD_ADAH_CODE': '82', 'ADSD_NAME': 'Эрдэнэ', 'ADSD_CODE': '8252'}, {
            'ADSD_ADAH_CODE': '85',
            'ADSD_NAME': 'Хяргас',
            'ADSD_CODE': '8552'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Лүн', 'ADSD_CODE': '4155'}, {
            'ADSD_ADAH_CODE': '62',
            'ADSD_NAME': 'Хужирт',
            'ADSD_CODE': '6255'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Шинэжинст', 'ADSD_CODE': '6455'}, {
            'ADSD_ADAH_CODE': '65',
            'ADSD_NAME': 'Эрдэнэмандал',
            'ADSD_CODE': '6555'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Цагаан-үүр', 'ADSD_CODE': '6755'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Цагаанхайрхан',
            'ADSD_CODE': '8155'
        }, {'ADSD_ADAH_CODE': '85', 'ADSD_NAME': 'Цагаанхайрхан', 'ADSD_CODE': '8555'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Мөнгөнморьт',
            'ADSD_CODE': '4158'
        }, {'ADSD_ADAH_CODE': '64', 'ADSD_NAME': 'Эрдэнэцогт', 'ADSD_CODE': '6458'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Цэцэрлэг',
            'ADSD_CODE': '6758'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Цагаанчулуут', 'ADSD_CODE': '8158'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Өндөрширээт',
            'ADSD_CODE': '4161'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Чандмань-өндөр', 'ADSD_CODE': '6761'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Цэцэн-Уул',
            'ADSD_CODE': '8161'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Сүмбэр', 'ADSD_CODE': '4164'}, {
            'ADSD_ADAH_CODE': '67',
            'ADSD_NAME': 'Шинэ-Идэр',
            'ADSD_CODE': '6764'
        }, {'ADSD_ADAH_CODE': '81', 'ADSD_NAME': 'Шилүүстэй', 'ADSD_CODE': '8164'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Сэргэлэн',
            'ADSD_CODE': '4167'
        }, {'ADSD_ADAH_CODE': '67', 'ADSD_NAME': 'Эрдэнэбулган', 'ADSD_CODE': '6767'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Эрдэнэхайрхан',
            'ADSD_CODE': '8167'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Угтаалцайдам', 'ADSD_CODE': '4170'}, {
            'ADSD_ADAH_CODE': '81',
            'ADSD_NAME': 'Яруу',
            'ADSD_CODE': '8170'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Цээл', 'ADSD_CODE': '4173'}, {
            'ADSD_ADAH_CODE': '41',
            'ADSD_NAME': 'Эрдэнэ',
            'ADSD_CODE': '4176'
        }, {'ADSD_ADAH_CODE': '41', 'ADSD_NAME': 'Эрдэнэсант', 'ADSD_CODE': '4179'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Булган',
            'ADSD_CODE': '2113'
        }, {'ADSD_ADAH_CODE': '11', 'ADSD_NAME': 'Багануур', 'ADSD_CODE': '1101'}, {
            'ADSD_ADAH_CODE': '21',
            'ADSD_NAME': 'Хэрлэн',
            'ADSD_CODE': '2101'
        }, {'ADSD_ADAH_CODE': '22', 'ADSD_NAME': 'Баруун-Урт', 'ADSD_CODE': '2201'}, {
            'ADSD_ADAH_CODE': '23',
            'ADSD_NAME': 'Хэрлэн',
            'ADSD_CODE': '2301'
        }, {'ADSD_ADAH_CODE': '43', 'ADSD_NAME': 'Сүхбаатар 1 ', 'ADSD_CODE': '0324324'}];
    var data = [];
    sum.forEach(function (el) {
        if (el.ADSD_ADAH_CODE == aimagId) {
            data.push({ADSD_ADAH_CODE: el.ADSD_ADAH_CODE, ADSD_NAME: el.ADSD_NAME, ADSD_CODE: el.ADSD_CODE});
        }
    });
    return data;
}

function url_tooltip_list(accType) {
    switch (accType) {
        case 1:
            return [
                {
                    url: '/consumer',
                    tooltips: [
                        {id: 2001, msg: 'Таны нийт худалдан авалтын дүн', position: 'right'},
                        {id: 2002, msg: 'Таны урамшууллын буцаан олголтын дүн', position: 'right'},
                        {id: 2003, msg: 'Таны нийт баримтын тоо ', position: 'right'},
                        {id: 2004, msg: 'Таны нийт сугалааны тоо', position: 'left'},
                        {id: 2005, msg: 'Таны нийт худалдан авалтыг - үзүүлэлтээр', position: 'right'},
                        {id: 2007, msg: 'Таны нийт худалдан авалтыг - хэрэглээгээр', position: 'right'},
                        {id: 2008, msg: 'Таны нийт бүртгүүлсэн сугалаанууд', position: 'right'},
                        {id: 2009, msg: 'Таний хийсэн үйлдлүүд', position: 'right'},
                        {id: 2010, msg: 'Таны нийт худалдан авалтыг - жилээр', position: 'right'},
                        {id: 2011, msg: 'Таны нийт худалдан авалтыг - өдрөөр', position: 'right'},
                        {
                            id: 2006,
                            msg: 'Худалдан авалтыг 1 жилээр хянах самбар: Нийт худалдан авалт болон Нийт буцаалт',
                            position: 'right'
                        }]
                },
                {
                    url: '/consumer/lottery',
                    tooltips: [
                        {
                            id: 2101,
                            msg: 'Kaccын машинтай худалдаа үйлчилгээний газраар үйлчлүүлэхдээ гүйлгээний баримт болох талоноо авна.' +
                            'Таны авсан баримт НӨАТУС-д хамрагдсан эсэхийг шалган баримтаа авна.Баримт дээр хэвлэгдэн гарсан сугалааг бүртгүүлэхдээ: QR-кодыг гар утасны аппликейшн ашиглан бүртгүүлэх. ' +
                            ' Интернэтээр НӨАТУС сайтад нэвтрэн зааврын дагуу бүртгүүлэх .' +
                            'Хэрэв утасны аппликэйшн болон портал сайтад бүртгүүлэх боломжгүй бол баримтаа хадгалан сугалааны тохирол болоход шууд оролцох боломжтой. ',
                            position: 'right'
                        },
                        {
                            id: 2102,
                            msg: 'Кассын машинтай худалдаа үйлчилгээний газраар үйлчлүүлэхдээ гүйлгээний баримт болох талоноо авна.' +
                            'Таны Авсан баримт НӨАТУС-д хамрагдсан эсэхийг шалган баримтаа авна.Хэвлэгдэн гарсан баримт дээр 01-49 хүртэлх 6 тоо бүхий сугалааны дугаар байгаа.',
                            position: 'right'
                        },
                        {id: 2103, msg: 'Бүртгэлтэй сугалааны жагсаалт', position: 'right'}]
                },
                {
                    url: '/consumer/receipt',
                    tooltips: [
                        {
                            id: 2201,
                            msg: 'Та худалдан авалтын баримтаа сугалаа болон урамшуулалд хамрагдсан эсэхийг шалгах боломжтой.',
                            position: 'right'
                        }]
                },
                {
                    url: '/consumer/apphone',
                    tooltips: [
                        {
                            id: 2301,
                            msg: 'Гар утас аппликэйшн татах : AppStore болон GooglePlay бичгэн дээр дарах үед автоматаар татагдана.',
                            position: 'right'
                        }]
                },
                {
                    url: '/consumer/purchase',
                    tooltips: [
                        {id: 2401, msg: 'Зөвхөн урамшуулал олгодог нийт ААН тоо', position: 'right'},
                        {id: 2402, msg: 'Зөвхөн сугалаа олгодог ААН тоо', position: 'right'},
                        {id: 2403, msg: 'Сугалаа, урамшуулал олгодог ААН-г байршлаар хайх', position: 'right'}
                    ]
                },
                {
                    url: '/consumer/setting',
                    tooltips: [
                        {id: 2501, msg: '', position: 'right'},
                        {id: 2602, msg: '', position: 'right'}]
                }
            ];
        case 2:
            return [
                {
                    url: '/merchant',
                    tooltips: [
                        {id: 1001, msg: 'Борлуулагчийн нийт борлуулалтын дүнг харуулна.', position: 'right'},
                        {id: 1002, msg: 'Борлуулагчийн нийт НӨАТ-н дүн', position: 'right'},
                        {id: 1003, msg: 'Кассын машинаас олгосон нийт баримтын тоо', position: 'right'},
                        {id: 1004, msg: 'Сугалаанд оролцох баримтын тоо', position: 'right'},
                        {id: 1005, msg: 'Борлуулалтын жилийн үзүүлэлтийг сараар ангилан харуулах', position: 'right'},
                        {id: 1006, msg: 'Тухайн жилийн борлуулалтыг ангилан харуулах', position: 'right'}]
                },
                {
                    url: '/merchant/posconfirm',
                    tooltips: [
                        {id: 1101, msg: 'Системээс ирсэн мэдээлэл', position: 'right'},
                        {id: 1102, msg: 'Сурталчилгаа байршуулах', position: 'right'}]
                },
                {
                    url: '/merchant/poslist',
                    tooltips: [
                        {
                            id: 1201,
                            msg: 'Хүлээгдэж буй пос терминалын жагсаалтаас посыг идэвхжүүлэх',
                            position: 'right'
                        },
                        {id: 1202, msg: 'Борлуулагчийн нийт бүртгэлтэй посын жагсаалт', position: 'right'}]
                },
                {
                    url: '/merchant/document',
                    tooltips: [
                        {id: 1301, msg: 'Борлуулагч борлуулалтын тайлангаа систем рүү илгээх хэсэг', position: 'right'}]
                },
                {
                    url: '/merchant/report',
                    tooltips: [
                        {id: 1401, msg: 'Борлуулалтын өдрийн дэлгэрэнгүй мэдээллиийг харах', position: 'left'},
                        {id: 1402, msg: 'Салбарын орлогыг ангилан харах', position: 'left'},
                        {id: 1403, msg: 'НӨАТ-ын үзүүлэлтийг харуулах', position: 'left'},
                        {id: 1404, msg: 'Борлуулалтыг ангилан харуулах', position: 'left'},
                        {id: 1405, msg: 'Борлуулагчын орлогыг харьцуулан харуулах', position: 'left'},
                        {id: 1406, msg: 'Та өөрийн нэвтрэх нууц үгээ солих боломжтой', position: 'left'},
                        {id: 1407, msg: 'НӨАТ-ын үзүүлэлтийг харуулна', position: 'left'},
                        {id: 1408, msg: 'Таны сар болгоны орлогын үзүүлэлтийг харуулна', position: 'left'}
                    ]
                },
                {
                    url: '/merchant/setting',
                    tooltips: [
                        {id: 1501, msg: 'Борлуулагчын бүртгэлийн мэдээлэл', position: 'right'},
                        {id: 1502, msg: 'ААН-ийн мэдээллийг бүртгэх', position: 'right'}]
                }
            ];
        case 3:
            return [
                {
                    url: '/operator',
                    tooltips: [
                        {id: 3001, msg: 'Нийт бүртгэлтэй посын тоо', position: 'right'},
                        {id: 3002, msg: 'Хамтарч ажиллаж буй байгууллагын тоо', position: 'right'},
                        {id: 3003, msg: 'Ашиглагдаж буй нийт посын тоо', position: 'right'},
                        {id: 3004, msg: 'Нийт идэвхжүүлээгүй посын тоо', position: 'left'},
                        {id: 3005, msg: 'Бүртгэлтэй посуудын жагсаалт', position: 'left'}]

                },
                {
                    url: '/operator/pos',
                    tooltips: [
                        {id: 3101, msg: '', position: 'right'}]
                },
                {
                    url: '/operator/add',
                    tooltips: [
                        {id: 3201, msg: 'Шинээр пос бүртгэх хэсэг', position: 'left'}]
                },
                {
                    url: '/operator/partner',
                    tooltips: [
                        {id: 3301, msg: ' Хамтрагч байгууллагуудын дэлгэрэнгүй мэдээлэл', position: 'left'}]
                }
            ];
        default :
            return;
    }

}
var accTypeGlob;
var processing;

function tooltip(index) {
    var tip = 0;
    url_tooltip_list(accTypeGlob).forEach(function (el) {
        el.tooltips.forEach(function (el1) {
            if (el1.id == index) {
                tip = el1.msg;
            }
        });
    });
    return tip;
}

function ExpireCookie(hours, accType, url) {
    accTypeGlob = accType;

    var date = new Date();
    var h = hours;
    date.setTime(date.getTime() + (h * 60 * 60 * 1000));

    if ($.cookie('tooltipShow') == undefined) {
        if (angular.isArray(url_tooltip_list(accType))) {
            var index = Math.floor(Math.random() * url_tooltip_list(accType).length);
            var insideIndex = Math.floor(Math.random() * url_tooltip_list(accType)[index].tooltips.length);
            $.cookie('tooltipShow', 'no', {expires: date});
            $.cookie('tooltipUrl', url_tooltip_list(accType)[index].url, {expires: date});
            $.cookie('tooltipId', url_tooltip_list(accType)[index].tooltips[insideIndex].id, {expires: date});
            $.cookie('tooltipMsg', url_tooltip_list(accType)[index].tooltips[insideIndex].msg, {expires: date});
            $.cookie('tooltipPosition', url_tooltip_list(accType)[index].tooltips[insideIndex].position, {expires: date});
        }
    } else {
        if ($.cookie('tooltipShow') == 'no' && $.cookie('tooltipUrl') == url) {
            $.cookie('tooltipShow', 'yes', {expires: date});
            var popoverClass = ($.cookie('tooltipPosition') == 'right') ? 'class="popover-backg-body popover-right"' : 'class="popover-backg-body popover-left"';
            $('#' + $.cookie('tooltipId')).append('<div class="auto-popover-backg"></div><div ' + popoverClass + '><p>' + $.cookie('tooltipMsg') + '</p><button class="btn cancel-min btn-sm" id="hhide">хаах</button></div>');
            $('html, body').animate({
                scrollTop: $('#' + $.cookie('tooltipId')).offset().top - ($(window).height() - $('#' + $.cookie('tooltipId')).outerHeight(true)) / 2
            }, 500);
            $('#hhide').on('click', function () {
                $('#' + $.cookie('tooltipId')).remove();
            });
        }
    }
}

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
