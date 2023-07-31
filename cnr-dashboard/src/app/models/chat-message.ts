import { UserChat } from "./user-chat";

export class ChatMessage {
    user!: UserChat;
    message!: string;
    time!: string;
    isMine!: boolean;
}