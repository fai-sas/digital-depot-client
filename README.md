## Digital DIY Reservation Client

Digital DIY Reservation is a powerful and modern web application designed to get up to date articles on digital tips and tricks. This client-side application provides a seamless digital experience with features like premium subscription, follow authors, up or down vote articles.

## Project Description

Digital DIY Reservation project is a digital article application built with NextJs 14, NextUi 2, Typescript, Tanstack Query, and Tailwind CSS. It aims to provide a robust and user-friendly platform for digital tipcs and tricks. The application integrates various functionalities such as user authentication, posts management, and payment processing to ensure a comprehensive digital experience.

## Features

- User authentication and authorization
- Admin and User Dashboard
- Post browsing and searching
- Post management
- Secure checkout process
- Premium membership subscription and profile verification
- Upvote or downvote posts
- Follow or un follow authors
- Responsive design for mobile and desktop views

## Technology Stack

- Next.js 14
- NextUi 2
- Tanstack Query
- Next Auth
- React Hook Form
- React Hot Toast
- Tailwind CSS
- TypeScript

## Installation Guideline

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fai-sas/digital-depot-client
   cd digital-depot-client
   ```

### Install dependencies:

```bash
npm install
```

### Create a .env.local file in the root directory:

```bash
touch .env.local
```

### Add necessary configuration variables in the .env.local file:

```bash
NEXT_PUBLIC_BASE_API=http://your-api-url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
NEXT_AUTH_SECRET=""
```

### Start the development server:

```bash
npm run dev
```

### Build for production:

```bash
npm run build
```

### Usage

After setting up the project, you can access the application locally by navigating to `http:/localhost:3000`(or the port specified in your .env file). Use the application to browse products, manage your cart, and proceed through the checkout process with your preferred payment method.

### Deployment

`.vercel.json`

````typescript
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,DELETE,PATCH,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        }
      ]
    }
  ]
}
```
````
