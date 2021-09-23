<template>
  <div class="w-3/4 mx-auto rounded mx-auto">
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
          photoUrl: this.$store.state.groupInfo.group.imageUrl,
          subject: this.$store.state.groupInfo.group.subject,
          chatTitleMode: "subject"
        });

        var chatbox = session.createChatbox(conversation);
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