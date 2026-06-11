document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENU RESPONSIVO MOBILE ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // --- 2. CONTADORES ANIMADOS (SIMULAÇÃO) ---
    // Faz os números subirem dinamicamente quando a página abre
    const animarContador = (id, alvo, sufixo = '') => {
        let atual = 0;
        const elemento = document.getElementById(id);
        const incremento = Math.ceil(alvo / 50);

        const timer = setInterval(() => {
            atual += incremento;
            if (atual >= alvo) {
                elemento.innerText = alvo + sufixo;
                clearInterval(timer);
            } else {
                elemento.innerText = atual + sufixo;
            }
        }, 30);
    };

    // Ativa as animações de números simulados
    animarContador('count-ideias', 342);
    animarContador('count-agua', 1450, 'L');
    animarContador('count-polinizadores', 890);


    // --- 3. QUIZ INTERATIVO "PERFIL AGRO" ---
    const dadosQuiz = [
        {
            pergunta: "Se você pudesse criar uma invenção para a fazenda, qual seria?",
            opcoes: [
                { texto: "🤖 Robô movido a sol que tira pragas das folhas", perfil: "Inovador Tech" },
                { texto: "🌧️ Cisterna gigante inteligente para coletar água da chuva", perfil: "Guardião da Água" },
                { texto: "🎒 Aplicativo para conectar alunos a produtores orgânicos", perfil: "Líder Comunitário" }
            ]
        },
        {
            pergunta: "Qual dessas ações sustentáveis você acha mais urgente?",
            opcoes: [
                { texto: "Drone fiscalizador de florestas nativas", perfil: "Inovador Tech" },
                { texto: "Proteger nascentes de rios e usar irrigação gota-a-gota", perfil: "Guardião da Água" },
                { texto: "Ensinar reciclagem e compostagem nas escolas rurais", perfil: "Líder Comunitário" }
            ]
        }
    ];

    let perguntaAtual = 0;
    // Dicionário para contar as pontuações de perfil
    let votosPerfil = { "Inovador Tech": 0, "Guardião da Água": 0, "Líder Comunitário": 0 };

    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesBox = document.getElementById('opcoes-box');
    const quizResultado = document.getElementById('quiz-resultado');
    const perguntaContainer = document.getElementById('pergunta-container');

    window.carregarPergunta = () => {
        if (perguntaAtual < dadosQuiz.length) {
            const item = dadosQuiz[perguntaAtual];
            perguntaTexto.innerText = item.pergunta;
            opcoesBox.innerHTML = '';

            item.opcoes.forEach(opcao => {
                const botao = document.createElement('button');
                botao.innerText = opcao.texto;
                botao.classList.add('quiz-btn');
                botao.addEventListener('click', () => computarResposta(opcao.perfil));
                opcoesBox.appendChild(botao);
            });
        } else {
            mostrarResultado();
        }
    };

    const computarResposta = (perfilEscolhido) => {
        votosPerfil[perfilEscolhido]++;
        perguntaAtual++;
        carregarPergunta();
    };

    const mostrarResultado = () => {
        perguntaContainer.classList.add('oculto');
        quizResultado.classList.remove('oculto');

        // Descobre qual perfil teve mais votos
        let maiorPerfil = Object.keys(votosPerfil).reduce((a, b) => votosPerfil[a] > votosPerfil[b] ? a : b);

        const descricoes = {
            "Inovador Tech": "Você é o mestre dos drones e códigos! Vê o campo como o laboratório do futuro, unindo robótica e sustentabilidade.",
            "Guardião da Água": "Sua missão é proteger o bem mais precioso. Você foca em conservar recursos, cuidar dos solos e gerenciar as florestas.",
            "Líder Comunitário": "Para você, a sustentabilidade acontece em grupo! Gosta de compartilhar conhecimento, engajar pessoas e espalhar as boas ideias."
        };

        document.getElementById('perfil-nome').innerText = maiorPerfil;
        document.getElementById('perfil-desc').innerText = descricoes[maiorPerfil];
    };

    window.reiniciarQuiz = () => {
        perguntaAtual = 0;
        votosPerfil = { "Inovador Tech": 0, "Guardião da Água": 0, "Líder Comunitário": 0 };
        quizResultado.classList.add('oculto');
        perguntaContainer.classList.remove('oculto');
        carregarPergunta();
    };

    // Inicializa o quiz ao carregar a página
    carregarPergunta();


    // --- 4. FORMULÁRIO DE CONTATO ---
    const form = document.getElementById('agrinhoForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        alert(`Uau, ${nome}! Que projeto incrível! 🌱\nIdeias enviadas com sucesso para o Agrinho 2026. Preparem-se para brilhar!`);
        form.reset();
    });
});