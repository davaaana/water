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
                'public/lib/bootstrap/dist/css/bootstrap.min.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css',
                'public/modules/style/admin.css',
                'public/modules/style/css.css',
                'public/lib/angular-block-ui/dist/angular-block-ui.min.css'
            ],
            js: [
                'public/vendors/js/jquery.min.js',
                'public/vendors/js/highcharts.js',
                'public/vendors/js/highcharts-3d.js',
                //'public/lib/highcharts-ng/dist/highchart-ng.min.js',

                'public/vendors/js/exporting.js',
                'public/lib/bootstrap/dist/js/bootstrap.min.js',
                'public/lib/angular/angular.js',
                'public/lib/angular/angular.min.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-animate/angular-animate.min.js',
                'public/lib/angular-bootstrap/ui-bootstrap.min.js',
                'public/lib/angular-bootstrap/ui-bootstrap.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/ng-ckeditor/libs/ckeditor/ckeditor.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/ng-ckeditor/ng-ckeditor.js',
                'public/lib/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js',
                'public/lib/angular-block-ui/dist/angular-block-ui.min.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/scripts/global.functions.js',
            'public/scripts/chart.js',
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            //'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};
