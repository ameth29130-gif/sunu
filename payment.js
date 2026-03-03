export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { item_name, item_price, ref_command, command_name, custom_field } = req.body;

  const payload = {
    item_name: item_name,
    item_price: parseInt(item_price),
    currency: 'XOF',
    ref_command: ref_command,
    command_name: command_name,
    env: 'prod',
    ipn_url: 'https://sunu-seven.vercel.app',
    success_url: 'https://sunu-seven.vercel.app?payment=success',
    cancel_url: 'https://sunu-seven.vercel.app?payment=cancel',
    custom_field: custom_field
  };

  try {
    const response = await fetch('https://paytech.sn/api/payment/request-payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'API_KEY': '63dd02f5ce1d5b1684660e97e23b3ab2130-baaf3c55500c6e806b1b3ba109a4b',
        'API_SECRET': 'a6bbee5b424-cef949b4eb0f87c2a24e140a35802c63db21a40838c7aece01625'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
}
