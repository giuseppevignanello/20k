<template>
    <div>
        <div class="mb-3">
            <UiInputText
                v-model="username"
                :default-value="$t('user.enter_username')"
                :label-text="$t('user.username')"
                :error-condition="errorText"
                :error-text="errorText"
            />
        </div>
        <UiButtonPrincipal
            :click-action="joinRoomWithUserName"
            :button-text="$t('room.join_room')"
        />
    </div>
</template>


<script>
import { websocket } from "../websocket"
import UiInputText from "./ui/UiInputText.vue";
import UiButtonPrincipal from "./ui/UiButtonPrincipal.vue";
export default {
    props: {
        roomId: {
            type: String,
            required: true,
        },

    },
    components: {
        UiInputText,
        UiButtonPrincipal,
    },
    name: "AddUserNameModal",
    data() {
        return {
            errorText: null,
            username: "",
            messages: [],
        };
    },
    methods: {
        connectWebSocket() {
            websocket.connect(import.meta.env.VITE_WS_URL);
        },
        async joinRoomWithUserName() {
            if (!this.username) {
                this.errorText = this.$t("error.username_required");
                return;
            }
            websocket.sendMessage({
                type: "join-room",
                roomId: this.roomId,
                username: this.username,
            });
        },
    },
    mounted() {
        this.connectWebSocket();
        window.addEventListener("room-details", (event) => {
            this.$emit("user-joined", {
                score: event.detail.score,
                users: event.detail.users,
                username: this.username,
                roomDetails: {
                    users: [this.username],
                },
            });
        });
    }
};
</script>