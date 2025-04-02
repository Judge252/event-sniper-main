
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import EventsMonitor from "./EventsMonitor";
import TicketPreferences from "./TicketPreferences";
import ProxySettings from "./ProxySettings";
import EventLog from "./EventLog";
import StatusBar from "./StatusBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ActivitySquare, 
  Settings, 
  MessageSquare, 
  PanelLeft,
  Globe,
  TicketIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { toast } = useToast();
  const [botActive, setBotActive] = useState(false);
  
  const handleToggleBot = () => {
    const newStatus = !botActive;
    setBotActive(newStatus);
    
    toast({
      title: newStatus ? "Bot Activated" : "Bot Deactivated",
      description: newStatus 
        ? "Now monitoring for ticket events" 
        : "Ticket monitoring paused",
      variant: newStatus ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <TicketIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WeBook Tickets Bot</span>
          </div>
          <Button
            onClick={handleToggleBot}
            variant={botActive ? "destructive" : "default"}
          >
            {botActive ? "Stop Bot" : "Start Bot"}
          </Button>
        </div>
      </header>
      
      <div className="container py-6 flex-1 flex flex-col gap-4">
        <StatusBar isActive={botActive} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="events" className="flex items-center gap-1">
                  <ActivitySquare className="h-4 w-4" />
                  <span>Events</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-1">
                  <PanelLeft className="h-4 w-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="proxies" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>Network</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="mt-4">
                <EventsMonitor />
              </TabsContent>
              <TabsContent value="preferences" className="mt-4">
                <TicketPreferences />
              </TabsContent>
              <TabsContent value="proxies" className="mt-4">
                <ProxySettings />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <EventLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
