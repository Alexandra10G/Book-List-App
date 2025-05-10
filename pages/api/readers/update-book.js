import { updateBook } from '@/utils/readerMethods';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Unallowed method' });
  }

  try {
    const { username, bookId, updates } = req.body;

    if (!username || !bookId || !updates || typeof updates !== 'object') {
      return res.status(400).json({ message: 'Missing or invalid data' });
    }

    const result = await updateBook(username, bookId, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Reader or book not found' });
    }

    return res.status(200).json({ message: 'Book updated' });
  } catch (error) {
    console.error('Error updating book:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}