//const servidor = "http://localhost:3000"
//// PARA USAR O SERVIDOR LOCAL COLOQUE url = 'http://localhost:3000'; E COM JSON-SERVER INSTALADO POR npm install json-server, INICIE O SERVIDOR PELO PROMPT json-server --watch db.json
   
//document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e) {
    var placaVeiculo = document.getElementById('placaVeiculo').value;
    var tipoVeiculo = document.getElementById('tipoVeiculo').value;
    var tipoCliente = document.getElementById('tipoCliente').value;
    var time = new Date();

    if (!placaVeiculo && !tipoVeiculo && !tipoCliente) {

        alert("Preencha todos os campos!");
        return false;
    }

    const data_e = get_data();
    const hora_e = get_hora();

    
    const veiculo = {
        "data_entrada":data_e,
        "hora_entrada":hora_e,
        "data_saida": null,
        "hora_saida":null,  
        "placa":placaVeiculo,  
        "tipo_veiculo":tipoVeiculo,
        "id_cliente":'1',
        "tipo_cliente":tipoCliente
    };

    

    //console.log(JSON.stringify(veiculo));

    
    fetch("http://localhost:3000/veiculos", {
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
        //window.location.href = '../inicio.html';
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
    });         
    

    //document.getElementById('formulario').reset();

    e.preventDefault();
}

function removeVeiculo(placa){
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);

	 for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}

function mostraPatio() {
    //alert("teste");
    console.log("mostrar Patio")
    fetch("http://localhost:3000/veiculos")
        .then(response => response.json())
        .then(veiculos => {          
            //console.log(veiculos)
                        
            let string = '';
            for (let i = 0; i < veiculos.length; i++) {
                let veiculo = veiculos[i];
                if(veiculo.data_saida==null){
                    saida = `<button onclick="retirar_veiculo(${veiculo.id})" class="calcular-saida-btn">Calcular Saída</button>`
                    string+= `
                    <tr>
                        <td>${veiculo.placa}</td>
                        <td>${veiculo.tipo_veiculo}</td>
                        <td>${veiculo.tipo_cliente}</td>
                        <td>${veiculo.data_entrada} ${veiculo.hora_entrada}</td>
                        <td>${saida}</td>
                    </tr>`
                    document.querySelector('#resultados').innerHTML=string
                } else {
                    saida = veiculo.data_saida + ' ' +  veiculo.hora_saida;
                }
            
                
            }
        });
}

function retirar_veiculo(id){
    window.location.href = `confirma_saida.html?id=${id}`;
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

function calcularDiferencaDias(dataInicial, dataFinal) {
    // Converter as datas para objetos Date
    const [diaInicial, mesInicial, anoInicial] = dataInicial.split('/').map(Number);
    const [diaFinal, mesFinal, anoFinal] = dataFinal.split('/').map(Number);

    const dateInicial = new Date(anoInicial, mesInicial - 1, diaInicial);
    const dateFinal = new Date(anoFinal, mesFinal - 1, diaFinal);

    // Calcular a diferença em milissegundos
    const diferencaMilissegundos = dateFinal - dateInicial;

    // Converter a diferença de milissegundos para dias
    const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));

    return diferencaDias;
}

// Função para calcular a diferença entre dois horários em horas
function calcularDiferencaHoras(horaInicial, horaFinal) {
    // Converter os horários para arrays de inteiros
    const [horasInicial, minutosInicial, segundosInicial] = horaInicial.split(':').map(Number);
    const [horasFinal, minutosFinal, segundosFinal] = horaFinal.split(':').map(Number);

    // Criar objetos Date para os horários (usando uma data arbitrária)
    const dateInicial = new Date(2000, 0, 1, horasInicial, minutosInicial, segundosInicial);
    const dateFinal = new Date(2000, 0, 1, horasFinal, minutosFinal, segundosFinal);

    // Calcular a diferença em milissegundos
    const diferencaMilissegundos = dateFinal - dateInicial;

    // Converter a diferença de milissegundos para horas
    const diferencaHoras = diferencaMilissegundos / (1000 * 60 * 60);

    return diferencaHoras;
}

function mostrar_um_veiculo(id){

    fetch("http://localhost:3000/veiculos")
        .then(response => response.json())
        .then(veiculos => {
            let idx = veiculos.findIndex(elem => elem.id == id)
            let veiculo = veiculos[idx];
            let placa =`<strong>Placa:</strong> ${veiculo.placa}`
            let tipo = `<strong>Tipo:</strong> ${veiculo.tipo_veiculo}`
            let entrada = `<strong>Data e hora de entrada:</strong> ${veiculo.data_entrada} - ${veiculo.hora_entrada}`
            let valr = calcular_valor(veiculo.data_entrada, veiculo.hora_entrada);
            let val = `<strong>Valor:</strong> R$${valr}`
            let botao = `<button class="button" style="width: 100%;" onclick="remover_veiculo(${id},${valr})">Retirar Veículo</button>`
            
            document.querySelector('#placa').innerHTML=placa
            document.querySelector('#tipo').innerHTML=tipo
            document.querySelector('#entrada').innerHTML=entrada
            document.querySelector('#botao_remover').innerHTML=botao
            document.querySelector('#valor').innerHTML=val
 
        })


}

function remover_veiculo(id,valr){
    
    fetch("http://localhost:3000/veiculos")
        .then(response => response.json())
        .then(veiculos => {
            let idx = veiculos.findIndex(elem => elem.id == id)
            let veiculo = veiculos[idx];
            
            //console.log(veiculo);


            var resposta = confirm("Confirmar pagamento e retirar este veiculo?");

            if (resposta) {
            // Executar ação se o usuário clicar em "Sim"
                fetch("http://localhost:3000/veiculos/"+veiculo.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        valor: valr,
                        data_saida: get_data(),
                        hora_saida: get_hora()
                     }),
                })
                .then(response => response.json())
                .then(veiculoUpdate => {
                    alert("Pagamento concluido e veiculo retirado");
                    console.log('Pagamento concluido e veiculo retirado');
                    
                
                })
                .catch(error => {
                    console.error('Erro no pagamento', error);
                });

            console.log("Veículo retirado!");
            } else {
            // Executar ação se o usuário clicar em "Não" (ou cancelar)
            console.log("Veículo não retirado.");
            }

            window.location.href='listar.html';
        })


}   

function calcular_valor(data_entrada, hora_entrada){

    let data_saida = get_data();
    let hora_saida = get_hora();

    //console.log(data_saida +"    -    " + hora_saida);

    dias = calcularDiferencaDias(data_entrada,data_saida);
    horas = calcularDiferencaHoras(hora_entrada,hora_saida);
    let valor=0;
    if(dias > 0){
        if(dias*59 > 689){
            valor= 689
        } else {
            valor= dias*59;
        }
    } else {
        if(horas*22>59){
            valor= 59;
        } else {
            valor= horas*22;
            if(valor<22){
                valor=22;
            }
        }
    }
    return valor.toFixed(2);
}