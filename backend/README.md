# Backend - Priority Queue Service

## Installation and Running the Service

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
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

## API Endpoints Documentation

### Base URL: `http://localhost:3000/api`

#### **GET /api/tasks**
- **Description**: Fetch the current task queue.
- **Response**:
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "priority": "number",
      "progress": "number",
      "createdAt": "string"
    }
  ]
  ```

#### **GET /api/tasks/completed**
- **Description**: Fetch the list of completed tasks.
- **Response**:
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "priority": "number",
      "progress": "number",
      "createdAt": "string"
    }
  ]
  ```

#### **POST /api/tasks**
- **Description**: Add a new task to the queue.
- **Request Body**:
  ```json
  {
    "name": "string",
    "priority": "number"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "priority": "number",
    "progress": "number",
    "createdAt": "string"
  }
  ```

#### **DELETE /api/tasks/completed**
- **Description**: Clear all completed tasks.
- **Response**: `204 No Content`

---

## WebSocket Events Documentation

### **Client to Server Events**

#### **join_queue**
- **Description**: Join the real-time updates for the task queue.

---

### **Server to Client Events**

#### **queue_changed**
- **Payload**:
  ```json
  {
    "currentTaskId": "string | null",
    "queue": [/* array of TaskDTO */],
    "completed": [/* array of TaskDTO */]
  }
  ```

#### **task_progress**
- **Payload**:
  ```json
  {
    "id": "string",
    "name": "string",
    "priority": "number",
    "progress": "number",
    "createdAt": "string"
  }
  ```

#### **task_completed**
- **Payload**:
  ```json
  {
    "id": "string",
    "name": "string",
    "priority": "number",
    "progress": "number",
    "createdAt": "string"
  }
  ```
