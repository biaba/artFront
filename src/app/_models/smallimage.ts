import { User } from './user';

export enum CategoryType {
    PAINTING, DRAWING, SCULPTURE, CERAMICS, PHOTOGRAPHY, CRAFTS
}

export class Smallimage {
    id: number;
    name: string;
    fileUrl: string;
    creator: User;
    category: CategoryType;
    forSale: boolean;
    sold?: boolean;
    buyer?: User;
    description?: string;
    price?: number;
}

