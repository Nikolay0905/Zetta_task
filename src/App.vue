<script setup lang="ts">
import Form from "./components/Form.vue";
import Table from "./components/Table.vue";
import { ref } from "vue";
import FormEntity from "./Entities/FormEntity.ts";

const transactionData = ref([
  {
    id: 1,
    name: "Nikolay",
    surname: "Bachiyski",
    email: "nikolayb0905@gmail.com",
    age: 20,
    favoriteColor: "red",
    contactReference: "SMS",
  },
  {
    id: 2,
    name: "Nikolay",
    surname: "Bachiyski",
    email: "nikolayb0905@gmail.com",
    age: 20,
    favoriteColor: "blue",
    contactReference: "SMS",
  },
  {
    id: 3,
    name: "Nikolay",
    surname: "Bachiyski",
    email: "nikolayb0905@gmail.com",
    age: 20,
    favoriteColor: "red",
    contactReference: "phone call",
  },
  {
    id: 4,
    name: "Nikolay",
    surname: "Bachiyski",
    email: "nikolayb@gmail.com",
    age: 20,
    favoriteColor: "red",
    contactReference: "SMS",
  },
]);

const generateUniqueId = () => {
  return Math.floor(Math.random() * 100000);
};

const newItem = (data: FormEntity) => {
  transactionData.value.push({ ...data, id: generateUniqueId() });
};

const deleteItem = (index: number) => {
  const indexOfObject = transactionData.value.findIndex(
    (item) => item.id == index
  );
  transactionData.value.splice(indexOfObject, 1);
};

const exportToJSON = () => {
  const transformData: FormEntity[] = JSON.parse(
    JSON.stringify(transactionData.value)
  );
  transformData.forEach((item: any) => delete item["delete"]);
  const jsonData = JSON.stringify(transformData);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.json";

  link.click();

  URL.revokeObjectURL(url);
};
</script>

<template>
  <b-container fluid="md" class="w-80">
    <Form @newItem="newItem" />
    <Table
      @deleteItem="deleteItem"
      @exportDataToJson="exportToJSON"
      :data="transactionData"
    />
  </b-container>
</template>
