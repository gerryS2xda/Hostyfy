import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var guestCollectionRef = db.collection("guest"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export async function createGuestDocument(uid, cf, cognome, nome, dataNasc, sesso, luogoNasc, numCell, numTel, nazionalita, indirizzobj, isHost, emailGuest){
    // Add a new document in collection "guest" con set(), se non e' presente, crea il documento
    return await guestCollectionRef.doc(uid).set({
        userId: uid,
        cf: cf,
        cognome: cognome,
        nome: nome,
        sesso: sesso,
        dataNascita: new Date(dataNasc),
        luogoNascita: luogoNasc,
        nazionalita: nazionalita,
        numCell: numCell,
        numTel: numTel,
        indirizzo: indirizzobj,
        isHost: isHost,
        email: emailGuest
    })
    .then(function() {
        console.log("Guest document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export async function createGuestDocumentForRegistration(uid, cognome, nome, emailGuest){
    // Add a new document in collection "guest" con set(), se non e' presente, crea il documento
    //email e password vengono gestite da Firebase e sono accesibili mediante userId
    return await guestCollectionRef.doc(uid).set({
        userId: uid,
        cf: "", 
        cognome: cognome,
        nome: nome,
        sesso: "",
        dataNascita: "",
        luogoNascita: "",
        nazionalita: "",
        numCell: "",
        numTel: "",
        indirizzo: {via: "", citta: "", provincia: "", cap: "", regione: ""},
        isHost: false,
        email: emailGuest
    })
    .then(function() {
        console.log("Guest document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export async function createCreditCardDocumentGuest(uid, numCreditCard, ccv, intestatario, dataScadenza){
    // Add a new document in collection "guest"
    return await guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).set({
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
export async function updateGuestDocument(uid, cf, cognome, nome, sesso, dataNasc, luogoNasc, numCell, numTel, nazionalita, indirizzobj, emailGuest){
    //Edit all field of guest document
    return await guestCollectionRef.doc(uid).update({
        cf: cf,
        cognome: cognome,
        nome: nome,
        sesso: sesso,
        dataNascita: new Date(dataNasc),
        luogoNascita: luogoNasc,
        numCell: numCell,
        numTel: numTel,
        indirizzo: indirizzobj,
        nazionalita: nazionalita,
        email: emailGuest
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); 
}

export async function updateisHost(uid, isHost){
    //Edit all field of guest document
    return await guestCollectionRef.doc(uid).update({
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

export async function updateCreditCardDocument(uid, numCreditCard, ccv, intestatario, dataScadenza){
    //Edit all field of guest document
    return await guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).update({
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
export async function deleteGuestDocument(uid){
    return await guestCollectionRef.doc(uid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export async function deleteCreditCardDocument(uid){
    return await guestCollectionRef.doc(uid).collection("cartaCredito").doc(uid).delete().then(function() {
        console.log("Credit card document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read query functions
export async function getGuestDocument(userId){
    let guestDoc = await guestCollectionRef.doc(userId).get();
    if(guestDoc.exists){
        return guestDoc.data();
    }else{
        return Promise.reject("GuestModel: No such guest document");
    }
}

export async function getGuestCreditCardDocument(userId){
    let creditCardDoc = await guestCollectionRef.doc(userId).collection("cartaCredito").doc(userId).get();
    if(creditCardDoc.exists){
        return creditCardDoc.data();
    }else{
        return Promise.reject("GuestModel: No such creditcard document");
    }
}

export async function getGuestDocumentByEmail(email){
    let docs = await guestCollectionRef.where('email', '==', email).get();
    return docs.docs;
}