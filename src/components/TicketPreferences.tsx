
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon, SaveIcon } from "lucide-react";

const TicketPreferences = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Preferences Saved",
      description: "Your ticket preferences have been updated",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="num-tickets">Number of Tickets</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of tickets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Ticket</SelectItem>
                    <SelectItem value="2">2 Tickets</SelectItem>
                    <SelectItem value="3">3 Tickets</SelectItem>
                    <SelectItem value="4">4 Tickets</SelectItem>
                    <SelectItem value="6">6 Tickets</SelectItem>
                    <SelectItem value="8">8 Tickets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seating-preference">Seating Preference</Label>
                <Select defaultValue="best-available">
                  <SelectTrigger>
                    <SelectValue placeholder="Select seating preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-available">Best Available</SelectItem>
                    <SelectItem value="lowest-price">Lowest Price</SelectItem>
                    <SelectItem value="closest-to-stage">Closest to Stage</SelectItem>
                    <SelectItem value="specific-section">Specific Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="specific-section">Specific Section/Block (Optional)</Label>
              <Input id="specific-section" placeholder="e.g., Block A, Section 101" />
            </div>
            
            <div>
              <Label htmlFor="specific-row">Specific Row (Optional)</Label>
              <Input id="specific-row" placeholder="e.g., Row 1-10" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="price-range">Maximum Price (£)</Label>
                <span className="text-sm">£200</span>
              </div>
              <Slider
                defaultValue={[200]}
                max={500}
                step={10}
                className="py-4"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-hold">Auto-Hold Tickets</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically hold tickets when they become available
                  </p>
                </div>
                <Switch id="auto-hold" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-purchase">Auto-Purchase Tickets</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically purchase tickets that meet your criteria
                  </p>
                </div>
                <Switch id="auto-purchase" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="monitor-sold-out">Monitor Sold-Out Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Continue monitoring sold-out events for new ticket releases
                  </p>
                </div>
                <Switch id="monitor-sold-out" defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="button" onClick={handleSave} className="gap-2">
              <SaveIcon className="h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TicketPreferences;
