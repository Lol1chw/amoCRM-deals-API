<script setup lang="ts">
import DataTable from '@/components/Transactions/DataTable.vue'
import { columns } from '@/components/Transactions/column'

import { transactions } from '@/components/Transactions/transaction'
import Header from '@/components/Header/Header.vue'
</script>

<template>
  <Header />
  <DataTable :columns="columns" :data="transactions" />
</template>
