import {firebase} from "./config"
import * as GuestModel from './datamodel/GuestModel'
import * as CleanServiceModel from "./datamodel/CleanServiceModel"
import * as HostModel from "./datamodel/HostModel"
import * as StrutturaModel from "./datamodel/StrutturaModel"
import * as AlloggioModel from "./datamodel/AlloggioModel"
import * as PrenotazioneModel from "./datamodel/PrenotazioneModel"

export function createFirestoreDB(){

    //Creazione "guest" collection
    var indirizzo = {via: "Fontana Croce, 2", citta: "Nusco", provincia: "Avellino", cap: 83051, regione: "Campania"};
    GuestModel.createGuestDocument("myuid", "dfer24dfeer33tefdrr4", "Laucella", "Gerardo", "13/08/1996", "M", "Avellino", 1234567890, 123450, "Italia", indirizzo, false, "gerry@gmail.com", "1234qw");
    GuestModel.createCreditCardDocumentGuest("myuid", 12344, 123, "Gerardo", "12/2023");

    //Create 'host' collection
    GuestModel.getGuestDocument("myuid").then(function (guest) { 
        //verifica se e' host oppure no
        if(!guest.isHost) {
            HostModel.createHostDocument("myuid", "host@gmail.com", "1234qw");
        }
      }).catch(function (err) { console.log("ERROR with read in setupFirestoreDB.js:" + err); });


    //Create 'cleanService' collection
    CleanServiceModel.createCleanServiceDocument(12345, "nomeDip", "cognomeDip", "dipendente@gmail.com", 1234567890, "MyDitta", "10/10/2009");

    //Create 'struttura' collection
    StrutturaModel.createStrutturaDocument("struct1", "myuid", 1234, "Struttura1", "Descrizione struttura 1", "Path guida", 2, "Hotel", 12345);

    //Create 'alloggio' collection
    AlloggioModel.createAlloggioDocument("struct1", 1, "MyRoom", 2, 4, "Piano terra", "path/VideoBenvenuto");
    AlloggioModel.createCalendarioDocument("struct1", 1, 13, 8, 2020);
    AlloggioModel.createChiaveDocument("struct1", 1, "chiave1");
    AlloggioModel.createDispositiviDomoticiDocument("struct1", 1, "condizionatore", false);

    //Create 'prenotazione' model
    GuestModel.getGuestDocument("myuid").then(function (guest) { 
        PrenotazioneModel.createPrenotazioniDocument("prencod1", 80, "11/06/2020", "14/06/2020", guest.email, 1, 1234567890, "struct1", 1, "chiave1", guest.uid);
    }).catch(function (err) { console.log("ERROR with read in setupFirestoreDB.js for PrenotazioneModel:" + err); });
}


