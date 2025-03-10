"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Story {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  seen: boolean;
}

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const StoryViewer = ({ stories, initialStoryIndex, isOpen, onClose }: StoryViewerProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextStory();
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isOpen, currentStoryIndex]);

  useEffect(() => {
    setCurrentStoryIndex(initialStoryIndex);
    setProgress(0);
  }, [initialStoryIndex, isOpen]);

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else {
      // If at first story, close the viewer
      onClose();
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // If at last story, close the viewer
      onClose();
    }
  };

  const currentStory = stories[currentStoryIndex];
  if (!currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 max-w-xl h-[90vh] overflow-hidden flex flex-col bg-black" aria-describedby="story-content">
        <DialogTitle className="sr-only">
          {currentStory.user.username}'s Story
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
        
        <div className="w-full px-2 pt-2 flex space-x-1">
          {stories.map((_, index) => (
            <div key={index} className="h-1 flex-grow rounded-full overflow-hidden bg-gray-600">
              <div 
                className={`h-full bg-white ${index < currentStoryIndex ? 'w-full' : 
                  index === currentStoryIndex ? 'transition-all duration-50 ease-linear' : 'w-0'}`}
                style={{ width: index === currentStoryIndex ? `${progress}%` : undefined }}
              />
            </div>
          ))}
        </div>
        
        <div className="px-4 py-3 flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={currentStory.user.avatar} alt={currentStory.user.username} />
            <AvatarFallback>{currentStory.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white">{currentStory.user.username}</span>
          <span className="text-xs text-gray-400 ml-2">1h</span>
        </div>
        
        <div id="story-content" className="flex-grow relative flex items-center justify-center">
          <img src="/placeholder.svg" alt="Story" className="max-h-full max-w-full object-contain" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/30"
            onClick={handlePrevStory}
          >
            <ChevronLeft className="h-4 w-4" />
            <VisuallyHidden>Previous story</VisuallyHidden>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/30"
            onClick={handleNextStory}
          >
            <ChevronRight className="h-4 w-4" />
            <VisuallyHidden>Next story</VisuallyHidden>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
