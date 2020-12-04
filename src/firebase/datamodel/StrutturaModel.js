import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var strutturaCollectionRef = db.collection("struttura"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createStrutturaDocument(uidHost, codiceOtp, denominazione, descrizione, indirizzobj, guida, numAlloggi, tipologia, cleanServiceDocId){
    // Add a new document in collection "Struttura" con set(), se non e' presente, crea il documento
    strutturaCollectionRef.add({
        codiceOtp: codiceOtp, 
        denominazione: denominazione, 
        descrizione: descrizione, 
        indirizzo: indirizzobj,
        guida: guida, 
        numAlloggi: numAlloggi, 
        tipologia: tipologia,
        hostRef: uidHost,      
        cleanServiceRef: cleanServiceDocId 
    })
    .then(function() {
        console.log("Struttura document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing struttura document: ", error);
    });
}

export function createFotoDocument(structId, pathFoto){
    // Add a new document in collection "alloggi/alloggio+id/foto"
    strutturaCollectionRef.doc(structId).collection("foto").add({
        path: pathFoto,
    })
    .then(function() {
        console.log("Foto document in \"struttura/" + structId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing foto document in \"struttura/" + structId + " collection\": ", error);
    });
}

//Update functions
export function updateStrutturaDocument(id, codiceOtp, denominazione, descrizione, indirizzobj, guida, numAlloggi, tipologia){
    return strutturaCollectionRef.doc(id).update({
        codiceOtp: codiceOtp, 
        denominazione: denominazione, 
        descrizione: descrizione,
        indirizzo: indirizzobj, 
        guida: guida, 
        numAlloggi: numAlloggi, 
        tipologia: tipologia, 
    })
    .then(function() {
        console.log("Struttura document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating struttura document: ", error);
    }); 
}

export function updateFotoDocument(structId, fotoId, pathFoto){
    strutturaCollectionRef.doc(structId).collection("foto").doc(fotoId).update({
        path: pathFoto,
    })
    .then(function() {
        console.log("Foto document in \"struttura/" + structId + " collection\" successfully updated!");
    })
    .catch(function(error) {
        console.error("Error writing foto document in \"struttura/" + structId + " collection\": ", error);
    });
}

//Delete function
export function deleteStrutturaDocument(id){
    strutturaCollectionRef.doc(id).delete().then(function() {
        console.log("Struttura document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing struttura document: ", error);
    });
}

export function deleteFotoDocument(structId, fotoId){
    strutturaCollectionRef.doc(structId).collection("foto").doc(fotoId).delete().then(function() {
        console.log("struttura/structId/foto document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing struttura/structId/foto document: ", error);
    });
}