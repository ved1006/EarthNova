const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

console.log('Testing connection to:', url);
const supabase = createClient(url, key);

async function test() {
    console.log('Testing events table...');
    const { data, error } = await supabase.from('events').select('*').limit(1);
    if (error) {
        console.error('Error fetching events:', error);
    } else {
        console.log('Success! Events data:', data);
    }

    console.log('Testing weather table...');
    const { data: wData, error: wError } = await supabase.from('weather').select('*').limit(1);
    if (wError) {
        console.error('Error fetching weather:', wError);
    } else {
        console.log('Success! Weather data:', wData);
    }
}

test();
