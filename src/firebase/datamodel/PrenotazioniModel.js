import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var prenotazioniCollectionRef = db.collection("prenotazioni"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createPrenotazioniDocument(costo, dataInizio, dataFine, email, numPersone, numTel, strutturaDocId, alloggioDocId, chiaveAlloggioDocId, guestuid){
    // Add a new document in collection "prenotazioni" con set(), se non e' presente, crea il documento
    prenotazioniCollectionRef.add({
        costo: costo, 
        dataInizio: dataInizio,
        dataFine: dataFine, 
        email: email, 
        numPersone: numPersone, 
        numTel: numTel, 
        strutturaRef: db.doc("struttura/"+strutturaDocId), 
        alloggioRef: db.doc("struttura/" + strutturaDocId + "/alloggi/" + alloggioDocId), 
        chiaveAlloggioRef: db.doc("struttura/" + strutturaDocId + "/alloggi/" + alloggioDocId + "/chiave/" + chiaveAlloggioDocId), 
        guestRef: db.doc("guest/" + guestuid), 
        //hostRef: db.doc("host/"+hostCF)
    })
    .then(function() {
        console.log("Prenotazione document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing prenotazione document: ", error);
    });
}

//Update functions
export function updatePrenotazioniDocument(id, costo, dataInizio, dataFine, email, numPersone, numTel, strutturaDocId, alloggioDocId, chiaveAlloggioDocId, guestCF){
    //Edit all field of prenotazioni document
    return prenotazioniCollectionRef.doc(id).update({
        costo: costo, 
        dataInizio: dataInizio,
        dataFine: dataFine, 
        email: email, 
        numPersone: numPersone, 
        numTel: numTel,
        strutturaRef: db.doc("struttura/"+strutturaDocId), 
        alloggioRef: db.doc("struttura/" + strutturaDocId + "/alloggi/" + alloggioDocId), 
        chiaveAlloggioRef: db.doc("struttura/" + strutturaDocId + "/alloggi/" + alloggioDocId + "/chiave/" + chiaveAlloggioDocId), 
        guestRef: db.doc("guest/" + guestCF), 
        //hostRef: db.doc("host/"+hostCF) 
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

export async function getPrenotazioniCollection(){
    //Dammi tutti i documenti presenti nella collection "prenotazioni"
    let docs = await prenotazioniCollectionRef.get();
    return docs;
}