import { getReaderById } from "@/utils/readerMethods";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Unallowed method" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing ID" });
  }

  try {
    const reader = await getReaderById(id);

    if (!reader) {
      return res.status(404).json({ message: "Reader does not exist" });
    }

    res.status(200).json(reader);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
