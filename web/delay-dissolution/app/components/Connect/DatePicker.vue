<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  min?: string
  max?: string
}>()

defineEmits(['update:modelValue'])

const selectedDate = ref(props.modelValue)
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-container">
      <UInput
        v-model="selectedDate"
        :type="type || 'date'"
        :value="modelValue"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        class="input-element pr-10"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-weight: bold;
  margin-bottom: 4px;
}

.input-container {
  position: relative;
}

.input-element {
  width: 100%;
}
</style>