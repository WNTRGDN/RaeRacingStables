export interface IWebsite {
    id: number;
    key: string;
    name: string;
    routes: IRoute[];
    menus: IMenu[];
    settings: ISettings;
    socials: ISocials;
    createDate: Date;
    updateDate: Date;
}

export interface ISocials {
    facebook: string;
    instagram: string;
    twitter: string
}

export interface IRoute {
    [key:string]: number;
}

export interface IParams {
    slug: string[];
}

export interface IPage {
    id: number;
    key: string;
    level: number;
    name: string;
    url: string;
    blocks: IBlock[];
    metaData: IMetaData;
    createDate: string;
    updateDate: string;
    breadcrumbs: IBreadcrumb[];
}

export interface IBreadcrumb {
    title: string,
    url: string
}

export interface IMetaData {
    title: string;
    keywords: string[];
    description: string;
    image: string;
}

export interface ISettings {
    address: string;
    email: string;
    logo: string;
    phone: string;
    openingHours: IOpeningHours[];
}

export interface IMenu {
    title: string;
    links: ILink[];
    includeHome: boolean;
    alias: string;
    exists: boolean;
}

export interface ILink {
    title: string;
    url: string;
}

export interface IOpeningHours {
    day: string;
    opening: Date;
    closing: Date;
    order: number;
}

export interface IBlock {
    type: string;
    alias: string;
    order: number;
}

export interface IHeader {
    settings: ISettings;
    menus: IMenu[];
}

export interface IFooter {
    settings: ISettings;
    menus: IMenu[];
    name: string;
    socials: ISocials;
}