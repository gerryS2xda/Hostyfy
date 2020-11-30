import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var cleanServiceCollectionRef = db.collection("cleanService"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createGuestDocument(matricola, nome, cognome, email, numeroTelefono, ditta, dataAssunzione){
    // Add a new document in collection "cleanService" con set(), se non e' presente, crea il documento
    cleanServiceCollectionRef.doc(""+matricola).set({
        matricola: matricola, 
        nome: nome, 
        cognome: cognome, 
        email: email, 
        numeroTel: numeroTelefono, 
        ditta: ditta, 
        dataAssunzione: dataAssunzione 
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Update functions
export function updateCleanServiceDocument(matricola, nome, cognome, email, numeroTelefono, ditta, dataAssunzione){
    //Edit all field of Clean Service document
    return cleanServiceCollectionRef.doc(matricola).update({
        nome: nome, 
        cognome: cognome, 
        email: email, 
        numeroTel: numeroTelefono, 
        ditta: ditta, 
        dataAssunzione: dataAssunzione 
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
export function deleteCleanServiceDocument(matricola){
    cleanServiceCollectionRef.doc(matricola).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read function
export async function getCleanServiceDocument(matricola){
    let doc = await cleanServiceCollectionRef.doc(matricola).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such document with " + matricola);
    }
}