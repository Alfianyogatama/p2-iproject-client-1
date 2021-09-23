<template>
  <div class="mx-auto rounded mx-auto">
    <div> 
        <div id="talkjs-container" style=" width: 100%; height: 720px">
          <i>Loading chat...</i>
        </div>
    </div>
</div>
</template>

<script>
import Swal from "sweetalert2";
import Talk from "talkjs";
export default {
  name: "Inbox",
  props: ["selectedGroupId"],

  data() {
    return {
      groupId: this.$route.params.id
    };
  },

  methods: {
    async callFeature(payload){
      const result = await this.$store.dispatch('getFootballStandings', payload)
      if (result) {
        Swal.fire({
          title: this.$store.state.featureShow.league,
          text: this.$store.state.featureShow["top-one"].displayName,
          imageUrl: this.$store.state.featureShow["top-one"].logos[0].href,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'TOP One',
        })
      }
    }
  },

  mounted() {
    try {

      Talk.ready.then(() => {
        const me = new Talk.User({
          id: localStorage.chatId,
          name: localStorage.name,
          email: localStorage.email,
          photoUrl: localStorage.photoUrl,
          welcomeMessage: `Hey, it's me ${localStorage.name}`,
          role: "discord",
        });

        let session = new Talk.Session({
          appId: "twoPwBx0",
          me: me,
        });
        
        const groupIds = this.groupId
        const conversation = session.getOrCreateConversation(groupIds);
        conversation.setParticipant(me);
        conversation.setAttributes({
          photoUrl: this.$store.state.groupInfo.photoUrl,
          subject: this.$store.state.groupInfo.subject,
          chatTitleMode: "subject"
        });

        var chatbox = session.createChatbox(conversation);

        if (chatbox) {
          Swal.fire({
            title: "Command list",
            html: "<p>There are many command list you can use to get recent standing in a league</p> <br> <p>!standing</p> <p>EPL/ indonesia / Serie A/ French/Bundesliga)</p>",
          })
        }

        chatbox.mount(document.getElementById("talkjs-container"));
        chatbox.on("sendMessage", (handler) => {

          let payload;
          switch (handler.message.text){
              case "!standing EPL":
              payload = "english"
              break

              case "!standing indonesia":
              payload = "indonesia"
              break

              case "!standing Serie A":
              payload = "italy"
              break

              case "!standing League One":
              case "!standing French":
              payload = "france"
              break

              case "!standing Bundesliga":
              payload = "germany"
              break

          }

          if (payload) {
            this.callFeature(payload)
          }

        });
      });

    }
    catch (err) {
      console.log(err);
    }

  },
};
</script>

<style></style>