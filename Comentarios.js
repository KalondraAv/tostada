const botoesAcoes = document.querySelectorAll(".botao-acoes");

botoesAcoes.forEach(botao => {

    botao.addEventListener("click", function (event) {

        event.stopPropagation();

        const container = this.closest(".acoes-container");
        const menu = container.querySelector(".menu-acoes");

        // Fecha todos os outros menus
        document.querySelectorAll(".menu-acoes.aberto").forEach(outroMenu => {
            if (outroMenu !== menu) {
                outroMenu.classList.remove("aberto");
                outroMenu.style.left = "";
                outroMenu.style.top = "";
            }
        });

        // Abre ou fecha o menu atual
        menu.classList.toggle("aberto");

        // Se o menu estiver fechado, encerra
        if (!menu.classList.contains("aberto")) {
            menu.style.left = "";
            menu.style.top = "";
            return;
        }

        // Pega a posição do botão na tela
        const botaoRect = this.getBoundingClientRect();

        // Mede o tamanho real do menu
        const menuRect = menu.getBoundingClientRect();

        // Posição inicial: abaixo do botão
        let esquerda = botaoRect.right - menuRect.width;
        let topo = botaoRect.bottom + 1;

        // Se não houver espaço abaixo, abre para cima
        if (topo + menuRect.height > window.innerHeight - 5) {
            topo = botaoRect.top - menuRect.height - 5;
        }

        // Impede que o menu saia pela esquerda
        if (esquerda < 5) {
            esquerda = 5;
        }

        // Impede que o menu saia pela direita
        if (esquerda + menuRect.width > window.innerWidth - 5) {
            esquerda = window.innerWidth - menuRect.width - 5;
        }

        // Impede que o menu saia pelo topo
        if (topo < 5) {
            topo = 5;
        }

        // Define a posição final do menu
        menu.style.left = esquerda + "px";
        menu.style.top = topo + "px";
    });

});


// Fecha o menu quando clicar fora dele
document.addEventListener("click", function (event) {

    if (
        !event.target.closest(".menu-acoes") &&
        !event.target.closest(".botao-acoes")
    ) {
        document.querySelectorAll(".menu-acoes.aberto").forEach(menu => {
            menu.classList.remove("aberto");
            menu.style.left = "";
            menu.style.top = "";
        });
    }

});


// Fecha o menu ao redimensionar a janela
window.addEventListener("resize", function () {

    document.querySelectorAll(".menu-acoes.aberto").forEach(menu => {
        menu.classList.remove("aberto");
        menu.style.left = "";
        menu.style.top = "";
    });

});
