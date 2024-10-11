<template>
    <header>
        <span @click="router.push('/')" class="logo">
            <img src="../assets/img/logo.png" alt="logo" />
            <h2>Sola</h2>
        </span>
        <div id="docsearch"></div>
    </header>
</template>

<script setup lang="ts">
import router from '@/router'
import docsearch from '@docsearch/js';

import '@docsearch/css';
import { onMounted } from 'vue'

onMounted(() => {
    docsearch({
        appId: "D0ABS6ZBZS",
        apiKey: "f4029465497d63e93ad166438207c696",
        indexName: "metasola",
        container: "#docsearch",

    });
})
</script>

<style scoped>
header {
    height: 30px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #fff886, #f072b6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 999;
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
