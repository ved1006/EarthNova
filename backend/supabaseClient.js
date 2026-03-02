require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Missing Supabase credentials in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false
    }
});

// Test connection and log status
supabase.from('events').select('count', { count: 'exact', head: true })
    .then(({ error }) => {
        if (error) {
            console.error('Supabase Connection Error:', error.message);
            console.error('Details:', error.details || 'Check your network connection and .env keys.');
        } else {
            console.log('Successfully connected to Space Intelligence Grid (Supabase).');
        }
    });

module.exports = supabase;
