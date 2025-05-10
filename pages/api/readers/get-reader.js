import { getReaderByUsername } from '@/utils/readerMethods';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Unallowed method' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const reader = await getReaderByUsername(username);

    if (!reader) {
      return res.status(404).json({ message: 'Reader not found' });
    }

    return res.status(200).json({ reader });
  } catch (error) {
    console.error('Error fetching reader:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}