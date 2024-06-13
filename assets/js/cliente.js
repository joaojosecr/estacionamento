// Função para adicionar um cliente à tabela e salvar no Local Storage
function adicionarCliente() {
    // Captura os valores do formulário
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var telefone = document.getElementById('telefone').value.trim();
    var tipo = document.getElementById('tipo').value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (nome === '' || email === '' || telefone === '' || tipo === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Cria um objeto com os dados do cliente
    var cliente = {
        nome: nome,
        email: email,
        telefone: telefone,
        tipo: tipo
    };

    // Adiciona o cliente à tabela
    adicionarClienteNaTabela(cliente);

    // Salva os dados do cliente no Local Storage
    salvarClienteNoLocalStorage(cliente);

    // Limpa o formulário
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('tipo').value = '';

    // Ordena a tabela por nome após adicionar o cliente
    ordenarTabelaPorNome();
}

// Função para adicionar um cliente à tabela
function adicionarClienteNaTabela(cliente) {
    // Cria uma nova linha na tabela
    var tabela = document.getElementById('tabela-clientes').getElementsByTagName('tbody')[0];
    var novaLinha = tabela.insertRow();

    // Insere as células na nova linha
    var celulaNome = novaLinha.insertCell(0);
    var celulaEmail = novaLinha.insertCell(1);
    var celulaTelefone = novaLinha.insertCell(2);
    var celulaTipo = novaLinha.insertCell(3);
    var celulaEditar = novaLinha.insertCell(4);
    var celulaExcluir = novaLinha.insertCell(5);

    // Preenche as células com os dados do cliente
    celulaNome.innerHTML = cliente.nome;
    celulaEmail.innerHTML = cliente.email;
    celulaTelefone.innerHTML = cliente.telefone;
    celulaTipo.innerHTML = cliente.tipo;
    celulaEditar.innerHTML = '<button onclick="editarCliente(this)">Editar</button>';
    celulaExcluir.innerHTML = '<button onclick="excluirCliente(this)">Excluir</button>';
}

// Função para salvar um cliente no Local Storage
function salvarClienteNoLocalStorage(cliente) {
    // Obtém os clientes salvos no Local Storage
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Adiciona o novo cliente à lista
    clientes.push(cliente);

    // Salva a lista atualizada no Local Storage
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Função para carregar os clientes do Local Storage e exibir na tabela
function carregarClientesDoLocalStorage() {
    // Obtém os clientes salvos no Local Storage
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Adiciona cada cliente à tabela
    clientes.forEach(function(cliente) {
        adicionarClienteNaTabela(cliente);
    });
}

// Função para excluir um cliente
function excluirCliente(botao) {
    var linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);

    // Remove o cliente do Local Storage
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var index = linha.rowIndex - 1;
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Função para editar um cliente
function editarCliente(botao) {
    var linha = botao.parentNode.parentNode;
    var celulas = linha.getElementsByTagName('td');
    var nome = celulas[0].innerHTML;
    var email = celulas[1].innerHTML;
    var telefone = celulas[2].innerHTML;
    var tipo = celulas[3].innerHTML;

    // Preenche o formulário com os dados do cliente
    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('telefone').value = telefone;
    document.getElementById('tipo').value = tipo;

    // Remove o cliente da tabela
    linha.parentNode.removeChild(linha);
}

// Função para ordenar a tabela por nome do cliente
function ordenarTabelaPorNome() {
    var tabela = document.getElementById('tabela-clientes').getElementsByTagName('tbody')[0];
    var linhas = tabela.rows;

    var arr = [];
    for (var i = 0; i < linhas.length; i++) {
        arr.push(linhas[i]);
    }

    arr.sort(function(a, b) {
        var nomeA = a.cells[0].textContent.toLowerCase();
        var nomeB = b.cells[0].textContent.toLowerCase();
        return nomeA.localeCompare(nomeB);
    });

    for (var j = 0; j < arr.length; j++) {
        tabela.appendChild(arr[j]);
    }
}

// Carrega os clientes do Local Storage ao carregar a página
window.onload = function() {
    carregarClientesDoLocalStorage();
};
