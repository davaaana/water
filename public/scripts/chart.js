'use strict';

function buildChart(id, data, type, chartType, heigth, width, title,scope) {
    //console.log('type');
    var series = [];
    var categories;
    var chartData = [];
    var tooltip = [];
    var options3d = [];
    var plotOptions = [];
    var colors = [];
    var backgroundColor = '#f5f5f5';
    var chartXFormat = '{value:,.0f} ₮';

    if (type == 'chartContent'){
        var cdata = [];
        for(var i in data){
            cdata.push({name:scope.getCategoryName(data[i].name),y:Number(data[i].y)})
        }
        series = [{
            type: 'pie',
            data: cdata

        }];
        plotOptions = {
            pie: {
                allowPointSelect: true,
                    cursor: 'pointer'
                ,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        };

        colors = ['#0e2942', '#f24822', '#337ab7'];
        tooltip= {
            pointFormat: 'Нийт агуулга: <b>{point.y}</b>'
        };
    }

    if (type == 'chartUser'){
        var cdata = [];

        for(var i in data){
            console.log(data[i].name);
            cdata.push({name:data[i].name,y:Number(data[i].y)})
        }
        series = [{
            type: 'pie',
            data: cdata

        }];
        plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer'
                ,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        };

        colors = ['#0e2942', '#f24822', '#337ab7'];
        tooltip= {
            pointFormat: 'Нийт агуулга: <b>{point.y}</b>'
        };
    }

    $('#' + id).highcharts({
        chart: {
            type: chartType,
            backgroundColor: backgroundColor,
            height: heigth,
            width: width,
            'border-radius': 2,
            options3d: options3d
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            gridLineColor: "#eee",
            title: {
                text: '' //languageTr(languages.core.chart.t4)
            }
        },
        colors: colors,
        tooltip: tooltip,
        plotOptions: plotOptions,

        series: series
    });
}
