import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var prenotazioniCollectionRef = db.collection("prenotazioni"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export async function createPrenotazioniDocument(hostuid, guestuid, strutturaDocId, alloggioDocId, dataInizio, dataFine, emailPren, numPersone, numTel, costo, cleanServiceId){ 
    var prenDocs = await getAllPrenotazioni();
    console.log("NumeroPrenotazioni" + prenDocs.length);

    // Add a new document in collection "prenotazioni" con set(), se non e' presente, crea il documento
    return await prenotazioniCollectionRef.add({
        numeroPrenotazione: prenDocs.length +1,
        hostRef: hostuid,
        guestRef: guestuid,
        strutturaRef: strutturaDocId, 
        alloggioRef: alloggioDocId,
        dataInizio: new Date(dataInizio),
        dataFine: new Date(dataFine), 
        emailPren: emailPren, 
        numPersone: numPersone, 
        numTel: numTel, 
        costo: costo,
        doneCheckIn: false, 
        cleanServiceRef: cleanServiceId
    }).then(function() {
        console.log("Prenotazione document successfully created!");
    })
    .catch(function(error) {
        console.error("Error writing prenotazione document: ", error);
    });
}

//Update functions
export async function updatePrenotazioniDocument(prenDocId, hostuid, guestuid, strutturaDocId, alloggioDocId, dataInizio, dataFine, emailPren, numPersone, numTel, costo, doneCheckIn, cleanServiceId){

    //Edit all field of prenotazioni document
    return await prenotazioniCollectionRef.doc(prenDocId).update({
        hostRef: hostuid,
        guestRef: guestuid,
        strutturaRef: strutturaDocId, 
        alloggioRef: alloggioDocId,
        dataInizio: new Date(dataInizio),
        dataFine: new Date(dataFine), 
        emailPren: emailPren, 
        numPersone: numPersone, 
        numTel: numTel, 
        costo: costo, 
        doneCheckIn: doneCheckIn,
        cleanServiceRef: cleanServiceId
    })
    .then(function() {
        console.log("Prenotazione document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating prenotazione document: ", error);
    }); 
}

export async function updateCheckInStatusPrenotazione(prenDocId, doneCheckIn){
    //Edit all field of prenotazioni document
    return await prenotazioniCollectionRef.doc(prenDocId).update({
        doneCheckIn: doneCheckIn,
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
export async function deletePrenotazioniDocument(prenDocId){
    return await prenotazioniCollectionRef.doc(prenDocId).delete().then(function() {
        console.log("Prenotazione document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing prenotazione document: ", error);
    });
}

//Read query functions
export async function getAllPrenotazioni(){
    let docs = await prenotazioniCollectionRef.get();
    return docs.docs;
}

export async function getPrenotazioneById(prenotazioneId){
    let doc = await db.collection('prenotazioni').doc(prenotazioneId).get();
    return doc.data();
}

export async function getAllPrenotazioniByHost(userId){
    let docs = await prenotazioniCollectionRef.where('hostRef','==',userId).get();
    return docs.docs; //Converte i documenti in un array di doc (per evitare di usare il forEach())
}

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

export async function getPrenotazioniAttualiHostQueryAlloggio(userId, dataOdierna, alloggioRef){
    let docs = await prenotazioniCollectionRef.where('hostRef','==',userId).where('dataFine','>=',dataOdierna).where('alloggioRef', '==' , alloggioRef).get();
    return docs.docs;
}
