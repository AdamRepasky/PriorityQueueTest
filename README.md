# Priority Queue Application

This project consists of a **frontend** and a **backend** for managing a priority queue system. The frontend is built with React, and the backend is built with Node.js and Express.

---

## Running the Application with Docker

### Prerequisites
- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

### Steps to Run
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PriorityQueueTest
   ```

2. Build and start the services:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - **Frontend**: Open your browser and navigate to `http://localhost:5173`.
   - **Backend**: The backend will be running at `http://localhost:3000`.

4. Stop the services:
   To stop the running containers, press `Ctrl+C` in the terminal or run:
   ```bash
   docker-compose down
   ```

---

## Project Structure

- **frontend/**: Contains the React-based frontend application.
- **backend/**: Contains the Node.js-based backend service.

---

## Running Without Docker

If you prefer to run the application without Docker, follow the instructions in the `frontend/README.md` and `backend/README.md` files for setting up and running the services individually.
