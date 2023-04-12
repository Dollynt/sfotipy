Feature:  playlist
As a user
I want to acess the playlist section
So that I can create and manage my playlists

    Scenario: create playlist with music
        Given I am logged in with "lgar@cin.ufpe.br" and "123"
        And I am at the "criar_playlist" page
        When I insert the playlist name "pop" with the music "Yellow"
        And I create the playlist
        Then I can see a confirmation message "Playlist criada com sucesso"
        And I am redirected to the "minhas_playlists" page
        And I can see the "pop" playlist

    Scenario: create playlist without music
        Given I am at the "criar_playlist" page
        When I insert the playlist name "melhores"
        And I create the playlist
        Then I can see a confirmation message "Playlist criada com sucesso"
        And I am redirected to the "minhas_playlists" page
        And I can see the "melhores" playlist

    Scenario: create existent playlist 
        Given I am at the "criar_playlist" page
        When I insert the playlist name "pop" with the music "Yellow"
        And I create the playlist
        Then I can see an error message "Já existe uma playlist com esse nome"
        And I still am at the "criar_playlist" page 
    
    Scenario: create playlist with bigger name than allowed
        Given I am at the "create playlist" page
        And I don't have any playlist registered as "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        When I insert the playlist name "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        And I insert the music "shape of you" 
        Then I can see an error message "the playlist name must not be bigger than 35"

    Scenario: update playlist musics
        Given I am at the "create_playlist" page
        And I see a playlist registered as "pop"
        And I go to this playlist page
        When I go to the add music option
        And I add the music "Scientist"
        Then I can see a confirmation message "Músicas atualizadas com sucesso!"
        And I still am at the "pop" plalist page
        And I can see the music "Scientist" in the playlist page

    Scenario: update playlist with existing name
        Given I am at the "edit playlist" page
        And I have a playlist registered as "pop"
        And I have a playlist registered as "rock"
        When I select the playlist "pop"
        And I update the playlist name as "rock"
        Then I can see an error message "this playlist name already exists".
    
   
    
