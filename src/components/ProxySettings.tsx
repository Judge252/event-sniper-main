
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trash2, 
  Plus, 
  RefreshCw, 
  Shield, 
  CheckCircle2, 
  XCircle,
  Globe
} from "lucide-react";

const ProxySettings = () => {
  const { toast } = useToast();
  const [rotationSpeed, setRotationSpeed] = useState<number>(60);
  const [testInProgress, setTestInProgress] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const handleProxySave = () => {
    toast({
      title: "Proxies Saved",
      description: "Your proxy settings have been updated"
    });
  };

  const handleTestProxies = () => {
    setTestInProgress(true);
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTestInProgress(false);
          toast({
            title: "Proxy Test Complete",
            description: "8/10 proxies working correctly",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network & Proxy Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="proxies">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="proxies">Proxy Management</TabsTrigger>
            <TabsTrigger value="browser">Browser Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="proxies" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="proxy-list" className="text-sm mb-2 block">
                  Proxy List (IP:Port:Username:Password)
                </Label>
                <Textarea
                  id="proxy-list"
                  placeholder="185.199.229.156:7492:user:pass"
                  rows={6}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter one proxy per line in the format: IP:Port:Username:Password
                </p>
              </div>
              
              <div className="flex flex-col gap-4 justify-between">
                <div className="space-y-2">
                  <Label className="text-sm">Proxy Status</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="status-dot status-dot-active"></div>
                    <span>10 proxies loaded</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>8 working</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-destructive" />
                    <span>2 failing</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={handleTestProxies}
                    disabled={testInProgress}
                  >
                    <RefreshCw className={`h-4 w-4 ${testInProgress ? 'animate-spin' : ''}`} />
                    Test Proxies
                  </Button>
                  {testInProgress && (
                    <Progress value={testProgress} className="h-2" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-rotation">Enable IP Rotation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically rotate IP addresses
                    </p>
                  </div>
                  <Switch id="enable-rotation" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-cookies">Clear Cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Clear cookies between sessions
                    </p>
                  </div>
                  <Switch id="enable-cookies" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>IP Rotation Interval (seconds)</Label>
                  <div className="grid grid-cols-6 gap-2">
                    <Input
                      type="number"
                      value={rotationSpeed}
                      onChange={(e) => setRotationSpeed(parseInt(e.target.value))}
                      min={10}
                      max={300}
                      className="col-span-5"
                    />
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      sec
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="button" onClick={handleProxySave}>
                Save Proxy Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="browser" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="headless-mode">Headless Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Run browser without visible UI (faster)
                  </p>
                </div>
                <Switch id="headless-mode" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stealth-mode">Stealth Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use anti-detection browser fingerprinting
                  </p>
                </div>
                <Switch id="stealth-mode" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="random-agent">Random User-Agent</Label>
                  <p className="text-sm text-muted-foreground">
                    Rotate browser user-agents for each session
                  </p>
                </div>
                <Switch id="random-agent" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-agent">Custom User-Agent (Optional)</Label>
                <Input
                  id="custom-agent"
                  placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
                  className="font-mono text-xs"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="threads">Concurrent Browser Instances</Label>
                <Input
                  id="threads"
                  type="number"
                  defaultValue={3}
                  min={1}
                  max={10}
                  className="w-20"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="button" onClick={handleProxySave}>
                Save Browser Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProxySettings;
