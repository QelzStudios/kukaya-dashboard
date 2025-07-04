import supabase from '../supabaseInit';
import UserStore from '../../store/userStore';

class UserService {
	async createUser(
		id: string,
		fullname: string,
		email: string,
		phoneNumber: string,
		userType: UserType
	) {
		const { data, error } = await supabase
			.from('Users')
			.insert({
				id,
				fullName: fullname,
				email,
				phoneNumber,
				userType,
			})
			.select('*')
			.single();

		if (error) {
			throw new Error(error.message);
		}
		const userStore = UserStore.getInstance();
		userStore.initialize({
			id: data.id,
			fullName: data.fullName,
			email: data.email,
			dateOfBirth: data.dateOfBirth || '',
			country: data.country || '',
			region: data.region || '',
			countryCode: data.countryCode || '',
			phoneNumber: data.phoneNumber || '',
			profileImageUrl: data.profileImageUrl || '',
			userType: data.userType,
		});
		return { success: true, data };
	}
}

export default new UserService();
