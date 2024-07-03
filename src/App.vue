<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ExpandedState, ExpandedStateContent, FormattedLead } from '@/types/table'
import DataTable from '@/components/Leads/DataTable.vue'
import { data, defaultColumns } from '@/components/Leads/column'
import Header from '@/components/Header/Header.vue'

const expandedState = ref<ExpandedState[]>([])

const expandedContent = computed({
  get() {
    return expandedState.value
  },
  set(newValue) {
    expandedState.value = [...newValue]
  },
})

const loader = ref(false)

onMounted(async () => {
  loader.value = true
  const response = await fetch('http://localhost:3000/api/leads')

  data.value = await response.json() as FormattedLead[]
  loader.value = false
})

function setExpandedRowByStateId(id: number, content: ExpandedStateContent | (() => ExpandedStateContent), columnIndex: number) {
  if (typeof content !== 'function') {
    const vNode = content
    content = () => vNode
  }

  expandedContent.value[id] = { content, columnIndex }
}

const columns = defaultColumns({ expandedContent, setExpandedRowByStateId })
</script>

<template>
  <Header />
  <DataTable :expanded-row-content="expandedContent" :columns="columns" :data="data" :loader="loader" />
</template>
