
'use strict'

//menu lateral -abrir e fechar

$(document).ready(function () {
    $('#tableReserva').DataTable();
});

document.querySelector("#hamburguer").addEventListener("mouseover" , () =>{
    document.querySelector('.sidebar').classList.add('show-menu')
})
document.querySelector(".sidebar").addEventListener("mouseleave" , () =>{
    document.querySelector('.sidebar').classList.remove('show-menu')
})

// criar 
const getLocalStorage = () => JSON.parse(localStorage.getItem('dados_cliente')) ?? []
const setLocalStorage = (dadosCliente) => localStorage.setItem("dados_cliente", JSON.stringify(dadosCliente))

const criarReserva = (cliente) => {
    const dadosCliente = getLocalStorage()
    dadosCliente.push(cliente)
    setLocalStorage(dadosCliente)
    
}
//ler dados

const lerReserva = () => getLocalStorage()

//atualizar

const atualizarReserva = (index, cliente)  => {
    const dadosCliente = lerReserva()
    dadosCliente[index] = cliente
    setLocalStorage(dadosCliente)
}
//deletar
const deletarReserva = (index) => {
    const dadosCliente = lerReserva()
    dadosCliente.splice(index,1)
    setLocalStorage(dadosCliente)
}

const validarCampo = () => {
   return document.getElementById('formulario').reportValidity()
}
const salvarReserva = () =>{
  if(validarCampo()){

    const cliente = {
        nome: document.getElementById('nome').value,
        acomodacao: document.getElementById('acomodacao').value,
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        adultos: document.getElementById('adultos').value,
        criancas: document.getElementById('criancas').value
    }
    const index = document.getElementById('checkin').dataset.index
    if(index == 'new'){
        criarReserva(cliente)
        atualizarTable()
    }else{
        atualizarReserva(index, cliente)
        atualizarTable()
    }
    alert('Reserva concluida com sucesso')
    nome:nome.value=''
    acomodacao:acomodacao.value=''
    checkin:checkin.value = ''
    checkout:checkout.value = ''
    adultos:adultos.value = ''
    criancas:criancas.value = ''
  }
}

//atualiza os dados na tabela 

const criarRow = (cliente , index) =>{
    const novaRow = document.createElement('tr')
    novaRow.innerHTML = `
    <td class="col-2 pt-4"><span>${cliente.nome}</span></td>
    <td class="col-2 pt-4"><span>${cliente.acomodacao}</span></td>
    <td class="col-2 pt-4"><span>${cliente.checkin}</span></td>
    <td class="col-2 pt-4"><span>${cliente.checkout}</span></td>
    <td class="col-2 pt-4"><span>${cliente.adultos}</span></td>
    <td class="col-2 pt-4"><span>${cliente.criancas}</span></td>

    <td class="col-2">
    <button type="button" class="btn btn-dark m-1 editar" id="editar-${index}"><i class="fa fa-solid fa-pencil "></i></button>
    <button type="button" class="btn btn-dark excluir" data-toggle="modal" data-target="#excluir" id="excluir-${index}"><i class="fa fa-solid fa-trash "></i></button>
    </td>
    ` 
    document.querySelector('#tableReserva > tbody').appendChild(novaRow)
}
//limpar tabela
const limparTable = () => {
    const rows = document.querySelectorAll('#tableReserva > tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

//atualizar tabela
const atualizarTable = () =>{
    const dadosCliente = lerReserva()
    limparTable()
    dadosCliente.forEach(criarRow)
}

//editar cliente

const preencherForm = (cliente) =>{
   document.getElementById('nome').value = cliente.nome
   document.getElementById('acomodacao').value = cliente.acomodacao
   document.getElementById('checkin').value = cliente.checkin 
   document.getElementById('checkout').value = cliente.checkout 
   document.getElementById('adultos').value = cliente.adultos 
   document.getElementById('criancas').value = cliente.criancas
   document.getElementById('checkin').dataset.index = cliente.index
}

const editarReserva = (index) => {
    const cliente = lerReserva()[index]
    cliente.index = cliente 
    preencherForm(cliente)
}

const editarDeletar = (event) => {
    if(event.target.type == 'button'){

        const [action,index] = event.target.id.split('-')
        
        if(action == 'editar'){
            editarReserva(index)
        }else{
            const excluirComfirm = confirm("Realmente deseja excluir esta reserva ??")
            if(excluirComfirm ){
            deletarReserva(index)
            atualizarTable()
            }
        }
    }
}

atualizarTable()



//eventos
//salvar reserva
document.getElementById('salvar').addEventListener('click', salvarReserva)

//editar e deletar reserva

document.querySelector('#tableReserva > tbody').addEventListener('click', editarDeletar)

//mascaras input

  // Mascara Celular
  const input = document.getElementById('cel')

  input.addEventListener('keypress', () => {
    const inputLength = input.value.length

    if (inputLength === 0) {
      input.value += '('
    } else if (inputLength === 3) {
      input.value += ')'
    } else if (inputLength === 9) {
      input.value += '-'
    }
  })
  // Mascara telefone
  const tel = document.getElementById('tel')

  tel.addEventListener('keypress', () => {
    const inputLength = tel.value.length

    if (inputLength === 0) {
      tel.value += '('
    } else if (inputLength === 3) {
      tel.value += ')'
    } else if (inputLength === 8) {
      tel.value += '-'
    }
  })
  // mascara cpf
  const cpf = document.getElementById('cpf')
  cpf.addEventListener('keypress', () => {
    const inputLength = cpf.value.length

    if (inputLength === 3 || inputLength === 7) {
      cpf.value += '.'
    } else if (inputLength === 11) {
      cpf.value += '-'
    }
  })






