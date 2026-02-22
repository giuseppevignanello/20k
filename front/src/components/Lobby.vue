<template>
    <div class="lobby">
        <h1>Lobby</h1>
        <button @click="openCreateRoomModal()">Create Room</button>
        <button @click="openJoinRoomModal()">Join Room</button>

        <!-- Modals -->
        <CreateRoomModal v-if="showCreateRoomModal" @close="showCreateRoomModal = false" />
        <JoinRoomModal v-if="showJoinRoomModal" @close="showJoinRoomModal = false" @joined="emitJoinRoom" />
    </div>

</template>
<script>
import CreateRoomModal from './modals/CreateRoomModal.vue';
import JoinRoomModal from './modals/JoinRoomModal.vue';

export default {
  name: 'Lobby',
  components: {
    CreateRoomModal,
    JoinRoomModal
  },
  data() {
    return {
      showCreateRoomModal: false,
      showJoinRoomModal: false
    };
  },
  methods: {
    openCreateRoomModal() {
      this.showCreateRoomModal = true;
    },
    openJoinRoomModal() {
      this.showJoinRoomModal = true;
    },
    emitJoinRoom(data) {
      this.$emit('join-room', data);
    }
  },
};
</script>