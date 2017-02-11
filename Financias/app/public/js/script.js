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

  console.log(valorTotal);
}

$valorTotal.textContent = 'Valor total: R$ ' + valorTotal;
