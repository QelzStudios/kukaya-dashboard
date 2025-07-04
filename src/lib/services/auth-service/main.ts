// import supabase from '../../utils/supabaseInit';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import supabase from '../supabaseInit';

class AuthService {
	private extractUserIdFromToken(accessToken: string): string | null {
		try {
			const payload = accessToken.split('.')[1];
			const decoded = JSON.parse(atob(payload));
			return decoded.sub || null;
		} catch (error) {
			console.error('Failed to decode token:', error);
			return null;
		}
	}
	constructor() {}
	async createUserWithEmailAndPassword(UserInfo: Pick<UserSignUpInfo, 'email' | 'password'>) {
		const { user, session } = await supabase.auth.signUp({
			email: UserInfo.email,
			password: UserInfo.password
		});

		return {
			userId: this.extractUserIdFromToken(session?.accessToken || ''),
			user,
			session
		};
	}
	async loginWithEmailAndPassword(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});
		if (error) {
			throw new Error(error.message);
		}
		return true;
	}
	async isAuthenticated(): Promise<boolean> {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			if (browser) goto('/');
		}
		return true;
	}
	async signOut() {
		await supabase.auth.signOut();
	}
}
export default new AuthService();
