import "@azure/functions-extensions-blob"; // This is the mandatory first import for SDK binding
import { StorageBlobClient } from "@azure/functions-extensions-blob";
import { app, InvocationContext } from "@azure/functions";

export async function storageBlobTrigger(
  blobStorageClient: StorageBlobClient, // SDK binding provides this client
  context: InvocationContext
): Promise<void> {
  context.log(`Blob trigger processing: ${context.triggerMetadata.name}`);

  // Access to full SDK capabilities
  const blobProperties = await blobStorageClient.blobClient.getProperties();
  context.log(`Blob size: ${blobProperties.contentLength}`);

  // Download blob content
  const downloadResponse = await blobStorageClient.blobClient.download();
  context.log(`Content: ${downloadResponse}`);
}

// Register the function
app.storageBlob("storageBlobTrigger", {
  path: "snippets/{name}",
  connection: "AzureWebJobsStorage",
  sdkBinding: true, // Enable SDK binding
  handler: storageBlobTrigger,
});
