<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Layout",

  components: {
    Header
  }
};
</script>
