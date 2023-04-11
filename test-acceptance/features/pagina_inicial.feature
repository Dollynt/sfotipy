Feature: Pagina Inicial
    As a usuário qualquer do serviço
    I want to acessar a página Inicial
    So that eu possa ter informaçoes e conteúdos relevantes organizados e expostos para mim

    Scenario: Visualizar informações para usuário não logado
        Given eu esteja na página inicial "Sfotipy"
        And eu tenha optado por não fazer login
        When eu percorro a página
        Then eu consigo ver apenas as "Playlists em Alta" e as "Playlists Públicas"

    Scenario: Minhas Playlists de usuário não logado
        Given eu esteja na página inicial "Sfotipy"
        And eu tenha optado por não fazer login
        When eu clico no botão "playlists"
        Then eu sou levado para a pagina de "Cadastro"
        And eu vejo o formulário de cadastro
        And eu tembém tenho a opção de ir para o login

    Scenario: Voltar à página inicial
        Given eu esteja na página "Busca"
        When eu clico no botão "home" uma vez
        Then eu vou diretamente para a página inicial do serviço

    Scenario: Visualizar informações públicas e do usuário
        Given eu esteja na página inicial "Sfotipy"
        And eu esteja logado com o usuário "vgc3@email" e a senha "abc1234"
        When eu percorro a página
        Then eu consigo ver "Recomendações para você", "Playlists Públicas", "Playlists em Alta" e as "Minhas Playlists"

    Scenario: Sair do serviço
        Given eu esteja na página inicial "Sfotipy"
        And eu esteja logado com o usuário "vgc3@email" e a senha "abc1234"
        When eu clico no ícone de "sair" no "perfil"
        Then eu sou levado para a pagina de "Login"
        And minhas credenciais serão pedidas novamente

    Scenario: Acessar perfil do usuário
        Given eu esteja na página inicial "Sfotipy"
        And eu esteja logado com o usuário "vgc3@email" e a senha "abc1234"
        When eu clico no botão "perfil"
        Then eu posso ver meu dados "nome" e "seguidores"

    Scenario: Minhas Playlists de usuário logado
        Given eu esteja na página inicial "Sfotipy"
        And eu esteja logado com o usuário "vgc3@email" e a senha "abc1234"
        When eu clico no botão "playlists"
        Then eu sou levado para a pagina de "Minhas Playlists"
        And eu posso ver uma lista com as minhas playlists "Pop Mix", "Electric Vibe" e "Study lofi"