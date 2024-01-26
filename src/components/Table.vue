<script setup lang="ts">
import { defineProps, ref } from "vue";

import FormEntity from "../Entities/FormEntity.ts";
import Modal from "./Modal.vue";

const emit = defineEmits(["deleteItem", "exportDataToJson"]);
let isModalOpened = ref(false);
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

props.data.forEach((item: any) => (item.delete = "delete"));

const deleteRow = (item: FormEntity) => {
  emit("deleteItem", item.id);
};

const closeModal = () => (isModalOpened.value = false);

const exportJson = () => {
  emit("exportDataToJson");
};
</script>

<template>
  <div class="mt-5">
    <b-button variant="outline-primary" @click="isModalOpened = true"
      >Export JSON</b-button
    >
    <Modal :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal">
      <template #header>
        <h3>Exported JSON data</h3>
      </template>
      <template #content>
        <p class="text-break">
          {{ JSON.stringify(data) }}
        </p>
      </template>
      <template #footer>
        <b-button variant="outline-success me-2" @click="exportJson"
          >Export</b-button
        >
        <b-button variant="outline-danger" @click="isModalOpened = false"
          >Close</b-button
        >
      </template>
    </Modal>
    <b-table
      striped
      hover
      responsive="xl"
      @row-clicked="deleteRow"
      primary-key="id"
      :items="data"
      show-empty
    >
      <template #cell(delete)="data">
        <b-icon-trash class="text-danger" danger></b-icon-trash>
      </template>
    </b-table>
  </div>
</template>
