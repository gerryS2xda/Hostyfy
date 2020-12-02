import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var guestCollectionRef = db.collection("guest"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createGuestDocument(uid, cf, cognome, nome, dataNasc, sesso, luogoNasc, numCell, numTel, nazionalita, indirizzobj, isHost, emailGuest, pwdGuest){
    // Add a new document in collection "guest" con set(), se non e' presente, crea il documento
    guestCollectionRef.doc(uid).set({
        userId: uid,
        cf: cf,
        cognome: cognome,
        nome: nome,
        sesso: sesso,
        dataNascita: dataNasc,
        luogoNascita: luogoNasc,
        nazionalita: nazionalita,
        numCell: numCell,
        numTel: numTel,
        indirizzo: indirizzobj,
        isHost: isHost,
        email: emailGuest, 
        password: pwdGuest 
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export function createGuestDocumentForRegistration(uid, cognome, nome, emailGuest, pwdGuest){
    // Add a new document in collection "guest" con set(), se non e' presente, crea il documento
    //email e password vengono gestite da Firebase e sono accesibili mediante userId
    guestCollectionRef.doc(uid).set({
        userId: uid,
        cf: "", 
        cognome: cognome,
        nome: nome,
        sesso: "",
        dataNascita: "",
        luogoNascita: "",
        nazionalita: "",
        numCell: 0,
        numTel: 0,
        indirizzo: {via: "", citta: "", provincia: "", cap: 0, regione: ""},
        isHost: false,
        email: emailGuest,
        password: pwdGuest 
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export function createCreditCardDocumentGuest(uid, numCreditCard, ccv, intestatario, dataScadenza){
    // Add a new document in collection "guest"
    guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).set({
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
export function updateGuestDocument(uid, cf, cognome, nome, sesso, dataNasc, luogoNasc, numCell, numTel, nazionalita, indirizzobj, isHost, emailGuest, pwdGuest){
    //Edit all field of guest document
    return guestCollectionRef.doc(uid).update({
        cf: cf,
        cognome: cognome,
        nome: nome,
        sesso: sesso,
        dataNascita: dataNasc,
        luogoNascita: luogoNasc,
        numCell: numCell,
        numTel: numTel,
        indirizzo: indirizzobj,
        nazionalita: nazionalita,
        isHost: isHost,
        email: emailGuest,
        password: pwdGuest 
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

export function updateCreditCardDocument(uid, numCreditCard, ccv, intestatario, dataScadenza){
    //Edit all field of guest document
    return guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).update({
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

//Delete function
export function deleteGuestDocument(uid){
    guestCollectionRef.doc(uid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export function deleteCreditCardDocument(uid){
    guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).delete().then(function() {
        console.log("Credit card document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read function
export function getGuestDocumentRef(uid){
    return guestCollectionRef.doc(uid);
}

export function getCartaCreditoDocumentRef(uid){
    return guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid);
}

/*
export async function getGuestDocument(uid){
    let doc = await guestCollectionRef.doc(uid).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such guest document with " + uid);
    }
}

export async function getCartaCreditoDocument(uid){
    let doc = await guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such guest/creditcard document with " + uid);
    }
}

*/