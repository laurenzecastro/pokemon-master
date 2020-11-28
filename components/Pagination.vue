<template>
  <div id="top-companies-pagination-block" class="pagination-block">
    <div class="pagination-first" data-cy="pagination_first">
      <a class="arrow-link" @click="navigateToPage(1)">
        &nbsp;&nbsp;<span class="mobile-hidden">FIRST</span>
      </a>
    </div>
    <div class="pagination-pages" data-cy="pagination_pages">
      <a
        v-for="page in pages"
        class="pagination-page"
        :key="page.page_number"
        :class="{ selected: page.page_number == currPage }"
        @click="navigateToPage(page.page_number)"
        :data-cy="`page_number_${page.page_number}`"
        >{{ page["displayed_value"] }}</a
      >
    </div>
    <div class="pagination-last" data-cy="pagination_last">
      <a class="arrow-link" @click="navigateToPage(totalPages)">
        <span class="mobile-hidden">LAST</span>&nbsp;&nbsp;
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",

  data() {
    return {
      pages: [],
      currPage: 1,
      totalPages: 1,
      pageState: []
    };
  },

  props: ["pokemonData"],

  methods: {
    navigateToPage(page) {
      this.currPage = page;
      let obj = {
        page,
        reset: true
      };

      this.$emit("emit-page-data", obj);
      this.handlePagination(this.currPage, this.totalPages);
    },

    handlePagination(currPage, totalPage) {
      if (totalPage >= 5) {
        // For the first three pages, display the ellipsis for the last page
        let pageCount = 5;
        if (currPage <= 3) {
          this.pages = this.paginationLoop(1, pageCount, "start");
        } else if (currPage > totalPage - 3) {
          // For the last three pages, display the ellipsis for the first page
          let ellipsisPage = totalPage - 4;
          this.pages = this.paginationLoop(ellipsisPage, totalPage, "end");
        } else {
          // for pages between
          let ellipsisFirstPage = currPage - 2;
          let ellipsisLastPage = currPage + 2;

          this.pages = this.paginationLoop(
            ellipsisFirstPage,
            ellipsisLastPage,
            "between"
          );
        }
      } else {
        // pages less than 5
        this.pages = this.paginationLoop(1, totalPage, "less");
      }
    },

    paginationLoop(startPage, endPage, order) {
      let tempArray = [];
      for (let index = startPage; index <= endPage; index++) {
        let obj = {};

        if (order == "start") {
          index == endPage
            ? (obj.displayed_value = "...")
            : (obj.displayed_value = index);
        } else if (order == "end") {
          index == startPage
            ? (obj.displayed_value = "...")
            : (obj.displayed_value = index);
        } else if (order == "between") {
          index == startPage || index == endPage
            ? (obj.displayed_value = "...")
            : (obj.displayed_value = index);
        } else if (order == "less") {
          obj.displayed_value = index;
        }

        obj.page_number = index;
        tempArray.push(obj);
      }
      return tempArray;
    },

    pageSetter() {
      let { totalPages, currPage } = this.pokemonData;
      this.totalPages = totalPages;
      this.currPage = currPage;
      this.handlePagination(this.currPage, totalPages);
    }
  },

  watch: {
    pokemonData() {
      this.pageSetter();
    }
  },

  mounted() {
    this.pageSetter();
  }
};
</script>
