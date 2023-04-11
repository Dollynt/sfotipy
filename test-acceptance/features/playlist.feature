Feature:  playlist
As a user
I want to acess the playlist section
So that I can create and manage my playlists

    Scenario: create playlist
        Given I am logged in with "lgar@cin.ufpe.br" and "123"
        And I am at the "criar_playlist" page
        When I insert the playlist name "pop" with the music "Yellow"
        And I create the playlist
        Then I can see a confirmation message "Playlist criada com sucesso"
        And I am redirected to the "minhas_playlists" page
        And I can see the "pop" playlist