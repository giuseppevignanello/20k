<template>
  <div class="card-distribution">
    <div v-for="(player, index) in distributionOrder" :key="player.id" class="player-cards">
      <h3>{{ player.name }}</h3>
      <div class="cards">
        <div
          v-for="(card, cardIndex) in player.cards"
          :key="cardIndex"
          class="card"
        >
          {{ card.number }} of {{ card.suit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDistribution',
  props: {
    players: {
      type: Array,
      required: true,
    },
    distributionOrder: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log('CardDistribution mounted with distributionOrder:', this.distributionOrder);
  },
};
</script>

<style scoped>
.card-distribution {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.player-cards {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.cards {
  display: flex;
  gap: 5px;
}

.card {
  border: 1px solid #000;
  padding: 5px;
  border-radius: 3px;
  background-color: #fff;
}
</style>