Feature:  playlist
As a user
I want to acess the playlist section
So that I can create and manage my playlists

    Scenario: create playlist
        Given I am at the "create playlist" page
        And I don't have any playlist registered as "pop"
        When I insert the playlist name "pop"
        And I insert the music "shape of you" 
        Then I can see a confirmation message "playlist created with success"

    Scenario: create existent playlist 
        Given I am at the "create playlist" page
        And I have a playlist registered as "pop"
        When I insert the playlist "pop" 
        And I insert the music "shape of you" 
        Then I can see an error message "it's not possible to create an existent playlist"
    
    Scenario: create playlist with no music
        Given I am at the "create playlist" page
        And I don't have any playlist registered as "pop"
        When I insert the playlist name "pop"
        And I create the playlist
        Then I can see a confirmation message "playlist created with success"
    
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
        And I return to the playlist page
        And I can see the music "Scientist" in the playlist page
    
    Scenario: update playlist name
        Given I am at the "edit playlist" page
        And I have a playlist registered as "pop"
        And I don't have a playlist registered as "rock"
        When I select the playlist "pop"
        And I update the playlist name as "rock"
        Then I can see a confirmation message "playlist name updated with success"
    
    Scenario: show playlist followers
        Given I am at the "playlist search" page
        And there's a playlist registered as "gym"
        When I search for the playlist "gym"
        And I select the playlist "gym"
        And I select the option "see followers"
        Then I can see a list with all users who follows the playlist
        And when they followed the playlist

    Scenario: update playlist with existing name
        Given I am at the "edit playlist" page
        And I have a playlist registered as "pop"
        And I have a playlist registered as "rock"
        When I select the playlist "pop"
        And I update the playlist name as "rock"
        Then I can see an error message "this playlist name already exists".
    
   
    
