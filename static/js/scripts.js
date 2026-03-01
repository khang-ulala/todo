// thiet lap cac bien
const todoInput = document.getElementById('todoinput')
const addButton = document.querySelector('.btn')
const deleteButton = document.getElementById('deleteButton')
const todoList = document.getElementById('todoList')
const todoCount = document.getElementById('todoCount')

function displayTasks(todo){
    // hien thi
    todoList.innerHTML = ''

    todo.forEach((item,index) => {
        const p = document.createElement('p')
        p.innerHTML = `
        <div class='todo-container'>
            <p id='todo-${index}' class='${ item.disabled ? 'disabled' : '' }' onclick='editTask(${index})'>
            <input type='checkbox' class='todo-checkbox' id='input-${index}' ${ item.disabled ? 'checked' : '' }>${item.text}</p>
        </div>
        `
        const checkbox = p.querySelector('.todo-checkbox')
        checkbox.addEventListener('click', (event)=>{
            event.stopPropagation() // prevent triggering editTask
            toggleTask(index)
        })
        todoList.appendChild(p)
    });
    todoCount.textContent = todo.length
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('document click')
    addButton.addEventListener('click', addTask)
    todoInput.addEventListener('keydown', function(event){
        if (event.key === 'Enter'){
            event.preventDefault()
            addTask()
        }
    })
    deleteButton.addEventListener('click', deleteAllTasks)
    deleteButton2.addEventListener('click', deleteAllTasks2)
    displayTasks()
})

fetch("/get_data")
    .then((response) => response.json)
    .then((data) => {
        // doi json thanh javascript va hien thi
        displayTasks(data)
    })
    .catch((error) => {
        console.error('Error:', error)
    })

// function saveToLocalStorage(){
//     // luu todo vao cuc bo dang string
//     localStorage.setItem('todo', JSON.stringify(todo))
// }

// function deleteAllTasks(){
//     // xoa het task
//     todo = []
//     saveToLocalStorage()
//     displayTasks()
// }

// function deleteAllTasks2(){
//     // xoa het task
//     todo = todo.filter(item => !item.disabled)
//     saveToLocalStorage()
//     displayTasks()
// }

// function toggleTask(index){
//     // chuyen trang thai da lam chua lam
//     todo[index].disabled = !todo[index].disabled
//     saveToLocalStorage()
//     displayTasks()
// }

// function addTask(){
//     // them vat pham ms
//     console.log('addTask - button click')
//     // chu thich rang da them vat pham (debug)
//     const newTask = todoInput.value.trim()
//     // them task moi lay tu input (bo du thua)
//     if (newTask != ''){
//         // neu khong rong (chua nhap)
//         todo.push({text: newTask, disabled: false})
//         // them vao todo o trang thai chua disable
//         saveToLocalStorage()
//         todoInput.value = ''
//         displayTasks()
//         // reset input, hien thi
//     }
// }

// function editTask(index){
//     // dieu chinh task
//     const todoItem = document.getElementById(`todo-${index}`)
//     // lay item
//     const existingText = todo[index].text
//     // text cu
//     const inputElement = document.createElement('input')
//     // them mot input de doi gia tri

//     inputElement.value = existingText
//     // text cu co the thay doi
//     todoItem.replaceWith(inputElement)
//     // thay item goc bang gia tri da doi
//     inputElement.focus()
//     // vao trong khung input

//     inputElement.addEventListener('blur', function(){
//         const updatedText = inputElement.value.trim()
//         // chu da cap nhat
//         if (updatedText){
//             // neu hop le
//             todo[index].text = updatedText
//             saveToLocalStorage()
//         }
//         displayTasks()
//         // hien thi
//     })
// }
