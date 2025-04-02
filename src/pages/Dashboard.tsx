import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const Dashboard = () => {
  // Mock data - replace with actual data from API
  const stats = {
    activeMonitors: 3,
    successfulPurchases: 12,
    notificationsSent: 45,
    lastUpdate: new Date().toISOString(),
  }

  const activeMonitors = [
    {
      id: 1,
      eventName: "Concert A",
      status: "active",
      lastCheck: new Date().toISOString(),
    },
    {
      id: 2,
      eventName: "Sports Event B",
      status: "active",
      lastCheck: new Date().toISOString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link to="/monitors/new">Create New Monitor</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Monitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMonitors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successfulPurchases}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notificationsSent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(stats.lastUpdate).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Monitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeMonitors.map((monitor) => (
              <div
                key={monitor.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{monitor.eventName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last check: {new Date(monitor.lastCheck).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {monitor.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard 