import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var cleanServiceCollectionRef = db.collection("cleanService"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export async function createCleanServiceDocument(email, numeroTelefono, ditta, dataAssunzione, hostID){
    // Add a new document in collection "cleanService" con set(), se non e' presente, crea il documento
    return await cleanServiceCollectionRef.add({
        email: email, 
        numeroTel: numeroTelefono, 
        ditta: ditta, 
        dataAssunzione: dataAssunzione,
        hostID: hostID
    })
    .then(function() {
        console.log("Clean Service document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Update functions
export async function updateCleanServiceDocument(id, email, numeroTelefono, ditta, dataAssunzione, hostID){
    //Edit all field of Clean Service document
    return await cleanServiceCollectionRef.doc(id).update({
        email: email, 
        numeroTel: numeroTelefono, 
        ditta: ditta, 
        dataAssunzione: dataAssunzione,
        hostID: hostID
    })
    .then(function() {
        console.log("Clean service document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating clean service document: ", error);
    }); 
}

//Delete function
export async function deleteCleanServiceDocument(id){
    return await cleanServiceCollectionRef.doc(id).delete().then(function() {
        console.log("Clean service document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing clean service document: ", error);
    });
}

export async function getCleanServiceByHost(hostID){
    let docs = await cleanServiceCollectionRef.where('hostID','==',hostID).get();
    return docs.docs; //Converte i documenti in un array di doc (per evitare di usare il forEach())
}

export async function getCleanServiceById(cleanServiceId){
    let doc = await db.collection('cleanService').doc(cleanServiceId).get();
    return doc.data();
}

