<script setup lang="ts">
import SearchBar from "@/components/Base/SearchBar.vue";
import MagnifyingGlass from "@/components/icons/MagnifyingGlass.vue";
import NewRestaurantVue from "@/components/restaurants/modals/NewRestaurant.vue";
import RestaurantsDataTable from "@/components/restaurants/RestaurantsDataTable.vue";
import { getFilteredRestaurants, getRestaurants } from "@/services/restaurants";
import { useRestaurantsStore } from "@/stores/restaurants";
import { notifyError } from "@/utils/sendNotification";
import { onMounted, ref, type Ref } from "vue";

const store = useRestaurantsStore();

const pagination: Ref<{
  totalPages: number;
  currentPage: number;
  limit: number;
}> = ref({
  totalPages: 1,
  currentPage: 1,
  limit: 10,
});

const currentSearch: Ref<string> = ref("");

onMounted(() => {
  handleSearch();
});

const handleGetPage = async (page: number, limit: number) => {
  if (!currentSearch.value || currentSearch.value === "") {
    await getRestaurants({ page, limit })
      .then((response) => {
        store.setRestaurants(response.restaurants);
        pagination.value.totalPages = response.totalPages;
        pagination.value.currentPage = response.currentPage;
        pagination.value.limit = response.limit;
      })
      .catch((error) => {
        notifyError(error.message);
      });
  } else {
    pagination.value.currentPage = page > 0 ? page : 1;
    pagination.value.limit = limit;
    handleSearch();
  }
};

const handleOutOfBoundsPage = () => {
  if (pagination.value.currentPage > pagination.value.totalPages) {
    pagination.value.currentPage = pagination.value.totalPages;
    handleSearch();
  }
};

const handleSearch = async () => {
  const search = currentSearch.value;

  await getFilteredRestaurants({
    name: search,
    street: search,
    borough: search,
    cuisine: search,
    restaurant_id: search,
    limit: pagination.value.limit,
    page: pagination.value.currentPage,
  })
    .then((response) => {
      store.setRestaurants(response.restaurants);
      pagination.value.totalPages = response.totalPages;
      pagination.value.currentPage = response.currentPage;
      pagination.value.limit = response.limit;
      handleOutOfBoundsPage();
    })
    .catch((error) => {
      notifyError(error.message);
    });
};
</script>
<template>
  <div
    class="users m-5 bg-white dark:bg-gray-900 transition-colors duration-500"
  >
    <div
      class="pb-4 bg-white dark:bg-gray-900 transition-all duration-500 inline md:inline-flex w-full"
    >
      <div class="relative md:mr-5">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <MagnifyingGlass />
        </div>
        <SearchBar
          label-text="Search restaurant"
          input-id="Users-search"
          input-name="Users-search"
          input-placeholder="Search restaurant"
          v-model="currentSearch"
          @update:model-value="
            handleGetPage(pagination.currentPage, pagination.limit)
          "
        />
      </div>
      <div class="w-full pb-3 sm:pb-0 transition-all duration-500">
        <div
          class="md:grid md:grid-flow-col md:auto-cols-auto md:justify-end transition-all duration-500"
        >
          <div class="mt-2 md:mt-0">
            <NewRestaurantVue />
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-x-auto relative rounded-lg bg-white dark:bg-gray-900 transition-all duration-500"
    >
      <RestaurantsDataTable :filteredRestaurants="store.restaurants" />
    </div>
    <div class="flex justify-center mt-4">
      <div class="flex space-x-4 mr-6">
        <button
          type="button"
          class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-700 disabled:focus:ring-transparent"
          :disabled="pagination.currentPage === 1"
          @click="handleGetPage(pagination.currentPage - 1, pagination.limit)"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="sr-only">Previous</span>
        </button>

        <div class="flex items-center">
          <span class="text-gray-700 dark:text-gray-400">
            Page {{ pagination.currentPage }} of
            {{ pagination.totalPages }}
          </span>
        </div>

        <button
          type="button"
          class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-700 disabled:focus:ring-transparent"
          :disabled="pagination.currentPage === pagination.totalPages"
          @click="handleGetPage(pagination.currentPage + 1, pagination.limit)"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="sr-only">Next</span>
        </button>
      </div>
      <div class="flex items-center">
        <span class="text-gray-700 dark:text-gray-400">Go to page:</span>
        <select
          class="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-500 dark:focus:border-gray-500 transition-colors duration-500"
          @change="
            (e) => handleGetPage(Number((e.target as HTMLInputElement).value), pagination.limit)
          "
        >
          <option
            v-for="page in pagination.totalPages"
            :key="page"
            :value="page"
            :selected="page === pagination.currentPage"
          >
            {{ page }}
          </option>
        </select>
      </div>
      <div class="flex items-center ml-5">
        <span class="text-gray-700 dark:text-gray-400 mr-4">per page</span>
        <select
          class="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-500 dark:focus:border-gray-500 transition-colors duration-500"
          @change="(e) => handleGetPage(pagination.currentPage, Number((e.target as HTMLInputElement).value))"
        >
          <option
            v-for="limit in [10, 20, 50, 100]"
            :key="limit"
            :value="limit"
            :selected="limit === pagination.limit"
          >
            {{ limit }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
