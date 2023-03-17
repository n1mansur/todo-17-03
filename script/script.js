const form = document.querySelector('.form')
const list = document.querySelector('.list')
const listValue = document.querySelector('#listValue')
const footer__btn = document.querySelector('.footer__btn') //** Clear all btn */

let todos = [
  { status: false, id: 1, todo: 'Reading books' },
  { status: false, id: 2, todo: 'Play footbal' },
  { status: false, id: 3, todo: 'Watch TV' },
  { status: false, id: 4, todo: 'Coding' },
]
render()

function render() {
  list.innerHTML = ''
  todos.forEach((v) => {
    let chh = ''
    if (v.status) {
      chh = 'checked'
    }

    list.innerHTML += `
              <li class="item" id='${v.id}'>
                <input class="checkbox${v.id}" type="checkbox" ${chh}>
                <input class="item__input iinput${v.id}" type="text" value="${v.todo}" disabled>
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
  //console.log(todos)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = e.target.elements.todo.value
  if (inputValue) {
    const newTodo = { id: new Date().getTime(), todo: inputValue }
    todos.unshift(newTodo)
    form.reset()
    listValue.classList.remove('required')
  } else {
    listValue.classList.add('required')
  }
  render()
})

footer__btn.addEventListener('click', () => {
  if (todos.length != 0) {
    todos = []
    render()
  }
})
const items = document.querySelector('.list')
items.addEventListener('click', (e) => {
  const currentId = e.target.closest('.item').id
  const item = document.querySelector(`.iinput${currentId}`)
  const btnBox = document.querySelector(`.btns${currentId}`)

  if (e.target.closest('.delete__btn')) {
    todos = todos.filter((v) => v.id != currentId)
    render()
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
        todos.filter((v) => {
          if (v.id == currentId) {
            item.disabled = true
            v.todo = item.value
          }
        })
        render()
      }
      if (e.code == 'Escape') {
        render()
      }
    })
  }

  if (e.target.closest('.done__btn')) {
    todos.filter((v) => {
      if (v.id == currentId) {
        const done = document.querySelector(`.done__btn`)
        item.disabled = true
        done.remove()
        v.todo = item.value
      }
    })
    document.getElementById(`${currentId}`).style.cssText = `
        animation: 1s infinite;
        margin:0px 0;
        transition:0.5s;
        `
    render()
  }
  if (e.target.closest('.cancel__btn')) {
    render()
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
  }
  //e.target.classList.toggle('effects')
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
