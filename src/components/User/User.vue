<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

defineProps<{
  name: string
}>()
</script>

<template>
  <div class="flex items-center">
    <Avatar class="mr-2 h-8 w-8">
      <AvatarImage src="https://avatars.githubusercontent.com/u/94941930?v=4&size=64" alt="Jinx" />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>

    <span>{{ name }}</span>
  </div>
</template>
