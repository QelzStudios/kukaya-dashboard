import * as Sentry from '@sentry/browser';
let logger: { captureException: Function };
Sentry.init({
	dsn: 'https://9d2fb8f6ec938f6cca2da45786f6eb7e@o4509640229191680.ingest.de.sentry.io/4509641012871248',
	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events
	sendDefaultPii: true
});
const productionLogger = Sentry;
const dev = { captureException: console.log };
logger = dev;
export default logger;
