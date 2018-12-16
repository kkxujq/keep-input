if (!localStorage.skey) {
  localStorage.skey = 'test';
  alert('ok')
} else {
  alert(`storage: ${localStorage.skey}`)
}