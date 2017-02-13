valorTotal();
selecionarItem();

// window.addEventListener('click', () => console.log(id));


function valorTotal(){
  var $despesas = document.querySelector('.despesas');
  var $valorIndividual = $despesas.querySelectorAll('.despesas-lista-valor');
  var $valorTotal = $despesas.querySelector('#valorTotal');
  var valorIndividual;
  var valorTotal;

  $valorTotal.textContent = 0;

  valorTotal = Number($valorTotal.textContent);

  for (var i = 0; i < $valorIndividual.length; i++) {
    valorIndividual = Number($valorIndividual[i].textContent);

    valorTotal += valorIndividual;
  }

  $valorTotal.textContent = 'Valor total: R$ ' + valorTotal;
}
function selecionarItem(){
    var $despesasListaItem = document.querySelectorAll('.despesas-lista-item');
    var $inputMudar        = document.querySelector('#inputMudar');
    var $inputExcluir      = document.querySelector('#inputExcluir');

    for( var i = 0; i < $despesasListaItem.length; i++) {
      $despesasListaItem[i].addEventListener('click', (event) => {
        var id = pegarId(event);

        ativo(event, $despesasListaItem);
        colocarId(id, $inputMudar);
        colocarId(id, $inputExcluir);
      });
    }

    function pegarId(event) {
      var alvo = event.currentTarget;
      var id = alvo.dataset.id;

      return id;
    };
    function ativo(event, alvos){
      event.currentTarget.classList.toggle('ativo');

      for (var i = 0; i < alvos.length; i++) {
        if (alvos[i] != event.currentTarget) {
          alvos[i].classList.remove('ativo');
        }
      }
    }
    function colocarId(id, alvo){
      alvo.value = id;
    }
}
