# QuestSearch

**QuestSearch** is an advanced search platform engineered to deliver fast, precise, and scalable search capabilities for extensive collections of questions. It integrates MongoDB Atlas Full-Text Search for efficient and flexible querying, while gRPC serves as the core of the search service for high-performance communication. An Express.js middleware bridges the gap between the gRPC service and the frontend, managing API routing, cross-origin requests, and seamless backend-to-frontend communication. The frontend is developed with Vite + React to ensure a modern, smooth, and intuitive user experience.

## Key Highlights

- **Efficient Full-Text Search**: Employs MongoDB Atlas Full-Text Search to efficiently query question titles, ensuring accurate and speedy results.
- **Paginated Results**: Provides pagination to streamline user navigation and optimize search response times.
- **Customizable Filters**: Enables filtering questions by categories such as Multiple Choice, Anagram, Read Along, and more for a refined search experience.
- **Adaptive Design**: Fully responsive interface for an optimal user experience across mobile, tablet, and desktop devices.
- **High-Performance API**: Powered by a gRPC-based API to handle search requests efficiently, with Express.js acting as a middleware to route data and manage cross-origin communication seamlessly.
- **Scalable Architecture**: Designed for handling large datasets, utilizing MongoDB's indexing features to maximize search performance and ensure scalability.

## Project Setup Guide

### Prerequisites:
1. **Node.js** (v14.x or higher)
2. **MongoDB Atlas account** (for database setup)
3. **Basic understanding of JavaScript, Node.js, gRPC, Express, React, and MongoDB**


### Frontend Preview
<img width="1680" alt="Screenshot 2025-01-26 at 11 08 03 PM" src="https://github.com/user-attachments/assets/f7796b1e-3db8-4a0f-9935-b5901fa7cac0" />

### Frontend Setup
1. Clone the repository and navigate to the target directory:
    ```bash
    git clone https://github.com/yourusername/QuestSearch.git
    cd questsearch/frontend
    ```

2. Install the frontend dependencies:
    ```bash
    npm install
    ```

3. Run the frontend locally:
    ```bash
    npm start
    ```

### Backend Setup
1. Clone the repository:
    ```bash
    cd questsearch/backend
    ```

2. Install the backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file at the root of the backend directory and add the following environment variables:
    ```env
    MONGO_URI=your-mongodb-atlas-connection-string
    GRPC_PORT=50051  # Optional: set a custom port for gRPC if needed
    PORT=4000        # Optional: set a custom port for Express server
    ```

4. Upload data to mongodb by running the below command (JSON data file link: https://drive.google.com/file/d/1CZ0GX4opA4grkLunRuWwH7bwlmfcSeUQ/view):
    ```bash
    node loadData.js
    ```

5. Run the backend locally:
    ```bash
    node server.js
    ```
