import { ChatMessage } from "./chat-message";
import { UserChat } from "./user-chat";

export class Chat {
    name!: string;
    sender!: UserChat;
    receiver!: UserChat;
    messages!: ChatMessage[];

    constructor() {
        this.messages = [];
    }



}