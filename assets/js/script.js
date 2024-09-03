//Targets the form 
const noteForm = document.querySelector('#note-form');

//Targets the note header h3 
const noteHeader = document.querySelector('.note-header');

function getNotes() {
    const rawNotesArray = localStorage.getItem('notes');
    const notes = JSON.parse(localStorage.getItem('notes')) || []; 

    return notes;
}

//Function that calls the form is submitted
function createNote(eventObj) {
    eventObj.preventDefault();

    //Grab the note input 
    const noteInput = document.querySelector('#note-input');

    //Gets the note value what they typed into the box
    const noteText = noteInput.value;

    //Create a date value index
    const dateObj = new Date();

    //Gets the month from the date object
    const month = dateObj.getMonth() + 1;

    //Gets date from date object
    const date = dateObj.getDate();

    //Gets the year from the date object
    const year = dateObj.getFullYear();

    //Gets all the date components into one string 
    const dateStr = `${month}/${date}/${year}`;
  
    //Key value pair
    const notesObj = {
        text: noteText, //References the note string
        date: dateStr //References the date string 
    }
   
    const notes = getNotes();

    //push the  raw notes object into the notes array
    notes.push(notesObj);

    localStorage.getItem('notes', JSON.stringify(notes));

    const jsonArray = JSON.stringify(notes);
    localStorage.setItem('notes', jsonArray);

    outputNotes();
    noteInput.value = '';

}

function outputNotes() {
    const notes = getNotes();
    const container = document.querySelector('.container');

    if (notes.length) {
        noteHeader.innerText = 'Your Notes:'
    }
    container.innerHTML = '';

    for (const notesObj of notes) {
        //Target our main container element
        container.insertAdjacentHTML('beforeend', `
        <article class="note">
            <p class="note-text">${notesObj.text}</p>
            <p class="note-date">Created: ${notesObj.date}</p>
        </article>
        `);
    }
}

outputNotes();
noteForm.addEventListener('submit', createNote);