# Book Quotes Sharing App

This is a web application that allows users to share their favorite quotes from books, along with the name of the book and the author. Users can view, add, and manage their quotes through a clean and responsive interface.

---

## Features

-   **Share Quotes**: Users can add quotes with the book title and author's name.
-   **Quote List**: A visually appealing list of quotes with responsive design.
-   **Authentication**: Secure login/logout functionality using NextAuth.js.
-   **Server Actions**: Optimized for SEO with server-side rendering and server actions.
-   **Responsive Design**: Fully responsive for mobile, tablet, and desktop.

---

## Tech Stack

### Frontend & Backend

-   **[Next.js](https://nextjs.org/)**: Full-stack React framework for server-side rendering and building API routes.
-   **TypeScript**: For type safety and better development experience.

### Database

-   **[MongoDB Atlas](https://www.mongodb.com/atlas)**: Cloud-hosted database to store quotes and user data.

### Authentication

-   **[NextAuth.js](https://next-auth.js.org/)**: Secure and customizable authentication.

### Styling

-   **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework for fast UI design.

---

## Getting Started

### Prerequisites

1. **Node.js** (v20 or later)
2. **MongoDB Atlas Account**: Set up a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
3. **Environment Variables**:
    - Create a `.env.local` file in the root directory.
    - Add the following variables:
        ```env
        MONGODB_URI=<your-mongodb-atlas-connection-string>
        NEXTAUTH_SECRET=<your-next-auth-secret>
        NEXTAUTH_URL=http://localhost:3000
        ```

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd quotes-app
    ```
