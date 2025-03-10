
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check, UserPlus } from "lucide-react";
import Link from "next/link";

const SuggestionSidebar = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <aside className="w-72 border-l border-border h-screen sticky top-0 overflow-y-auto p-4 hidden lg:block">
      <div className="flex items-center mb-8">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg" alt="Your profile" />
          <AvatarFallback>YP</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h3 className="font-medium">username</h3>
          <p className="text-sm text-muted-foreground">Your Name</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-muted-foreground">Suggestions For You</h4>
          <button className="text-xs font-medium hover:opacity-80 transition-opacity">
            See All
          </button>
        </div>

        <div className="space-y-3">
          {suggestionUsers.map((user) => (
            <SuggestionCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      <footer className="mt-8">
        <nav className="flex flex-wrap text-xs text-muted-foreground gap-x-2 gap-y-1 mb-4">
          <a href="#" className="hover:underline">About</a>
          <span>•</span>
          <a href="#" className="hover:underline">Help</a>
          <span>•</span>
          <a href="#" className="hover:underline">Press</a>
          <span>•</span>
          <a href="#" className="hover:underline">API</a>
          <span>•</span>
          <a href="#" className="hover:underline">Jobs</a>
          <span>•</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms</a>
        </nav>
        <p className="text-xs text-muted-foreground">
          © 2023 INSTA WELL
        </p>
      </footer>
    </aside>
  );
};

interface User {
  id: number;
  username: string;
  name: string;
  avatar: string;
  reason: string;
}

interface SuggestionCardProps {
  user: User;
}

const SuggestionCard = ({ user }: SuggestionCardProps) => {
  const [followRequested, setFollowRequested] = useState(false);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFollowRequested(true);
  };

  return (
    <div className="suggestion-card flex items-center justify-between p-1">
      <Link 
        href={`/profile?username=${user.username}`}
        className="flex items-center flex-grow hover:opacity-90 transition-opacity"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h5 className="text-sm font-medium">{user.username}</h5>
          <p className="text-xs text-muted-foreground">{user.reason}</p>
        </div>
      </Link>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs font-medium text-primary h-7 hover:bg-secondary"
        onClick={handleFollowClick}
        disabled={followRequested}
      >
        {followRequested ? (
          <>
            <Check className="h-3 w-3 mr-1" />
            Requested
          </>
        ) : (
          <>
            <UserPlus className="h-3 w-3 mr-1" />
            Follow
          </>
        )}
      </Button>
    </div>
  );
};

const suggestionUsers: User[] = [
  {
    id: 1,
    username: "health_enthusiast",
    name: "Health Enthusiast",
    avatar: "/placeholder.svg",
    reason: "New to Instagram"
  },
  {
    id: 2,
    username: "fitness_coach",
    name: "Fitness Coach",
    avatar: "/placeholder.svg",
    reason: "Followed by user1, user2"
  },
  {
    id: 3,
    username: "nutrition_expert",
    name: "Nutrition Expert",
    avatar: "/placeholder.svg",
    reason: "Suggested for you"
  },
  {
    id: 4,
    username: "mindfulness_guru",
    name: "Mindfulness Guru",
    avatar: "/placeholder.svg",
    reason: "Followed by user3"
  },
  {
    id: 5,
    username: "wellness_tips",
    name: "Wellness Tips",
    avatar: "/placeholder.svg",
    reason: "Popular account"
  }
];

export default SuggestionSidebar;
