"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setActiveTab("details");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image for your post",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Post created!",
        description: "Your post has been published successfully",
      });
      
      // Reset form and close modal
      setCaption("");
      setSelectedImage(null);
      setActiveTab("upload");
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setCaption("");
    setSelectedImage(null);
    setActiveTab("upload");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedImage}>Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4 py-4">
            <div 
              className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center"
              style={{ minHeight: "200px" }}
            >
              <Image className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center mb-4">
                Drag photos here or click to upload
              </p>
              <div className="relative">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full cursor-pointer"
                  onChange={handleFileChange}
                />
                <Button variant="outline">Select from computer</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4 py-4">
            {selectedImage && (
              <div className="aspect-square w-full mb-4 bg-muted rounded-md overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="h-full w-full object-cover" 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <textarea
                id="caption"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Share"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
