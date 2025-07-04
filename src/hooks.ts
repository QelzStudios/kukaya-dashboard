import AuthService from './lib/services/auth-service/main';

(async () => {
	await AuthService.isAuthenticated();
})();
