var update = document.querySelector('#update');
var del    = document.querySelector('#delete');

update.addEventListener('click', function(event){
  event.preventDefault();

  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    window.location.reload();
  })
});

del.addEventListener('click', function(event){
  event.preventDefault();

  fetch('quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    window.location.reload();
  })
});
