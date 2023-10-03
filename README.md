
# Simple Image Processing API

A simple yet powerful API for image processing/editing. Upload, process, and download your images with ease. Built with Express and Typescript.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Sample Usage](#sample-usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

The Simple Image Processing API offers an array of image manipulation features to cater to your specific needs. Whether it's resizing images for a website, applying filters for creative projects, or optimizing images for web performance, this API has got you covered. Check it out live at [Simple Image Processing API](https://simple-image-processor.onrender.com).

## Getting Started

Follow these steps to set up and run the Simple Image Processing API on your local machine:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/mjavason/Simple-Image-Processing-API.git
   ```

2. Navigate to the project directory:

   ```shell
   cd Simple-Image-Processing-API
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

4. Set up the environment variables by creating a `.env` file in the root directory. Refer to the "Environment Variables" section below for details.

5. Start the server:

   ```shell
   npm start
   ```

The API will be accessible at `http://localhost:5000` by default.

## Features

- **Versatile Image Processing**: Resize, crop, filter, add borders, rotate, adjust quality, and convert image formats effortlessly.

## Environment Variables

Before running the API, set up the following environment variables in your `.env` file:

```env
ACCESS_TOKEN_SECRET=your-access-token-secret
API_DOCUMENTATION_URL=doc.xxx.com
APP_NAME=TemplateApp
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLOUDINARY_CLOUD_NAME=xxx
JWT_SECRET=user
MAIL_ADDRESS=xxxx@mail.com
MAIL_PASSWORD=xxxx
MONGODB_URL=xxxx
MONGO_DB_NAME=xxxx
REFRESH_TOKEN_SECRET=xxxx
SITE_LINK=xxxx
USERNAME=user@mail.com
```

## Sample Usage

### Resizing an Image

To resize an image, make a POST request to the `/resize` endpoint of the API with the necessary parameters.

Example using curl:

```bash
curl -X POST https://simple-image-processor.onrender.com/upload/resize -d "width=500&height=300" -F "image=@/path/to/your/image.jpg"
```

### Cropping an Image

To crop an image, make a POST request to the `/crop` endpoint of the API with the necessary parameters.

Example using curl:

```bash
curl -X POST https://simple-image-processor.onrender.com/crop -d "width=300&height=300" -F "image=@/path/to/your/image.jpg"
```

## API Documentation

For detailed documentation on how to use the Simple Image Processing API and its endpoints, refer to the [API Documentation](https://documenter.getpostman.com/view/29278179/2s9YJc34Do).

## Contributing

Contributions to the Simple Image Processing API are highly welcome! To contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.

