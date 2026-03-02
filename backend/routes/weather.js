const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('weather').select('*').order('recorded_at', { ascending: false }).limit(1);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

module.exports = router;
