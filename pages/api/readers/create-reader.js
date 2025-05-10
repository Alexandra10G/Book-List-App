import { createReader, getReaderByUsername } from "@/utils/readerMethods";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Unallowed method" });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Missing username" });
  }

  try {
    const existingReader = await getReaderByUsername(username);
    if (existingReader) {
      return res.status(400).json({ message: "Reader name already exists. Try another name" });
    }

    const result = await createReader(username);

    res.status(201).json({ message: "Reader created", result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
