import { connectToDatabase, closeDatabaseConnection } from '../../database/conn';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { tags, description, owner, email, image } = req.body;

      // Get the current time
      const currentTime = new Date();

      // Connect to MongoDB and retrieve the client
      const client = await connectToDatabase();
      const collection = client.db().collection('wallpapers');

      // Perform the database operation (e.g., insert the data into a collection)
      const result = await collection.insertOne({
        tags,
        description,
        likes: [],
        owner,
        email,
        image: image ? image : null, // Save the image as it is or null if not provided
        createdAt: currentTime,
      });

      // Return a response
      res.status(200).json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to save data' });
    } finally {
      // Close the MongoDB connection
      await closeDatabaseConnection();
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
