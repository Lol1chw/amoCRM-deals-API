<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FormattedLead } from '@/types/table'
import DataTable from '@/components/Leads/DataTable.vue'
import { data, defaultColumns } from '@/components/Leads/column'

import Header from '@/components/Header/Header.vue'

const loader = ref(false)

onMounted(async () => {
  loader.value = true
  const response = await fetch('http://localhost:3000/api/leads')

  data.value = await response.json() as FormattedLead[]
  loader.value = false
})
</script>

<template>
  <Header />
  <DataTable :columns="defaultColumns" :data="data" :loader="loader" />
</template>
