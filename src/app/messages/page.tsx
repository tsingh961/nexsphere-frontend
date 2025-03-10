"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Send, Search } from "lucide-react";

interface Conversation {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: number;
  content: string;
  timestamp: string;
  isIncoming: boolean;
  sender?: string;
}

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! How are you doing today?",
      timestamp: "10:32 AM",
      isIncoming: true,
      sender: "nutrition_tips"
    },
    {
      id: 2,
      content: "I'm good, thanks for asking! How about you?",
      timestamp: "10:35 AM",
      isIncoming: false
    },
    {
      id: 3,
      content: "Doing well! Did you try that new recipe I sent you?",
      timestamp: "10:37 AM",
      isIncoming: true,
      sender: "nutrition_tips"
    },
    {
      id: 4,
      content: "Yes, it was delicious! I especially loved the spice mix.",
      timestamp: "10:40 AM",
      isIncoming: false
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMessageObj: Message = {
      id: messages.length + 1,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isIncoming: false
    };
    
    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout>
      <Card className="h-[calc(100vh-10rem)] overflow-hidden">
        <div className="h-full flex">
          {/* Conversations Sidebar */}
          <div className="w-80 border-r border-border h-full overflow-hidden flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search messages..."
                />
              </div>
            </div>
            <Separator />
            <div className="overflow-y-auto flex-1">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    activeConversation === conversation.id && "bg-muted"
                  )}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {conversation.unread && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{conversation.user.name}</span>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              {activeConversation ? (
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage 
                      src={conversations.find(c => c.id === activeConversation)?.user.avatar || ''} 
                      alt="Chat avatar" 
                    />
                    <AvatarFallback>
                      {conversations.find(c => c.id === activeConversation)?.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{conversations.find(c => c.id === activeConversation)?.user.name}</p>
                    <p className="text-xs text-muted-foreground">@{conversations.find(c => c.id === activeConversation)?.user.username}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Select a conversation</p>
              )}
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConversation && messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    message.isIncoming 
                      ? "bg-muted ml-0 mr-auto" 
                      : "bg-primary text-primary-foreground ml-auto mr-0"
                  )}
                >
                  <p>{message.content}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    message.isIncoming ? "text-muted-foreground" : "text-primary-foreground/80"
                  )}>
                    {message.timestamp}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            {activeConversation && (
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

const conversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: "Nutrition Tips",
      username: "nutrition_tips",
      avatar: "/placeholder.svg"
    },
    lastMessage: "Doing well! Did you try that new recipe I sent you?",
    timestamp: "10:37 AM",
    unread: true
  },
  {
    id: 2,
    user: {
      name: "Fitness Journey",
      username: "fitness_journey",
      avatar: "/placeholder.svg"
    },
    lastMessage: "Great workout today! Keep it up!",
    timestamp: "Yesterday",
    unread: false
  },
  {
    id: 3,
    user: {
      name: "Wellness Coach",
      username: "wellness_coach",
      avatar: "/placeholder.svg"
    },
    lastMessage: "Let me know if you need any help with your meditation practice.",
    timestamp: "2 days ago",
    unread: false
  },
  {
    id: 4,
    user: {
      name: "Mindful Living",
      username: "mindful_living",
      avatar: "/placeholder.svg"
    },
    lastMessage: "Remember to take breaks throughout your day!",
    timestamp: "3 days ago",
    unread: false
  },
  {
    id: 5,
    user: {
      name: "Healthy Habits",
      username: "healthy_habits",
      avatar: "/placeholder.svg"
    },
    lastMessage: "How's that new morning routine working for you?",
    timestamp: "1 week ago",
    unread: false
  }
];

export default Messages;
