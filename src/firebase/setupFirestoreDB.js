import {firebase} from "./config"
import * as GuestModel from './datamodel/GuestModel'

export function createFirestoreDB(){

    //Creazione "guest" collection
    GuestModel.createGuestDocument("myuid", "dfer24dfeer33tefdrr4", "Laucella", "Gerardo", "13/08/1996", "Avellino", 1234567890, 123450, {}, false);
    GuestModel.createCreditCardDocumentGuest("myuid", 12344, 123, "Gerardo", "12/2023");

}


