import { Client, Databases, Storage, ID, Query } from "appwrite";  // Add Query import

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("68001981000dc373ec4b");         // Your Project ID

const databases = new Databases(client);
const storage = new Storage(client);

// IDs
const databaseId = "6800199b001a8bf9bdd9";
const collectionId = "680019b20002ae411ed4";

export { client, databases, storage, ID, Query, databaseId, collectionId };  // Export Query
