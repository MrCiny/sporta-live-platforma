// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Mux = require('@mux/mux-node');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mux = new Mux({
  tokenId: "6a408898-1a30-495e-bb74-c96c72e9477c",
  tokenSecret: "lyWjNPBjPZHX2FZE4BRxZFFTgb0DjwP4gAW8ChTNgzgRdJeb43JjFVe+xhUVf4HLetT91arzZkm",
});

const supabaseUrl = "https://cawhdclolaohecmobpeh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhd2hkY2xvbGFvaGVjbW9icGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDIwNTcsImV4cCI6MjA1NTM3ODA1N30.W1Z3ZHKcbB_jqE8uGQMb3CJ6pIedXkpc9EySHtclXsk"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

app.post('/mux/webhook', async (req, res) => {
  const event = req.body;
  if (event.type === 'video.asset.live_stream_completed') {
    console.log("It works")
    const liveStreamId = event.data.live_stream_id;

    const playbackId = event.data.playback_ids?.[0]?.id;

    const { data, error } = await supabase
      .from('Tiesraide')
      .update({
        stream_playback: playbackId
      })
      .eq('stream_id', liveStreamId)
      .select()

    if (error) {
      console.error('Supabase update error:', error.message);
    }
  }

  res.sendStatus(200);
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});