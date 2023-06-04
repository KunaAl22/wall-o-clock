import { connectToDatabase } from '../../database/conn';

export default async function handler(req, res) {
  try {
    const { tag } = req.query;
    const client = await connectToDatabase();
    const collection = client.db().collection('wallpapers');

    let wallpapers;
    if (tag) {
      wallpapers = await collection.find({ tags: tag }).sort({ createdAt: -1 }).toArray();
    } else {
      wallpapers = await collection.find().sort({ createdAt: -1 }).toArray();
    }
    console.log({tag});
    console.log(wallpapers);

    res.status(200).json(wallpapers);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}
