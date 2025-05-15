import "@azure/functions-extensions-blob"; // This is the mandatory first import for SDK binding
import { StorageBlobClient } from "@azure/functions-extensions-blob";
import { app, InvocationContext } from "@azure/functions";

export async function storageBlobTrigger1(
  blobStorageClient: StorageBlobClient,
  context: InvocationContext
): Promise<void> {
  context.log(
    `Storage blob function processed blob "${context.triggerMetadata.name}"`
  );
  try {
    // Download the blob content
    const downloadBlockBlobResponse =
      await blobStorageClient.blobClient.download();

    // Convert the content to a string
    const downloadedContent = await streamToString(
      downloadBlockBlobResponse.readableStreamBody!
    );
    context.log("Content: ", downloadedContent);
  } catch (error) {
    console.error("Error downloading blob content:", error.message);
    throw error;
  }
  context.log("Storage blob trigger function executed successfully!");
}

// Helper function to convert a readable stream to string
async function streamToString(
  readableStream: NodeJS.ReadableStream
): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data);
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    readableStream.on("error", reject);
  });
}

app.storageBlob("storageBlobTrigger1", {
  path: "snippets/{name}",
  connection: "AzureWebJobsStorage",
  sdkBinding: true,
  handler: storageBlobTrigger1,
});
