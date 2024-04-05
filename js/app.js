const { createApp } = Vue;
const { DateTime } = luxon;

createApp({
  data: function(){
    return{
      activeElement: 0,
      selectedMessage: {
        index: 0,
        selection: false,
      },
      messageSentIndex: 0,
      indexResultedBySearch: [],
      messageInserted: "",
      searchStringInserted: "",
      xMarkVisibility: false,
      inputReset: false,
      contacts: [{
        name: 'Michele',
        avatar: './img/avatar_1.jpg',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Hai portato a spasso il cane?',
            status: 'sent'
          },{
            date: '10/01/2020 15:50:00',
            message: 'Ricordati di stendere i panni',
            status: 'sent'
          },{
            date: '10/01/2020 16:15:22',
            message: 'Tutto fatto!',
            status: 'received'
          }],},
      {
        name: 'Fabio',
        avatar: './img/avatar_2.jpg',
        visible: true,
        messages: [{
          date: '20/03/2020 16:30:00',
          message: 'Ciao come stai?',
          status: 'sent'
        },{
          date: '20/03/2020 16:30:55',
          message: 'Bene grazie! Stasera ci vediamo?',
          status: 'received'
        },{
          date: '20/03/2020 16:35:00',
          message: 'Mi piacerebbe ma devo andare a fare la spesa.',
          status: 'sent'
        },],},
      {
        name: 'Samuele',
        avatar: './img/avatar_3.jpg',
        visible: true,
        messages: [{ 
          date: '28/03/2020 10:10:40',
          message: 'La Marianna va in campagna',
          status: 'received'
        },{
          date: '28/03/2020 10:20:10',
          message: 'Sicuro di non aver sbagliato chat?',
          status: 'sent'
        },{
          date: '28/03/2020 16:15:22',
          message: 'Ah scusa!',
          status: 'received'
        },],},
      {
        name: 'Alessandro B.',
        avatar: './img/avatar_4.jpg',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Lo sai che ha aperto una nuova pizzeria?',
          status: 'sent'
        },{
          date: '10/01/2020 15:50:00',
          message: 'Si, ma preferirei andare al cinema',
          status: 'received'
        },],},
      {
        name: 'Alessandro L.',
        avatar: './img/avatar_5.jpg',
        visible: true, 
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Ricordati di chiamare la nonna',
          status: 'sent' 
        },{
          date: '10/01/2020 15:50:00',
          message: 'Va bene, stasera la sento',
          status: 'received'
        },],},
      {
        name: 'Claudia',
        avatar: './img/avatar_6.jpg',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Ciao Claudia, hai novità?',
          status: 'sent' 
        },{
          date: '10/01/2020 15:50:00',
          message: 'Non ancora',
          status: 'received'
        },{
          date: '10/01/2020 15:51:00',
          message: 'Nessuna nuova, buona nuova',
          status: 'sent'
        },],},
      {
        name: 'Federico',
        avatar: './img/avatar_7.jpg',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Fai gli auguri a Martina che è il suo compleanno!',
          status: 'sent'
        },{ 
          date: '10/01/2020 15:50:00',
          message: 'Grazie per avermelo ricordato, le scrivo subito!',
          status: 'received'
        },],},
      {
        name: 'Davide',
        avatar: './img/avatar_8.jpg',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Ciao, andiamo a mangiare la pizza stasera?',
          status: 'received',
        },{
          date: '10/01/2020 15:50:00',
          message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
          status: 'sent' 
        },{
          date: '10/01/2020 15:51:00',
          message: 'OK!!',
          status: 'received'
        },],
      },],
    }
  },

  computed: {
    currentContact() {
      return this.contacts[this.activeElement];
    },

    selectionMessageModal(i){
      
    }



  },

  methods: {
    changeActiveElement(i){
      this.activeElement = i
    },
    directionMessage(element){
      if(element.status === 'sent'){
        return "mine"
      }else{
        return "other"
      }
    },
    addDateTime(){
      const dt = DateTime.now();
      const hour = dt.toFormat('TT');
      const day = dt.toFormat('dd');
      const month =  dt.toFormat('LL');
      const year = dt.toFormat('y');
      const stringDateTime = `${day}/${month}/${year} ${hour}`;
      return stringDateTime;
    },

    addTime(){
      const dt = DateTime.now();
      const stringTime = `${dt.hour}:${dt.minute}`;
      return stringTime;
    },

    addMessage(){
      const messageSent = {
        date: this.addDateTime(),
        message: this.messageInserted,
        status: 'sent',
        };

      console.log(messageSent.date)

      this.messageSentIndex = this.activeElement;

      
      // this.currentContact.messages.push(messageSent);
      this.contacts[this.messageSentIndex].messages.push(messageSent);
      this.messageInserted = "";
      setTimeout(()=>{
        const messageReceived = {
          date: this.addDateTime(),
          message: "Ok!",
          status: 'received',
        }
        // currentContact.messages.push(messageReceived);
        this.contacts[this.messageSentIndex].messages.push(messageReceived)
      }, 5000);
    },

    allInvisible(){
      this.contacts.forEach((element, index) => {
        element.visible = false;
      });
      this.xMarkVisibility = true
    },

    allVisible(){
      this.contacts.forEach((element, index) => {
        element.visible = true;
      });
      this.xMarkVisibility = false;
      this.searchStringInserted = "";
    },

    searchString(){
      // console.log("ricerca stringa avviata");
      console.log("Research started");
      let string = this.searchStringInserted;
      
        
        this.contacts.forEach((element, index) => {
        if(element.name.includes(string)){
          console.log(`ELEMENT: ${element.name} included`)
          // console.log(`${element.name} contiene la stringa "${string}".`);
          // this.indexResultedBySearch.push(index);
          element.visible = true;
          // console.log(this.indexResultedBySearch);
        }else{
          console.log(`ELEMENT: ${element.name} NOT included`);
          element.visible = false;
        }
        // this.searchStringInserted = "";
      });
      
   
    },

    filterArray(string){
      const result = this.contacts.filter((contact)=>contact.name === string);
      return result;
    },

    openModal(i){
      let selected = i
      this.selectedMessage.index = selected;
      this.selectedMessage.selection = true;
      console.log("You clicked the message n° " + this.selectedMessage.index + " and it is " + this.selectedMessage.selection);
    },

    closeModal(){
      this.selectedMessage.selection = false;
    }


  },

  watch: {
    
  },

  computed: {
    // searchString(){
    //   return this.searchStringInserted;
    // },

    // myContacts(){
    //   return this.contacts;
    // }
  },


  mounted() {
    console.log("the component is now mounted.");
    // setTimeout(()=>{
    //   console.log("Sono passati 5 secondi")
    // }, 5000);
    // console.log(this.filterArray("Federico"));

    // console.log("L'ora inserita è: " + this.contacts[0].messages[ this.contacts[0].messages.length -1].date.slice(11, 16));

    
  },
  
}).mount('#app');