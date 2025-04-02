import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { useToast } from "../components/ui/use-toast"

interface NotificationSettings {
  email: boolean
  telegram: boolean
  telegramBotToken: string
  telegramChatId: string
  emailAddress: string
}

interface ProxySettings {
  proxyList: string[]
  rotateInterval: number
  useProxy: boolean
}

const Settings = () => {
  const { toast } = useToast()
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: false,
    telegram: false,
    telegramBotToken: "",
    telegramChatId: "",
    emailAddress: "",
  })

  const [proxySettings, setProxySettings] = useState<ProxySettings>({
    proxyList: [],
    rotateInterval: 5,
    useProxy: false,
  })

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Settings Updated",
      description: "Your notification settings have been saved.",
    })
  }

  const handleProxySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Settings Updated",
      description: "Your proxy settings have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNotificationSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="email"
                  checked={notificationSettings.email}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, email: checked })
                  }
                />
                <Label htmlFor="email">Enable Email Notifications</Label>
              </div>

              {notificationSettings.email && (
                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={notificationSettings.emailAddress}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailAddress: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="telegram"
                  checked={notificationSettings.telegram}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, telegram: checked })
                  }
                />
                <Label htmlFor="telegram">Enable Telegram Notifications</Label>
              </div>

              {notificationSettings.telegram && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="telegramBotToken">Telegram Bot Token</Label>
                    <Input
                      id="telegramBotToken"
                      type="password"
                      value={notificationSettings.telegramBotToken}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          telegramBotToken: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telegramChatId">Telegram Chat ID</Label>
                    <Input
                      id="telegramChatId"
                      value={notificationSettings.telegramChatId}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          telegramChatId: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                Save Notification Settings
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proxy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProxySubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="useProxy"
                  checked={proxySettings.useProxy}
                  onCheckedChange={(checked) =>
                    setProxySettings({ ...proxySettings, useProxy: checked })
                  }
                />
                <Label htmlFor="useProxy">Enable Proxy Rotation</Label>
              </div>

              {proxySettings.useProxy && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="proxyList">Proxy List</Label>
                    <Input
                      id="proxyList"
                      value={proxySettings.proxyList.join("\n")}
                      onChange={(e) =>
                        setProxySettings({
                          ...proxySettings,
                          proxyList: e.target.value.split("\n").filter(Boolean),
                        })
                      }
                      placeholder="Enter one proxy per line"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rotateInterval">Rotation Interval (minutes)</Label>
                    <Input
                      id="rotateInterval"
                      type="number"
                      min="1"
                      value={proxySettings.rotateInterval}
                      onChange={(e) =>
                        setProxySettings({
                          ...proxySettings,
                          rotateInterval: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                Save Proxy Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings 