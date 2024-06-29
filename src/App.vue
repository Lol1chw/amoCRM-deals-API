<script setup lang="ts">
import DataTable from '@/components/Transactions/DataTable.vue'
import { columns } from '@/components/Transactions/column'

import { transactions } from '@/components/Transactions/transaction'
</script>

<template>
  <div class="max-w-6xl m-auto">
    <DataTable :columns="columns" :data="transactions" />
  </div>
</template>
