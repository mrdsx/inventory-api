# Inventory API

A backend service for managing products, suppliers, stock levels, and restocking operations.

## Features

- Add, delete suppliers
<!-- - Add, update, and soft-delete products with unique SKUs (TODO)
- Track real-time stock levels for each product (TODO)
- Link products to specific suppliers (TODO)
- Create and process purchase orders to restock inventory (TODO)
- Low stock alert system based on configurable thresholds (TODO)
- Search and filter products by name or SKU (TODO)
- Supplier-based reporting and inventory insights (TODO) -->

## Installation guide

### Prerequisites

- [Python](https://www.python.org/)

Also, this project uses [Poetry](https://python-poetry.org/) as main package manager, so you'll need to install it as you go through the installation process.

### 1. Clone the repository

```bash
git clone https://github.com/mrdsx/inventory-api.git
cd inventory-api
```

### 2. Setup environment variables

Create `.env` file in root directory with following variables:

```
DB_URL=YOUR_DB_URL
```

Replace `YOUR_DB_URL` with actual url

### 3. Setup virtual environment

Run following commands in project directory:

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install poetry
poetry install
```

### 5. Run project

```bash
poetry run python main.py
```

After running the project API can be accessed on http://127.0.0.1:3000.

## Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
