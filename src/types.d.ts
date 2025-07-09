type Product = {
	id?: string;
	name: string;
	price: string;
	platformPrice: string;
	images: string[];
	features: string[];
	description?: string;
	category?: string;
	rating?: number;
	stock?: number;
	businessId?: string;
	edited_at: string;
	created_at?: string;
};

type productListings = Pick<productsDetails, 'id' | 'name' | 'price' | 'image'>;
type listingsTransformed = {
	left: productListings;
	right?: productListings;
};
type CurrentSpace = 'business' | 'buyer';
type UserType = 'buyer' | 'business';

type User = {
	id: string; // UUID, matches Supabase Auth UID
	fullName: string;
	email: string;
	dateOfBirth: string; // ISO date string
	country?: string;
	region?: string;
	countryCode?: string;
	phoneNumber: string;
	profileImageUrl?: string;
	userType: UserType;
	createdAt: string; // ISO timestamp string
};
type UserWithPassword = User & {
	password: string;
};
type UserSignUpInfo = Pick<
	UserWithPassword,
	'fullName' | 'email' | 'phoneNumber' | 'password' | 'confirmPassword'
>;
type BusinessSignUpInfo = Pick<
	UserWithPassword,
	'fullName' | 'email' | 'phoneNumber' | 'password' | 'confirmPassword'
>;
type BusinessProfile = {
	userId: string;
	businessName: string;
	businessLogoUrl?: string;
	businessCountryCode?: string;
	businessPhoneNumber?: string;
};
type Order = {
	id: string;
	buyerId: string;
	totalAmount: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	createdAt: string;
};
type OrderItem = {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	unitPrice: string;
	createdAt: string;
};
type UserSupportConversation = {
	id: string;
	userId: string;
	createdAt: string;
};

type SupportMessage = {
	id: string;
	conversationId: string;
	senderRole: 'user' | 'admin';
	senderId: string;
	content: string;
	sentAt: string;
	isRead: boolean;
};
