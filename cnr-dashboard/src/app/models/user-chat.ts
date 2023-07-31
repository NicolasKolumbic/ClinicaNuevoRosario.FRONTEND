

export class UserChat  {
    isOnline!: boolean;
    fullName!: string;
    lastConnection!: string;
    lastMessage!: string;
    email!: string;

    constructor(user: any) {
        this.fullName = `${user.name} ${user.lastName}`;
        this.email = user.email;
    }
}