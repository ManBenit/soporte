<template>
  <div class="carousel">
    <div class="card-container ">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img :src="card.imageUrl" alt="Card Image" class="card-image" />
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </div>
    </div>
    <button @click="prev" class="prev-btn">◀</button>
    <button @click="next" class="next-btn">▶</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translateX: 0,
      currentIndex: 0,
      cards: [
        {
          title: "Card 1",
          description: "Description for Card 1",
          imageUrl: "https://via.placeholder.com/300x200"
        },
        {
          title: "Card 2",
          description: "Description for Card 2",
          imageUrl: "https://via.placeholder.com/300x200"
        },
        {
          title: "Card 3",
          description: "Description for Card 3",
          imageUrl: "https://via.placeholder.com/300x200"
        }
      ]
    };
  },
  methods: {
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.translateX += 300; // Adjust based on card width
      }
    },
    next() {
      if (this.currentIndex < this.cards.length - 1) {
        this.currentIndex++;
        this.translateX -= 300; // Adjust based on card width
      }
    }
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.card-container {
  display: flex;
  transition: transform 0.3s ease;
}

.card {
  width: 300px; /* Width of each card */
  margin-right: 20px; /* Margin between cards */
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-top: 10px;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.prev-btn:hover,
.next-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}
</style>
