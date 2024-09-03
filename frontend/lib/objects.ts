enum requestType {
    ADD,
    CAPTURE,
    ANALYSE
}

enum requestStatus {
    PENDING,
    SUCCESS,
    FAILED
}

export interface request {
    id: string;
    type: requestType;
    body: string;
    createdAt: string;
    status: requestStatus;
    result?: string;
    remoteId?: string;
    userId: string;
    imageId?: string;
}

export interface remote {
    id: string;
    name: string;
    username? : string;
    host : string;
    port : number;
    privateKey : string;
    createdAt: string;
    userId : string;
}

export interface image {
    id: string,
    name : string,
    path: string,
    createdAt: string,
    remoteId: string,
    userId: string,
}