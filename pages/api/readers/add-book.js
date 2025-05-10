import { addBook } from '@/utils/readerMethods';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Unallowed method' });
  }

  try {
    const { username, book } = req.body;

    if (!username || !book || !book.title) {
      return res.status(400).json({ message: 'Missing or invalid data' });
    }

    const result = await addBook(username, book);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Reader does not exist' });
    }

    return res.status(200).json({ message: 'Book added' });
  } catch (error) {
    console.error('Error adding book:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
