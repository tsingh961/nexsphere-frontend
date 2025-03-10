"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, User, Image, Hash } from "lucide-react";

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
}

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: number;
}

interface Hashtag {
  id: number;
  name: string;
  postCount: number;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredHashtags = hashtags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 h-12 text-lg"
            placeholder="Search people, posts, hashtags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="users">
              <User className="mr-2 h-4 w-4" />
              People
            </TabsTrigger>
            <TabsTrigger value="posts">
              <Image className="mr-2 h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="hashtags">
              <Hash className="mr-2 h-4 w-4" />
              Hashtags
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardContent className="p-0">
                {searchQuery.length > 0 && filteredUsers.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No users found. Try a different search term.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredUsers.map(user => (
                      <div key={user.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-baseline">
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground ml-2">@{user.username}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{user.bio}</p>
                          </div>
                        </div>
                        <Button variant={user.isFollowing ? "outline" : "default"} size="sm">
                          {user.isFollowing ? "Following" : "Follow"}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="posts">
            <div className="grid grid-cols-3 gap-2">
              {posts.map(post => (
                <div key={post.id} className="aspect-square bg-muted rounded-lg overflow-hidden relative group">
                  <img src={post.image} alt="Post" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <div className="flex items-center text-white">
                      <SearchIcon className="h-5 w-5 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <SearchIcon className="h-5 w-5 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hashtags">
            <Card>
              <CardContent className="p-0">
                {searchQuery.length > 0 && filteredHashtags.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No hashtags found. Try a different search term.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredHashtags.map(hashtag => (
                      <div key={hashtag.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-lg">#{hashtag.name}</p>
                            <p className="text-sm text-muted-foreground">{hashtag.postCount.toLocaleString()} posts</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const users: User[] = [
  {
    id: 1,
    name: "Wellness Coach",
    username: "wellness_coach",
    avatar: "/placeholder.svg",
    bio: "Helping you live your best life through wellness tips and mindfulness practices.",
    isFollowing: true
  },
  {
    id: 2,
    name: "Nutrition Tips",
    username: "nutrition_tips",
    avatar: "/placeholder.svg",
    bio: "Sharing healthy recipes and nutrition information to fuel your body properly.",
    isFollowing: false
  },
  {
    id: 3,
    name: "Fitness Journey",
    username: "fitness_journey",
    avatar: "/placeholder.svg",
    bio: "Documenting my fitness journey from beginner to advanced. Join me!",
    isFollowing: true
  },
  {
    id: 4,
    name: "Mindful Living",
    username: "mindful_living",
    avatar: "/placeholder.svg",
    bio: "Practicing mindfulness every day for better mental health and well-being.",
    isFollowing: false
  },
  {
    id: 5,
    name: "Healthy Habits",
    username: "healthy_habits",
    avatar: "/placeholder.svg",
    bio: "Building sustainable healthy habits one day at a time.",
    isFollowing: false
  }
];

const posts: Post[] = [
  { id: 1, image: "/placeholder.svg", likes: 243, comments: 18 },
  { id: 2, image: "/placeholder.svg", likes: 198, comments: 24 },
  { id: 3, image: "/placeholder.svg", likes: 876, comments: 42 },
  { id: 4, image: "/placeholder.svg", likes: 543, comments: 31 },
  { id: 5, image: "/placeholder.svg", likes: 421, comments: 27 },
  { id: 6, image: "/placeholder.svg", likes: 678, comments: 35 },
  { id: 7, image: "/placeholder.svg", likes: 321, comments: 19 },
  { id: 8, image: "/placeholder.svg", likes: 456, comments: 22 },
  { id: 9, image: "/placeholder.svg", likes: 789, comments: 38 }
];

const hashtags: Hashtag[] = [
  { id: 1, name: "wellness", postCount: 5342789 },
  { id: 2, name: "nutrition", postCount: 2876543 },
  { id: 3, name: "fitness", postCount: 9876543 },
  { id: 4, name: "mindfulness", postCount: 1987654 },
  { id: 5, name: "healthyeating", postCount: 3456789 },
  { id: 6, name: "selfcare", postCount: 4567890 },
  { id: 7, name: "mentalhealth", postCount: 3678901 },
  { id: 8, name: "meditation", postCount: 1789023 }
];

export default Search;
