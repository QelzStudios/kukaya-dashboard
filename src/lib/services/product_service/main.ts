import supabase from '../supabaseInit';

class ProductService {
	// async createProduct(product: Product) {
	// 	// Create a clean copy to avoid circular references
	// 	product.images = await storageService.uploadImages(product.images, 'products');

	// 	const { data, error } = await supabase.from('products').insert(product);
	// 	if (error) {
	// 		throw new Error(error.message);
	// 	}
	// }

	async getProducts(productId?: string) {
		let query = supabase.from('products').select('*');
		if (productId) {
			query = query.eq('id', productId);
		}
		const { data, error } = await query;

		if (error) {
			throw new Error(error.message);
		}
		return { success: true, data };
	}

	// async updateProduct(productId: string, updates: Partial<Product>) {
	// 	const { data, error } = await supabase
	// 		.from('products')
	// 		.update(updates)
	// 		.eq('id', productId);

	// 	if (error) {

	// 		throw new Error(error.message);
	// 	}

	// 	return { success: true, data: data[0] };
	// }

	// async deleteProduct(productId: string) {
	// 	const { error } = await supabase.from('products').delete().eq('id', productId);

	// 	if (error) {
	// 		throw new Error(error.message);
	// 	}

	// 	return { success: true };
	// }
}

export default new ProductService();
