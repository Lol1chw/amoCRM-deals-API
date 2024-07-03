<script setup lang="ts">
import { ref } from 'vue'
import { CheckIcon, ClipboardIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const props = withDefaults(defineProps<{
  text?: string
  tooltip: string
}>(), {
  text: '',
})

const copied = ref(false)
const timer = ref()
const tooltipText = ref(props.tooltip)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    tooltipText.value = 'Content copied'

    clearTimeout(timer.value)

    timer.value = setTimeout(() => {
      copied.value = false
      tooltipText.value = props.tooltip
    }, 7000)
  }
  catch (error) {
    copied.value = false
    console.error(error)
  }
}
</script>

<template>
  <TooltipProvider :disable-closing-trigger="true">
    <Tooltip :delay-duration="100">
      <TooltipTrigger as-child @click="$event.preventDefault()">
        <Button
          size="icon"
          variant="outline"
          class="h-7 w-7 [&_svg]:size-3.5"
          @click="copy"
        >
          <span class="sr-only">Copy</span>
          <CheckIcon v-if="copied" />
          <slot v-else name="icon">
            <ClipboardIcon />
          </slot>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {{ tooltipText }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
