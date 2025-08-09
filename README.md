# Inventory API

A backend service for managing products, suppliers, stock levels, and restocking operations.

## Features

Backend:

- CRUD operations with suppliers, products and orders
- Create and process purchase orders to restock inventory
<!-- - Track real-time stock levels for each product (TODO)
- Low stock alert system based on configurable thresholds (TODO)
- Search and filter products by name or SKU (TODO)
- Supplier-based reporting and inventory insights (TODO) -->

## Installation guide

### Prerequisites

- [NodeJS](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [Python](https://www.python.org/)

Before setting up the project install bun package manager by running this command:

```bash
npm install -g bun
```

### 1. Clone the repository

```bash
git clone https://github.com/mrdsx/inventory-api.git
cd inventory-api
```

### 2. Setup environment variables

Create `.env` file in 'backend' folder with following variables:

```
DB_URL=YOUR_DB_URL
```

Replace `YOUR_DB_URL` with actual url.

### 3. Install dependencies for client

```bash
cd frontend
bun install
```

### 4. Setup virtual environment for server

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
```

### 5. Install dependencies for server

```bash
pip install poetry
poetry install
```

### 6. Run project

Run client:

```bash
cd frontend
bun dev
```

Run server:

```bash
cd backend

poetry run python app\main.py
OR
python app\main.py
```

After running the frontend is accessible at http://localhost:3000 and backend API at http://127.0.0.1:3000.

## Running tests

To run tests for server run these commands:

```bash
cd backend
pytest tests
```

## Tech Stack

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Libraries

- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
