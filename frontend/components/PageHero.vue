<template>
  <header 
    :class="[
      'container mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6',
      border ? 'border-b border-slate-200 pb-8' : '',
      border ? 'mb-12 md:mb-16' : 'mb-16'
    ]"
  >
    <div>
      <!-- Back Link if provided -->
      <NuxtLink 
        v-if="backTo" 
        :to="backTo" 
        :class="['inline-flex items-center gap-2 text-slate-500 font-semibold mb-6 transition-colors group', backHoverClass || 'hover:text-indigo-600']"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        {{ backText || 'Retour' }}
      </NuxtLink>

      <h1 class="font-display text-5xl md:text-6xl font-bold text-slate-800 tracking-tight flex items-center gap-4">
        {{ title }}
        <Icon v-if="icon" :name="icon" :class="['w-12 h-12', iconClass]" />
      </h1>
      
      <p v-if="subtitle || $slots.subtitle" :class="['font-semibold mt-2 text-lg uppercase tracking-widest flex items-center gap-2', subtitleClass || 'text-indigo-600']">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </p>
    </div>

    <!-- Actions Area -->
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-4 self-start md:self-end">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon?: string
  iconClass?: string
  subtitle?: string
  subtitleClass?: string
  backTo?: string
  backText?: string
  backHoverClass?: string
  border?: boolean
}

withDefaults(defineProps<Props>(), {
  icon: '',
  iconClass: '',
  subtitle: '',
  subtitleClass: '',
  backTo: '',
  backText: '',
  backHoverClass: '',
  border: false
})
</script>
