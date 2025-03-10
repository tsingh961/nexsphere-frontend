"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Bookmark, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  posts?: Post[];
  onNavigate?: (direction: 'next' | 'prev') => void;
}

const PostModal = ({ post, isOpen, onClose, posts = [], onNavigate }: PostModalProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!post) return null;

  const hasMultiplePosts = posts.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 max-w-5xl h-[80vh] flex flex-col md:flex-row overflow-hidden" aria-describedby="post-content">
        <DialogTitle className="sr-only">
          Post by {post.user.username}
        </DialogTitle>
        
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/30"
        >
          <X className="h-4 w-4" />
          <VisuallyHidden>Close</VisuallyHidden>
        </Button>
        
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative">
          <img
            src={post.image}
            alt={`Post by ${post.user.username}`}
            className="max-h-full max-w-full object-contain"
          />
          
          {hasMultiplePosts && onNavigate && (
            <>
              <Button 
                onClick={() => onNavigate('prev')}
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/30"
                aria-label="Previous post"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button 
                onClick={() => onNavigate('next')}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/30"
                aria-label="Next post"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
        
        <div id="post-content" className="w-full md:w-2/5 flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar} alt={post.user.username} />
                <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{post.user.username}</span>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            <div className="flex items-start space-x-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar} alt={post.user.username} />
                <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div>
                  <span className="font-medium text-sm mr-2">{post.user.username}</span>
                  <span className="text-sm">{post.caption}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{post.timestamp}</p>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U{i+1}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>
                      <span className="font-medium text-sm mr-2">user_{i+1}</span>
                      <span className="text-sm">This is amazing! Great content.</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-muted-foreground">2d</span>
                      <button className="text-xs text-muted-foreground">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setLiked(!liked)}
                  aria-label={liked ? "Unlike post" : "Like post"}
                >
                  <Heart className={cn("h-6 w-6", liked && "fill-red-500 text-red-500")} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Comment on post">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Share post">
                  <Send className="h-6 w-6" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setSaved(!saved)}
                aria-label={saved ? "Remove from saved" : "Save post"}
              >
                <Bookmark className={cn("h-6 w-6", saved && "fill-current")} />
              </Button>
            </div>
            <p className="font-medium text-sm">{post.likes.toLocaleString()} likes</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            
            <div className="flex items-center mt-3 border-t pt-3">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="flex-grow bg-transparent text-sm outline-none"
                aria-label="Add a comment"
              />
              <Button variant="ghost" size="sm" className="text-primary">Post</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
