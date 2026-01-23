#  Auto Trader Bot - Multi-User Trading Platform

A sophisticated autonomous cryptocurrency trading bot with multi-user support, real-time analytics, and comprehensive trade tracking. Built with Python, React, TypeScript, and WebSocket for real-time communication.

![Auto Trader Bot Demo](https://raw.githubusercontent.com/MoonCraze/auto-trader/main/bot-ui-ts/public/demo.png)
---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
  - [Backend Components](#backend-components-python)
  - [Frontend Components](#frontend-components-react--typescript)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Demo Accounts](#-demo-accounts)
- [API Reference](#-api-reference)
  - [REST API Endpoints](#rest-api-endpoints)
  - [WebSocket Protocol](#websocket-protocol)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Configuration](#-configuration)
- [Technology Stack](#-technology-stack)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔐 Authentication System
- **Synthetic Wallet Generation**: Random SOL balance (10-20 SOL) assigned per user
- **Secure Login/Registration**: Session-based authentication flow
- **Session Persistence**: Automatic re-login on page refresh
- **Multi-User Support**: Isolated trading sessions per wallet

### 📊 Trading Dashboard
- **Real-Time Charts**: Candlestick charts with strategy overlays powered by TradingView
- **Live Monitoring**: Real-time trade execution and position tracking
- **Portfolio Tracking**: Live P&L calculations and balance updates
- **Transaction Feed**: Market-wide transaction activity display
- **Trade History**: Complete bot trade log with status indicators
- **Strategy Visualization**: Visual representation of stop-loss and take-profit levels

### 👤 Profile/Wallet Page
Comprehensive analytics dashboard with three interactive tabs:

#### Overview Tab
- Total P&L (Profit & Loss)
- Win rate with wins/losses breakdown
- Total trade count (active + finished)
- Trading volume and average trade size
- Average P&L per trade
- Largest win and largest loss
- Unique tokens traded count

#### Per-Token Statistics Tab
- Win rate per token
- Total SOL invested and returned
- Net P&L per token
- Average P&L percentage
- Best and worst trade identification

#### Trade History Tab
- Complete trade log with pagination
- Entry and exit price details
- P&L calculations in SOL and percentage
- Trade status indicators (active/finished/failed)
- Exit reasons (stop-loss, take-profit, trailing stop)
- Timestamp tracking

### 🔄 Real-Time Features
- **WebSocket Communication**: Instant bidirectional updates
- **Per-User State Management**: Isolated state for concurrent users
- **Shared Signal Processing**: Token signals distributed to all users
- **Independent Execution**: Each user's trades execute independently
- **Automatic Sentiment Analysis**: Pre-trade token sentiment validation
- **Dynamic Strategy**: Breakeven and trailing stop-loss adjustments

### 💾 Data Persistence
- **SQLite Database**: Production-ready schema with migrations support
- **Complete Trade History**: Entry/exit tracking with P&L calculations
- **Position Management**: Real-time open positions per user
- **Portfolio Snapshots**: Historical portfolio value tracking

---

## 🏗️ Architecture

The system follows a modern full-stack architecture with clear separation of concerns. See **Architecture.md** for detailed documentation.

### Backend Components (Python)

| Component | File | Purpose |
|-----------|------|----------|
| **WebSocket Server** | `websocket_server.py` | Multi-user real-time communication hub with per-user state isolation |
| **REST API** | `api_server.py` | FastAPI server for analytics, trade history, and user management |
| **Database Models** | `database.py` | SQLAlchemy ORM models (Users, Trades, Positions, Snapshots) |
| **Authentication** | `auth.py` | Synthetic wallet generation and user authentication |
| **Portfolio Manager** | `portfolio_manager.py` | User-specific balance tracking and position management with DB persistence |
| **Execution Engine** | `execution_engine.py` | Trade execution simulator with database logging |
| **Strategy Engine** | `strategy_engine.py` | Trading strategy with dynamic stop-loss and tiered take-profit |
| **Sentiment Analyzer** | `sentiment_analyzer.py` | Token sentiment scoring via external API |
| **Entry Strategy** | `entry_strategy.py` | Technical analysis for entry signal confirmation |
| **Data Feeder** | `data_feeder.py` | Market data ingestion and streaming |

### Frontend Components (React + TypeScript)

| Component | File | Purpose |
|-----------|------|----------|
| **App Root** | `App.tsx` | Main application with routing, navigation, and WebSocket management |
| **Wallet Context** | `WalletContext.tsx` | Authentication state and WebSocket connection provider |
| **Login** | `Login.tsx` | User authentication UI (login/registration) |
| **Profile Page** | `ProfilePage.tsx` | Analytics dashboard with overview, per-token stats, and trade history |
| **Candlestick Chart** | `CandlestickChart.tsx` | Real-time TradingView charts with strategy overlays |
| **Trade Summary Panel** | `TradeSummaryPanel.tsx` | Trade queue and status visualization |
| **Transaction Feed** | `TransactionFeed.tsx` | Live market transaction display |
| **Info Panel** | `InfoPanel.tsx` | Portfolio and strategy information display |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Python 3.8+** (Python 3.10+ recommended)
- **Node.js 16+** (Node.js 18+ recommended)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/MoonCraze/auto-trader.git
cd auto-trader
```

#### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Initialize Database
Create the database and populate with demo users:
```bash
python database.py
python test_setup.py  # Creates 3 demo users
```

#### 4. Install Frontend Dependencies
```bash
cd bot-ui-ts
npm install
cd ..
```

### Running the Application

#### Option 1: Quick Start Script (Windows)
For Windows users, use the provided batch script:
```bash
quick_start.bat
```

#### Option 2: Manual Start (Cross-Platform)
Open **three separate terminals** and run:

**Terminal 1 - WebSocket Server** (Port 8765)
```bash
python websocket_server.py
```

**Terminal 2 - REST API Server** (Port 8000)
```bash
python api_server.py
```

**Terminal 3 - Frontend Dev Server** (Port 5173)
```bash
cd bot-ui-ts
npm run dev
```

#### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

You should see the login page. Use any of the demo wallet addresses to log in.

---

## 🎮 Demo Accounts

Three demo accounts are pre-created with `test_setup.py`. Use these wallet addresses to log in:

| User | Wallet Address | Initial Balance |
|------|---------------|----------------|
| User 1 | `1V2zL8QR4g5AwFGHedav2z3G2yarV3u7Wwo3NCAHIt2l` | 12.4654 SOL |
| User 2 | `rt5MgKypna6kWZxqBg9lzqHenXtXw7Db0npLVra8Qsm2` | 12.3567 SOL |
| User 3 | `Tu4D9wkJi41rI25gr3wTUszwhRuhP56Cj2W63oHfHOdt` | 16.1658 SOL |

> 💡 **Tip**: See [DEMO_WALLETS.md](https://github.com/MoonCraze/auto-trader/blob/main/DEMO_WALLETS.md) for quick copy-paste reference.

---

## 📚 API Reference

### REST API Endpoints

Base URL: `http://localhost:8000`

#### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Create new synthetic wallet |
| `GET` | `/api/user/{wallet_address}` | Get user information |

#### Trading Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/trades/{wallet_address}` | Get trade history with pagination |
| `GET` | `/api/trades/{wallet_address}/{trade_id}` | Get specific trade details |
| `GET` | `/api/positions/{wallet_address}` | Get current open positions |

#### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/{wallet_address}/overall` | Overall trading statistics |
| `GET` | `/api/analytics/{wallet_address}/by-token` | Per-token analytics breakdown |
| `GET` | `/api/portfolio/history/{wallet_address}` | Historical portfolio values |

### WebSocket Protocol

WebSocket URL: `ws://localhost:8765`

#### Client Authentication
```json
{
  "type": "AUTH",
  "wallet_address": "your_wallet_address_here"
}
```

#### Server Authentication Response
```json
{
  "type": "AUTH_SUCCESS",
  "data": {
    "wallet_address": "1V2zL8QR4g5AwFGHedav2z3G2yarV3u7Wwo3NCAHIt2l",
    "initial_sol_balance": 12.4654,
    "created_at": "2025-12-07T10:30:00Z"
  }
}
```

#### Real-Time Message Types

| Type | Direction | Description |
|------|-----------|-------------|
| `NEW_TRADE_STARTING` | Server → Client | New trade initiated with initial candles |
| `UPDATE` | Server → Client | Price update with portfolio changes |
| `TRADE_SUMMARY_UPDATE` | Server → Client | Trade list synchronization |
| `ERROR` | Server → Client | Error notification |

---

# Project Structure

```
auto-trader/
├── backend (Python)
│   ├── websocket_server.py
│   ├── api_server.py
│   ├── database.py
│   ├── auth.py
│   ├── portfolio_manager.py
│   ├── execution_engine.py
│   ├── strategy_engine.py
│   ├── sentiment_analyzer.py
│   ├── config.py
│   └── requirements.txt
├── bot-ui-ts/ (Frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── CandlestickChart.tsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── WalletContext.tsx
│   │   ├── App.tsx
│   │   └── types.ts
│   └── package.json
├── trading_bot.db (SQLite database)
├── SETUP_GUIDE.md
├── IMPLEMENTATION_SUMMARY.md
├── DEMO_WALLETS.md
└── README.md
```

## Database Schema

- **users**: Wallet addresses, balances, creation dates
- **trades**: Complete trade lifecycle with entry/exit data
- **positions**: Current open positions per user
- **portfolio_snapshots**: Historical portfolio values

## Configuration

Edit `config.py` to customize:
- Initial capital and risk parameters
- Take-profit tiers
- Stop-loss percentages
- Database connection
- Wallet generation ranges

## Tech Stack

**Backend:**
- Python 3.8+
- WebSockets (websockets library)
- FastAPI
- SQLAlchemy
- Pandas, NumPy
- aiohttp

**Frontend:**
- React 19
- TypeScript 5.8
- Vite
- TailwindCSS 4
- lightweight-charts

**Database:**
- SQLite (development)
- PostgreSQL-ready schema

## Contributing

This part of academic project (FYP). Contributions and suggestions are welcome!

Complete FYP (Final Year Project) Codebase: https://github.com/MoonCraze