import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var strutturaCollectionRef = db.collection("struttura"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export async function createStrutturaDocument(uidHost, codiceOtp, denominazione, descrizione, indirizzobj, guida, numAlloggi, tipologia, cleanServiceDocId, fotoObj){
    // Add a new document in collection "Struttura" con set(), se non e' presente, crea il documento
    return await strutturaCollectionRef.add({
        codiceOtp: codiceOtp, 
        denominazione: denominazione, 
        descrizione: descrizione, 
        indirizzo: indirizzobj,
        guida: guida, 
        numAlloggi: numAlloggi, 
        tipologia: tipologia,
        hostRef: uidHost,      
        cleanServiceRef: cleanServiceDocId,
        fotoList: fotoObj, 
    })
    .then(function() {
        console.log("Struttura document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing struttura document: ", error);
    });
}

//Update functions
export async function updateStrutturaDocument(id, codiceOtp, denominazione, descrizione, indirizzobj, guida, numAlloggi, tipologia){
    return await strutturaCollectionRef.doc(id).update({
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

export async function updateFotoField(structId, fotoObj){
    return await strutturaCollectionRef.doc(structId).update({
        fotoList: fotoObj, 
    })
    .then(function() {
        console.log("Foto document in \"struttura/" + structId + " successfully updated!");
    })
    .catch(function(error) {
        console.error("Error writing foto document in \"struttura/" + structId + " : ", error);
    });
}

export async function updateCodiceOTP(id, codiceOtp){
    return await strutturaCollectionRef.doc(id).update({
        codiceOtp: codiceOtp, 
    })
    .then(function() {
        console.log("Struttura document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating struttura document: ", error);
    }); 
}

//Delete function
export async function deleteStrutturaDocument(id){
    return await strutturaCollectionRef.doc(id).delete().then(function() {
        console.log("Struttura document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing struttura document: ", error);
    });
}

//Read query function
export async function getStruttureOfAHostQuery(userId){
    let docs = await strutturaCollectionRef.where('hostRef', '==', userId).get();
    return docs.docs;
}

export async function getStrutturaByDenominazione(denominazione){
    let docs = await strutturaCollectionRef.where("denominazione", "==", denominazione).get();
    return docs.docs;
}

export async function getStrutturaDocumentById(strutturaId){
    let struttura = await strutturaCollectionRef.doc(strutturaId).get()
    if(struttura.exists){
        return struttura.data();
    }else{
        return Promise.reject("StrutturaModel: No such struttura document");
    }
}

export async function getAlloggiOfStruttura(strutturaId){
    let alloggi = await strutturaCollectionRef.doc(strutturaId).collection('alloggi').get();
    return alloggi.docs;
}
