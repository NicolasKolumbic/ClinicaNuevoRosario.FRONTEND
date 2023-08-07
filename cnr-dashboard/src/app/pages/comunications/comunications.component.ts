import { Component, OnInit } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as moment from 'moment';
import { Chat } from 'src/app/models/chat';
import { ChatMessage } from 'src/app/models/chat-message';
import { UserChat } from 'src/app/models/user-chat';
import { UserData } from 'src/app/models/user-data';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'cnr-comunications',
  templateUrl: './comunications.component.html',
  styleUrls: ['./comunications.component.scss']
})
export class ComunicationsComponent implements OnInit {

  public userName = '';
  public groupName = '';
  public messageToSend = '';
  public joined = false;
  public conversation: NewMessage[] = [{
    message: 'Bienvenido',
    userName: 'Sistema'
  }];

  public user!: UserChat;
  public chats: Chat[] = [];
  public activeChat?: Chat;
  public currentMessage?: string;

  private connection: HubConnection;

  constructor(
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7148/hubs/chat', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.connection.on("NewUser", message => this.newUser(message));
    this.connection.on("NewMessage", message => this.newMessage(message));
    this.connection.on("LeftUser", message => this.leftUser(message));

  }

  ngOnInit(): void {
    const userData = this.authorizationService.getUserData() as UserData;
    this.user = new UserChat(userData);
    this.userService.users(this.user).subscribe((users) => this.generateChats(users))

    this.connection.start()
      .then(_ => {
        console.log('Connection Started');
      }).catch(error => {
        return console.error(error);
      });   
  }

  public generateChats( users: UserChat[]) {
    users.forEach((user: UserChat) => {
      const chat = new Chat();
      chat.receiver = user;
      this.chats.push(chat);
    })
  }

  public join(chat: Chat) {
    this.connection.invoke('JoinGroup', chat.name, this.user.email)
      .then(_ => {
        this.joined = true;
      });
  }

  public sendMessage(chat: Chat, message: ChatMessage) {
    const newMessage: NewMessage = {
      message: message.message,
      userName: this.user.fullName,
      groupName: chat.name
    };

    this.connection.invoke('SendMessage', newMessage)
      .then(_ => this.messageToSend = '');
  }

  public leave() {
    this.connection.invoke('LeaveGroup', this.groupName, this.userName)
      .then(_ => this.joined = false);
  }

  private newUser(message: string) {
      const system = new UserChat({name:'System', lastName:'Message'});
      const newMessage = new ChatMessage();
      newMessage.message = message;
      newMessage.time = moment().format('dd-MM-yyyy HH:mm:ss');
      newMessage.user =  system; 

      this.chats = this.chats.map((chat: Chat) => {
          if(chat.receiver.email === this.activeChat?.receiver.email && !(message.includes(this.user.email))) {
            chat.receiver.isOnline = true;
          }
          return chat;
      });

    this.activeChat?.messages.push(newMessage);
  }

  private newMessage(message: NewMessage) {
    const chat = this.chats.find((chat: Chat) => chat.name === message.groupName)!;
    const userChat = message.userName === chat.receiver.fullName ? chat.receiver : chat.sender;
    const newMessage = new ChatMessage();
      newMessage.message = message.message;
      newMessage.time = moment().format('dd-MM-yyyy HH:mm:ss');
      newMessage.user =  userChat; 
      newMessage.isMine = message.userName === chat.sender.fullName
    chat.messages.push(newMessage);
  }

  private leftUser(message: string) {
    console.log(message);
    this.conversation.push({
      userName: 'Sistema',
      message: message
    });
  }

  send() {
    if(this.currentMessage) {
      const message = new ChatMessage();
      message.message = this.currentMessage;
      message.time = moment().format('dd-MM-yyyy HH:mm:ss');
      message.user = this.user;
      this.sendMessage(this.activeChat!, message)
      this.currentMessage = "";
    }
     
  }

  setActive(chat: Chat) {
      this.chats = this.chats.map((chat: Chat) => {
        chat.receiver.isActive = false;
        return chat;
      })
      chat.receiver.isActive = true;
      if(!chat.sender) {
        chat.sender = this.user;
        chat.name = [chat.sender, chat.receiver].sort((a: UserChat, b: UserChat) => a.fullName.localeCompare(b.fullName)).map((user: UserChat) => user.email).join(' - ');
        this.join(chat);
      }
 
      this.activeChat = chat;     
  }



}

interface NewMessage {
  userName: string;
  message: string;
  groupName?: string;
}
