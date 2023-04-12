Feature: Em alta do spotipy

Scenario: Ir para página em alta
Given que estou na página inicial
And logado com o usuário "Duda123" e a senha "duda09!"
And eu clico na página em alta
Then será mostrado a página com as músicas e playlist em alta


Scenario: Listar as playlists em alta
I want listar as playlists em alta
So that eu posso mostrar em ordem decrescentes as playlists mais escutadas

Scenario: Listar as músicas em alta
I want listar as músicas em alta
So that eu posso mostrar em ordem decrescentes as músicas mais escutadas

Scenario: Implementar as listas em alta
Given eu tenha as músicas e playlist em alta
And eu quero exibir na tela
Then eu implemento as listas armazenadas