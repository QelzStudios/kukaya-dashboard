import supabase from '../supabaseInit';
import UserService from '../user-service/main';
import ProductService from '../product_service/main';

class BusinessService {
	async createBusiness(
		businessName: string,
		userId: string
	): Promise<{ success: boolean; data?: any; error?: string }> {
		const { data, error } = await supabase
			.from('business_profiles')
			.insert({
				businessName,
				userId
			})
			.select('*')
			.single();

		if (error) {
			throw new Error(error.message);
		}
		// Initialize business store
		return { success: true, data };
	}
	async getBusinessDetailsFromProductId(productId: string) {
		const { success, data } = await ProductService.getProducts(productId);
		const product = data[0];
		if (product) {
			const { data, error } = await supabase
				.from('business_profiles')
				.select(`*, users (*) `)
				.eq('businessId', product.businessId);
			if (!error) {
				return data[0];
			}
		}
		return null;

		// console.log({ data, error });
	}
}

export default new BusinessService();
