import supabase from '../supabaseInit';

// import supabase from '$lib/utils/supabaseInit';

class UserService {
	async createUser(
		id: string,
		fullname: string,
		email: string,
		phoneNumber: string,
		userType: UserType
	) {
		const { data, error } = await supabase
			.from('users')
			.insert({
				id,
				fullName: fullname,
				email,
				phoneNumber,
				userType
			})
			.select('*')
			.single();

		if (error) {
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	async getUser(id: string) {
		const { data, error } = await supabase.from('users').select('*').eq('id', id).single(); // ensures you get one object instead of an array
		if (error) {
			throw new Error(`Failed to fetch user: ${error}`);
		}

		return data;
	}
}

export default new UserService();
