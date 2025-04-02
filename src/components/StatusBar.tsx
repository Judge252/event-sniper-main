
import React from "react";
import { cn } from "@/lib/utils";

type StatusBarProps = {
  isActive: boolean;
};

const StatusBar = ({ isActive }: StatusBarProps) => {
  const stats = [
    { 
      label: "Monitoring Status", 
      value: isActive ? "Active" : "Inactive",
      status: isActive ? "active" : "inactive" 
    },
    { 
      label: "Events Tracked", 
      value: "42",
      status: "active" 
    },
    { 
      label: "Ticket Holds", 
      value: "7",
      status: "active" 
    },
    { 
      label: "Purchases", 
      value: "3",
      status: "active" 
    },
  ];

  return (
    <div className="glassmorphism rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center justify-center p-2 rounded-md"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className={cn(
              "status-dot",
              stat.status === "active" ? "status-dot-active" : 
              stat.status === "warning" ? "status-dot-warning" : 
              "status-dot-inactive"
            )}></div>
            {stat.label}
          </div>
          <div className="text-2xl font-semibold mt-1">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusBar;
