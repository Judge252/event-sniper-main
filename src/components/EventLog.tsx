
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

type LogEntry = {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "error" | "warning";
};

const sampleLogs: LogEntry[] = [
  {
    id: "l1",
    timestamp: new Date(Date.now() - 60000),
    message: "System started, monitoring active",
    type: "info",
  },
  {
    id: "l2",
    timestamp: new Date(Date.now() - 45000),
    message: "New event detected: Taylor Swift - The Eras Tour",
    type: "success",
  },
  {
    id: "l3",
    timestamp: new Date(Date.now() - 30000),
    message: "Failed to connect to proxy 185.199.229.156",
    type: "error",
  },
  {
    id: "l4",
    timestamp: new Date(Date.now() - 15000),
    message: "Ticket alert: Arsenal vs Manchester United",
    type: "warning",
  },
];

const EventLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>(sampleLogs);

  // Add a simulated log entry every 8 seconds
  useEffect(() => {
    const logMessages = [
      { message: "Checking for new events", type: "info" },
      { message: "Rotating to new proxy", type: "info" },
      { message: "Successfully held 2 tickets", type: "success" },
      { message: "Connection timeout, retrying", type: "warning" },
    ];

    const interval = setInterval(() => {
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      const newLog: LogEntry = {
        id: `l${Date.now()}`,
        timestamp: new Date(),
        message: randomLog.message,
        type: randomLog.type as LogEntry["type"],
      };
      
      setLogs((prev) => [newLog, ...prev.slice(0, 99)]); // Keep max 100 logs
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const getLogBadgeVariant = (type: LogEntry["type"]) => {
    switch (type) {
      case "info":
        return "secondary";
      case "success":
        return "default";
      case "error":
        return "destructive";
      case "warning":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg">Event Log</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearLogs}>
          <Eraser className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-4 pb-4">
          {logs.length > 0 ? (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={getLogBadgeVariant(log.type)} className="capitalize">
                      {log.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="ml-1 mt-1">{log.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No log entries
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventLog;
