import { getCollection } from "@/utils/functions";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "readers";

export const getReaderByUsername = async (username) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.findOne({ username });
};

export const getReaderById = async (id) => {
    const collection = await getCollection(COLLECTION_NAME);
    return collection.findOne({ _id: new ObjectId(id) });
};

export const createReader = async (username) => {
	const collection = await getCollection(COLLECTION_NAME);
	const newReader = { username, readingList: [] };
	return collection.insertOne(newReader);
};

export const addBook = async (username, book) => {
	const collection = await getCollection(COLLECTION_NAME);
	const bookWithId = {
    ...book,
    bookId: new ObjectId()  // ID unic pentru fiecare carte
  	};

  	return collection.updateOne(
    	{ username },
    	{ $push: { readingList: bookWithId } }
  	);
};

export const updateBook = async (username, bookId, updates) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.updateOne(
		{ username, "readingList.bookId": new ObjectId(bookId) },
		{ $set: Object.fromEntries(
			Object.entries(updates).map(([k, v]) => [`readingList.$.${k}`, v])
		)}
	);
};

export const deleteBook = async (username, bookId) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.updateOne(
		{ username },
		{ $pull: { readingList: { bookId: new ObjectId(bookId) } } }
	);
};
