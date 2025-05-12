<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { IResultObject } from '../types/IResultObject';
import { DepartmentService } from '@/services/DepartmentService';
import type { IDepartment } from '@/domain/IDepartment';


const requestIsOngoing = ref(false);
const data = reactive<IResultObject<IDepartment[]>>({});
const service = new DepartmentService();


const fetchPageData = async () => {
  requestIsOngoing.value = true;
  try {
    const result = await service.getAllAsync()
    console.log(result.data);

    data.data = result.data;
    data.errors = result.errors;

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    requestIsOngoing.value = false;
  }
};

const doDelete = async (id: string) => {
requestIsOngoing.value = true;
  try {
    const result = await service.deleteAsync(id)
    console.log(result.data);

    fetchPageData();
    data.errors = result.errors;

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    requestIsOngoing.value = false;
  }
}

onMounted(async () => {
  await fetchPageData();
});
</script>

<template>
  <h1>Index</h1>
  <p>
    <RouterLink to="/departmentCreate" class="">Create New</RouterLink>
  </p>
  <table class="table">
    <thead>
      <tr>
        <th>
          Name
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data.data" :key="item.id">
        <td>
          {{ item.name }}
        </td>
        <td>
          <RouterLink :to="{ name: 'DepartmentsEdit', params: { id: item.id } }">Edit</RouterLink>
          |
          <a href="#" @click="doDelete(item.id)">Delete</a>

        </td>
      </tr>
    </tbody>
  </table>
</template>
