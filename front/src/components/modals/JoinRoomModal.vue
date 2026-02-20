<template>
<div class="join-room-modal">
    <h2>Join Room</h2>
    <form @submit.prevent="joinRoom">
        <label for="roomUuid">Room UUID:</label>
        <input type="text" v-model="roomUuid" id="roomUuid">
        <button type="submit">Join</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'JoinRoomModal',
    data() {
        return {
            roomUuid: null
        };
    },
    methods: {
        joinRoom() {
            axios.post('/rooms/join', {
                roomUuid: this.roomUuid
            })
            .then(response => {     
                console.log('Joined room successfully!');           
            })
            .catch(error => {
                console.error('Error joining room:', error);
            });
        }
    }
};
</script>