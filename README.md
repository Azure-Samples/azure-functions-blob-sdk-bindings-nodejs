# Azure Functions Samples for Blob Storage SDK Bindings for Node.js

This repository provides examples demonstrating how to use Azure Storage Blob SDK bindings with Azure Functions in Node.js (TypeScript). These examples showcase enhanced SDK-binding capabilities, enabling direct access to Azure Storage Blob SDK objects.

## Overview

The repository contains three example projects illustrating different aspects of working with Azure Blob Storage in Azure Functions:

- **blobClientSdkBinding**: Demonstrates using SDK bindings with Blob triggers.
- **blobClientWithReadableStream**: Shows how to work with blob content as readable streams.
- **containerClientInputBinding**: Illustrates using container client input bindings with HTTP triggers.

## Prerequisites

- Node.js (v20 or later)
- Azure Functions Core Tools (v4 or later)
- Azure Storage Account or Azurite emulator for local testing

## Project Details

### 1. blobClientSdkBinding

This example shows how to use the SDK binding with a Blob trigger. The function is triggered when a blob is added to a container and demonstrates:

- Accessing blob properties using the SDK
- Downloading blob content

```javascript
// Key points:
import "@azure/functions-extensions-blob"; // Required first import
// ...
export async function storageBlobTrigger(
  blobStorageClient: StorageBlobClient, // SDK binding provides this client
  context: InvocationContext
): Promise<void> {
  // Access full SDK capabilities
  const blobProperties = await blobStorageClient.blobClient.getProperties();
}
```

### 2. blobClientWithReadableStream

This example demonstrates how to work with blob content as a readable stream:

- Downloading blob content as a stream
- Converting stream content to string
- Error handling for blob operations

### 3. containerClientInputBinding

This example shows how to use container client input bindings with HTTP triggers:

- Listing all blobs in a container
- Accessing container client through input binding
- Returning blob list as JSON response

## Running the Examples

Each project can be run locally using Azure Functions Core Tools.

**Install dependencies:**

```bash
cd [project-folder]
npm install
```

**Configure local settings by creating a `local.settings.json` file with your storage connection string:**

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

**Start the function app:**

```bash
func start
```

## Key Features of SDK Bindings

- Direct access to Azure Blob Storage SDK objects and methods
- Simplified streaming of blob content
- Enhanced error handling and blob property access
- Reduced boilerplate code compared to traditional bindings

## Learn More

- [Azure Functions documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Azure Blob Storage SDK documentation](https://docs.microsoft.com/azure/storage/blobs/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
