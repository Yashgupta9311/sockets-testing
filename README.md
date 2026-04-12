# Real-Time Group Chat (WebSockets)

## Overview

This project is a real-time group chat application built using WebSockets. It enables multiple users to join chat rooms and exchange messages instantly with low latency. The application includes both a backend server and a frontend client built with React.

---

## Tech Stack

### Backend

* Node.js
* WebSockets (Socket.IO)
* Express.js

### Frontend

* React.js
* Socket.IO Client

---

## Features

* Real-time messaging without page refresh
* Group chat support with multiple users in a room
* Join and leave room functionality
* Message broadcasting to all users in a room
* Responsive frontend interface built with React
* Efficient handling of multiple socket connections

---

## Architecture

The frontend (React) establishes a WebSocket connection with the backend server.
Users join specific rooms, and messages are emitted to the server, which then broadcasts them to all connected users in that room.

Flow:
User → React Client → Socket Connection → Join Room → Send Message → Server Broadcast → Clients Receive

---

## Installation

### Clone Repository

```bash id="6u7v2r"
git clone <repo-link>
cd project-folder
```

### Install Backend

```bash id="m0qzq9"
cd server
npm install
node server.js
```

### Install Frontend

```bash id="n8xj3r"
cd client
npm install
npm start
```

---

## Learnings

* Built real-time communication using WebSockets
* Integrated React frontend with a WebSocket backend
* Understood event-driven architecture
* Managed multiple concurrent client connections

---

## Future Improvements

* Add authentication and authorization
* Store messages in a database for persistence
* Implement typing indicators and read receipts
* Improve UI/UX design

---

## Use Case

This architecture is commonly used in real-time applications such as messaging platforms, collaboration tools, and live communication systems.
