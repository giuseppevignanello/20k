<template>
<div class="join-room-modal">
    <h2>Join Room</h2>
    <form @submit.prevent="joinRoom">
        <div>
            <label for="roomUuid">Room UUID:</label>
            <input type="text" v-model="roomUuid" id="roomUuid">
        </div>
        <div>
            <label for="playerName">Player Name:</label>
            <input type="text" v-model="playerName" id="playerName">
        </div>
        <button type="submit">Join</button>
    </form>
</div>
</template>

<script>
import { socket, sendMessage } from '../../socket';

export default {
    name: 'JoinRoomModal',
    data() {
        return {
            playerName: null,
            roomUuid: null
        };
    },
    methods: {
        joinRoom() {
            const payload = {
                type: 'join-room',
                roomUuid: this.roomUuid,
                playerName: this.playerName
            };

            // Use the global sendMessage function
            sendMessage(payload);

            // Attach WebSocket event listeners
            socket.addEventListener('message', this.handleSocketMessage);
            socket.addEventListener('error', this.handleSocketError);
        },
        handleSocketMessage(event) {
            const data = JSON.parse(event.data);
            if (data.type === 'room-details') {
                console.log('Joined room successfully!', data);
                this.$emit('joined', data);
            } else if (data.error) {
                console.error('Error joining room:', data.error);
            }
        },
        handleSocketError(error) {
            console.error('WebSocket error:', error);
        }
    },
    beforeDestroy() {
        // Detach WebSocket event listeners
        socket.removeEventListener('message', this.handleSocketMessage);
        socket.removeEventListener('error', this.handleSocketError);
    }
};
</script>