import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://etwydcahhkeutuiulgqx.supabase.co', // Supabase API for Android Emulator
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3lkY2FoaGtldXR1aXVsZ3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NDU1NjgsImV4cCI6MjA2NzIyMTU2OH0.NfybOAXWwZFuW-hpQJEH55jn4t5VbWUh7BhzXqABQN0'
);
async function testConnection() {
	try {
		console.log('👋 Testing Supabase connection...');
		const { data, error } = await supabase
			.from('Users') // Replace with your real table name
			.select('*')
			.limit(1);

		console.log('📦 Data:', data);
		console.log('⚠️ Error:', error);

		if (error) {
			console.error('❌ Supabase query error:', JSON.stringify(error, null, 2));
		} else {
			console.log('✅ Supabase is reachable and query succeeded!');
		}
	} catch (e) {
		console.error('❗ Unexpected error (try/catch):', e);
	}
}

testConnection();

export default supabase;
