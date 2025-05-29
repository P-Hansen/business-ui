<script setup lang="ts">
const detailsOpen = ref(true)

const expandableSections = ref([
  {
    title: 'This business is not in good standing',
    details: 'Explanation about being not in good standing.',
    open: false
  },
  {
    title: 'This business is frozen',
    details: 'Explanation about why the business is frozen.',
    open: false
  }
])

const toggleSection = (index: number) => {
  expandableSections.value[index].open = !expandableSections.value[index].open
}
</script>

<template>
  <div class="py-10">
    <NuxtLink to="/dissolution" class="link">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#1669BB" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"/></svg>
        Request Delay of Dissolution
    </NuxtLink>
  </div>
  <!-- Alert box -->
  <div class="alert-container">
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#db1111" d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"/></svg>
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <h3 class="font-bold">
            This business is in the process of being dissolved
          </h3>
          <button
            class="text-[#1669BB] text-sm font-medium"
            @click="detailsOpen = !detailsOpen"
          >
            {{ detailsOpen ? 'Hide Details' : 'View Details' }}
          </button>
        </div>
        <p v-if="detailsOpen" class="mt-2">
          This business will be struck from the Business Registry as soon as
          <b>September 31, 2024</b> due to overdue annual reports.
          Please file the annual reports immediately to bring this business back into good standing or request a delay of dissolution if more time is needed.
        </p>

        <div v-if="detailsOpen" class="mt-4 space-y-1 text-sm">
          <div class="flex items-center gap-2">
            <svg class="flip" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#43538c" d="M4.05 21q-.45 0-.75-.3t-.3-.75V15.9q0-.325.225-.587t.575-.363l3.45-.7q.35-.05.713.063t.587.337L10.9 17q.95-.55 1.8-1.213t1.625-1.437q.825-.8 1.513-1.662t1.187-1.788L14.6 8.45q-.2-.2-.275-.475T14.3 7.3l.65-3.5q.05-.325.325-.562T15.9 3h4.05q.45 0 .75.3t.3.75q0 3.125-1.362 6.175t-3.863 5.55t-5.55 3.863T4.05 21"/></svg>
            Canada and U.S. Toll Free: <a href="tel:1-877-526-1526" class="text-[#1669BB] underline">1-877-526-1526</a>
          </div>
          <div class="flex items-center gap-2">
            <svg class="flip" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#43538c" d="M4.05 21q-.45 0-.75-.3t-.3-.75V15.9q0-.325.225-.587t.575-.363l3.45-.7q.35-.05.713.063t.587.337L10.9 17q.95-.55 1.8-1.213t1.625-1.437q.825-.8 1.513-1.662t1.187-1.788L14.6 8.45q-.2-.2-.275-.475T14.3 7.3l.65-3.5q.05-.325.325-.562T15.9 3h4.05q.45 0 .75.3t.3.75q0 3.125-1.362 6.175t-3.863 5.55t-5.55 3.863T4.05 21"/></svg>
            Victoria Office: <a href="tel:250-387-7848" class="text-[#1669BB] underline">250-387-7848</a>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#43538c" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037"/></svg>
            Email: <a href="mailto:BCRegistries@gov.bc.ca" class="text-[#1669BB] underline">BCRegistries@gov.bc.ca</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div v-for="(section, i) in expandableSections" :key="i" class="pt-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#db7a00" d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"/></svg>
            <h3>{{ section.title }}</h3>
          </div>
          <button class="text-[#1669BB] text-sm font-medium" @click="toggleSection(i)">
            {{ section.open ? 'Hide Details' : 'View Details' }}
          </button>
        </div>
        <div v-if="section.open" class="mt-2 text-gray-700">
          {{ section.details }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link {
  font-family: 'BC Sans', sans-serif;
  color: #1669BB;
  display: flex;
  size: 16px
}

.icon {
    padding-right: 4px;
}

.alert-container {
  font-family: 'BC Sans', sans-serif;
  background-color: white;
  border-radius: 6px;
  font-size: 16px;
  color: #495057;
  padding: 20px;
}

.flip{
  transform: scaleX(-1);
}

.expandable-sections {
  border-top: 2px solid black; /* light gray */
  padding-top: 1rem; /* spacing above content after border */
}
</style>