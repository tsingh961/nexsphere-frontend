"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Lock, Bell, Eye, EyeOff, Shield, User, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const notificationForm = useForm({
    defaultValues: {
      likes: true,
      comments: true,
      follows: true,
      mentions: true,
      directMessages: true,
      emailNotifications: false,
      pushNotifications: true
    }
  });

  const handlePasswordSubmit = (data: any) => {
    // In a real app, this would be an API call
    console.log("Password update data:", data);
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });
  };

  const handleNotificationSubmit = (data: any) => {
    // In a real app, this would be an API call
    console.log("Notification settings:", data);
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="account">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-48">
              <TabsList className="flex flex-col h-auto bg-transparent p-0 justify-start">
                <TabsTrigger 
                  value="account" 
                  className="justify-start mb-1 data-[state=active]:bg-muted w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="password" 
                  className="justify-start mb-1 data-[state=active]:bg-muted w-full"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Password
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start mb-1 data-[state=active]:bg-muted w-full"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="justify-start mb-1 data-[state=active]:bg-muted w-full"
                >
                  {theme === "light" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="justify-start data-[state=active]:bg-muted w-full"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account information and profile settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm">Change Avatar</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Display Name</label>
                        <Input value="Jane Doe"  />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Username</label>
                        <Input value="wellness_coach" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input value="jane@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone</label>
                        <Input value="(555) 123-4567" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Bio</label>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value="Wellness coach helping people live their best lives. Sharing daily tips on nutrition, fitness, and mindfulness."
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="password" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your current password" 
                                    {...field} 
                                  />
                                </FormControl>
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Enter new password" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Confirm new password" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" />
                          Update Password
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="space-y-4">
                        <h3 className="text-lg font-medium">Activity Notifications</h3>
                        <FormField
                          control={notificationForm.control}
                          name="likes"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <FormLabel className="text-base">Likes</FormLabel>
                                <FormDescription>
                                  Notify when someone likes your posts or comments
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="comments"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <FormLabel className="text-base">Comments</FormLabel>
                                <FormDescription>
                                  Notify when someone comments on your posts
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="follows"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <FormLabel className="text-base">New Followers</FormLabel>
                                <FormDescription>
                                  Notify when someone follows you
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Separator />
                        
                        <h3 className="text-lg font-medium">Notification Methods</h3>
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="pushNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <FormLabel className="text-base">Push Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications on your device
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" />
                          Save Notification Settings
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how the app looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <p className="text-muted-foreground text-sm">
                        Switch between light and dark themes
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <div className="flex-1 flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <Sun className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Light</p>
                              <p className="text-sm text-muted-foreground">Use light theme</p>
                            </div>
                          </div>
                          <Switch 
                            checked={theme === "light"} 
                            onCheckedChange={toggleTheme} 
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex-1 flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <Moon className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Dark</p>
                              <p className="text-sm text-muted-foreground">Use dark theme</p>
                            </div>
                          </div>
                          <Switch 
                            checked={theme === "dark"} 
                            onCheckedChange={toggleTheme} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Text Size</h3>
                      <p className="text-muted-foreground text-sm">
                        Adjust the size of text throughout the app
                      </p>
                      
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a text size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Manage your privacy and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Private Account</h3>
                          <p className="text-sm text-muted-foreground">
                            When enabled, only approved followers can see your posts
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Activity Status</h3>
                          <p className="text-sm text-muted-foreground">
                            Allow others to see when you're active
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                    
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
