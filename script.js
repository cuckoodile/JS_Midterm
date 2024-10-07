document.addEventListener("DOMContentLoaded", () => {
    refresh_container()
})

function refresh_container() {
    const container = document.querySelector("#main-container")
    container.innerHTML = ''

    data.forEach(item => {
        container.innerHTML += `
            <div class="box" id="${item.id}" onclick="itemHTML(${item.id})">
                <section>
                    <button id="close-btn" onclick="Delete(${item.id})">X</button>
                    <button id="edit-btn" onclick="Edit(${item.id})">E</button>
                </section>
                <img id="card-img${item.id}" src="${item.img}" alt="${item.name}">
                <h3 id="card-title${item.id}">${item.name}</h3>
                <p id="card-description${item.id}" style="max-height: 20vh; overflow-y: auto;">${item.description}</p>
                <br>
                <br>
                <section>
                    <p id="card-price${item.id}" class="item-price">₱${item.price}</p>
                    <p id="card-status${item.id}">${item.status}</p>
                </section>
            </div>
        `
    })
}

function itemHTML(id) {
    // console.log(`Clicked: ${id}`)
}

// Show/hide pop-up
const pop_up = document.getElementById("pop-up")

function show_add() {
    pop_up.style.transform = "scale(1)"
}

function hide_add() {
    pop_up.style.transform = "scale(0)"
}

// Select image upon clicking the pop-up image
let base64String = ""
let imgElement = document.getElementById('img')
let inputFile = document.getElementById("fileId")

function imageUploaded() {
    let file = inputFile.files[0]
    
    let reader = new FileReader()
    reader.onload = function(e) {
        base64String = e.target.result
        imgElement.src = base64String
    }
    reader.readAsDataURL(file)
}

function selectImg() {
    inputFile.click()
}

// HTML elements to variable
let name_element = document.getElementById("name")
let price_element = document.getElementById("price")
let description_element = document.getElementById("description")
let status_element = document.getElementById("status")
let img_element = imgElement

// Clear the Add inputs
function clear_add_inputs() {
    base64String = ""
    document.getElementById('img').src = ''
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('description').value = ''
    document.getElementById('status').value = 'default'
}

// Adds the inputted informations at the pop-up inputs
function Add() {
    let img_src = base64String
    let name = name_element.value
    let price = price_element.value
    let description = description_element.value
    let status = status_element.value
    
    let new_object = {
        id: data.length + 1,
        name: name,
        img: img_src,
        price: price,
        description: description,
        status: status,
    }

    data = [new_object, ...data]
    dataToLocalStorage(data)
    refresh_container()

    clear_add_inputs()
    hide_add()
}

// Delete selected card
function Delete(id) {
    const filteredItems = data.filter(item => item.id !== id)
    data = filteredItems
    dataToLocalStorage(data)
    console.log(`${id} is deleted.`)
    refresh_container()
}

// Edit selected card content
let isEditing = false


let cardBase64String = ""
// let cardInputFile = document.querySelectorAll(`#inputFile${item.id}`)

function cardImageUploaded(id) {
    let cardInputFile = document.querySelector(`#inputFile${id}`)
    let cardImgElement = document.querySelector(`#img${id}`)
    let file = cardInputFile.files[0]

    let reader = new FileReader()
    reader.onload = function(e) {
        cardBase64String = e.target.result
        cardImgElement.src = cardBase64String
    }
    reader.readAsDataURL(file)
}

function selectCardImg(id) {
    let cardInputFile = document.querySelector(`#inputFile${id}`)
    cardInputFile.click()
}


function Edit(id) {
    let box = document.getElementById(id)
    let img_src = document.getElementById(`card-img${id}`).src
    let name = document.getElementById(`card-title${id}`).textContent
    let description = document.getElementById(`card-description${id}`).textContent
    let initial_price = document.getElementById(`card-price${id}`).textContent
    let price = initial_price.substring(1)
    let initial_status = document.getElementById(`card-status${id}`)
    let status_value = initial_status.textContent
    let other_edit_btn = document.querySelectorAll("#edit-btn")

    if(isEditing) {
        console.log(`${id} editor closed`)
        isEditing = false
        refresh_container()
    }
    else if(!isEditing) {
        console.log(other_edit_btn)
        other_edit_btn.forEach(function(button) {
            button.disabled = true
            button.style.opacity = .2
        })

        console.log(`${id} is editing`)
        console.log(`Initial data for box ${id}: ${name}, ${description}, ${price}, ${status_value}`)
        isEditing = true
        data.forEach(item => {
        box.innerHTML = `
            <section>
                <button id="edit-btn" onclick="refresh_container(); editingToFalse(${id})">X</button>
            </section>
            <input type="file" id="inputFile${id}" accept="image/*" onchange="cardImageUploaded(${id})" style="display: none;">
            <img class="edit-img" id="img${id}" onclick="selectCardImg(${id})" src="${img_src}"> 
            <h3 class="item-title" id="title${id}" contenteditable="true">${name}</h3>
            <p class="item-description" id="description${id}" style="max-height: 20vh; overflow-y: auto;" contenteditable="true">${description}</p>
            <br>
            <br>
            <section>
                <p id="price${id}" class="item-pricee" contenteditable="true">${price}</p>
                <select class="card-select" id="status${id}">
                    <option value="default" hidden selected>Select status</option>
                    <option value="Whole price">Whole price</option>
                    <option value="Sale">Sale</option>
                </select>
            </section>
            <button class="cardSaveBtn" onclick="saveEdit(${id})">Save</button>
        `
    })
    let status = document.getElementById(`status${id}`)
    status.value = status_value
}
}

function editingToFalse(id) {
    isEditing = false
    console.log(`Editor ${id} closed`)
}

function saveEdit(id) {
    let card_img = document.getElementById(`img${id}`).src
    let card_title = document.getElementById(`title${id}`).innerText
    let card_description = document.getElementById(`description${id}`).innerText
    let card_price = document.getElementById(`price${id}`).innerText
    let card_status = document.getElementById(`status${id}`).value

    console.log(`New values of: ${card_title}, ${card_description}, ${card_price}, ${card_status}, ${card_img}`)

    let new_object = {
        id: id,
        name: card_title,
        img: card_img,
        price: card_price,
        description: card_description,
        status: card_status,
    }

    console.log(data[id])

    const newFilteredItems = data.filter(item => item.id != id)
    console.log(`\nfiltered items:`)
    console.log(newFilteredItems)
    
    let newData = data[id] = new_object
    console.log(newData)
    
    data = [newData, ...newFilteredItems]
    console.log(`\nnew data:`)
    console.log(data)
    
    data.sort((a, b) => b.id - a.id)
    console.log(`\nNew sorted data:`)
    console.log(data)

    dataToLocalStorage(data)
    editingToFalse(id)
    refresh_container()
}