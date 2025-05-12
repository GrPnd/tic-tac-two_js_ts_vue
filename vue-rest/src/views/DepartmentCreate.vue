<script setup lang="ts">
import type { IDepartment } from '@/domain/IDepartment';
import router from '@/router';
import { DepartmentService } from '@/services/DepartmentService';
import { ref } from 'vue';

const service = new DepartmentService();
const departmentName = ref('');
const validationError = ref('');


const doAdd = async () => {
  validationError.value = '';

  if (!departmentName.value.trim()) {
    validationError.value = 'Department name is required.';
    return;
  }

  const department = {
    name: departmentName.value
  } as IDepartment;


  try {
    const result = await service.addAsync(department);
    console.log(result.data);

    if (result.errors?.length) {
      console.error('Add failed:', result.errors);
    } else {
      router.push({ name: 'Departments' });
    }
  } catch (error) {
    console.error('Error adding department:', error);
  }
};
</script>

<template>
  <h1>Create Department</h1>
  <form @submit.prevent="doAdd">
    <div class="form-group">
      <label class="control-label" for="Name">Name</label>
      <input class="form-control" type="text" v-model="departmentName" id="Name" />
      <div class="text-danger mt-1" v-if="validationError">{{ validationError }}</div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </form>
</template>
