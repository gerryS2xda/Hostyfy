import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();

//Create functions: one function for each collection to create
export async function createAlloggioDocument(structId, nomeAlloggio, numCamere, numMaxPersone, piano, descrizione, pathVideo, fotoObj){
    // Add a new document in collection "alloggio" con set(), se non e' presente, crea il documento
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.add({
        nomeAlloggio: nomeAlloggio,
        numCamere: numCamere,
        numMaxPersone: numMaxPersone,
        piano: piano,
        descrizione: descrizione,
        pathvideo: pathVideo,
        fotoList: fotoObj,
    })
    .then(function() {
        console.log("Alloggio document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing alloggio document: ", error);
    });
}

export async function createCalendarioDocument(structId, alloggioId, giornoDisp, meseDisp, annoDisp){
    // Add a new document in collection "alloggi/alloggio+id/calendario"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("calendario").add({
        giorno: giornoDisp,
        mese: meseDisp,
        anno: annoDisp
    })
    .then(function() {
        console.log("Calendario document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing calendario document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export async function createChiaveDocument(structId, alloggioId, isActive, isForCleanService){
    // Add a new document in collection "alloggi/alloggio+id/chiave"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("chiavi").add({
        isActive: isActive,
        isForCleanService: isForCleanService
    })
    .then(function() {
        console.log("Chiave document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing chiave document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export async function createDispositiviDomoticiDocument(structId, alloggioId, nomeDevice, isActive){
    // Add a new document in collection "alloggi/alloggio+id/dispositividomotici"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("dispositividomotici").doc(nomeDevice).set({
        nome: nomeDevice,
        attivo: isActive,
    })
    .then(function() {
        console.log("Dispositivi domotici document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing dispositivi domotici document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

//Update functions
export async function updateAlloggioDocument(structId, alloggioId, nomeAlloggio, numCamere, numMaxPersone, piano, pathvideo){
    // Add a new document in collection "alloggio" con set(), se non e' presente, crea il documento
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).update({
        nomeAlloggio: nomeAlloggio,
        numCamere: numCamere,
        numMaxPersone: numMaxPersone,
        piano: piano,
        pathvideo: pathvideo
    })
    .then(function() {
        console.log("Alloggio document successfully update!");
    })
    .catch(function(error) {
        console.error("Error writing alloggio document: ", error);
    });
}

export async function updateCalendarioDocument(structId, alloggioId, docId, giornoDisp, meseDisp, annoDisp){
    // Add a new document in collection "alloggi/alloggio+id/calendario"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("calendario").doc(docId).update({
        giorno: giornoDisp,
        mese: meseDisp,
        anno: annoDisp
    })
    .then(function() {
        console.log("Calendario document in \"alloggi/alloggio" + alloggioId + " collection\" successfully update!");
    })
    .catch(function(error) {
        console.error("Error writing calendario document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export async function updateChiaveDocument(structId, alloggioId, chiaveId, isActive, isForCleanService){
    // Add a new document in collection "alloggi/alloggio+id/chiave"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("chiavi").doc(chiaveId).update({
        isActive: isActive,
        isForCleanService: isForCleanService
    })
    .then(function() {
        console.log("Chiave document in \"alloggi/alloggio" + alloggioId + " collection\" successfully update!");
    })
    .catch(function(error) {
        console.error("Error writing chiave document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export async function updateDispositiviDomoticiDocument(structId, alloggioId, nomeDevice, isActive){
    // Add a new document in collection "alloggi/alloggio+id/dispositividomotici"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("dispositividomotici").doc(nomeDevice).update({
        nome: nomeDevice,
        attivo: isActive,
    })
    .then(function() {
        console.log("Dispositivi domotici document in \"alloggi/alloggio" + alloggioId + " collection\" successfully update!");
    })
    .catch(function(error) {
        console.error("Error writing dispositivi domotici document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export async function updateFotoField(structId, alloggioId, fotoObj){
    // Add a new document in collection "alloggi/alloggio+id/foto"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).update({
        fotoList: fotoObj,
    })
    .then(function() {
        console.log("Foto document in \"alloggi/alloggio" + alloggioId + " successfully update!");
    })
    .catch(function(error) {
        console.error("Error writing foto document in \"alloggi/alloggio" + alloggioId + " : ", error);
    });
}

//Delete function
export async function deleteAlloggioDocument(structId, alloggioId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).delete().then(function() {
        console.log("Alloggio document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio document: ", error);
    });
}

export async function deleteCalendarioDocument(structId, alloggioId, docId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("calendario").doc(docId).delete().then(function() {
        console.log("Alloggio/calendario document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/calendario document: ", error);
    });
}

export async function deleteChiaveDocument(structId, alloggioId, chiaveId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("chiavi").doc(chiaveId).delete().then(function() {
        console.log("Alloggio/chiave document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/chiave document: ", error);
    });
}

export async function deleteDispositiviDomoticiDocument(structId, alloggioId, nomeDevice){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    return await alloggioCollectionRef.doc(alloggioId).collection("dispositividomotici").doc(nomeDevice).delete().then(function() {
        console.log("Alloggio/dispositividomotici document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/dispositividomotici document: ", error);
    });
}

//Read query functions
export async function getAllAlloggiOfStruttura(strutturaRef){
    var alloggioCollectionRef = db.collection("struttura/"+strutturaRef+"/alloggi");
    let alloggiDocs = await alloggioCollectionRef.get();
    return alloggiDocs.docs;
}

export async function getAlloggioByStrutturaRef(strutturaRef, alloggioRef){
    var alloggioCollectionRef = db.collection("struttura/"+strutturaRef+"/alloggi");
    let alloggio = await alloggioCollectionRef.doc(alloggioRef).get();
    if(alloggio.exists){
        return alloggio.data();
    }else{
        return Promise.reject("AlloggioModel: No such alloggio document");
    }
}

export async function getAlloggiByNome(strutturaRef, nomeAlloggio){
    var alloggioCollectionRef = db.collection("struttura/"+strutturaRef+"/alloggi");
    let alloggiDocs = await alloggioCollectionRef.where("nomeAlloggio", "==", nomeAlloggio).get();
    return alloggiDocs.docs;
}

export async function getChiaviCollectionOfAlloggio(strutturaRef, alloggioRef){
    var chiaviDocs = await db.collection("struttura/"+strutturaRef+"/alloggi").doc(alloggioRef).collection("chiavi").get();
    return chiaviDocs.docs;
}

export async function getChiaveDocumentById(strutturaRef, alloggioRef, chiaveId){
    let chiaveDoc = await db.collection("struttura/"+strutturaRef+"/alloggi").doc(alloggioRef).collection("chiavi").doc(chiaveId).get();
    if(chiaveDoc.exists){
        return chiaveDoc.data();
    }else{
        return Promise.reject("AlloggioModel: No such chiave document with this id: " + chiaveId);
    }
}