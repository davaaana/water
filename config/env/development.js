'use strict';

module.exports = {
    port: process.env.PORT || 2000,
	log: {
		format: 'dev',
		options: {
			stream: 'access-%DATE%.log'
		}
	},
	app: {
		title: 'Ус хангамж, ариун цэврийн байгууламжийн мэдээллийн сан'
	},
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-min.css',
                'public/lib/ngDialog/css/ngDialog.css',
                'public/lib/ngDialog/css/ngDialog-theme-default.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/ng-ckeditor/ng-ckeditor.css',
                'public/lib/angular-ui-grid/ui-grid.css',
                'public/lib/angular-ui-bootstrap-datetimepicker/datetimepicker.css',
                'public/lib/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css',
                'public/modules/style/admin.css',
            ],
            js: [
                'public/vendors/js/jquery.min.js',
                'public/vendors/js/jquery.cookie.js',
                'public/vendors/js/highcharts.js',
                'public/vendors/js/highcharts-3d.js',
                'public/vendors/js/exporting.js',
                /* 'public/lib/jquery/dist/jquery.js',*/
                'public/lib/bootstrap/dist/js/bootstrap.min.js',
                'public/lib/angular/angular.js',
                'public/lib/angular/angular-locale_mn.js',
                'public/lib/ngDialog/js/ngDialog.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/chat/js/jquery.slimscroll.min.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angularjs-scroll-glue/src/scrollglue.js',
                'public/lib/ng-ckeditor/libs/ckeditor/ckeditor.js',
                'public/lib/ng-ckeditor/ng-ckeditor.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/ng-timeago/ngtimeago.js',
                'public/lib/angular-google-maps/dist/angular-google-maps.js',
                'public/lib/lodash/dist/lodash.min.js',
                'public/lib/angulike/angulike.js',
                'public/lib/angular-ui-grid/ui-grid.min.js',
                'public/lib/angular-utils-pagination/dirPagination.js',
                'public/lib/angular-ui-bootstrap-datetimepicker/datetimepicker.js',
                'public/lib/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js',
                'public/lib/angular-smart-table/dist/smart-table.min.js',
                'public/vendors/js/jsPDF/jspdf.min.js',
                'public/vendors/js/jsPDF/jspdf.plugin.addhtml.js',
                'public/lib/text-editor/text-editor.js',
                'public/vendors/js/html2canvas.js'
            ]
        },
        css: [
            'public/styles/main.css',
            'public/styles/portal.css',
            'public/styles/client.css',
            'public/styles/reformatting.css',
            'public/styles/new-main.css',
            'public/styles/new-home.css',
            'public/styles/information.css',
            'public/styles/menu.css',
            'public/styles/fonts.css',
            'public/styles/dialogBox.css',
            'public/styles/dataTables.bootstrap.css',
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/scripts/langs.js',
            'public/scripts/jsonToExcelApi.js',
            'public/scripts/global.functions.js',
            'public/scripts/global.functions.chart.js',
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};
