import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'http://192.168.100.41:54321', // Supabase API for Android Emulator
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
);
async function testConnection() {
	try {
		console.log('👋 Testing Supabase connection...');
		const { error } = await supabase
			.from('users') // Replace with your real table name
			.select('*')
			.limit(1);

		console.log('✅ Supabase is reachable and query succeeded!');
	} catch (e) {
		console.error('❗ Unexpected error (try/catch):', e);
	}
}

testConnection();

export default supabase;
