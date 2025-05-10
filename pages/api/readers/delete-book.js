import { deleteBook } from '@/utils/readerMethods';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Unallowed method' });
  }

  try {
    const { username, bookId } = req.body;

    if (!username || !bookId) {
      return res.status(400).json({ message: 'Missing or invalid data' });
    }

    const result = await deleteBook(username, bookId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Reader or book not found' });
    }

    return res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}