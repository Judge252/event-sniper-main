# WeBook Tickets Automation Bot

A high-performance ticket automation bot for the WeBook platform that helps users automatically hold and purchase tickets for concerts and sports events.

## Features

- Real-time event notifications
- Automated ticket holding and purchasing
- Custom seat and block selection
- Multiple account support
- IP rotation and session management
- Secure credential handling
- Excel/Google Sheets export
- User-friendly web interface

## Tech Stack

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Python (FastAPI)
- Browser Automation: Playwright
- Database: SQLite (for local storage)
- Proxy Management: Custom proxy rotation system

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/webook-tickets-bot.git
cd webook-tickets-bot
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the development servers:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
uvicorn main:app --reload
```

## Configuration

1. Create a `config.json` file in the backend directory with your preferences:
```json
{
  "proxy_list": ["proxy1", "proxy2"],
  "notification_settings": {
    "email": true,
    "telegram": true
  },
  "auto_purchase": false,
  "preferred_seats": ["A1", "A2"],
  "preferred_blocks": ["VIP", "Premium"]
}
```

2. Set up your notification preferences in the web interface.

## Security Notes

- Never store sensitive information (passwords, card numbers) locally
- Use environment variables for API keys and secrets
- Rotate IPs and clear cookies between sessions
- Use different cards for each transaction

## License

MIT License - See LICENSE file for details

## Support

For support, please open an issue in the GitHub repository or contact the development team.
