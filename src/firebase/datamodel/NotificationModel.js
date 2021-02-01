import {firebase} from '../config'


//Ottieni istanza di 'firebase.firestore.Firestore' per leggere o scrivere da db
var db = firebase.firestore();
var notificationCollectionRef = db.collection("notifiche"); //ottieni riferimento della collection a cui accedere 

//Create functions: one function for each collection to create
export async function createNotificationDocument(categoria, dataCreazione, titolo, descrizione, uid, prenId, dataFine){
    // Add a new document in collection "norification" con add(), se non e' presente, crea il documento
    return await notificationCollectionRef.add({
        categoria: categoria,
        dataCreazione: dataCreazione,
        dataFine: dataFine, //data in cui la notifica dovrà essere rimossa
        descrizione: descrizione,
        isRead: false,
        titolo: titolo,
        userId: uid,
        prenId: prenId,
    })
    .then(function() {
        console.log("Notification document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Update functions
export async function updateNotificationDocument(notificationId, categoria, dataCreazione, titolo, descrizione, isRead, uid, prenId, dataFine){
    //Edit all field of notification document
    return await notificationCollectionRef.doc(notificationId).update({
        categoria: categoria,
        dataCreazione: dataCreazione,
        descrizione: descrizione,
        isRead: isRead,
        titolo: titolo,
        userId: uid,
        prenId: prenId,
        dataFine: dataFine, //data in cui la notifica dovrà essere rimossa
    })
    .then(function() {
        console.log("Notification document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); 
}

export async function updateisRead(notificationId, isRead){
    return await notificationCollectionRef.doc(notificationId).update({
        isRead: isRead,
    })
    .then(function() {
        console.log("Notification document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating notification document: ", error);
    }); 
}

//Delete function
export async function deleteNotificationDocument(notificationId){
    return await notificationCollectionRef.doc(notificationId).delete().then(function() {
        console.log("Notification document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing notification document: ", error);
    });
}

export async function deleteNotificationDocumentScaduteByUserId(userId, dataFine){
    let docs = await notificationCollectionRef.where('userId', '==', userId).where('dataFine','<',dataFine).get();
    for(const noti of docs.docs){
        await deleteNotificationDocument(noti.id);
    }
    
}

//Read query functions
export async function getNotificationDocumentById(notificationId){
    let notiDoc = await notificationCollectionRef.doc(notificationId).get();
    if(notiDoc.exists){
        return notiDoc.data();
    }else{
        return Promise.reject("NotificationModel: No such notification document");
    }
}

export async function getNotificationDocumentByUserId(userId){
    let docs = await notificationCollectionRef.where('userId', '==', userId).get();
    return docs.docs;
}
