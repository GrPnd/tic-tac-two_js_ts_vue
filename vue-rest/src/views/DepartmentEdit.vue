<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { IDepartment } from '@/domain/IDepartment'
import { DepartmentService } from '@/services/DepartmentService'

const route = useRoute()
const router = useRouter()
const validationError = ref('');
const service = new DepartmentService()
const departmentId = route.params.id as string
const department = ref<IDepartment | null>(null)
const departmentName = ref('')
const errorMessages = ref<string[]>([])

const fetchDepartment = async () => {
  const result = await service.getAsync(departmentId)
  if (result.data) {
    department.value = result.data
    departmentName.value = result.data.name
  } else {
    errorMessages.value = result.errors ?? ['Unknown error fetching department']
  }
}

const updateDepartment = async () => {
  validationError.value = '';

  if (!departmentName.value.trim()) {
    validationError.value = 'Department name is required.';
    return;
  }
  if (!department.value) return

  const updated: IDepartment = {
    id: departmentId,
    name: departmentName.value
  }

  const result = await service.editAsync(updated);
  if (result.errors?.length) {
    errorMessages.value = result.errors
  } else {
    router.push({ name: 'Departments' })
  }
}

onMounted(fetchDepartment)
</script>

<template>
  <div>
    <h1>Edit Department</h1>

    <div v-if="errorMessages.length" class="alert alert-danger">
      <ul>
        <li v-for="err in errorMessages" :key="err">{{ err }}</li>
      </ul>
    </div>

    <form @submit.prevent="updateDepartment" v-if="department">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" class="form-control" v-model="departmentName" />
        <div class="text-danger mt-1" v-if="validationError">{{ validationError }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>
