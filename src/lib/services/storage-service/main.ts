import toastStore from '~/store/toastStore';
import supabase from '../supabaseInit';
import { File } from '@nativescript/core/file-system';

class ImageUploadService {
	private bucketName = 'images'; // Supabase Storage bucket name

	/**
	 * Upload multiple images to Supabase Storage
	 * @param images Array of local file paths
	 * @param folder Optional: folder name in the bucket
	 * @returns Array of uploaded image public URLs
	 */
	async uploadImages(images: string[], folder?: string): Promise<string[]> {
		const uploadedUrls: string[] = [];
		try {
			const uploads = images.map(async (localPath, index) => {
				const file = File.fromPath(localPath);
				const buffer = file.readSync();

				if (!buffer) throw new Error(`Failed to read image at ${localPath}`);

				const fileName = `image-${Date.now()}-${index}.jpg`;
				await supabase.storage
					.from(folder || this.bucketName)
					.upload(fileName, buffer, {
						contentType: 'image/jpeg',
						upsert: true,
					});
				const uploadUrl = supabase.storage
					.from(folder || this.bucketName)
					.getPublicUrl(fileName);

				uploadedUrls.push(uploadUrl);
			});

			await Promise.all(uploads);
			toastStore.initToads('information', 'Upload complete', 5000);

			return uploadedUrls;
		} catch (err) {
			console.error('Image upload error:', err);
			toastStore.initToads('error', err.message || 'Upload failed', 5000);
			return [];
		}
	}

	/**
	 * Delete multiple images from Supabase Storage
	 * @param fileNames Array of file names in the storage bucket
	 */
	async deleteImages(fileNames: string[]): Promise<boolean> {
		const deletedFile = await supabase.storage
			.from(this.bucketName)
			.remove(fileNames);

		toastStore.initToads('success', 'Images deleted successfully', 5000);
		return true;
	}
}
let storageService: ImageUploadService | null = null;
export default storageService = new ImageUploadService();
