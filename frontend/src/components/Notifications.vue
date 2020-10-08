<template>
  <div>
    <div class="fixed bottom-0 left-0 w-full z-40 flex justify-end">
      <transition-group name="fade">
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :type="notification.type"
          :text="notification.text"
          @remove="$store.commit('REMOVE_NOTIFICATION', notification)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Notification
  },
  computed: mapState(["notifications"]),
  methods: {
    ...mapActions(["notify"]),
    postError() {
      this.notify({ type: "error", text: "This is an error." });
    },
    removeNotification(notification) {
      this.$store.commit("REMOVE_NOTIFICATION", notification);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter {
  transform: scale(0);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(100%);
}
</style>
