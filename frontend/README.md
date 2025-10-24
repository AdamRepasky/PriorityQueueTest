# Frontend - Priority Queue App

## Installation and Running the App

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn run dev
   ```
   
---

## Technology Stack

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Socket.IO**: For real-time updates from the backend.
- **Bootstrap**: For styling and responsive design.

---

## Features Implemented

- **Task Queue Management**:
  - View the current task being processed.
  - View tasks in the queue, sorted by priority.
  - View completed tasks.

- **Real-Time Updates**:
  - Task progress and completion are updated in real-time using WebSocket events.

- **Task Controls**:
  - Add new tasks to the queue.
  - Clear completed tasks.

- **Dark Mode**:
  - A visually appealing dark theme for the app.

---

## Available Scripts

### **yarn dev**
- Starts the development server.

### **yarn build**
- Builds the app for production.

### **yarn lint**
- Runs the linter to check for code quality issues.

### **yarn preview**
- Previews the production build locally.

---

## Notes

- Ensure the backend service is running on `http://localhost:3000` before starting the frontend.