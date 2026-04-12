# Real-Time Group Chat (WebSockets)

## Overview

This project is a real-time group chat application built using WebSockets. It enables multiple users to join chat rooms and exchange messages instantly with low latency.

---

## Tech Stack

* Node.js
* WebSockets (Socket.IO)
* Express.js

---

## Features

* Real-time messaging without page refresh
* Group chat support with multiple users in a room
* Join and leave room functionality
* Message broadcasting to all users in a room
* Efficient handling of multiple socket connections

---

## Architecture

The client establishes a WebSocket connection with the server.
Users join specific rooms, and messages are emitted to the server, which then broadcasts them to all connected users in that room.

Flow:
User → Socket Connection → Join Room → Send Message → Server Broadcast → Clients Receive

---

## Installation

```bash
git clone <repo-link>
cd project-folder
npm install
node server.js
```

---

## Learnings

* Built real-time communication using WebSockets
* Gained understanding of event-driven architecture
* Handled multiple concurrent client connections

---

## Future Improvements

* Add authentication and authorization
* Store messages in a database for persistence
* Implement typing indicators and read receipts

---

## Use Case

This architecture is commonly used in real-time applications such as messaging platforms and collaboration tools.
