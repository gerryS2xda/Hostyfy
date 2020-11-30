import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var strutturaCollectionRef = db.collection("struttura"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createStrutturaDocument(id, cfHost, codiceOtp, denominazione, descrizione, guida, numAlloggi, tipologia, cleanServiceDocId){
    // Add a new document in collection "Struttura" con set(), se non e' presente, crea il documento
    strutturaCollectionRef.doc(id).set({
        id: id,
        codiceOtp: codiceOtp, 
        denominazione: denominazione, 
        descrizione: descrizione, 
        guida: guida, 
        numAlloggi: numAlloggi, 
        tipologia: tipologia,
        cfHostRef: db.doc("host/"+cfHost),      
        cleanServiceRef: db.doc("cleanService/"+cleanServiceDocId) 
    })
    .then(function() {
        console.log("Struttura document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing struttura document: ", error);
    });
}


//Update functions
export function updateStrutturaDocument(id, codiceOtp, denominazione, descrizione, guida, numAlloggi, tipologia){
    //Edit all field of guest document
    return strutturaCollectionRef.doc(id).update({
        id: id,
        codiceOtp: codiceOtp, 
        denominazione: denominazione, 
        descrizione: descrizione, 
        guida: guida, 
        numAlloggi: numAlloggi, 
        tipologia: tipologia 
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
export function deleteStrutturaDocument(id){
    strutturaCollectionRef.doc(id).delete().then(function() {
        console.log("Struttura document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing struttura document: ", error);
    });
}

//Read function
export async function getStrutturaDocument(id){
    let doc = await strutturaCollectionRef.doc(id).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such struttura document with " + uid);
    }
}
