
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Calendar, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Event = {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  type: "concert" | "sports";
  status: "monitoring" | "available" | "soldout";
  isFavorite: boolean;
};

const sampleEvents: Event[] = [
  {
    id: "e1",
    name: "Taylor Swift - The Eras Tour",
    venue: "Wembley Stadium",
    date: "2023-08-15",
    time: "19:30",
    type: "concert",
    status: "monitoring",
    isFavorite: true,
  },
  {
    id: "e2",
    name: "Arsenal vs Manchester United",
    venue: "Emirates Stadium",
    date: "2023-08-20",
    time: "15:00",
    type: "sports",
    status: "available",
    isFavorite: false,
  },
  {
    id: "e3",
    name: "The Weeknd - After Hours Tour",
    venue: "O2 Arena",
    date: "2023-09-05",
    time: "20:00",
    type: "concert",
    status: "soldout",
    isFavorite: true,
  },
  {
    id: "e4",
    name: "BTS World Tour",
    venue: "Wembley Stadium",
    date: "2023-10-12",
    time: "18:30",
    type: "concert",
    status: "monitoring",
    isFavorite: false,
  },
  {
    id: "e5",
    name: "Chelsea vs Liverpool",
    venue: "Stamford Bridge",
    date: "2023-08-28",
    time: "16:30",
    type: "sports",
    status: "monitoring",
    isFavorite: false,
  },
];

const EventsMonitor = () => {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const { toast } = useToast();

  const filteredEvents = events.filter((event) => {
    return (
      (filterType === "all" || event.type === filterType) &&
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleFavorite = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? { ...event, isFavorite: !event.isFavorite }
          : event
      )
    );
  };

  const holdTickets = (event: Event) => {
    toast({
      title: "Attempting to hold tickets",
      description: `Setting up ticket hold for ${event.name}`,
    });
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "available":
        return "bg-success text-success-foreground";
      case "soldout":
        return "bg-destructive text-destructive-foreground";
      case "monitoring":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusText = (status: Event["status"]) => {
    switch (status) {
      case "available":
        return "Tickets Available";
      case "soldout":
        return "Sold Out - Monitoring";
      case "monitoring":
        return "Monitoring";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Event Monitor</CardTitle>
          <div className="flex flex-1 w-full md:w-auto md:max-w-md items-center gap-2">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Select 
              value={filterType} 
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="concert">Concerts</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="border border-border/50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/50 transition-all duration-200"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{event.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleFavorite(event.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          event.isFavorite
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div>{event.venue}</div>
                    <Badge variant="outline" className="capitalize">
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2 w-full md:w-auto">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status === "soldout" && (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {getStatusText(event.status)}
                  </Badge>
                  <Button
                    onClick={() => holdTickets(event)}
                    disabled={event.status !== "available"}
                    size="sm"
                    className="w-full md:w-auto whitespace-nowrap"
                  >
                    Hold Tickets
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No events found matching your criteria
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-right mt-4">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsMonitor;
