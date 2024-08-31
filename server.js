const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ELEVENLABS_API_KEY = 'sk_c148ac2e929ebd53e5d272930c65077d71a718a8d55fb754';


app.get('/voice-synthesis', async (req, res) => {
    const { id, text } = req.query;

    if (!text) {
        return res.status(400).send('Text query parameter is required.');
    }

    try {
        
        const response = await axios.post('https://api.elevenlabs.io/v1/text-to-speech', 
        {
            text: text,
            voice_id: id || "default_voice_id", 
        }, 
        {
            headers: {
                'Authorization': `Bearer ${ELEVENLABS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer' 
        });

        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(response.data);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate voice.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
