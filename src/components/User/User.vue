<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

defineProps<{
  name: string
}>()
</script>

<template>
  <div class="flex items-center">
    <Avatar class="mr-2 h-8 w-8">
      <AvatarFallback>{{ name.slice(0, -name.length + 1) }}</AvatarFallback>
    </Avatar>

    <span>{{ name }}</span>
  </div>
</template>
