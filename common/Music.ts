export class Music {
    id: number;
    name: string;
    author: string;
    categorie: string;

    constructor(music: Music) {
        this.id = music.id;
        this.name = music.name;
        this.author = music.author;
        this.categorie = music.categorie;
    }

    update(music: Music): void {
        this.name = music.name;
        this.author = music.author;
    }

}
