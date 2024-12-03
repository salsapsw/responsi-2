<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- komponen paling atas dari ion-content -->
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- active balapans -->
      <div class="scrollable-container">
        <ion-list>
          <ion-item-sliding v-for="balapan in activeBalapans" :key="balapan.id" :ref="(el) => setItemRef(el, balapan.id!)">
            <ion-item-options side="start" @ionSwipe="handleDelete(balapan)">
              <ion-item-option color="danger" expandable @click="handleDelete(balapan)">
                <ion-icon slot="icon-only" :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item>
              <ion-card>
                <ion-card-header>
                  <ion-card-title class="ion-text-wrap limited-text">{{ balapan.title }}</ion-card-title>
                  <ion-card-subtitle class="limited-text">{{ balapan.description }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  <p class="limited-text">Start Date: {{ new Date(balapan.startDate).toLocaleString() }}</p>
                  <p class="limited-text">End Date: {{ new Date(balapan.endDate).toLocaleString() }}</p>
                  <p class="limited-text">Track Details: {{ balapan.trackDetails }}</p>
                  <ion-badge>{{ getRelativeTime(balapan.updatedAt) }}</ion-badge>
                </ion-card-content>
              </ion-card>
            </ion-item>

            <ion-item-options side="end" @ionSwipe="handleStatus(balapan)">
              <ion-item-option @click="handleEdit(balapan)">
                <ion-icon slot="icon-only" :icon="create" size="large"></ion-icon>
              </ion-item-option>
              <ion-item-option color="success" expandable @click="handleStatus(balapan)">
                <ion-icon slot="icon-only" :icon="checkmarkCircle" color="light" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
          <ion-item v-if="activeBalapans.length === 0" class="ion-text-center">
            <ion-label>No active balapans</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- completed balapans -->
      <ion-item class="accordion-container">
        <ion-accordion-group>
          <ion-accordion value="first">
            <ion-item slot="header" color="light">
              <ion-label class="ion-text-center">Completed</ion-label>
            </ion-item>
            <div slot="content" class="scrollable-container">
              <ion-list>
                <ion-item-sliding v-for="balapan in completedBalapans" :key="balapan.id" :ref="(el) => setItemRef(el, balapan.id!)">
                  <ion-item-options side="start" @ionSwipe="handleDelete(balapan)">
                    <ion-item-option color="danger" expandable @click="handleDelete(balapan)">
                      <ion-icon slot="icon-only" :icon="trash" size="large"></ion-icon>
                    </ion-item-option>
                  </ion-item-options>

                  <ion-item>
                    <ion-card>
                      <ion-card-header>
                        <ion-card-title class="ion-text-wrap limited-text">{{ balapan.title }}</ion-card-title>
                        <ion-card-subtitle class="limited-text">{{ balapan.description }}</ion-card-subtitle>
                      </ion-card-header>

                      <ion-card-content>
                        <p class="limited-text">Start Date: {{ new Date(balapan.startDate).toLocaleString() }}</p>
                        <p class="limited-text">End Date: {{ new Date(balapan.endDate).toLocaleString() }}</p>
                        <p class="limited-text">Track Details: {{ balapan.trackDetails }}</p>
                        <ion-badge>{{ getRelativeTime(balapan.updatedAt) }}</ion-badge>
                      </ion-card-content>
                    </ion-card>
                  </ion-item>

                  <ion-item-options side="end" @ionSwipe="handleStatus(balapan)">
                    <ion-item-option @click="handleEdit(balapan)">
                      <ion-icon slot="icon-only" :icon="create" size="large"></ion-icon>
                    </ion-item-option>
                    <ion-item-option color="warning" expandable @click="handleStatus(balapan)">
                      <ion-icon slot="icon-only" :icon="close" color="light" size="large"></ion-icon>
                    </ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
                <ion-item v-if="completedBalapans.length === 0" class="ion-text-center">
                  <ion-label>No completed balapans</ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-item>

      <!-- untuk menambahkan nama balapan -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="isOpen = true">
          <ion-icon :icon="add" size="large"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <InputModal v-model:isOpen="isOpen" v-model:editingId="editingId" :balapan="balapan" @submit="handleSubmit" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const editingId = ref<string | null>(null);
const balapans = ref<Balapan[]>([]);
const balapan = ref<Omit<Balapan, "id" | "createdAt" | "updatedAt" | "status">>({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  trackDetails: "",
});
const activeBalapans = computed(() => balapans.value.filter((balapan) => !balapan.status));
const completedBalapans = computed(() => balapans.value.filter((balapan) => balapan.status));
const itemRefs = ref<Map<string, HTMLIonItemSlidingElement>>(new Map());
let intervalId: any;
const timeUpdateTrigger = ref(0);

// mendapatkan value dari item
const setItemRef = (el: any, id: string) => {
  if (el) {
    itemRefs.value.set(id, el.$el);
  }
};

// toast notifikasi
const showToast = async (message: string, color: string = "success", icon: string = checkmarkCircle) => {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
    position: "top",
    icon,
  });
  await toast.present();
};

