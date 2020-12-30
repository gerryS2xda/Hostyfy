import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var hostCollectionRef = db.collection("host"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export function createHostDocument(uid, emailWeb, passwordWeb ){
    // Add a new document in collection "host" con set(), se non e' presente, crea il documento
    return hostCollectionRef.doc(uid).set({
        userIdRef: uid,
        emailWebAlloggiati: emailWeb,
        passwordWebAlloggiati: passwordWeb
    })
    .then(function() {
        console.log("Host document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Update functions
export function updateHostDocument(uid,  emailWeb, passwordWeb){
    //Edit all field of host document
    return hostCollectionRef.doc(uid).update({
        emailWebAlloggiati: emailWeb,
        passwordWebAlloggiati: passwordWeb    
    })
    .then(function() {
        console.log("Host document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); 
}

//Delete function
export function deleteHostDocument(uid){
    return hostCollectionRef.doc(uid).delete().then(function() {
        console.log("Host document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Read query functions
export async function getHostDocument(userId){
    let hostDoc = await hostCollectionRef.doc(userId).get();
    if(hostDoc.exists){
        return hostDoc.data();
    }else{
        return Promise.reject("HostModel: No such host document");
    }
}