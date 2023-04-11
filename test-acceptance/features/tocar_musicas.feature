Feature: Tocar músicas
    As a user of the sfotipy
    I want to be able to play and pause songs
    so that I can enjoy the music that I like

Scenario: Tocar playlist vazia na página da playlist
Given eu estou na página da playlist "Study lofi" cujo id é 12
And eu não posso ver músicas na lista de músicas
When eu seleciono a opção de tocar a playlist "Study lofi"
Then a playlist "Study lofi" é definida como a playlist atual
And a playlist "Study lofi" está pausada

Scenario: Pausar playlist na página da playlist
Given eu estou na página da playlist "Melhores Indie" cujo id é 2
And eu posso ver músicas na lista de músicas
And a playlist "Melhores Indie" está tocando
When eu seleciono a opção de pausar a playlist "Melhores Indie"
Then a playlist "Melhores Indie" é pausada

Scenario: Tocar playlist com músicas da página da playlist
Given eu estou na página da playlist "Melhores Indie" cujo id é 2
And eu posso ver músicas na lista de músicas
When eu seleciono a opção de tocar a playlist "Melhores Indie"
Then a playlist "Melhores Indie" é definida como a playlist atual

Scenario: Tocar playlist da lista de playlists
Given eu estou na página de "Busca"
And todo o conteúdo está visível
When eu seleciono a opção de tocar a playlist "Mix de Coldplay"
Then a playlist "Mix de Coldplay" é definida como a playlist atual

Scenario: Tocar música da lista de músicas
Given eu estou na página de "Busca"
And todas as músicas estão visíveis
And eu posso ver a músicas "Viva la Vida" na lista de músicas
When eu seleciono a opção de tocar a música "Viva la Vida"
Then a música "Viva la Vida" começa a tocar