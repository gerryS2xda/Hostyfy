import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();

//Create functions: one function for each collection to create
export async function createRecensioneDocument(structId, alloggioId, prenotazioneRef, guestRef, dataRecensione, dataSoggiorno, punteggio, negativeFeedback, positiveFeedback){
    return await db.collection("struttura/" + structId + "/alloggi/" + alloggioId + "/recensioni").add({
        prenotazioneRef: prenotazioneRef,
        guestRef: guestRef,
        punteggio: punteggio,
        dataRecensione: dataRecensione,
        dataSoggiorno: dataSoggiorno, //object javascript with mese and anno property
        negativeFeedback: negativeFeedback,
        positiveFeedback: positiveFeedback,
    }).then(function() {
        console.log("Recensione document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing a recensione document: ", error);
    });
}

//Update functions
export async function updateRecensioneDocument(structId, alloggioId, recensioneId, prenotazioneRef, guestRef, dataRecensione, dataSoggiorno, punteggio, negativeFeedback, positiveFeedback){
    return await db.collection("struttura/" + structId + "/alloggi/" + alloggioId + "/recensioni").doc(recensioneId).update({
        prenotazioneRef: prenotazioneRef,
        guestRef: guestRef,
        punteggio: punteggio,
        dataRecensione: dataRecensione,
        dataSoggiorno: dataSoggiorno, //object javascript with mese and anno property
        negativeFeedback: negativeFeedback,
        positiveFeedback: positiveFeedback,
    }).then(function() {
        console.log("Recensione document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating a recensione document: ", error);
    });
}

//Delete function
export async function deleteRecensioneDocument(structId, alloggioId, recensioneId){
    return await db.collection("struttura/" + structId + "/alloggi/" + alloggioId + "/recensioni").doc(recensioneId).delete().then(function() {
        console.log("Recensione document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing a recensione document: ", error);
    });
}

//Read query functions
export async function getRecensioniByAlloggioRef(structId, alloggioId){
    let recensioniDocs = await db.collection("struttura/" + structId + "/alloggi/" + alloggioId + "/recensioni").get();
    return recensioniDocs.docs;
}

export async function getRecensioneById(structId, alloggioId, recensioneId){
    let recensioneDoc = await db.collection("struttura/" + structId + "/alloggi/" + alloggioId + "/recensioni").doc(recensioneId).get();
    if(recensioneDoc.exists){
        return recensioneDoc.data();
    }else{
        return Promise.reject("RecensioneModel: No such recensione document");
    }
}

export async function getRecensioniByGuestRef(structId, alloggioId, guestRef){
    let recensioniDocs = await db.collection("struttura/" + structId + "/alloggi/" + alloggioId + "/recensioni").where('guestRef', '==', guestRef).get();
    return recensioniDocs.docs;
}