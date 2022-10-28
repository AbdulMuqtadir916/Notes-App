let addNotesButton = document.getElementById('addNotes');
// function read on default page
createdNotes();


addNotesButton.addEventListener('click', function (e) {
    let inputText = document.getElementById('text');
    let titleVal =document.getElementById('titleId') ;

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : titleVal.value,
        text : inputText.value
    }
    notesObj.push(myObj);
    console.log(notesObj)
    
    localStorage.setItem("notes", JSON.stringify(notesObj));
// input text empty after func run... 
    inputText.value = "";
    titleVal.value = "";
    
    createdNotes();
});


function createdNotes() {
    // Reading LocalSorage see whats there in LS
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
// console.log(notesObj)
    let notesCard = "";
    
    
    notesObj.forEach(function (element, index) {
        notesCard += ` 
    <div class="noteCard my-2 mx-4 card" style="width: 15rem;">
     <div class="card-body">
         <h5 id="cardTitle" class="card-title"> ${element.title.toUpperCase()}</h5>
         <p class="card-text">${element.text}</p>
         <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
     </div>
    </div>`
    });

    let notesElem = document.getElementById('notesC');
    if (notesObj.length != 0) {
        notesElem.innerHTML = notesCard;
    } else {
        notesElem.innerHTML = `No Notes Found!`;
    }


}

function deleteNote(indexs) {
    // console.log('i am ' + indexs);

    // reading LS
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(indexs, 1);

    // updating LS 
    localStorage.setItem("notes", JSON.stringify(notesObj));

    createdNotes();
}

let search = document.getElementById('search');
search.addEventListener('input', function () {
    let searchValue = search.value;

    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerText;
        if (cardText.includes(searchValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});

