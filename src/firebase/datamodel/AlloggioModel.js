import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();

//Create functions: one function for each collection to create
export function createAlloggioDocument(structId, alloggioId, nomeAlloggio, numCamere, numMaxPersone, piano, pathvideo){
    // Add a new document in collection "alloggio" con set(), se non e' presente, crea il documento
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).set({
        id: alloggioId,
        nomeAlloggio: nomeAlloggio,
        numCamere: numCamere,
        numMaxPersone: numMaxPersone,
        piano: piano,
        pathvideo: pathvideo
    })
    .then(function() {
        console.log("Alloggio document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing alloggio document: ", error);
    });
}

export function createCalendarioDocument(structId, alloggioId, giornoDisp, meseDisp, annoDisp){
    // Add a new document in collection "alloggi/alloggio+id/calendario"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("calendario").add({
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

export function createChiaveDocument(structId, alloggioId, chiaveId){
    // Add a new document in collection "alloggi/alloggio+id/chiave"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("chiave").doc("idchiave" + chiaveId).set({
        id: chiaveId,
    })
    .then(function() {
        console.log("Chiave document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing chiave document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export function createDispositiviDomoticiDocument(structId, alloggioId, nomeDevice, isActive){
    // Add a new document in collection "alloggi/alloggio+id/dispositividomotici"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("dispositividomotici").doc(nomeDevice).set({
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

export function createFotoDocument(structId, alloggioId, pathFoto){
    // Add a new document in collection "alloggi/alloggio+id/foto"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("foto").add({
        path: pathFoto,
    })
    .then(function() {
        console.log("Foto document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing foto document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}


//Update functions
export function updateAlloggioDocument(structId, alloggioId, nomeAlloggio, numCamere, numMaxPersone, piano, pathvideo){
    // Add a new document in collection "alloggio" con set(), se non e' presente, crea il documento
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).update({
        id: alloggioId,
        nomeAlloggio: nomeAlloggio,
        numCamere: numCamere,
        numMaxPersone: numMaxPersone,
        piano: piano,
        pathvideo: pathvideo
    })
    .then(function() {
        console.log("Alloggio document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing alloggio document: ", error);
    });
}

export function updateCalendarioDocument(structId, alloggioId, docId, giornoDisp, meseDisp, annoDisp){
    // Add a new document in collection "alloggi/alloggio+id/calendario"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("calendario").doc(docId).update({
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

export function updateChiaveDocument(structId, alloggioId, chiaveId){
    // Add a new document in collection "alloggi/alloggio+id/chiave"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("chiave").doc("idchiave" + chiaveId).update({
        id: chiaveId,
    })
    .then(function() {
        console.log("Chiave document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing chiave document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

export function updateDispositiviDomoticiDocument(structId, alloggioId, nomeDevice, isActive){
    // Add a new document in collection "alloggi/alloggio+id/dispositividomotici"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("dispositividomotici").doc(nomeDevice).update({
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

export function updateFotoDocument(structId, alloggioId, fotoId, pathFoto){
    // Add a new document in collection "alloggi/alloggio+id/foto"
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("foto").doc(""+fotoId).update({
        path: pathFoto,
    })
    .then(function() {
        console.log("Foto document in \"alloggi/alloggio" + alloggioId + " collection\" successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing foto document in \"alloggi/alloggio" + alloggioId + " collection\": ", error);
    });
}

//Delete function
export function deleteAlloggioDocument(structId, alloggioId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).delete().then(function() {
        console.log("Alloggio document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio document: ", error);
    });
}

export function deleteCalendarioDocument(structId, alloggioId, docId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("calendario").doc(docId).delete().then(function() {
        console.log("Alloggio/calendario document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/calendario document: ", error);
    });
}

export function deleteChiaveDocument(structId, alloggioId, chiaveId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("chiave").doc("idchiave" + chiaveId).delete().then(function() {
        console.log("Alloggio/chiave document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/chiave document: ", error);
    });
}

export function deleteDispositiviDomoticiDocument(structId, alloggioId, nomeDevice){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("dispositividomotici").doc(nomeDevice).delete().then(function() {
        console.log("Alloggio/dispositividomotici document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/dispositividomotici document: ", error);
    });
}

export function deleteFotoDocument(structId, alloggioId, fotoId){
    var alloggioCollectionRef = db.collection("struttura/"+structId+"/alloggi");
    alloggioCollectionRef.doc("alloggio"+alloggioId).collection("foto").doc(""+fotoId).delete().then(function() {
        console.log("Alloggio/foto document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing alloggio/foto document: ", error);
    });
}

//Read function
export function getAlloggioDocumentRef(structId, alloggioId){
    return db.collection("struttura/"+structId+"/alloggi").doc("alloggio"+alloggioId);
}

/*
export async function getAlloggioDocument(structId, alloggioId){
    let doc = await db.collection("struttura/"+structId+"/alloggi").doc("alloggio"+alloggioId).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such alloggio document with " + alloggioId);
    }
}

export async function getCalendarioDocument(structId, alloggioId, docId){
    let doc = await db.collection("struttura/"+structId+"/alloggi").doc("alloggio"+alloggioId).collection("calendario").doc(docId).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such alloggio/calendario document with " + alloggioId);
    }
}

export async function getChiaveDocument(structId, alloggioId, chiaveId){
    let doc = await db.collection("struttura/"+structId+"/alloggi").doc("alloggio"+alloggioId).collection("chiave").doc("idchiave" + chiaveId).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such alloggio/chiave document with " + alloggioId);
    }
}

export async function getDispositiviDomoticiDocument(structId, alloggioId, nomeDevice){
    let doc = await db.collection("struttura/"+structId+"/alloggi").doc("alloggio"+alloggioId).collection("dispositividomotici").doc(nomeDevice).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such alloggio/dispositividomotici document with " + alloggioId);
    }
}

export async function getFotoDocument(structId, alloggioId, fotoId){
    let doc = await db.collection("struttura/"+structId+"/alloggi").doc("alloggio"+alloggioId).collection("foto").doc(""+fotoId).get();
    if (doc.exists) {
        return doc.data();
    } else {
        Promise.reject("No such alloggio/foto document with " + alloggioId);
    }
}

*/