<template>
    <div class="blog">
        <Header></Header>
        <main>
            <aside>
                <h2>{{ groupName }}</h2>
                <div @click="selectMd(child)" v-for="child in children" :key="child"
                    :class="{ 'active': child === fileName }" class="item">{{ child
                    }}
                </div>
            </aside>
            <article>
                <MdPreview class="md-right" :modelValue="text" :editorId="editorId" />
            </article>
            <aside>
                <MdCatalog :editorId="editorId" scrollElement="article" />
            </aside>
        </main>
    </div>
</template>

<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { onMounted, ref } from 'vue';
import router from '@/router'
import Header from '@/components/Header.vue';
let editorId = ref('editorId');
let text = ref("");


//获取当前路由参数
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params);
const groupName = route.params.groupName as string;
let fileName = route.params.fileName as string;

function selectMd(name: string) {
    if (fileName === name) return;
    router.push(`/blog/${groupName}/${name}`)
    fileName = name;
    fetch(`./${groupName.replaceAll('-', '/')}/${name}/${name}.md`).then(async (res) => {
        //article元素滚动条置顶
        document.querySelector('article')?.scrollTo(0, 0);

        text.value = await res.text();
    })
}
fetch(`./${groupName.replaceAll('-', '/')}/${fileName}/${fileName}.md`).then(async (res) => {
    text.value = await res.text();
})
//当前数据
import { useBlogTreeStore } from '@/stores/blogTree';
const blogTreeStore = useBlogTreeStore();
const children = blogTreeStore.treeJsonMap[groupName];

</script>

<style scoped>
.blog {
    display: flex;
    flex-direction: column;
    height: 100vh;
}


main {
    display: flex;
    flex: 1;
    height: 80vh;
}

aside {
    width: 15vw;
    padding: 0 20px;
    overflow: auto;
}

aside h2 {
    position: sticky;
    top: 0;
    font-size: clamp(0.7rem, 0.489rem + 1.05vw, 1.2rem);
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ebeddf;
}

aside .item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    transition: color .25s;
    color: rgba(60, 60, 67, .78);
    /* 鼠标变小手 */
    cursor: pointer;
}

aside .item:hover {
    color: #3451b2;
}

.active {
    color: #3451b2 !important;
}

article {
    flex: 1;
    background-color: bisque;
    overflow: auto;
}
</style>
