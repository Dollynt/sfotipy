import 'jasmine'
import { PlaylistService } from '../src/playlist-service'
import { Playlist } from '../../common/playlist'
import { User } from '../../common/user'

describe('PlaylistService', () => {
    var timeout: number;
    var playlistService: PlaylistService;
    var length: number;
    var playlist: Playlist;

    var newPlaylist = new Playlist(<Playlist><unknown>{
        "id": 0,
        "name": "Piores Rock",
        "categories": [2],
        "musics": [18, 19, 20],
        "image": "https://cdns-images.dzcdn.net/images/artist/21e53b8e8285f84f60601d895c39c900/500x500.jpg",
        "link": "",
        "owner": "geraldo",
        "followers": ['a', 'b'],
        "availability": "public",
        "accessPlaylits": 9,
        "ownerId": 123
      })

    var newUser = new User();
    newUser.id = 123;
    newUser.name = 'geraldo';
    newUser.email = 'email@email.com';
    newUser.password = '123456';
    newUser.playlists = [newPlaylist];

    beforeAll(() => {
        process.stdout.write("playlist-service: ");
    });

    beforeEach(() => {
        playlistService = new PlaylistService()
        timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });

    afterAll(() => {
        console.log("\n");
    });

    function add(playlist: Playlist): void {
        playlistService.addPlaylist(playlist);
    }

    function deletePlaylist(id: number): void {
        playlistService.delete(id);
    }

    it("ter inicialmente 13 playlists cadastradas", () => {
        expect(playlistService.playlists.length).toEqual(13);
    });

    it("deve cadastrar uma nova playlist", () => {
        add(newPlaylist);

        length = playlistService.playlists.length;
        playlist = playlistService.playlists[length - 1];
        expect(playlist.id).toBe(length - 1);
        expect(playlist.name).toBe('Piores Rock');
        expect(playlist.categories).toEqual([2]);

        deletePlaylist(length - 1);
    });

    it("deve retornar as playlists de um usuário", () => {
        add(newPlaylist);

        let playlists = playlistService.getUserPlaylists(newUser.id);
        length = playlistService.playlists.length;
        playlist = playlistService.playlists[length - 1];
        expect(playlists.length).toBe(1);
        expect(playlists[0].id).toBe(length - 1);
        expect(playlists[0].name).toBe('Piores Rock');
        expect(playlists[0].categories).toEqual([2]);

        deletePlaylist(length - 1);
    });

    it("deve verificar se o nome da playlist já existe", () => {
        add(newPlaylist);

        length = playlistService.playlists.length;
        playlist = playlistService.playlists[length - 1];

        let exists = playlistService.verificarNomePlaylistExistente('Piores Rock', 123);
        expect(exists).toBe(true);

        deletePlaylist(length - 1);
    });

    it("deve retornar todas as playlists", () => {
        length = playlistService.playlists.length;
        let playlists = playlistService.get();
        expect(playlists.length).toBe(length);
        for (let i = 0; i < playlists.length; i++) {
            expect(playlists[i].id).toBe(i);
        }
    });

    it("deve retornar uma playlist pelo id", () => {
        add(newPlaylist);

        length = playlistService.playlists.length;
        playlist = playlistService.getById(length - 1);
        expect(playlist.id).toBe(length - 1);
        expect(playlist.name).toBe('Piores Rock');
        expect(playlist.categories).toEqual([2]);

        deletePlaylist(length - 1);
    });

    it("deve retornar undefined se a playlist não existir", () => {
        let playlist = playlistService.getById(-1);
        expect(playlist).toBeUndefined();
    });

    it("deve atualizar uma playlist", () => {
        add(newPlaylist);

        length = playlistService.playlists.length;
        playlist = playlistService.playlists[length - 1];
        playlist.name = 'Rock';
        playlistService.update(playlist);
        playlist = playlistService.playlists[length - 1];
        expect(playlist.id).toBe(length - 1);
        expect(playlist.name).toBe('Rock');
        expect(playlist.categories).toEqual([2]);

        deletePlaylist(length - 1);
    });

    it("deve deletar uma playlist", () => {
        add(newPlaylist);
        length = playlistService.playlists.length;
        playlistService.delete(length - 1);
        expect(playlistService.playlists.length).toBe(length - 1);
    });

    it("deve adicionar uma categoria a uma playlist", () => {
        add(newPlaylist);

        length = playlistService.playlists.length;
        playlist = playlistService.playlists[length - 1];
        expect(playlist.categories).toEqual([2]);
        playlistService.addNewCategory(length - 1, 3);
        expect(playlist.categories).toEqual([2, 3]);
        playlistService.deleteCategory(length - 1, 3);

        deletePlaylist(length - 1);
    });

    it("deve deletar uma categoria de uma playlist", () => {
        add(newPlaylist);
        length = playlistService.playlists.length;
        playlist = playlistService.playlists[length - 1];
        expect(playlist.categories).toEqual([2]);
        playlistService.deleteCategory(length - 1, 2);
        expect(playlist.categories).toEqual([]);
        playlistService.addNewCategory(length - 1, 2);
        deletePlaylist(length - 1);
    });

});
