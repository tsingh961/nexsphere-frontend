"use client";
import { useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import StoryViewer from "./StoryViewer";
import CreatePostModal from "../CreatePostModal";

interface Story {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  seen: boolean;
}

interface Post {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const FeedContent = () => {
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  
  const openStoryViewer = (storyIndex: number) => {
    setSelectedStoryIndex(storyIndex);
    setIsStoryViewerOpen(true);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-medium text-muted-foreground">Stories</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCreatePostModalOpen(true)}
          className="flex items-center gap-1 text-primary"
        >
          <PlusCircle className="h-4 w-4" />
          Create
        </Button>
      </div>
      
      {/* Stories Section */}
      <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {stories.map((story, index) => (
            <div 
              key={story.id} 
              className="cursor-pointer"
              onClick={() => openStoryViewer(index)}
            >
              <StoryItem story={story} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Vertical Feed Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>

      {/* Modals */}
      <StoryViewer
        stories={stories}
        initialStoryIndex={selectedStoryIndex}
        isOpen={isStoryViewerOpen}
        onClose={() => setIsStoryViewerOpen(false)}
      />
      
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </div>
  );
};

interface StoryItemProps {
  story: Story;
}

const StoryItem = ({ story }: StoryItemProps) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Link href={`/profile?username=${story.user.username}`} className="cursor-pointer">
        <div className={`rounded-full p-0.5 ${story.seen ? 'bg-muted' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
          <Avatar className="h-16 w-16 border-2 border-background">
            <AvatarImage src={story.user.avatar} alt={story.user.username} />
            <AvatarFallback>{story.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-xs truncate max-w-[70px] text-center block">{story.user.username}</span>
      </Link>
    </div>
  );
};

interface FeedPostProps {
  post: Post;
}

const FeedPost = ({ post }: FeedPostProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <Card className="overflow-hidden border-border animate-in fade-in">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href={`/profile?username=${post.user.username}`} className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.avatar} alt={post.user.username} />
              <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{post.user.username}</span>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="aspect-square w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={`Post by ${post.user.username}`} 
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-6 w-6", liked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setSaved(!saved)}
          >
            <Bookmark className={cn("h-6 w-6", saved && "fill-current")} />
          </Button>
        </div>
        
        <p className="font-medium text-sm">{post.likes.toLocaleString()} likes</p>
        <div className="mt-1">
          <span className="font-medium text-sm mr-2">{post.user.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>
        
        <button className="text-muted-foreground text-sm mt-2">
          View all {post.comments} comments
        </button>
        
        <p className="text-xs text-muted-foreground mt-2">{post.timestamp}</p>
      </CardFooter>
    </Card>
  );
};

const stories: Story[] = [
  {
    id: 1,
    user: {
      username: "wellness_coach",
      avatar: "/placeholder.svg",
    },
    seen: false
  },
  {
    id: 2,
    user: {
      username: "travel_adventures",
      avatar: "/placeholder.svg",
    },
    seen: false
  },
  {
    id: 3,
    user: {
      username: "fitness_journey",
      avatar: "/placeholder.svg",
    },
    seen: true
  },
  {
    id: 4,
    user: {
      username: "food_lover",
      avatar: "/placeholder.svg",
    },
    seen: false
  },
  {
    id: 5,
    user: {
      username: "tech_enthusiast",
      avatar: "/placeholder.svg",
    },
    seen: true
  },
  {
    id: 6,
    user: {
      username: "art_creator",
      avatar: "/placeholder.svg",
    },
    seen: false
  },
  {
    id: 7,
    user: {
      username: "fashion_icon",
      avatar: "/placeholder.svg",
    },
    seen: true
  }
];

const posts: Post[] = [
  {
    id: 1,
    user: {
      username: "wellness_coach",
      avatar: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    caption: "Start your day with mindful moments. #wellness #selfcare",
    likes: 1243,
    comments: 42,
    timestamp: "2 HOURS AGO"
  },
  {
    id: 2,
    user: {
      username: "nutrition_tips",
      avatar: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    caption: "Healthy meal prep ideas for the week! #nutrition #healthyeating",
    likes: 892,
    comments: 31,
    timestamp: "5 HOURS AGO"
  },
  {
    id: 3,
    user: {
      username: "fitness_journey",
      avatar: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    caption: "Morning workout complete! Feeling energized and ready for the day. #fitness #motivation",
    likes: 1567,
    comments: 78,
    timestamp: "8 HOURS AGO"
  }
];

export default FeedContent;
