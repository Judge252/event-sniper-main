from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime
import asyncio
from playwright.async_api import async_playwright
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="WeBook Tickets Automation Bot")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Event(BaseModel):
    name: str
    date: datetime
    venue: str
    category: str
    price_range: str

class TicketPreferences(BaseModel):
    event_name: str
    preferred_blocks: List[str]
    preferred_seats: List[str]
    number_of_tickets: int
    max_price: float
    auto_purchase: bool = False

class NotificationSettings(BaseModel):
    email: bool
    telegram: bool
    telegram_bot_token: Optional[str] = None
    telegram_chat_id: Optional[str] = None
    email_address: Optional[str] = None

# Global state
active_monitors = {}
notification_settings = {}

@app.get("/")
async def root():
    return {"status": "running", "version": "1.0.0"}

@app.post("/api/start-monitoring")
async def start_monitoring(preferences: TicketPreferences):
    try:
        # Start monitoring in background
        monitor_id = f"monitor_{datetime.now().timestamp()}"
        active_monitors[monitor_id] = preferences.dict()
        
        # Start the monitoring task
        asyncio.create_task(monitor_tickets(monitor_id, preferences))
        
        return {"status": "success", "monitor_id": monitor_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stop-monitoring/{monitor_id}")
async def stop_monitoring(monitor_id: str):
    if monitor_id in active_monitors:
        del active_monitors[monitor_id]
        return {"status": "success", "message": "Monitoring stopped"}
    raise HTTPException(status_code=404, detail="Monitor not found")

@app.post("/api/notification-settings")
async def update_notification_settings(settings: NotificationSettings):
    global notification_settings
    notification_settings = settings.dict()
    return {"status": "success", "message": "Notification settings updated"}

async def monitor_tickets(monitor_id: str, preferences: TicketPreferences):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        try:
            while monitor_id in active_monitors:
                # Navigate to WeBook events page
                await page.goto("https://webook.com/events")
                
                # Check for new events matching preferences
                # This is a placeholder - actual implementation would need to be adapted
                # to WeBook's specific website structure
                
                # Simulate checking for tickets
                await asyncio.sleep(5)  # Adjust based on rate limiting
                
                # If tickets found and auto_purchase is enabled
                if preferences.auto_purchase:
                    # Implement purchase logic
                    pass
                
                # Send notifications if tickets found
                if notification_settings:
                    await send_notifications("Tickets found!", preferences)
                
        except Exception as e:
            print(f"Error in monitor {monitor_id}: {str(e)}")
        finally:
            await browser.close()

async def send_notifications(message: str, preferences: TicketPreferences):
    # Implement notification logic (email, telegram, etc.)
    pass

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 