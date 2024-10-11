<template>
    <header>
        <span @click="router.push('/')" class="logo">
            <img src="../assets/img/logo.png" alt="logo" />
            <h2>Sola</h2>
        </span>
    </header>
</template>

<script setup lang="ts">
import router from '@/router'

</script>

<style scoped>
header {
    height: 30px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #fff886, #f072b6);
}

.logo {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.logo img {
    height: 100%;
}
</style>
