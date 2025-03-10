"use client";
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Image, Edit2, Calendar, MapPin, Link2, Save, PlusCircle, Check, UserPlus } from "lucide-react";
import PostModal from "@/components/PostModal";
import CreatePostModal from "@/components/CreatePostModal";

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

const Profile = () => {
  // const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usernameParam = queryParams.get('username');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowRequested, setIsFollowRequested] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [userProfile, setUserProfile] = useState({
    username: usernameParam || "wellness_coach",
    name: "Jane Doe",
    bio: "Wellness coach helping people live their best lives. Sharing daily tips on nutrition, fitness, and mindfulness.",
    email: "jane@example.com",
    location: "Los Angeles, CA",
    website: "wellnesscoach.com",
    joinDate: "January 2022"
  });

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0); 
  const [currentCollection, setCurrentCollection] = useState<Post[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  
  useEffect(() => {
    // Generate posts data
    const posts = Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      user: {
        username: usernameParam || "wellness_coach",
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg",
      caption: `Post ${i + 1} caption. This is a detailed post about wellness and self-care. #photography #lifestyle #wellness`,
      likes: Math.floor(Math.random() * 1000) + 100,
      comments: Math.floor(Math.random() * 50) + 5,
      timestamp: `${Math.floor(Math.random() * 10) + 1} DAYS AGO`
    }));
    
    // Generate saved posts data
    const saved = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 100,
      user: {
        username: `user_${i + 1}`,
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg",
      caption: `Saved post ${i + 1}. Great content to save for later! #inspiration #motivation`,
      likes: Math.floor(Math.random() * 2000) + 500,
      comments: Math.floor(Math.random() * 100) + 10,
      timestamp: `${Math.floor(Math.random() * 30) + 1} DAYS AGO`
    }));
    
    setUserPosts(posts);
    setSavedPosts(saved);
    
    if (usernameParam) {
      // If viewing someone else's profile
      setIsOwnProfile(usernameParam === "wellness_coach"); // Example username check
      
      setUserProfile(prev => ({
        ...prev,
        username: usernameParam
      }));
    }
  }, [usernameParam]);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleFollowRequest = () => {
    setIsFollowRequested(true);
  };

  const openPostModal = (post: Post, index: number, collection: Post[]) => {
    setSelectedPost(post);
    setSelectedPostIndex(index);
    setCurrentCollection(collection);
    setIsPostModalOpen(true);
  };

  const handleNavigatePost = (direction: 'next' | 'prev') => {
    if (!currentCollection.length) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedPostIndex + 1) % currentCollection.length;
    } else {
      newIndex = selectedPostIndex === 0 ? currentCollection.length - 1 : selectedPostIndex - 1;
    }
    
    setSelectedPostIndex(newIndex);
    setSelectedPost(currentCollection[newIndex]);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset selected post when changing tabs
    setSelectedPost(null);
    setIsPostModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-pink-500 to-orange-500"></div>
          <CardContent className="pt-0 relative">
            <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src="/placeholder.svg" alt={userProfile.username} />
                  <AvatarFallback>{userProfile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                  <p className="text-muted-foreground">@{userProfile.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                {isOwnProfile ? (
                  <>
                    <Button 
                      onClick={() => setIsCreatePostModalOpen(true)} 
                      variant="outline" 
                      className="flex items-center gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Create Post
                    </Button>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)} 
                      variant="outline"
                    >
                      {isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Profile
                        </>
                      ) : (
                        <>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleFollowRequest} 
                    variant={isFollowRequested ? "outline" : "default"}
                    className="flex items-center gap-1"
                    disabled={isFollowRequested}
                  >
                    {isFollowRequested ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Requested
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Username</label>
                    <Input
                      value={userProfile.username}
                      onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Bio</label>
                    <textarea
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Input
                      value={userProfile.location}
                      onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Website</label>
                    <Input
                      value={userProfile.website}
                      onChange={(e) => setUserProfile({...userProfile, website: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              ) : (
                <div>
                  <p className="mb-4">{userProfile.bio}</p>
                  <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center mr-6">
                      <MapPin className="mr-1 h-4 w-4" />
                      {userProfile.location}
                    </div>
                    <div className="flex items-center mr-6">
                      <Link2 className="mr-1 h-4 w-4" />
                      <a href={`https://${userProfile.website}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                        {userProfile.website}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Joined {userProfile.joinDate}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <div className="text-center">
                <p className="font-bold text-xl">{userPosts.length}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">3.4k</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">567</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="posts">
              <Grid className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Image className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="grid grid-cols-3 gap-2">
              {userPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openPostModal(post, index, userPosts)}
                >
                  <img 
                    src={post.image} 
                    alt={`Post by ${post.user.username}`} 
                    className="h-full w-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <div className="grid grid-cols-3 gap-2">
              {savedPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openPostModal(post, index, savedPosts)}
                >
                  <img 
                    src={post.image} 
                    alt={`Saved post by ${post.user.username}`} 
                    className="h-full w-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <PostModal 
          post={selectedPost} 
          posts={currentCollection}
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          onNavigate={handleNavigatePost}
        />

        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
