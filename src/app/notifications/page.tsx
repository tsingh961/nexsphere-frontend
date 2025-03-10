
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, UserPlus, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6 grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <NotificationList notifications={notifications} />
          </TabsContent>
          
          <TabsContent value="likes">
            <NotificationList notifications={notifications.filter(n => n.type === "like")} />
          </TabsContent>
          
          <TabsContent value="comments">
            <NotificationList notifications={notifications.filter(n => n.type === "comment")} />
          </TabsContent>
          
          <TabsContent value="follows">
            <NotificationList notifications={notifications.filter(n => n.type === "follow")} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No notifications to display</p>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const getIcon = () => {
    switch(notification.type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "mention":
        return <Star className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div className={cn(
      "p-4 flex items-start space-x-3 hover:bg-muted/50 transition-colors",
      !notification.read && "bg-muted/30"
    )}>
      <Avatar>
        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
        <AvatarFallback>{notification.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{notification.user.username}</span>
              <span className="bg-muted p-1 rounded-full">{getIcon()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
          </div>
          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Nutrition Tips",
      username: "nutrition_tips",
      avatar: "/placeholder.svg"
    },
    content: "liked your post about morning smoothie recipes",
    timestamp: "Just now",
    read: false
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Fitness Journey",
      username: "fitness_journey",
      avatar: "/placeholder.svg"
    },
    content: "commented on your workout post: 'Great form! Keep it up!'",
    timestamp: "5 minutes ago",
    read: false
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Wellness Coach",
      username: "wellness_coach",
      avatar: "/placeholder.svg"
    },
    content: "started following you",
    timestamp: "1 hour ago",
    read: true
  },
  {
    id: 4,
    type: "mention",
    user: {
      name: "Mindful Living",
      username: "mindful_living",
      avatar: "/placeholder.svg"
    },
    content: "mentioned you in a comment: 'You should check out @user's profile for more meditation tips!'",
    timestamp: "3 hours ago",
    read: true
  },
  {
    id: 5,
    type: "like",
    user: {
      name: "Healthy Habits",
      username: "healthy_habits",
      avatar: "/placeholder.svg"
    },
    content: "liked your comment on their post",
    timestamp: "Yesterday",
    read: true
  },
  {
    id: 6,
    type: "follow",
    user: {
      name: "Daily Wellness",
      username: "daily_wellness",
      avatar: "/placeholder.svg"
    },
    content: "started following you",
    timestamp: "2 days ago",
    read: true
  }
];

export default Notifications;
