const servidor = "http://localhost:3000"

function cadastrar_veiculo(event) {
    event.preventDefault();
    
    const form = document.querySelector("#formulario");

    const data_e = get_data();
    const hora_e = get_hora();
    const placa = document.querySelector("placaVeiculo");
    const t_veiculo = document.querySelector("tipoVeiculo");
    const t_cliente = document.querySelector("tipoCliente");   
        
    invalido = 0;
    
        
    if(placa.value===""){
        alert("Por favor, preencha a placa.");
        invalido = 1;
    } 

    if (invalido == 0){

        const veiculo = {
            "data_entrada":data_e,
            "hora_entrada":hora_e,
            "data_saida": null,
            "hora_saida":null,  
            "placa":placa,  
            "tipo_veiculo":t_veiculo,
            "id_cliente":1,
            "tipo_cliente":t_cliente
        };
    
        
    
        console.log(JSON.stringify(veiculo));
        const url = servidor+"/veiculos"
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(veiculo),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
            alert("Veiculo cadastrado com sucesso!");
            window.location.href = '../inicio.html';
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });         
    
    }

}

function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function get_data() {
    const now = new Date();
    
    // Obter partes da data
    const year = now.getFullYear();
    const month = formatTimeUnit(now.getMonth() + 1); // Os meses são de 0 a 11
    const day = formatTimeUnit(now.getDate());
    // Formatar a data e hora
    const date = `${day}/${month}/${year}`;
    
    // Exibir a data e hora
    //document.getElementById('datetime').textContent = `${date} ${time}`;
    return date;

}

function get_hora() {
    const now = new Date();
    
    // Obter partes da hora
    const hours = formatTimeUnit(now.getHours());
    const minutes = formatTimeUnit(now.getMinutes());
    const seconds = formatTimeUnit(now.getSeconds());

    // Formatar a data e hora
    
    const time = `${hours}:${minutes}:${seconds}`;
    
    // Exibir a data e hora
    //document.getElementById('datetime').textContent = `${date} ${time}`;
    return time;
}