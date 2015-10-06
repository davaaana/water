'use strict';

module.exports = {
	app: {
		title: 'Ус хангамж, ариун цэврийн байгууламжийн мэдээллийн сан',
		description: 'Ус хангамж, ариун цэврийн байгууламжийн мэдээллийн сан',
		keywords: 'Ус хангамж, ариун цэврийн байгууламжийн мэдээллийн сан'
	},
	port: process.env.PORT || 2000,
	templateEngine: 'swig',
	sessionSecret: 'WATER',
	sessionCookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: 300000
		// domain: 'yourdomain.com'
	},
	sessionName: 'connect.sid',

	log: {
		format: 'combined',
		options: {
			stream: 'access-%DATE%.log'
		}
	},

    vatps: {
        clientID: process.env.VATPS_KEY || 'YzJSbVlYTmtabUZ6WkdZ',
        clientSecret: process.env.VATPS_SECRET || 'YXNkZmFzZGYgQVNFRkk7',
        callbackURL: '/auth/oauth-vatps/callback'
    },

    user_roles: {
        admin:      0,
        consumer:   1,
        merchant:   2,
        operator:   3,
        monitoring: 4,
        system_operator: 11
    }
};
