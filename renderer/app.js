// DOM nodes
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  modal = document.getElementById('modal')

showModal.addEventListener('click', e => {
  console.log(`showing modal`, )
  modal.style.display = 'flex'
})
closeModal.addEventListener('click', e => {
  console.log(`hiding modal`, )
  modal.style.display = 'none'
})
