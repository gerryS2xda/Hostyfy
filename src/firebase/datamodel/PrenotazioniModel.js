import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var prenotazioniCollectionRef = db.collection("prenotazioni"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createPrenotazioniDocument(hostuid, guestuid, strutturaDocId, alloggioDocId, dataInizio, dataFine, emailPren, numPersone, numTel, costo){ 
    // Add a new document in collection "prenotazioni" con set(), se non e' presente, crea il documento
    prenotazioniCollectionRef.add({
        hostRef: hostuid,
        guestRef: guestuid,
        strutturaDocId: strutturaDocId, 
        alloggioRef: alloggioDocId,
        dataInizio: dataInizio,
        dataFine: dataFine, 
        emailPren: emailPren, 
        numPersone: numPersone, 
        numTel: numTel, 
        costo: costo, 
    })
    .then(function() {
        console.log("Prenotazione document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing prenotazione document: ", error);
    });
}

//Update functions
export function updatePrenotazioniDocument(prenDocId, hostuid, guestuid, strutturaDocId, alloggioDocId, dataInizio, dataFine, emailPren, numPersone, numTel, costo){
    //Edit all field of prenotazioni document
    return prenotazioniCollectionRef.doc(prenDocId).update({
        hostRef: hostuid,
        guestRef: guestuid,
        strutturaDocId: strutturaDocId, 
        alloggioRef: alloggioDocId,
        dataInizio: dataInizio,
        dataFine: dataFine, 
        emailPren: emailPren, 
        numPersone: numPersone, 
        numTel: numTel, 
        costo: costo, 
    })
    .then(function() {
        console.log("Prenotazione document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating prenotazione document: ", error);
    }); 
}

//Delete function
export function deletePrenotazioniDocument(prenDocId){
    prenotazioniCollectionRef.doc(prenDocId).delete().then(function() {
        console.log("Prenotazione document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing prenotazione document: ", error);
    });
}
