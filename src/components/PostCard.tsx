
import { Post } from '@/services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, User } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/60 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-5 pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-medium line-clamp-1 group">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {post.title}
            </span>
          </CardTitle>
          <Badge variant="outline" className="shrink-0 rounded-full font-semibold">
            #{post.id}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 text-xs mt-1">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                    {post.userId}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" /> User {post.userId}
                </span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 text-sm p-4">
              <div className="flex flex-col gap-2">
                <div className="font-medium">User Profile</div>
                <div className="text-xs text-muted-foreground">
                  This post was created by User {post.userId}. Click to view more posts from this user.
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-5 pt-0">
        <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed">
          {post.body}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <div className="w-full flex justify-between items-center">
          <Badge variant="secondary" className="text-xs flex items-center gap-1 rounded-full bg-secondary/80">
            <FileText className="h-3 w-3" /> Post
          </Badge>
          <button className="text-xs font-medium text-primary hover:underline transition-all">
            Read more
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
