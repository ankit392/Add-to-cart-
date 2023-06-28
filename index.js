import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase,ref,push,onValue,remove}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

let lists=[]

const appSettings={
    databaseURL:"https://playground-7a9bc-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const shoppingListInDB=ref(database,"shoppinglist")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl=document.getElementById("ul-el")

function clearInputFieldEl() {
    inputFieldEl.value = ""
}


function appendItemToShoppingListEl(item) {
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    
    let itemId=item[0]
    let itemValue=item[1]
    
    let newEl=document.createElement("li")
    
    newEl.textContent=itemValue
    
    shoppingListEl.append(newEl)
    
    
    newEl.addEventListener("dblclick",function(){
       let exactlocofshoplist=ref(database,`shoppinglist/${itemId}`)
       
       remove(exactlocofshoplist)  
        
    })
    
    
    
}
function  clearShoppingListEl(){
      shoppingListEl.innerHTML = ""
}

// databse change
onValue(shoppingListInDB,function(snapshot){
    
         if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }   

})


addButtonEl.addEventListener("click",function(){
    let inputvalue=inputFieldEl.value
    push(shoppingListInDB,inputvalue)
    lists.push(inputvalue)
    
    clearInputFieldEl()
   // appendItemToShoppingListEl(inputvalue)
})



