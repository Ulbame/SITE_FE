<template>
  <label for="check">
    <input
      id="check"
      type="checkbox"
      :value="checked"
      @input="$emit('input', !chekced)"
    />
    <span class="check" :class="{ on: checked }"></span>
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
  model: {
    prop: 'checked',
    event: 'input',
  },
};
</script>

<style></style>
