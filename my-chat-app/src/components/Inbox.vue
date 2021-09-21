<template>
  <div id="talkjs-container" style="height: 720px">
    <i>Loading chat...</i>
  </div>
</template>

<script>
import Talk from "talkjs";
export default {
  name: "Inbox",
  props: ["selectedGroupId"],
  
  data() {
    return {
      groupId: this.$route.params.id
    };
  },

  mounted() {
    try {

      Talk.ready.then(() => {
        const me = new Talk.User({
          id: this.$store.state.user.user.id,
          name: this.$store.state.user.user.name,
          email: this.$store.state.user.user.email,
          photoUrl: this.$store.state.user.user.photoUrl,
          welcomeMessage: "Hey, it`s me",
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
          photoUrl: this.$store.state.user.user.photoUrl,
          subject: "Ngobrol bola paling asik",
        });

        var chatbox = session.createChatbox(conversation);
        chatbox.mount(document.getElementById("talkjs-container"));
        chatbox.on("sendMessage", (handler) => {
          if (handler.message.text === "bola") {
            console.log("Kamu suka bola ?");
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