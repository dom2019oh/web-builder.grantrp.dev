import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MessageSquare, Send, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: "owner" | "editor" | "viewer";
  status: "active" | "offline";
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

interface CollaborationPanelProps {
  onInvite: (email: string) => void;
  onAddComment: (text: string) => void;
}

export const CollaborationPanel = ({ onInvite, onAddComment }: CollaborationPanelProps) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "You",
      email: "you@example.com",
      role: "owner",
      status: "active",
    },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "You",
      text: "Let's update the hero section colors",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleInvite = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    onInvite(inviteEmail);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      text: newComment,
      timestamp: new Date(),
    };

    setComments([...comments, comment]);
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <Card className="glass glass-glow p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Team</h3>
        </div>

        <div className="flex gap-2">
          <Input
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="glass flex-1"
          />
          <Button onClick={handleInvite} size="sm" className="glass glass-glow">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        </div>

        <ScrollArea className="h-48">
          <div className="space-y-2">
            {collaborators.map((collab) => (
              <Card key={collab.id} className="glass p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="glass glass-glow">
                      {collab.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{collab.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{collab.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={collab.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {collab.role}
                    </Badge>
                    {collab.status === "active" && (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-4 border-t border-border/50 pt-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Comments</h3>
        </div>

        <ScrollArea className="h-48">
          <div className="space-y-3">
            {comments.map((comment) => (
              <Card key={comment.id} className="glass p-3">
                <div className="flex gap-2">
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarFallback className="glass glass-glow text-xs">
                      {comment.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {comment.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            placeholder="Add a comment..."
            className="glass flex-1"
          />
          <Button
            onClick={handleAddComment}
            size="sm"
            disabled={!newComment.trim()}
            className="glass glass-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
