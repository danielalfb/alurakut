import { SiteClient } from 'datocms-client';

export default async function reqReciever(req, res) {
  if (req.method === 'POST') {
    const TOKEN = '529984387cc4229c6e700fab4889dd';
    const client = new SiteClient(TOKEN);

    const createdData = await client.items.create({
      itemType: '968034',
      ...req.body,
    });

    res.json({ createdData: createdData });
    return;
  }
  res.status(404).json({ error: 'Não há respostas no POST' });
}
