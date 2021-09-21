<template>
  <div class="flex space-x-2 w-full min-h-screen">
    <div class="w-1/5 channel-list rounded p-2 bg-blue-500 min-h-screen">
      <h2 class="text-md text-white">Channels</h2>
    </div>

    <div id="talkjs-container" style="width: 100%; height: 720px;">
      <i>Loading chat...</i>
    </div>
  </div>
</template>

<script>
import Talk from "talkjs";
export default {
  name: "Inbox",
  mounted() {
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

      const conversation = session.getOrCreateConversation("SukaBola4");
      conversation.setParticipant(me);
      conversation.setAttributes({
        photoUrl: this.$store.state.user.user.photoUrl,
        subject: "Ngobrol bola paling asik",
      });

      var chatbox = session.createChatbox(conversation);
      chatbox.mount(document.getElementById("talkjs-container"));
      chatbox.on("sendMessage", (handler) => {
        console.log(handler);
        if (handler.message.text === "bola") {
          console.log("Kamu suka bola ?");
        }
      });
    });
  },
};
</script>

<style>
  .channel-list{
    background-color: #3d4454;
  }
</style>