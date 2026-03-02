const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('missions').select('*').order('launch_date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

module.exports = router;
