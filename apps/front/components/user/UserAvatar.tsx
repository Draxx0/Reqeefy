import { UploadFile } from '@reqeefy/types';
import { Avatar, AvatarFallback, AvatarImage } from '../server.index';

type User = {
  id: string;
  avatar: UploadFile | null;
  first_name: string;
  last_name: string;
  role: string;
};

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
      <AvatarImage
        src={user.avatar?.file_url}
        alt={`Photo de l'agent ${user.first_name} ${user.last_name}`}
        className="h-full w-full group-hover:opacity-80 transition-opacity ease-in-out duration-300"
      />
      <AvatarFallback className="w-full uppercase h-full text-xs flex items-center justify-center group-hover:opacity-80 transition-opacity ease-in-out duration-300">
        {user.first_name[0] + user.last_name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
