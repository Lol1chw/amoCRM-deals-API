<script setup lang="ts">
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button/'

const isDark = ref(false)

function setTheme(theme: string | null) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
  }
  else {
    document.documentElement.classList.remove('dark')
    isDark.value = false
  }
}

onMounted(() => {
  const theme = window.localStorage.getItem('theme')

  setTheme(theme)
})

function toggleTheme() {
  if (isDark.value) {
    setTheme(null)
    window.localStorage.removeItem('theme')
  }
  else {
    setTheme('dark')
    window.localStorage.setItem('theme', 'dark')
  }
}
</script>

<template>
  <Button variant="outline" size="icon" @click="toggleTheme">
    <component :is="isDark ? SunIcon : MoonIcon" />
  </Button>
</template>
