import { Playlist } from "./playlist";

export class User{
    id : number;
    name : string;
    picture : string;
    email : string;
    password : string;
    followers : number;
    artist : boolean
    playlists : Playlist[];

    constructor(){
        this.id = 0;
        this.name = '';
        this.picture = '';
        this.email = '';
        this.password = '';
        this.followers = 0;
        this.artist = false;
        this.playlists = [];
    }
}