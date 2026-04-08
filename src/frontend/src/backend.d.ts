import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type LoginResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export type AddVideoResult = {
    __kind__: "ok";
    ok: YouTubeVideo;
} | {
    __kind__: "err";
    err: string;
};
export interface YouTubeVideo {
    id: bigint;
    url: string;
    title: string;
    addedAt: bigint;
}
export interface Certificate {
    id: bigint;
    url: string;
}
export interface backendInterface {
    addCertificate(token: string, url: string): Promise<bigint>;
    addYouTubeVideo(url: string, title: string): Promise<AddVideoResult>;
    adminLogin(username: string, password: string): Promise<LoginResult>;
    adminLogout(token: string): Promise<void>;
    clearHeroPanelMedia(token: string, slotIndex: bigint): Promise<void>;
    getCertificates(): Promise<Array<Certificate>>;
    getHeroPanelMedia(): Promise<Array<string>>;
    getYouTubeVideos(): Promise<Array<YouTubeVideo>>;
    removeCertificate(token: string, id: bigint): Promise<void>;
    removeYouTubeVideo(id: bigint): Promise<void>;
    setHeroPanelMedia(token: string, slotIndex: bigint, url: string): Promise<void>;
    verifyAdminSession(token: string): Promise<boolean>;
}
