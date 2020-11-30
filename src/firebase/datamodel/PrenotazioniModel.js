import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var prenotazioniCollectionRef = db.collection("prenotazioni"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createPrenotazioniDocument(id, costo, dataInizio, dataFine, email, numPersone, numTel, alloggio, chiaveAlloggio, guest, host, struttura){
    // Add a new document in collection "prenotazioni" con set(), se non e' presente, crea il documento
    prenotazioniCollectionRef.doc(id).set({
        id: id, 
        costo: costo, 
        dataInizio: dataInizio,
        dataFine: dataFine, 
        email: email, 
        numPersone: numPersone, 
        numTel: numTel, 
        alloggio: alloggio, //è riferimento, deve essere cambiato
        chiaveAlloggio: chiaveAlloggio, //è riferimento, deve essere cambiato
        guest: guest, //è riferimento, deve essere cambiato
        host: host, //è riferimento, deve essere cambiato
        struttura: struttura //è riferimento, deve essere cambiato
        
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Update functions
export function updatePrenotazioniDocument(costo, dataInizio, dataFine, email, numPersone, numTel, alloggio, chiaveAlloggio, guest, host, struttura){
    //Edit all field of prenotazioni document
    return prenotazioniCollectionRef.doc(id).update({
        costo: costo, 
        dataInizio: dataInizio,
        dataFine: dataFine, 
        email: email, 
        numPersone: numPersone, 
        numTel: numTel, 
        alloggio: alloggio, //è riferimento, deve essere cambiato
        chiaveAlloggio: chiaveAlloggio, //è riferimento, deve essere cambiato
        guest: guest, //è riferimento, deve essere cambiato
        host: host, //è riferimento, deve essere cambiato
        struttura: struttura //è riferimento, deve essere cambiato
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); 
}

//Delete function
export function deletePrenotazioniDocument(id){
    prenotazioniCollectionRef.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read function
export async function getPrenotazioniDocument(id){
    let doc = await prenotazioniCollectionRef.doc(id).get();
    if (doc.exists) {
        //console.log("Nome: " + doc.data().nome);
        return doc.data();
    } else {
        Promise.reject("No such document with " + id);
    }
}
