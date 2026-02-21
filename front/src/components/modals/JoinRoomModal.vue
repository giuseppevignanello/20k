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
import config from '../../config';

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
            const socket = new WebSocket(config.wsBaseUrl);

            socket.onopen = () => {
                socket.send(
                    JSON.stringify({
                        type: 'join-room',
                        roomUuid: this.roomUuid,
                        playerName: this.playerName
                    })
                );
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'room-details') {
                    console.log('Joined room successfully!', data);
                    this.$emit('joined', data);
                } else if (data.error) {
                    console.error('Error joining room:', data.error);
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }
    }
};
</script>