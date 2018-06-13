// Generated by https://quicktype.io

export interface User {
    id:            number;
    firstName?:    string;
    lastName?:     string;
    email:         string;
    phone:         string;
    introduction?: string;
    position?:     string;
    status:        number;
    createdAt:     CreatedAt;
    avatar?:       Avatar;
    roles?:        Role[];
}

export interface CreatedAt {
    date:          string;
    timezone_type: number;
    timezone:      string;
}


export interface Role {
    id:   number;
    name: string;
}

export interface Avatar {
    file: string;
    src: string;
}
