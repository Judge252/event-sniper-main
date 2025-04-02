import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { useToast } from "../components/ui/use-toast"

interface MonitorForm {
  eventName: string
  preferredBlocks: string[]
  preferredSeats: string[]
  numberOfTickets: number
  maxPrice: number
  autoPurchase: boolean
}

const Monitors = () => {
  const { toast } = useToast()
  const [monitors, setMonitors] = useState<MonitorForm[]>([])
  const [formData, setFormData] = useState<MonitorForm>({
    eventName: "",
    preferredBlocks: [],
    preferredSeats: [],
    numberOfTickets: 1,
    maxPrice: 0,
    autoPurchase: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMonitors([...monitors, formData])
    toast({
      title: "Monitor Created",
      description: "Your ticket monitor has been created successfully.",
    })
    setFormData({
      eventName: "",
      preferredBlocks: [],
      preferredSeats: [],
      numberOfTickets: 1,
      maxPrice: 0,
      autoPurchase: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ticket Monitors</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData({ ...formData, eventName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredBlocks">Preferred Blocks</Label>
                <Input
                  id="preferredBlocks"
                  value={formData.preferredBlocks.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredBlocks: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="VIP, Premium, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredSeats">Preferred Seats</Label>
                <Input
                  id="preferredSeats"
                  value={formData.preferredSeats.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredSeats: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="A1, B2, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfTickets">Number of Tickets</Label>
                <Input
                  id="numberOfTickets"
                  type="number"
                  min="1"
                  value={formData.numberOfTickets}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfTickets: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPrice">Maximum Price</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  min="0"
                  value={formData.maxPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoPurchase"
                  checked={formData.autoPurchase}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, autoPurchase: checked })
                  }
                />
                <Label htmlFor="autoPurchase">Auto Purchase</Label>
              </div>

              <Button type="submit" className="w-full">
                Create Monitor
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Monitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monitors.map((monitor, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <h3 className="font-medium">{monitor.eventName}</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>Blocks: {monitor.preferredBlocks.join(", ")}</p>
                    <p>Seats: {monitor.preferredSeats.join(", ")}</p>
                    <p>Tickets: {monitor.numberOfTickets}</p>
                    <p>Max Price: ${monitor.maxPrice}</p>
                    <p>Auto Purchase: {monitor.autoPurchase ? "Yes" : "No"}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Monitors 