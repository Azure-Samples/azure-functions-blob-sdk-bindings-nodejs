import "@azure/functions-extensions-blob"; // This is the mandatory first import for SDK binding
import { StorageBlobClient } from "@azure/functions-extensions-blob";
import {
  app,
  HttpRequest,
  HttpResponseInit,
  input,
  InvocationContext,
} from "@azure/functions";

const blobInput = input.storageBlob({
  path: "snippets",
  connection: "AzureWebJobsStorage",
  sdkBinding: true,
});

export async function listBlobs(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Get input binding for a specific container
  const storageBlobClient = context.extraInputs.get(
    blobInput
  ) as StorageBlobClient;

  // List all blobs in the container
  const blobs = [];
  for await (const blob of storageBlobClient.containerClient.listBlobsFlat()) {
    blobs.push(blob.name);
  }

  return { jsonBody: { blobs } };
}

app.http("listBlobs", {
  methods: ["GET"],
  authLevel: "function",
  extraInputs: [blobInput],
  handler: listBlobs,
});
