<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null);
onClickOutside(target, () => emit("modal-close"));
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="container">
      <div class="modal-container rounded text-wrap" ref="target">
        <div class="modal-header row">
          <slot name="header"> </slot>
        </div>
        <div class="modal-body col-12 container-fluid">
          <slot name="content"> </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')"></button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
}
</style>
