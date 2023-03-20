const form = document.querySelector('.form')
const list = document.querySelector('.list')
const listValue = document.querySelector('#listValue')
const footer__btn = document.querySelector('.footer__btn') //** Clear all btn */

//**************************************************************************************************** */
renderU()
let arr = []
async function renderU(obj) {
  let response = await fetch('http://localhost:4000/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
  response = await response.json()
  render(response)
  arr = response
  const items = document.querySelector('.list')
  items.addEventListener('click', (e) => {
    const currentId = e.target.closest('.item').id
    const currentitem = e.target.closest('.item')
    const item = document.querySelector(`.iinput${currentId}`)
    const btnBox = document.querySelector(`.btns${currentId}`)

    if (e.target.closest('.delete__btn')) {
      arr = arr.filter((v) => v.id != currentId)
      currentitem.classList.add('deleteEffect')
      setTimeout(() => {
        deleteList(arr)
      }, '2000')
    }
    if (e.target.closest('.edit__btn')) {
      item.classList.remove('ch')
      const ch = document.querySelector(`.checkbox${currentId}`)
      ch.checked = false

      e.target.closest('.edit__btn').style.display = 'none'
      item.disabled = false
      item.focus()
      if (item.focus) {
        document.getElementById(`${currentId}`).style.cssText = `
        animation: itemEffect 1s infinite;
        margin:20px 0;
        transition:0.5s;
        `
      }
      let val = item.value
      item.value = ''
      item.value = val
      const dbtn = crateDoneBtn()
      const cbtn = crateCancelBtn()
      if (btnBox.children.length == 2) {
        btnBox.prepend(dbtn, cbtn)
      }

      document.addEventListener('keydown', (e) => {
        if (e.code == 'Enter') {
          done()
        }
        if (e.code == 'Escape') {
          renderU()
        }
      })
    }
    if (e.target.closest('.done__btn')) {
      done()
      document.getElementById(`${currentId}`).style.cssText = `
        animation: 1s infinite;
        margin:0px 0;
        transition:0.5s;
        `
    }
    if (e.target.closest('.cancel__btn')) {
      //renderU()
      response.filter((el) => {
        if (el.id == currentId) {
          item.value = el.todo
        }
      })
      item.classList.remove('ch')
      const done = document.querySelector(`.btns${currentId} .done__btn`)
      const cancel = document.querySelector(`.btns${currentId} .cancel__btn`)
      item.disabled = true
      if (!!done) {
        done.remove()
      }
      if (!!cancel) {
        cancel.remove()
      }
      const dblock = document.querySelector(`.btns${currentId} .edit__btn`)
      dblock.style.display = 'block'
      document.getElementById(`${currentId}`).style.cssText = `
      animation: 1s 0;
      margin: 0 0 5px 0;
      transition:0.5s;
      `
    }

    if (e.target.closest(`.checkbox${currentId}`)) {
      item.classList.toggle('ch')
      const done = document.querySelector(`.btns${currentId} .done__btn`)
      const cancel = document.querySelector(`.btns${currentId} .cancel__btn`)
      item.disabled = true
      if (!!done) {
        done.remove()
      }
      if (!!cancel) {
        cancel.remove()
      }
      const dblock = document.querySelector(`.btns${currentId} .edit__btn`)
      dblock.style.display = 'block'
      document.getElementById(`${currentId}`).style.cssText = `
        animation: itemEffect 1s 0;
        margin: 0 0 5px 0;
        transition:0.5s;
        `
      arr.filter((v) => {
        if (v.id == currentId) {
          if (!v.status) {
            console.log('trulandi')
            v.status = true
          } else {
            console.log('falslandi')
            v.status = false
          }
        }
      })
      checkedList(arr)
    }
    function done() {
      arr.filter((v) => {
        if (v.id == currentId) {
          v.todo = item.value
          doneList(arr)
          const done = document.querySelector(`.btns${currentId} .done__btn`)
          const cancel = document.querySelector(
            `.btns${currentId} .cancel__btn`
          )
          item.disabled = true
          if (!!done) {
            done.remove()
          }
          if (!!cancel) {
            cancel.remove()
          }
          const dblock = document.querySelector(`.btns${currentId} .edit__btn`)
          dblock.style.display = 'block'
          document.getElementById(`${currentId}`).style.cssText = `
          animation: 1s 0;
          margin: 0 0 5px 0;
          transition:0.5s;
          `
        }
      })
      return arr
    }
  })
}

//***************************************************************************************************** */
function render(todos) {
  list.innerHTML = ''
  todos.forEach((v) => {
    let chh = ''
    if (v.status) {
      chh = 'checked'
    }
    list.innerHTML += `
              <li class="item" id='${v.id}'>
                <input class="checkbox${v.id}" type="checkbox" ${chh}>
                <input class="item__input iinput${v.id} ${
      v.status ? 'ch' : ''
    }" type="text" value="${v.todo}" disabled>
                  <div class="item__btns btns${v.id}">
                    <button class="item__btn edit__btn">
                      <i class="bx bx-sm bxs-pencil"></i>
                    </button>
                    <button id="${v.id}" class="item__btn delete__btn">
                      <i class="bx bx-md bx-x"></i>
                    </button>
                  </div>
              </li>`
  })
}

async function renderList(obj) {
  let response = await fetch('http://localhost:4000/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
  response = await response.json()
  //render(response)
}
async function deleteList(obj) {
  let response = await fetch('http://localhost:4000/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
  response = await response.json()
  //render(response)
}
async function doneList(obj) {
  let response = await fetch('http://localhost:4000/done', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
  response = await response.json()
  //render(response)
}
async function checkedList(obj) {
  let response = await fetch('http://localhost:4000/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
  response = await response.json()
  //render(response)
}

form.addEventListener('submit', (e) => {
  const inputValue = e.target.elements.todo.value
  e.preventDefault()
  if (inputValue) {
    const newTodo = {
      id: new Date().getTime(),
      todo: inputValue,
      status: false,
      addedAt: Date(),
    }
    //todos.unshift(newTodo)
    form.reset()
    listValue.classList.remove('required')
    renderList(newTodo)
  } else {
    listValue.classList.add('required')
  }
})

footer__btn.addEventListener('click', () => {
  if (todos.length != 0) {
    todos = []
  }
})

const crateDoneBtn = () => {
  let dBtn = document.createElement('button')
  dBtn.classList = 'item__btn done__btn'
  dBtn.innerHTML = `<i class="bx bx-md bx-check"></i>`
  return dBtn
}
const crateCancelBtn = () => {
  let cBtn = document.createElement('button')
  cBtn.classList = 'item__btn cancel__btn'
  cBtn.innerHTML = `<i class='bx bx-md bx-undo'></i>`
  return cBtn
}
