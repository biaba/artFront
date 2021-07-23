import { Image } from './image';

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    about?: string;
    authdata?: string;
    jSessionId?: string;
    createdImages?: Image[];
    boughtImages?: Image[];
}
