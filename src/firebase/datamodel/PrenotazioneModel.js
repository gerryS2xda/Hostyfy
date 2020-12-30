import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var prenotazioniCollectionRef = db.collection("prenotazioni"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createPrenotazioniDocument(hostuid, guestuid, strutturaDocId, alloggioDocId, dataInizio, dataFine, emailPren, numPersone, numTel, costo){ 
    // Add a new document in collection "prenotazioni" con set(), se non e' presente, crea il documento
    return prenotazioniCollectionRef.add({
        numeroPrenotazione: 0,
        hostRef: hostuid,
        guestRef: guestuid,
        strutturaDocId: strutturaDocId, 
        alloggioRef: alloggioDocId,
        dataInizio: new Date(dataInizio),
        dataFine: new Date(dataFine), 
        emailPren: emailPren, 
        numPersone: numPersone, 
        numTel: numTel, 
        costo: costo, 
    })
    .then(function(docRef) {
        console.log("Prenotazione document successfully written!");
        prenotazioniCollectionRef.get().then((docs)=>{
            updateNumeroPrenotazione(docRef, docs.size +1);
        });
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
        dataInizio: new Date(dataInizio),
        dataFine: new Date(dataFine), 
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

export function updateNumeroPrenotazione(prenDocId, numPren){
    //Edit all field of prenotazioni document
    return prenotazioniCollectionRef.doc(prenDocId).update({
        numeroPrenotazione: numPren,
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
    return prenotazioniCollectionRef.doc(prenDocId).delete().then(function() {
        console.log("Prenotazione document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing prenotazione document: ", error);
    });
}

//Read query functions
export async function getPrenotazioniHostQuery(userId, dataOdierna){
    let docs = await prenotazioniCollectionRef.where('hostRef','==',userId).where('dataFine','<=',dataOdierna).get();
    return docs.docs; //Converte i documenti in un array di doc (per evitare di usare il forEach())
}

export async function getPrenotazioniGuestQuery(userId, dataOdierna){
    let docs = await prenotazioniCollectionRef.where('guestRef','==',userId).where('dataFine','<=',dataOdierna).get();
    return docs.docs; 
}

export async function getPrenotazioniAttualiHostQuery(userId, dataOdierna){
    let docs = await prenotazioniCollectionRef.where('hostRef','==',userId).where('dataFine','>=',dataOdierna).get();
    return docs.docs;
}
  
export async function getPrenotazioniAttualiGuestQuery(userId, dataOdierna){
    let docs = await prenotazioniCollectionRef.where('guestRef','==',userId).where('dataFine','>=',dataOdierna).get();
    return docs.docs;
}

export async function getPrenotazioneById(prenotazioneId){
    let doc = await db.collection('prenotazioni').doc(prenotazioneId).get();
    return doc.data();
}
