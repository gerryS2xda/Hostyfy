import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var hostCollectionRef = db.collection("host"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createHostDocument(uid, emailWeb, passwordWeb ){
    // Add a new document in collection "host" con set(), se non e' presente, crea il documento
    hostCollectionRef.doc(uid).set({
        userId: db.doc("guest/"+uid),
        emailWeb: emailWeb,
        passwordWeb: passwordWeb
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Update functions
export function updateHostDocument(uid,  emailWeb, passwordWeb){
    //Edit all field of host document
    return hostCollectionRef.doc(uid).update({
        emailWeb: emailWeb,
        passwordWeb: passwordWeb    
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
export function deleteHostDocument(uid){
    hostCollectionRef.doc(uid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read function
export function getHostDocumentRef(uid){
    return hostCollectionRef.doc(uid);
}

/*
export async function getHostDocument(uid){
    let doc = await hostCollectionRef.doc(uid).get();
    if (doc.exists) {
        //console.log("Nome: " + doc.data().nome);
        return doc.data();
    } else {
        Promise.reject("No such document with " + uid);
    }
}
*/