// mendapatkan perbedaan waktu
const getRelativeTime = (date: any) => {
  timeUpdateTrigger.value;
  try {
    const jsDate = date?.toDate ? date.toDate() : new Date(date);
    return formatDistanceToNow(jsDate, { addSuffix: true });
  } catch (error) {
    return "Invalid date";
  }
};

// fungsi handleRefresh dan handleSubmit akan didefinisikan nanti
const handleRefresh = async (event: any) => {
  try {
    await loadBalapans(false);
  } catch (error) {
    console.error("Error refreshing:", error);
  } finally {
    event.target.complete();
  }
};

const handleSubmit = async (balapan: Omit<Balapan, "id" | "createdAt" | "updatedAt" | "status">) => {
  if (!balapan.title) {
    await showToast("Title is required", "warning", warningOutline);
    return;
  }
  try {
    if (editingId.value) {
      await firestoreService.updateBalapan(editingId.value, balapan as Balapan);
      await showToast("Balapan berhasil ditambahkan", "success", checkmarkCircle);
    } else {
      await firestoreService.addBalapan(balapan as Balapan);
      await showToast("Balapan berhasil ditambahkan", "success", checkmarkCircle);
    }
    loadBalapans();
  } catch (error) {
    await showToast("An error occurred", "danger", closeCircle);
    console.error(error);
  } finally {
    editingId.value = null;
  }
};

// load data
const loadBalapans = async (isLoading = true) => {
  let loading;
  if (isLoading) {
    loading = await loadingController.create({
      message: "Loading...",
    });
    await loading.present();
  }

  try {
    balapans.value = await firestoreService.getBalapans();
  } catch (error) {
    console.error(error);
  } finally {
    if (loading) {
      await loading.dismiss();
    }
  }
};

const handleEdit = async (editBalapan: Balapan) => {
  const slidingItem = itemRefs.value.get(editBalapan.id!);
  await slidingItem?.close();

  editingId.value = editBalapan.id!;
  balapan.value = {
    title: editBalapan.title,
    description: editBalapan.description,
    trackDetails: editBalapan.trackDetails,
    startDate: editBalapan.startDate,
    endDate: editBalapan.endDate,
  };
  isOpen.value = true;
};

// handle delete click/swipe
const handleDelete = async (deleteBalapan: Balapan) => {
  try {
    await firestoreService.deleteBalapan(deleteBalapan.id!);
    await showToast("Balapan deleted successfully", "success", checkmarkCircle);
    loadBalapans();
  } catch (error) {
    await showToast("Failed to delete Balapan", "danger", closeCircle);
    console.error(error);
  }
};

// handle status click/swipe, mengubah status Balapan active (false)/completed (true)
const handleStatus = async (statusBalapan: Balapan) => {
  const slidingItem = itemRefs.value.get(statusBalapan.id!);
  await slidingItem?.close();
  try {
    await firestoreService.updateStatus(statusBalapan.id!, !statusBalapan.status);
    await showToast(`Balapan marked as ${!statusBalapan.status ? "completed" : "active"}`, "success", checkmarkCircle);
    loadBalapans();
  } catch (error) {
    await showToast("Failed to update status", "danger", closeCircle);
    console.error(error);
  }
};

// dijalankan setiap halaman diload, load data dan set interval update 1 menit
onMounted(() => {
  loadBalapans();
  intervalId = setInterval(() => {
    timeUpdateTrigger.value++;
  }, 60000);
});

// reset interval update
onUnmounted(() => {
  clearInterval(intervalId);
});

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton,
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  IonList,
  loadingController,
  IonRefresher,
  IonRefresherContent,
  toastController,
} from "@ionic/vue";
import { add, checkmarkCircle, close, create, trash, closeCircle, warningOutline } from "ionicons/icons";
import InputModal from "@/components/InputModal.vue";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { firestoreService, type Balapan } from "@/utils/firestore";
import { formatDistanceToNow } from "date-fns";
// import TabsMenu from "@/components/TabsMenu.vue";
</script>

<style scoped>
ion-card,
ion-accordion-group {
  width: 100%;
}

ion-fab {
  margin: 25px;
}

.limited-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

ion-card-title.limited-text {
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

ion-card-subtitle.limited-text {
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.scrollable-container {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.accordion-container {
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.scrollable-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
