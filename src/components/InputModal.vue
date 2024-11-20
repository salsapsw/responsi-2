<!-- <template>
  <ion-modal :is-open="isOpen" @did-dismiss="cancel">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? "Edit" : "Add" }} Balapan</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="cancel"><ion-icon :icon="close"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-input v-model="balapan.title" label="Title" label-placement="floating" placeholder="Enter Title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea v-model="balapan.description" label="Description" label-placement="floating" placeholder="Enter Description" :autogrow="true" :rows="3"></ion-textarea>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button type="button" @click="input" shape="round" color="primary" expand="block"> {{ editingId ? "Edit" : "Add" }} Balapan </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>
<script setup lang="ts">
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonInput, IonRow, IonCol, IonItem, IonContent, IonTextarea } from "@ionic/vue";
import { close } from "ionicons/icons";
import { Balapan } from "@/utils/firestore";

const props = defineProps<{
  isOpen: boolean;
  editingId: string | null;
  balapan: Omit<Balapan, "id" | "createdAt" | "updatedAt" | "status">;
}>();

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
  "update:editingId": [value: string | null];
  submit: [item: Omit<Balapan, "id" | "createdAt" | "updatedAt" | "status">];
}>();

const cancel = () => {
  emit("update:isOpen", false);
  emit("update:editingId", null);
  props.balapan.title = "";
  props.balapan.description = "";
};
const input = () => {
  emit("submit", props.balapan);
  cancel();
};
</script> -->

<template>
  <ion-modal :is-open="isOpen" @did-dismiss="cancel">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? "Edit" : "Add" }} Balapan</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="cancel"><ion-icon :icon="close"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-input v-model="balapan.title" label="Title" label-placement="floating" placeholder="Enter Title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea v-model="balapan.description" label="Description" label-placement="floating" placeholder="Enter Description" :autogrow="true" :rows="3"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-input v-model="balapan.startDate" label="StartDate" label-placement="floating" placeholder="Enter Start Date" :autogrow="true" :rows="3"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input v-model="balapan.endDate" label="EndDate" label-placement="floating" placeholder="Enter End Date" :autogrow="true" :rows="3"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input v-model="balapan.trackDetails" label="TrackDetails" label-placement="floating" placeholder="Enter Track Details"></ion-input>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button type="button" @click="input" shape="round" color="primary" expand="block"> {{ editingId ? "Edit" : "Add" }} Balapan </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonInput, IonRow, IonCol, IonItem, IonContent, IonTextarea, IonLabel, IonDatetime } from "@ionic/vue";
import { close } from "ionicons/icons";
import { Balapan } from "@/utils/firestore";

const props = defineProps<{
  isOpen: boolean;
  editingId: string | null;
  balapan: Omit<Balapan, "id" | "createdAt" | "updatedAt" | "status">;
}>();

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
  "update:editingId": [value: string | null];
  submit: [item: Omit<Balapan, "id" | "createdAt" | "updatedAt" | "status">];
}>();

const cancel = () => {
  emit("update:isOpen", false);
  emit("update:editingId", null);
  props.balapan.title = "";
  props.balapan.description = "";
  props.balapan.trackDetails = "";
  props.balapan.startDate = "";
  props.balapan.endDate = "";
};

const input = () => {
  emit("submit", props.balapan);
  cancel();
};
</script>
