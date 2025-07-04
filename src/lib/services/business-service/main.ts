import supabase from '../supabaseInit';
import BusinessStore from '~/store/businessStore';

class BusinessService {
	async createBusiness(
		businessName: string,
		userId: string
	): Promise<{ success: boolean; data?: any; error?: string }> {
		const { data, error } = await supabase
			.from('business_profiles')
			.insert({
				businessName,
				userId,
			})
			.select('*')
			.single();

		if (error) {
			throw new Error(error.message);
		}

		// Initialize business store
		BusinessStore.getInstance().initialize({
			businessId: data.businessId,
			userId: data.userId,
			businessName: data.businessName,
		});

		return { success: true, data };
	}
}

export default new BusinessService();
