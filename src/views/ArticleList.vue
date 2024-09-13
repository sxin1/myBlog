<template>
  <div class="article-wrap">
    <div v-if="articles.length>0">
      <el-card class="blog-content--item" v-for="item in articles" :key="item.id">
        <router-link :to="{name:'article',params:{id:item.id}}">
          <ArticleItem :article="item" />
        </router-link>
      </el-card>
    </div>
    <article v-else class="blog-content--item blog-content-never">
      <h3 class="blog-item--title">很遗憾 没有找到对应的文章</h3>
      <el-button type="primary" @click="routeEditor">去写一篇把</el-button>
    </article>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";

export default {
  name: "myArticleList",
  inject: ["closeLoadClock"],
  components: {
    ArticleItem
  },
  props: {
    loading: {
      type: Boolean
    },
    columnId: {
      type: String
    }
  },
  data() {
    return {
      articles: [],
      page: 1,
      size: 3,
      q: ''
    };
  },
  computed: {
    hasArticle () {
      return this.articles.length > 0
    }
  },
  mounted () {
    this.$EventBus.$on('activeSearch', (q) => {
      this.q = q
      this.resetArticles()
      this.getArticles()
    })
  },
  watch: {
    loading(load) {
      // 如果内容为空 没有监听 load
      if (load) {
        this.getArticles();
      }
    }
  },
  created() {
    this.getArticles();
  },
  methods: {
    resetArticles () {
      this.articles = []
      this.page = 1
    },
    routeEditor () {
      let columnId = this.columnId
      this.$router.push({ name: 'editor', query: { columnId } })
    },
    cancelArticles() {
      this.page = 1;
      this.articles = [];
    },
    getArticles() {
      let data = { size: this.size, page: this.page };
      let query = {
        column: this.columnId,
        ...this.setQ()
      };
      data = JSON.parse(JSON.stringify(data));
      query = JSON.parse(JSON.stringify(query));
      this.$api({ type: "articles", data: { ...data, query } })
        .then(result => {
          if (this.articles.length >= result.total) {
            //没有更多了
            console.log("没有更多了");
            return
          }
          this.articles.push(...result.list);
          this.closeLoadClock(); //调用父组件provide传递的关闭load锁方法
          this.page++;
        })
        .catch(err => {
          this.$notify.success({
            title: "获取失败",
            message: err.message
          });
        });
    },
    setQ() {
      return {
            $or: [
              { title: { $regex: this.q } },
              { content: { $regex: this.q } },
            ]
          }
    }
  }
};
</script>
<style lang="stylus" >
.blog-item--btn
  margin-top 40px
</style>