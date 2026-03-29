import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

const apiKey = process.env.SON_API_KEY;

if (!apiKey) {
  console.error('SON_API_KEY not found in .env.local');
  process.exit(1);
}

async function testMiniMax() {
  console.log('Testing MiniMax API...\n');

  const response = await fetch('https://api.minimax.io/anthropic/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      model: 'MiniMax-M2.7',
      max_tokens: 100,
      messages: [
        { role: 'user', content: 'Say "API works!" in one sentence.' }
      ]
    })
  });

  const data = await response.json();
  console.log('Status:', response.status);
  console.log('Response:', JSON.stringify(data, null, 2));

  if (response.ok) {
    console.log('\n✅ MiniMax API is working!');
  } else {
    console.log('\n❌ API Error:', data.error?.message || 'Unknown error');
  }
}

testMiniMax();
