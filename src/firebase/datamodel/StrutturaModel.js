import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var StrutturaCollectionRef = db.collection("struttura"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createStrutturaDocument(id, codiceOtp, denominazione, descrizione, guida, numAlloggi, tipologia){
    // Add a new document in collection "Struttura" con set(), se non e' presente, crea il documento
    StrutturaCollectionRef.doc(id).set({
        id: id,
        codiceOtp: codiceOtp, 
        denominazione: denominazione, 
        descrizione: descrizione, 
        guida: guida, 
        numAlloggi: numAlloggi, 
        tipologia: tipologia 
        
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export function createAlloggiDocumentStruttura(uid, numCreditCard, ccv, intestatario, dataScadenza){
    // Add a new document in collection "guest"
    guestCollectionRef.doc(uid).collection("cartaCredito").doc(""+numCreditCard).set({
        numeroCarta: numCreditCard,
        ccv: ccv,
        intestatario: intestatario,
        dataScadenza: dataScadenza
    })
    .then(function() {
        console.log("CreditCard document in guest collection successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing creditcard document: ", error);
    });
}

//Update functions
export function updateGuestDocument(uid, cf, cognome, nome, dataNasc, luogoNasc, numCell, numTel, indirizzobj, isHost){
    //Edit all field of guest document
    return guestCollectionRef.doc(uid).update({
        cf: cf,
        cognome: cognome,
        nome: nome,
        dataNascita: dataNasc,
        luogoNascita: luogoNasc,
        numCell: numCell,
        numTel: numTel,
        indirizzo: indirizzobj,
        isHost: isHost
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); 
}

export function updateisHost(uid, isHost){
    //Edit all field of guest document
    return guestCollectionRef.doc(uid).update({
        isHost: isHost
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
export function deleteGuestDocument(uid){
    guestCollectionRef.doc(uid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read function
export async function getGuestDocument(uid){
    let doc = await guestCollectionRef.doc(uid).get();
    if (doc.exists) {
        //console.log("Nome: " + doc.data().nome);
        return doc.data();
    } else {
        Promise.reject("No such document with " + uid);
    }
}
