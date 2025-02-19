const { BlobServiceClient } = require("@azure/storage-blob");

async function createBlobContainer() {
  // Azurite connection string
  const connectionString = "UseDevelopmentStorage=true";
  const containerName = "images"; // Name of the container to create

  // Create a BlobServiceClient from the connection string
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create the container if it doesn't exist
  try {
    const exists = await containerClient.exists();
    if (!exists) {
      console.log(`Creating container: ${containerName}`);
      await containerClient.create();
      console.log(`Container ${containerName} created.`);
    } else {
      console.log(`Container ${containerName} already exists.`);
    }
  } catch (err) {
    console.error("Error creating container:", err);
  }
}

// Run the function
createBlobContainer()
  .then(() => {
    console.log("Blob container initialization completed.");
  })
  .catch((err) => {
    console.error("Error initializing blob container:", err);
  });
