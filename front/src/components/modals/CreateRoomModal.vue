<template>
<div class="create-room-modal">
    <h2>Create Room</h2>
    <form @submit.prevent="createRoom">
        <label for="maxPlayers">Number of Players:</label>
        <select name="maxPlayers" id="maxPlayers" v-model="maxPlayers" required>
            <option value="" disabled selected>Select number of players</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <label for="maxPoints">Points to Win:</label>
        <select name="maxPoints" id="maxPoints" v-model="maxPoints" required>
            <option value="" disabled selected>Select points to win</option>
            <option value="20">20</option>
            <option value="40">40</option>
        </select>
        <button type="submit">Create</button>
    </form>
    <div>
        <p v-if="roomUuid"> Room ID: {{ roomUuid }}</p>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import config from '../../config';

export default {
    name: 'CreateRoomModal',
    data() {
        return {
            maxPlayers: null,
            maxPoints: null,
            roomUuid: null
        };
    },
    methods: {
        createRoom() {
            axios.post(`${config.apiBaseUrl}/rooms/create`, {
                maxPlayers: this.maxPlayers,
                maxPoints: this.maxPoints,
            })
            .then(response => {     
                this.roomUuid = response.data.roomId;           
            })
        }
    }
};
</script>