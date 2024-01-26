<script setup lang="ts">
import { ref } from "vue";
import FormEntity from "../Entities/FormEntity.ts";
import Modal from "./Modal.vue";

const emit = defineEmits(["newItem"]);

let data = ref({
  id: 0,
  name: "",
  surname: "",
  email: "",
  age: 0,
  favoriteColor: "",
  contactReference: [],
});

let error_text: string = "";

const colors = ref([
  { text: "red", value: "red" },
  { text: "green", value: "green" },
  { text: "blue", value: "blue" },
  { text: "white", value: "white" },
  { text: "black", value: "black" },
]);

const contacts = ref([
  { text: "Email", value: "email" },
  { text: "Phone Call", value: "phone_call" },
  { text: "SMS", value: "SMS" },
]);

const submitForm = (e: Event) => {
  const event = e as SubmitEvent;
  event.preventDefault();

  if (data.value.age === 0) {
    error_text = "Please change age";
  } else {
    emit("newItem", data.value);
    data.value = {
      id: 0,
      name: "",
      surname: "",
      email: "",
      age: 0,
      favoriteColor: "",
      contactReference: [],
    };
  }
};
</script>

<template>
  <p :class="error_text == '' ? 'none' : 'error'" :key="error_text">
    {{ error_text }}
  </p>
  <b-form @submit="submitForm">
    <b-form-group>
      <label for="name">Name</label>
      <b-form-input
        type="text"
        name="name"
        placeholder="Enter name"
        v-model="data.name"
        class="mb-2 mr-sm-2 mb-sm-0"
        required
      />
    </b-form-group>
    <b-form-group>
      <label for="surname">Surname</label>
      <b-form-input
        type="text"
        v-model="data.surname"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter surname"
        name="surname"
        required
      />
    </b-form-group>
    <b-form-group>
      <label for="age">Age</label>
      <b-form-input
        type="number"
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="data.age"
        name="age"
        placeholder="Enter age"
        max="120"
        min="0"
        required
      />
    </b-form-group>
    <b-form-group>
      <label for="email">Email</label>
      <b-form-input
        class="mb-2 mr-sm-2 mb-sm-0"
        type="email"
        v-model="data.email"
        placeholder="Enter email"
        name="email"
        :value="data.email"
        required
      />
    </b-form-group>
    <b-form-group label="Favorite Color">
      <b-form-select
        v-model="data.favoriteColor"
        required
        :options="colors"
        :values="colors"
        class="mb-2 mr-sm-2 mb-sm-0"
      >
      </b-form-select>
    </b-form-group>
    <b-form-group label="Contact Reference">
      <b-form-checkbox-group
        :options="contacts"
        value-field="value"
        text-field="text"
        v-model="data.contactReference"
      >
      </b-form-checkbox-group>
    </b-form-group>

    <b-button type="submit" variant="success">Submit</b-button>
  </b-form>
</template>
