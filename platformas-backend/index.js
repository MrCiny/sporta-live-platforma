// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Mux = require('@mux/mux-node');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mux = new Mux({
  tokenId: "6a408898-1a30-495e-bb74-c96c72e9477c",
  tokenSecret: "lyWjNPBjPZHX2FZE4BRxZFFTgb0DjwP4gAW8ChTNgzgRdJeb43JjFVe+xhUVf4HLetT91arzZkm",
});

app.post('/create-livestream', async (req, res) => {
  try {
    const stream = await mux.video.liveStreams.create({
      playback_policy: ['public'],
      reconnect_window: 600,
      new_asset_settings: { playback_policy: ['public'] },
    });
    res.json(stream);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error creating stream' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
