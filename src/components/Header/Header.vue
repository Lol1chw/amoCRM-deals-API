<script setup lang="ts">
import Github from '@/components/icons/Github.vue'
import ToggleTheme from '@/components/ToggleTheme/ToggleTheme.vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
</script>

<template>
  <header>
    <div class="flex justify-end gap-2 py-2">
      <a :class="cn(buttonVariants({ variant: 'outline', size: 'icon' }))" href="https://github.com/Lol1chw">
        <Github />
      </a>
      <ToggleTheme />
    </div>
  </header>
</template>
