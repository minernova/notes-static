
const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    
    const data=[];
    notes.forEach(
        (textareaElement) => {
            data.push(textareaElement.value)
        }
    )
    
console.log(data[data.length-1],data);
fetch("http://localhost:3000/",{
    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({id:Math.random(),content:data[data.length-1]})
}).then((data)=>{
    return data.json();
}).then((data)=>{
    console.log(data)
}).catch((err)=>{console.log(err)})


    if(data.length===0){
        localStorage.removeItem("notes")
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
    }
addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)



const addNote = (text = "",id) => {
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
         <i class="save fa-solid fa-floppy-disk"></i>
         <i class="trash fa-sharp fa-solid fa-trash" id="${id}"></i> 
  </div>
  <textarea>${text}</textarea>
  `;

  note.querySelector(".trash").addEventListener(
    "click",
    function (e) {
        console.log(e,e.target,e.target.id)
        fetch("http://localhost:3000/delete",{
    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({id:parseFloat(e.target.id)})
}).then((data)=>{
    return data.json();
}).then((data)=>{   
    console.log(data)
}).catch((err)=>{console.log(err)})


       note.remove()
        
    }
  )

  note.querySelector(".save").addEventListener(
    "click",
    function () {
       saveNotes()
    }
  )
  main.appendChild(note);
}

    function addFetchedNotes(notes){
        
        notes?.forEach(
            (lsNote) => {
                addNote(lsNote.content,lsNote.id)
            }
        )
        
    }


// let arr=[
//     {
//         val:"hi"
//     },
//     {
//         val:"hello"
//     },
// ]
// let arr2=[];
// arr.forEach((note)=>{
//     console.log(note);
//     arr2.push(note.val)
// })


fetch("http://localhost:3000/").then((data)=>{
    return data.json();
}).then((data)=>{
    addFetchedNotes(data)
    console.log(data)
}).catch((err)=>{console.log(err)})

