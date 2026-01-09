<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white text-black"
    >
      <div class="column col q-pl-md">
        <div class="row items-center q-pl-sm q-my-lg">
          <div
            class="bg-black text-white q-mr-sm q-pa-xs"
            style="border-radius: 15px"
          >
            <q-icon name="apartment" size="lg" />
          </div>
          <div class="column">
            <div class="text-weight-medium">SMDC Dashboard</div>
            <div class="text-grey-8">Maintain Master Data</div>
          </div>
        </div>
        <q-btn
          v-for="link in links"
          :class="
            selected === link.name
              ? 'q-py-sm q-mr-md q-mb-md q-pl-md bg-black text-white'
              : 'q-py-sm q-mr-md q-mb-md q-pl-md bg-white text-black'
          "
          dense
          flat
          align="left"
          style="border-radius: 15px"
          :to="link.redirect"
          @click="selected = link.name"
        >
          <q-icon :name="link.icon" size="md" class="q-mr-sm" />
          <div class="text-weight-medium">{{ link.name }}</div>
        </q-btn>
      </div>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

const leftDrawerOpen = ref(true);
const $q = useQuasar();
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const links = [
  {
    name: "Master Customer",
    icon: "group",
    redirect: "/",
  },
  {
    name: "Assignment Rules",
    icon: "filter_list",
    redirect: "/",
  },
  {
    name: "Team Activity",
    icon: "group",
    redirect: "/",
  },
];

const selected = ref("Master Customer");
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
