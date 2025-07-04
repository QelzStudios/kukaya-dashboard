import toastStore from '~/store/toastStore';
import supabase from '../supabaseInit';
import storageService from '../storage-service/main';
class ProductService {
	async createProduct(product: Product) {
		// Create a clean copy to avoid circular references
		product.images = await storageService.uploadImages(
			product.images,
			'products'
		);

		const { data, error } = await supabase.from('products').insert(product);
		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}
		toastStore.initToads('success', 'Product added successfully', 5000);
	}

	async getProducts(userId?: string) {
		let query = supabase.from('products').select('*');

		if (userId) {
			query = query.eq('businessId', userId);
		}

		const { data, error } = await query;

		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	async updateProduct(productId: string, updates: Partial<Product>) {
		const { data, error } = await supabase
			.from('products')
			.update(updates)
			.eq('id', productId);

		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		toastStore.initToads('success', 'Product updated successfully', 5000);
		return { success: true, data: data[0] };
	}

	async deleteProduct(productId: string) {
		const { error } = await supabase
			.from('products')
			.delete()
			.eq('id', productId);

		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		toastStore.initToads('success', 'Product deleted successfully', 5000);
		return { success: true };
	}
}

export default new ProductService();
