## Arborescence
```text
📁 frontend/
    📄 Dockerfile
    📄 README.md
    📄 app.vue
    📄 nuxt.config.ts
    📄 package.json
    📄 tsconfig.json
    📁 assets/
        📁 css/
            📄 global.css
    📁 components/
        📄 Header.vue
        📁 agenda/
            📄 CalendarDay.vue
            📄 CalendarGrid.vue
            📄 EventModal.vue
        📁 album/
            📄 PhotoCard.vue
            📄 PhotoCardContent.vue
            📄 PhotoGrid.vue
            📄 PhotoUploadForm.vue
            📄 PhotoUploadFormDropZone.vue
            📄 PhotoUploadFormFields.vue
        📁 amani/
            📄 ProfileMain.vue
            📄 ProfileStats.vue
        📁 antoine/
            📄 ProfileMain.vue
            📄 ProfileStats.vue
        📁 auth/
            📄 LoginCard.vue
            📄 RegisterCard.vue
        📁 carte/
            📄 InteractiveMap.vue
            📄 MapLegend.vue
            📄 PhotoJournal.vue
            📄 PhotoJournalItem.vue
        📁 cinema/
            📄 CinemaHeader.vue
            📄 MovieCard.vue
            📄 MovieCardPoster.vue
            📄 MovieCardReviews.vue
            📄 MovieForm.vue
            📄 MovieFormBase.vue
            📄 MovieFormReviews.vue
        📁 games/
            📄 GamesHeader.vue
            📄 SessionCard.vue
            📄 SessionCardScores.vue
            📄 SessionForm.vue
            📄 SessionFormFields.vue
            📄 SessionTimeline.vue
            📄 StatsSummary.vue
        📁 header/
            📄 Actions.vue
            📄 Logo.vue
            📄 Nav.vue
        📁 home/
            📄 Flashback.vue
            📄 FloatingStickers.vue
            📄 HomeHero.vue
            📄 JournalCard.vue
            📄 JournalCardBody.vue
        📁 social/
            📄 PostCard.vue
            📄 PostCreator.vue
            📄 PostCreatorHeader.vue
            📄 ProfileHero.vue
            📄 ProfileHeroCover.vue
            📄 ProfileHeroInfo.vue
            📄 ProfileRalliements.vue
            📄 ProfileTabs.vue
            📄 SidebarBio.vue
            📄 SidebarBioAbout.vue
            📄 SidebarBioMission.vue
            📄 SidebarBioStatus.vue
        📁 stars/
            📄 CelestialInfo.vue
            📄 SkyMap.vue
        📁 wishlist/
            📄 WishlistCard.vue
            📄 WishlistFilters.vue
            📄 WishlistForm.vue
            📄 WishlistGrid.vue
    📁 composables/
        📄 useAuth.ts
        📄 useCalendar.ts
        📄 useCinema.ts
        📄 useGames.ts
        📄 useHome.ts
        📄 usePhotos.ts
        📄 usePhotosForm.ts
        📄 useSocial.ts
        📄 useSocialFriends.ts
        📄 useSocialPosts.ts
        📄 useStars.ts
        📄 useWishlist.ts
    📁 layouts/
        📄 default.vue
    📁 middleware/
        📄 auth.global.ts
    📁 pages/
        📄 albumPhoto.vue
        📄 amani.vue
        📄 antoine.vue
        📄 calendrier.vue
        📄 carte.vue
        📄 cinema.vue
        📄 etoiles.vue
        📄 index.vue
        📄 jeux.vue
        📄 login.vue
        📄 profile.vue
        📄 register.vue
        📄 wishlist.vue
    📁 plugins/
        📄 pl.ts
    📁 public/
        📄 robots.txt
    📁 server/
        📄 s.vue
    📁 types/
        📄 agenda.ts
        📄 auth.ts
        📄 cinema.ts
        📄 games.ts
        📄 index.ts
        📄 photos.ts
        📄 social.ts
        📄 stars.ts
        📄 wishlist.ts
    📁 utils/
        📄 formatters.ts
```

## Contenu des fichiers


---
### Fichier : frontend\Dockerfile
```text
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000

```


---
### Fichier : frontend\README.md
```text
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```


---
### Fichier : frontend\app.vue
```text
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const { fetchUser } = useAuth();

onMounted(async () => {
  await fetchUser();
});
</script>

```


---
### Fichier : frontend\nuxt.config.ts
```text
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/global.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://127.0.0.1:8001/api'
    }
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})


```


---
### Fichier : frontend\package.json
```text
{
  "name": "frontend",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "leaflet": "^1.9.4",
    "nuxt": "^4.4.6",
    "vue": "^3.5.34",
    "vue-router": "^5.0.7"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.21"
  }
}

```


---
### Fichier : frontend\tsconfig.json
```text
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ]
}

```


---
### Fichier : frontend\assets\css\global.css
```text
:root {
  /* Colors */
  --clr-primary-50: #fdf2f8;
  --clr-primary-100: #fce7f3;
  --clr-primary-200: #fbcfe8;
  --clr-primary-300: #f9a8d4;
  --clr-primary-400: #f472b6;
  --clr-primary-500: #ca75d6;
  --clr-primary-600: #b05dbd;
  
  --clr-neutral-0: #ffffff;
  --clr-neutral-50: #f8fafc;
  --clr-neutral-100: #f1f5f9;
  --clr-neutral-200: #e2e8f0;
  --clr-neutral-300: #cbd5e1;
  --clr-neutral-400: #94a3b8;
  --clr-neutral-500: #64748b;
  --clr-neutral-600: #475569;
  --clr-neutral-700: #334155;
  --clr-neutral-800: #1e293b;
  --clr-neutral-900: #0f172a;

  --clr-error: #ef4444;
  --clr-error-light: #fee2e2;
  --clr-error-dark: #991b1b;
  
  --clr-success: #22c55e;
  --clr-success-light: #f0fdf4;
  --clr-success-dark: #166534;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* Borders */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-primary: 0 4px 14px 0 rgb(202 117 214 / 0.39);
  --shadow-primary-lg: 0 10px 20px 0 rgb(202 117 214 / 0.45);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-spring: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Heights */
  --header-height: 72px;
  
  /* Z-index */
  --z-above: 10;
  --z-modal: 100;
}

/* Resets */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: var(--clr-neutral-50);
  color: var(--clr-neutral-800);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.2;
}

a {
  text-decoration: none;
  color: inherit;
}

.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

```


---
### Fichier : frontend\components\Header.vue
```text
<template>
  <header class="mso-header" :class="{ 'mso-header--scrolled': isScrolled }">
    <div class="container mso-header__inner">
      <HeaderLogo />
      <HeaderNav @antoine-click="handleAntoineClick" />
      <HeaderActions 
        :is-authenticated="isAuthenticated" 
        :username="user?.username" 
        @logout="logout" 
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const { isAuthenticated, user, logout } = useAuth();
const isScrolled = ref(false);

const handleScroll = () => { 
  isScrolled.value = window.scrollY > 50; 
};

function handleAntoineClick() {
  alert("ALERTE : Attention à Bascop, Mazingue et Yvenat ! L'accès à cet espace est hautement sécurisé par la brigade lyonnaise. 🛡️");
  navigateTo('/antoine');
}

onMounted(() => { window.addEventListener('scroll', handleScroll); });
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });
</script>

<style scoped>
.mso-header {
  height: var(--header-height);
  background: #ca75d6ff;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.mso-header--scrolled {
  height: calc(var(--header-height) - 15px);
  background: rgba(202, 117, 214, 0.95);
  backdrop-filter: blur(10px);
}
.mso-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

```


---
### Fichier : frontend\components\agenda\CalendarDay.vue
```text
<template>
  <div 
    class="calendar-day" 
    :class="{ 'has-events': events.length > 0, 'is-today': isToday, 'is-past': isPast }"
    @click="$emit('click')"
  >
    <span class="day-number">{{ date.getDate() }}</span>
    <div v-if="events.length > 0" class="event-dots">
      <span v-for="e in events.slice(0, 3)" :key="e.id" class="dot"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MSOEvent } from '~/types';

const props = defineProps<{
  date: Date;
  events: MSOEvent[];
}>();

defineEmits(['click']);

const isToday = computed(() => {
  const today = new Date();
  return props.date.toDateString() === today.toDateString();
});

const isPast = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return props.date < today;
});
</script>

<style scoped>
.calendar-day {
  aspect-ratio: 1; border-radius: 12px; border: 1px solid #edf2f7;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s; position: relative;
}
.calendar-day:hover { background: #fff0f9; border-color: #ca75d644; transform: scale(1.05); }
.is-today { border: 2px solid var(--clr-primary-500); font-weight: 900; }
.has-events { background: #fdf2f8; }
.is-past { opacity: 0.8; }
.day-number { font-size: 1rem; color: #4a5568; }
.event-dots { display: flex; gap: 2px; margin-top: 4px; }
.dot { width: 4px; height: 4px; background: var(--clr-primary-500); border-radius: 50%; }
</style>

```


---
### Fichier : frontend\components\agenda\CalendarGrid.vue
```text
<template>
  <div class="calendar-container glass-card">
    <header class="calendar-header">
      <button @click="prevMonth">◀</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button @click="nextMonth">▶</button>
    </header>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      <div v-for="n in startOffset" :key="'offset-'+n" class="day offset"></div>
      <CalendarDay 
        v-for="date in daysInMonth" 
        :key="date.toISOString()" 
        :date="date"
        :events="getEventsForDate(date)"
        @click="$emit('day-click', date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MSOEvent } from '~/types';

const props = defineProps<{ events: MSOEvent[] }>();
defineEmits(['day-click']);

const currentDate = ref(new Date());
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const monthName = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate.value);
});

const startOffset = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Align to Monday
});

const daysInMonth = computed(() => {
  const count = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => new Date(currentYear.value, currentMonth.value, i + 1));
});

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const getEventsForDate = (date: Date) => {
  const dStr = date.toISOString().split('T')[0];
  return props.events.filter(e => e.date === dStr);
};
</script>

<style scoped>
.calendar-container { padding: 2rem; }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.calendar-header h2 { text-transform: capitalize; font-family: var(--font-display); }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
.weekday { text-align: center; font-weight: 800; font-size: 0.7rem; color: #a0aec0; text-transform: uppercase; padding-bottom: 10px; }
.day.offset { background: #f7fafc; border-radius: 8px; }
</style>

```


---
### Fichier : frontend\components\agenda\EventModal.vue
```text
<template>
  <div class="mso-modal-overlay" @click.self="$emit('close')">
    <div class="mso-modal glass-card">
      <header class="modal-header">
        <h3>{{ formatDateLong(date) }}</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </header>

      <div class="modal-content">
        <div v-if="events.length > 0" class="events-list">
          <div v-for="event in events" :key="event.id" class="event-item">
            <h4>{{ event.title }}</h4>
            <p v-if="event.location">📍 {{ event.location }}</p>
            <p class="desc">{{ event.description }}</p>
          </div>
        </div>
        <div v-else class="empty-events">
          <p>Rien de noté pour ce jour-là.</p>
        </div>

        <div class="flashback-hint" v-if="isPast">
          <p>✨ Cliquez pour voir les photos de cette période dans l'Album.</p>
          <NuxtLink to="/albumPhoto" class="btn-mini">Voir l'Album</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MSOEvent } from '~/types';

defineProps<{
  date: Date;
  events: MSOEvent[];
  isPast: boolean;
}>();

defineEmits(['close']);

const formatDateLong = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date);
};
</script>

<style scoped>
.mso-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.mso-modal { width: 90%; max-width: 450px; padding: 2rem; position: relative; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.modal-header h3 { font-family: var(--font-display); text-transform: capitalize; }
.event-item { padding: 1rem; background: #f8fafc; border-radius: 12px; margin-bottom: 1rem; }
.event-item h4 { color: var(--clr-primary-600); margin-bottom: 4px; }
.desc { font-size: 0.9rem; color: #718096; line-height: 1.5; }
.flashback-hint { margin-top: 2rem; padding: 1rem; border-top: 1px dashed #eee; text-align: center; }
.btn-mini { display: inline-block; margin-top: 10px; font-size: 0.8rem; font-weight: 800; color: var(--clr-primary-500); }
</style>

```


---
### Fichier : frontend\components\album\PhotoCard.vue
```text
<template>
  <article class="polaroid" :style="{ '--rotation': rotation, '--delay': delay }">
    <div class="polaroid__wrapper">
      <div class="polaroid__img-box">
        <img :src="photo.image_url" :alt="photo.titre" loading="lazy" />
        <div class="polaroid__overlay">
          <button class="btn-delete" @click.stop="$emit('delete', photo)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
      <AlbumPhotoCardContent :photo="photo" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';
defineProps<{ photo: Photo; rotation: string; delay: string; }>();
defineEmits<{ (e: 'delete', photo: Photo): void; }>();
</script>

<style scoped>
.polaroid { opacity: 0; transform: translateY(20px) rotate(var(--rotation)); animation: fadeInUp 0.6s var(--delay) forwards ease-out; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0) rotate(var(--rotation)); } }
.polaroid__wrapper { background: white; padding: 1rem 1rem 3rem 1rem; box-shadow: 0 15px 35px rgba(0,0,0,0.06); border: 1px solid #f0f0f0; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.polaroid:hover .polaroid__wrapper { transform: translateY(-10px) scale(1.02) rotate(0deg); box-shadow: 0 25px 50px rgba(0,0,0,0.1); z-index: 10; }
.polaroid__img-box { aspect-ratio: 1; overflow: hidden; background: #f8f8f8; position: relative; cursor: zoom-in; }
.polaroid__img-box img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.05) saturate(1.1); }
.polaroid__overlay { position: absolute; top: 10px; right: 10px; opacity: 0; transition: opacity 0.3s; }
.polaroid:hover .polaroid__overlay { opacity: 1; }
.btn-delete { background: rgba(255,255,255,0.9); color: #ff4d4d; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
</style>

```


---
### Fichier : frontend\components\album\PhotoCardContent.vue
```text
<template>
  <div class="polaroid__content">
    <h3 class="polaroid__title">{{ photo.titre }}</h3>
    <p v-if="photo.description" class="polaroid__desc">{{ photo.description }}</p>
    <div class="polaroid__footer">
      <time>{{ formatDate(photo.date_creation) }}</time>
      <span v-if="photo.author_name" class="author">by {{ photo.author_name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters';
import type { Photo } from '~/types';
defineProps<{ photo: Photo }>();
</script>

<style scoped>
.polaroid__content { padding-top: 1.5rem; }
.polaroid__title { font-family: var(--font-display); font-size: 1.3rem; color: #1a1a1a; margin-bottom: 0.5rem; }
.polaroid__desc { font-size: 0.9rem; color: #666; line-height: 1.4; margin-bottom: 1rem; }
.polaroid__footer { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; color: #ccc; text-transform: uppercase; letter-spacing: 1px; }
.author { color: var(--clr-primary-300); }
</style>

```


---
### Fichier : frontend\components\album\PhotoGrid.vue
```text
<template>
  <TransitionGroup
    tag="section"
    name="staggered-list"
    class="mso-gallery"
  >
    <PhotoCard
      v-for="(photo, index) in photos"
      :key="photo.id"
      :photo="photo"
      :rotation="`${(index % 3 - 1) * 2}deg`"
      :delay="`${index * 0.1}s`"
      @delete="$emit('delete', $event)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';

defineProps<{
  photos: Photo[];
}>();

defineEmits<{
  (e: 'delete', photo: Photo): void;
}>();
</script>

<style scoped>
.mso-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem;
}
</style>

```


---
### Fichier : frontend\components\album\PhotoUploadForm.vue
```text
<template>
  <section class="add-photo-card glass-card">
    <div class="tape-effect"></div>
    <form @submit.prevent="$emit('submit')" class="mso-form">
      <h2 class="form-title">Nouveau Souvenir</h2>

      <AlbumPhotoUploadFormDropZone
        :apercu="formState.apercu"
        :has-error="!!formErrors.fichier"
        @change="$emit('fileChange', $event)"
        @remove="$emit('removeFile')"
        @drop="$emit('drop', $event)"
      />

      <AlbumPhotoUploadFormFields
        v-model:titre="formState.titre"
        v-model:description="formState.description"
      />

      <button type="submit" class="mso-btn-primary" :disabled="isSubmitting || !isFormValid">
        {{ isSubmitting ? 'Gravure en cours...' : 'Graver le souvenir' }}
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import type { PhotoFormState, PhotoFormErrors } from '~/types';

defineProps<{
  formState: PhotoFormState;
  formErrors: PhotoFormErrors;
  isSubmitting: boolean;
  isFormValid: boolean;
}>();

defineEmits(['submit', 'fileChange', 'removeFile', 'drop']);
</script>

<style scoped>
.add-photo-card {
  max-width: 600px; margin: 0 auto 4rem; padding: 3rem; position: relative; transform: rotate(-0.5deg);
}
.tape-effect {
  position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
  width: 120px; height: 35px; background: rgba(202, 117, 214, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
}
.form-title { font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 2rem; text-align: center; }
.mso-btn-primary {
  width: 100%; background: #1a1a1a; color: white; border: none; padding: 1.2rem;
  border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.3s;
}
.mso-btn-primary:hover:not(:disabled) {
  background: var(--clr-primary-500); box-shadow: 0 15px 30px rgba(202, 117, 214, 0.4);
}
</style>

```


---
### Fichier : frontend\components\album\PhotoUploadFormDropZone.vue
```text
<template>
  <div
    class="drop-zone"
    :class="{
      'drop-zone--dragging': isDragging,
      'drop-zone--filled': !!apercu,
      'drop-zone--error': hasError,
    }"
    @click="triggerFileInput"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <Transition name="fade" mode="out-in">
      <div v-if="apercu" class="drop-zone__preview">
        <img :src="apercu" alt="Aperçu" class="preview-img" />
        <button type="button" class="remove-btn" @click.stop="$emit('remove')">×</button>
      </div>
      <div v-else class="drop-zone__placeholder">
        <div class="upload-icon">📸</div>
        <p><strong>Déposez</strong> votre photo ici</p>
        <span class="hint">JPG, PNG ou WebP</span>
      </div>
    </Transition>
    <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="$emit('change', $event)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ apercu: string | null; hasError: boolean }>();
const emit = defineEmits(['change', 'remove', 'drop']);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInput.value?.click();
const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files[0];
  if (file) emit('drop', file);
};
</script>

<style scoped>
.drop-zone {
  aspect-ratio: 16 / 9; border: 2.5px dashed #ca75d644; border-radius: 15px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  background: #fafafa; transition: all 0.3s; overflow: hidden; margin-bottom: 2rem;
}
.drop-zone:hover, .drop-zone--dragging { border-color: var(--clr-primary-500); background: #ca75d608; }
.drop-zone__placeholder { text-align: center; color: #999; }
.upload-icon { font-size: 3rem; margin-bottom: 10px; }
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.remove-btn {
  position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5);
  color: white; border: none; width: 24px; height: 24px; border-radius: 50%; cursor: pointer;
}
.hidden { display: none; }
</style>

```


---
### Fichier : frontend\components\album\PhotoUploadFormFields.vue
```text
<template>
  <div class="mso-form-fields">
    <div class="input-group">
      <input
        :value="titre"
        @input="$emit('update:titre', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Un titre pour l'éternité..."
        maxlength="100"
        required
      />
      <span class="char-count">{{ titre.length }}/100</span>
    </div>

    <textarea
      :value="description"
      @input="$emit('update:description', ($event.target as HTMLInputElement).value)"
      placeholder="Raconte-moi l'histoire derrière cette image (optionnel)..."
      rows="3"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{ titre: string; description: string }>();
defineEmits(['update:titre', 'update:description']);
</script>

<style scoped>
input, textarea {
  width: 100%; border: 2px solid #f1f1f1; border-radius: 12px;
  padding: 1rem; font-family: inherit; margin-bottom: 1.5rem; transition: border-color 0.3s;
}
input:focus, textarea:focus { border-color: var(--clr-primary-200); outline: none; }
.input-group { position: relative; }
.char-count { position: absolute; right: 1rem; bottom: 2.2rem; font-size: 0.7rem; color: #ccc; }
</style>

```


---
### Fichier : frontend\components\amani\ProfileMain.vue
```text
<template>
  <article class="scrapbook-card glass-card">
    <div class="tape-effect"></div>
    <div class="avatar-large">A</div>
    <div class="card-content">
      <p class="intro">
        Originaire de <strong>Paris 11</strong>, libérée du joug de la CPGE au <strong>Lycée Voltaire</strong>, je redécouvre la liberté entre les montagnes d'Annecy.
      </p>
      <p>
        Ce carnet est ma cachette. Mes photos, mes notes, mes victoires au billard (rares mais précieuses).
      </p>
    </div>
  </article>
</template>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background: #ca75d6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(202, 117, 214, 0.3);
}

.card-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
}

.intro { margin-bottom: 1.5rem; }

.tape-effect {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 35px;
  background: rgba(202, 117, 214, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
}
</style>

```


---
### Fichier : frontend\components\amani\ProfileStats.vue
```text
<template>
  <aside class="scrapbook-card glass-card stats-card">
    <div class="tape-effect tape-effect--corner"></div>
    <h3>Registres</h3>
    <div class="stats-list">
      <div class="stat-row">
        <span class="label">Origine</span>
        <span class="value">Paris 75011</span>
      </div>
      <div class="stat-row">
        <span class="label">Parcours</span>
        <span class="value">CPGE Voltaire</span>
      </div>
      <div class="stat-row">
        <span class="label">Points Mission</span>
        <span class="value">{{ points }} XP</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  points: number;
}>();
</script>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
}

.stats-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #c40e75;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #ca75d644;
}

.stat-row .label { font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #999; }
.stat-row .value { font-weight: 700; color: #c40e75; }

.tape-effect--corner {
  position: absolute;
  top: -10px;
  right: -20px;
  width: 120px;
  height: 35px;
  background: rgba(202, 117, 214, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  transform: rotate(45deg);
}
</style>

```


---
### Fichier : frontend\components\antoine\ProfileMain.vue
```text
<template>
  <article class="scrapbook-card glass-card">
    <div class="tape-effect"></div>
    <div class="avatar-large">A</div>
    <div class="card-content">
      <p class="intro">
        Architecte de la donnée le jour, sauveur de nos 20 ans la nuit. Arrivé d'<strong>Annecy-Chambéry</strong> pour conquérir les sommets (et le coeur d'une parisienne).
      </p>
      <p>
        Ce carnet compile les algorithmes de nos sorties, les stats de nos bowlings et les archives de nos meilleures randos.
      </p>
    </div>
  </article>
</template>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.card-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
}

.intro { margin-bottom: 1.5rem; }

.tape-effect {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 35px;
  background: rgba(59, 130, 246, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
}
</style>

```


---
### Fichier : frontend\components\antoine\ProfileStats.vue
```text
<template>
  <aside class="scrapbook-card glass-card stats-card">
    <div class="tape-effect tape-effect--corner"></div>
    <h3>Métriques</h3>
    <div class="stats-list">
      <div class="stat-row">
        <span class="label">Base</span>
        <span class="value">Lyon (69)</span>
      </div>
      <div class="stat-row">
        <span class="label">Formation</span>
        <span class="value">Polytech Data</span>
      </div>
      <div class="stat-row">
        <span class="label">Score Mission</span>
        <span class="value">{{ points }} XP</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  points: number;
}>();
</script>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
}

.stats-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1d4ed8;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #3b82f644;
}

.stat-row .label { font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #999; }
.stat-row .value { font-weight: 700; color: #1d4ed8; }

.tape-effect--corner {
  position: absolute;
  top: -10px;
  left: -20px;
  width: 120px;
  height: 35px;
  background: rgba(59, 130, 246, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  transform: rotate(-45deg);
}
</style>

```


---
### Fichier : frontend\components\auth\LoginCard.vue
```text
<template>
  <div class="auth-card">
    <h1 class="auth-title">Connexion</h1>
    <p class="auth-subtitle">Ravi de vous revoir !</p>
    <form @submit.prevent="$emit('submit')" class="auth-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input v-model="modelValue.username" type="text" id="username" required placeholder="votre_pseudo" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input v-model="modelValue.password" type="password" id="password" required placeholder="••••••••" />
      </div>
      <div v-if="error" class="auth-error">{{ error }}</div>
      <button type="submit" :disabled="loading" class="btn-auth">
        <span v-if="loading">Connexion...</span>
        <span v-else>Se connecter</span>
      </button>
    </form>
    <p class="auth-footer">Pas encore de compte ? <NuxtLink to="/register">S'inscrire</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: any; loading: boolean; error: string }>();
defineEmits(['submit', 'update:modelValue']);
</script>

<style scoped>
.auth-card { width: 100%; max-width: 400px; background: var(--clr-neutral-0); padding: var(--space-8); border-radius: var(--radius-2xl); box-shadow: var(--shadow-xl); }
.auth-title { font-size: var(--text-2xl); text-align: center; margin-bottom: var(--space-1); }
.auth-subtitle { text-align: center; color: var(--clr-neutral-500); margin-bottom: var(--space-8); }
.auth-form { display: flex; flex-direction: column; gap: var(--space-4); }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); }
.form-group label { font-size: var(--text-sm); font-weight: var(--fw-semibold); }
.form-group input { padding: var(--space-3); border: 1.5px solid var(--clr-neutral-200); border-radius: var(--radius-lg); outline: none; transition: border-color var(--transition-fast); }
.form-group input:focus { border-color: var(--clr-primary-500); }
.btn-auth { margin-top: var(--space-4); padding: var(--space-3); background: var(--clr-neutral-900); color: var(--clr-neutral-0); border: none; border-radius: var(--radius-lg); font-weight: var(--fw-bold); cursor: pointer; transition: opacity var(--transition-fast); }
.btn-auth:disabled { opacity: 0.7; }
.auth-error { color: var(--clr-error); font-size: var(--text-sm); text-align: center; }
.auth-footer { text-align: center; margin-top: var(--space-6); font-size: var(--text-sm); }
.auth-footer a { color: var(--clr-primary-500); font-weight: var(--fw-bold); }
</style>

```


---
### Fichier : frontend\components\auth\RegisterCard.vue
```text
<template>
  <div class="auth-card">
    <h1 class="auth-title">Inscription</h1>
    <p class="auth-subtitle">Prêt pour la mission ?</p>
    <form @submit.prevent="$emit('submit')" class="auth-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input v-model="modelValue.username" type="text" id="username" required placeholder="votre_pseudo" />
      </div>
      <div class="form-group">
        <label for="email">Email (optionnel)</label>
        <input v-model="modelValue.email" type="email" id="email" placeholder="votre@email.com" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input v-model="modelValue.password" type="password" id="password" required placeholder="••••••••" />
      </div>
      <div v-if="error" class="auth-error">{{ error }}</div>
      <button type="submit" :disabled="loading" class="btn-auth">
        <span v-if="loading">Création...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </form>
    <p class="auth-footer">Déjà inscrit ? <NuxtLink to="/login">Se connecter</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: any; loading: boolean; error: string }>();
defineEmits(['submit', 'update:modelValue']);
</script>

<style scoped>
.auth-card { width: 100%; max-width: 400px; background: var(--clr-neutral-0); padding: var(--space-8); border-radius: var(--radius-2xl); box-shadow: var(--shadow-xl); }
.auth-title { font-size: var(--text-2xl); text-align: center; margin-bottom: var(--space-1); }
.auth-subtitle { text-align: center; color: var(--clr-neutral-500); margin-bottom: var(--space-8); }
.auth-form { display: flex; flex-direction: column; gap: var(--space-4); }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); }
.form-group label { font-size: var(--text-sm); font-weight: var(--fw-semibold); }
.form-group input { padding: var(--space-3); border: 1.5px solid var(--clr-neutral-200); border-radius: var(--radius-lg); outline: none; transition: border-color var(--transition-fast); }
.form-group input:focus { border-color: var(--clr-primary-500); }
.btn-auth { margin-top: var(--space-4); padding: var(--space-3); background: var(--clr-neutral-900); color: var(--clr-neutral-0); border: none; border-radius: var(--radius-lg); font-weight: var(--fw-bold); cursor: pointer; transition: opacity var(--transition-fast); }
.btn-auth:disabled { opacity: 0.7; }
.auth-error { color: var(--clr-error); font-size: var(--text-sm); text-align: center; }
.auth-footer { text-align: center; margin-top: var(--space-6); font-size: var(--text-sm); }
.auth-footer a { color: var(--clr-primary-500); font-weight: var(--fw-bold); }
</style>

```


---
### Fichier : frontend\components\carte\InteractiveMap.vue
```text
<template>
  <main class="carte-main">
    <div id="mso-map" class="mso-map-canvas"></div>
    <CarteMapLegend />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { formatDate } from '~/utils/formatters';
import type { Photo } from '~/types';

const props = defineProps<{ photos: Photo[]; }>();
let map: any = null; const markers = new Map<number, any>();

const initMap = async () => {
  if (process.server) return;
  const L = await import('leaflet'); import('leaflet/dist/leaflet.css');
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({ iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

  map = L.map('mso-map', { zoomControl: false, scrollWheelZoom: true }).setView([45.8992, 6.1293], 13);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 20 }).addTo(map);

  props.photos.forEach(p => {
    if (p.latitude && p.longitude) {
      const m = L.marker([p.latitude, p.longitude]).addTo(map).bindPopup(`<div class="map-popup"><img src="${p.image_url}" class="popup-img" /><div class="popup-content"><h3>${p.titre}</h3><p>${formatDate(p.date_creation)}</p></div></div>`, { maxWidth: 280, className: 'mso-leaflet-popup' });
      markers.set(p.id, m);
    }
  });
  const manual = [{ n: "Lyon", c: [45.764, 4.835] }, { n: "Paris", c: [48.856, 2.352] }, { n: "Nîmes", c: [43.836, 4.360] }, { n: "Semnoz", c: [45.795, 6.096] }];
  manual.forEach(pt => L.circleMarker(pt.c as any, { radius: 10, fillColor: "#ca75d6", color: "#fff", weight: 3, opacity: 1, fillOpacity: 0.8 }).addTo(map).bindPopup(`<b>${pt.n}</b>`));
};

const focusOn = (p: Photo) => { if (map && p.latitude) { map.setView([p.latitude, p.longitude], 16); markers.get(p.id)?.openPopup(); } };
defineExpose({ focusOn });
onMounted(initMap);
onUnmounted(() => { if (map) map.remove(); });
</script>

<style scoped>
.carte-main { position: relative; height: 100%; }
.mso-map-canvas { width: 100%; height: 100%; }
:deep(.mso-leaflet-popup) .leaflet-popup-content-wrapper { border-radius: 16px; padding: 0; overflow: hidden; box-shadow: 0 15px 45px rgba(0,0,0,0.15); }
:deep(.map-popup) { width: 250px; }
:deep(.popup-img) { width: 100%; height: 150px; object-fit: cover; display: block; }
:deep(.popup-content) { padding: 1rem; }
:deep(.popup-content h3) { font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 5px; }
:deep(.popup-content p) { font-size: 0.75rem; font-weight: 700; color: #999; text-transform: uppercase; }
</style>

```


---
### Fichier : frontend\components\carte\MapLegend.vue
```text
<template>
  <div class="map-overlay-legend glass-card">
    <div class="legend-item"><span class="dot dot--photo"></span><span>Souvenir Photo</span></div>
    <div class="legend-item"><span class="dot dot--manual"></span><span>Lieu Mémorable</span></div>
  </div>
</template>

<style scoped>
.map-overlay-legend { position: absolute; top: 2rem; right: 2rem; padding: 1rem 1.5rem; z-index: 1000; display: flex; flex-direction: column; gap: 0.8rem; }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 800; color: #444; }
.dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.dot--photo { background: #3b82f6; }
.dot--manual { background: #ca75d6; }
</style>

```


---
### Fichier : frontend\components\carte\PhotoJournal.vue
```text
<template>
  <aside class="carte-sidebar">
    <header class="sidebar-header">
      <h1 class="sidebar-title">Journal de Bord 🗺️</h1>
      <p class="sidebar-subtitle">{{ photoCount }} escales sauvegardées</p>
    </header>
    <div class="sidebar-scroll">
      <div v-if="photos.length === 0" class="empty-journal"><div class="empty-icon">📍</div><p>Aucune photo épinglée.</p></div>
      <CartePhotoJournalItem v-for="photo in photos" :key="photo.id" :photo="photo" @click="$emit('focus-photo', photo)" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';
defineProps<{ photos: Photo[]; photoCount: number; }>();
defineEmits(['focus-photo']);
</script>

<style scoped>
.carte-sidebar { background: white; border-right: 1px solid #efefef; display: flex; flex-direction: column; z-index: 10; box-shadow: 10px 0 30px rgba(0,0,0,0.02); }
.sidebar-header { padding: 2.5rem 2rem; border-bottom: 1px dashed #ddd; }
.sidebar-title { font-family: var(--font-display); font-size: 1.8rem; color: #1a1a1a; line-height: 1.1; margin-bottom: 0.5rem; }
.sidebar-subtitle { color: var(--clr-primary-500); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
.sidebar-scroll { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.empty-journal { text-align: center; padding-top: 3rem; color: #999; }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; }
</style>

```


---
### Fichier : frontend\components\carte\PhotoJournalItem.vue
```text
<template>
  <div class="journal-item glass-card" @click="$emit('click')">
    <div class="journal-item__img"><img :src="photo.image_url" :alt="photo.titre" /></div>
    <div class="journal-item__info">
      <h4>{{ photo.titre }}</h4>
      <time>{{ formatDate(photo.date_creation) }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters';
import type { Photo } from '~/types';
defineProps<{ photo: Photo }>();
defineEmits(['click']);
</script>

<style scoped>
.journal-item { display: flex; gap: 1rem; padding: 10px; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid #f0f0f0; }
.journal-item:hover { transform: translateX(10px) scale(1.02); border-color: var(--clr-primary-200); }
.journal-item__img { width: 80px; height: 80px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.journal-item__img img { width: 100%; height: 100%; object-fit: cover; }
.journal-item__info h4 { font-family: var(--font-display); font-size: 1rem; margin-bottom: 4px; color: #333; }
.journal-item__info time { font-size: 0.75rem; font-weight: 700; color: #999; text-transform: uppercase; }
</style>

```


---
### Fichier : frontend\components\cinema\CinemaHeader.vue
```text
<template>
  <header class="page-header container">
    <div class="header-content">
      <h1 class="page-title">Ciné-Journal</h1>
      <p class="page-subtitle">Nos critiques étanches & indépendantes 🍿</p>
    </div>
    <button @click="$emit('toggle')" class="btn-toggle-form" :class="{ 'btn-toggle-form--active': showForm }">
      {{ showForm ? 'Fermer' : 'Ajouter un film' }}
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{ showForm: boolean }>();
defineEmits(['toggle']);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); letter-spacing: -1px; }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; font-size: 1.1rem; }
.btn-toggle-form { background: #1a1a1a; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.btn-toggle-form--active { background: #ca75d6; }
</style>

```


---
### Fichier : frontend\components\cinema\MovieCard.vue
```text
<template>
  <article class="movie-card">
    <CinemaMovieCardPoster :poster-url="movie.poster_url" :title="movie.title" :date="formatDateShort(movie.date_seen)" />
    <div class="movie-details">
      <header class="movie-header">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <div class="movie-meta">Ajouté par {{ movie.added_by_username }}</div>
      </header>
      <CinemaMovieCardReviews
        :amani-review="movie.amani_review" :amani-rating="movie.amani_rating || 0"
        :antoine-review="movie.antoine_review" :antoine-rating="movie.antoine_rating || 0"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Movie } from '~/types';
defineProps<{ movie: Movie }>();
const formatDateShort = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
</script>

<style scoped>
.movie-card { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; background: white; padding: 1.5rem; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.05); transition: transform 0.3s; }
.movie-card:hover { transform: translateY(-5px); }
.movie-details { display: flex; flex-direction: column; }
.movie-header { margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
.movie-title { font-family: var(--font-display); font-size: 2rem; color: #1a1a1a; }
.movie-meta { font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
@media (max-width: 900px) { .movie-card { grid-template-columns: 1fr; } }
</style>

```


---
### Fichier : frontend\components\cinema\MovieCardPoster.vue
```text
<template>
  <div class="movie-poster-wrapper">
    <img v-if="posterUrl" :src="posterUrl" :alt="title" class="movie-poster" />
    <div v-else class="movie-poster movie-poster--fallback"><span>🎬</span></div>
    <div class="movie-date-badge">{{ date }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ posterUrl?: string | null; title: string; date: string }>();
</script>

<style scoped>
.movie-poster-wrapper { position: relative; height: 300px; }
.movie-poster { width: 100%; height: 100%; object-fit: cover; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.movie-poster--fallback { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
.movie-date-badge { position: absolute; top: -10px; left: -10px; background: #1a1a1a; color: white; padding: 5px 12px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; transform: rotate(-5deg); }
@media (max-width: 900px) { .movie-poster-wrapper { height: 400px; } }
</style>

```


---
### Fichier : frontend\components\cinema\MovieCardReviews.vue
```text
<template>
  <div class="reviews-container">
    <div class="review-bubble review-bubble--amani" :class="{ 'empty': !amaniReview }">
      <div class="review-author">Amani</div>
      <p v-if="amaniReview">{{ amaniReview }}</p>
      <p v-else class="placeholder-text">En attente de l'avis de la parisienne...</p>
      <div class="review-rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': amaniRating >= i }">★</span>
      </div>
    </div>
    <div class="review-bubble review-bubble--antoine" :class="{ 'empty': !antoineReview }">
      <div class="review-author">Antoine</div>
      <p v-if="antoineReview">{{ antoineReview }}</p>
      <p v-else class="placeholder-text">En attente de l'avis du lyonnais...</p>
      <div class="review-rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': antoineRating >= i }">★</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ amaniReview?: string; amaniRating: number; antoineReview?: string; antoineRating: number }>();
</script>

<style scoped>
.reviews-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; flex-grow: 1; }
.review-bubble { padding: 1.2rem; border-radius: 18px; position: relative; font-size: 0.95rem; line-height: 1.6; }
.review-author { font-weight: 900; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.5rem; }
.review-bubble--amani { background: #fff0f9; color: #c40e75ff; border-left: 4px solid #c40e75ff; }
.review-bubble--antoine { background: #f4fafe; color: #1d4ed8; border-left: 4px solid #1d4ed8; }
.review-bubble.empty { background: #f8fafc; color: #94a3b8; border-left: 4px solid #e2e8f0; font-style: italic; }
.review-rating { margin-top: auto; padding-top: 1rem; display: flex; gap: 2px; }
.star { color: #cbd5e0; font-size: 1.2rem; }
.star.filled { color: #f6ad55; }
@media (max-width: 900px) { .reviews-container { grid-template-columns: 1fr; } }
</style>

```


---
### Fichier : frontend\components\cinema\MovieForm.vue
```text
<template>
  <section class="add-movie-section card glass-card">
    <h2 class="card-title">Nouvelle Séance</h2>
    <form @submit.prevent="$emit('submit')" class="movie-form">
      <CinemaMovieFormBase
        v-model:title="modelValue.title"
        v-model:dateSeen="modelValue.date_seen"
        :poster-name="modelValue.poster?.name"
        @trigger-file="triggerFileInput"
      />
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="$emit('fileChange', $event)" />

      <CinemaMovieFormReviews
        v-model:amaniReview="modelValue.amani_review"
        v-model:amaniRating="modelValue.amani_rating"
        v-model:antoineReview="modelValue.antoine_review"
        v-model:antoineRating="modelValue.antoine_rating"
      />

      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Enregistrement...' : 'Graver dans le marbre' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ modelValue: any; isSubmitting: boolean }>();
defineEmits(['submit', 'fileChange', 'update:modelValue']);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInput.value?.click();
</script>

<style scoped>
.add-movie-section { margin-bottom: 4rem; padding: 2.5rem; border: 1px solid #efefef; }
.form-actions { text-align: center; }
.btn-primary { background: #1a1a1a; color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
.btn-primary:hover:not(:disabled) { background: #ca75d6; box-shadow: 0 10px 25px rgba(202, 117, 214, 0.4); transform: scale(1.02); }
.hidden { display: none; }
</style>

```


---
### Fichier : frontend\components\cinema\MovieFormBase.vue
```text
<template>
  <div class="form-grid">
    <div class="form-group">
      <label>Titre du film</label>
      <input :value="title" @input="$emit('update:title', ($event.target as HTMLInputElement).value)" type="text" placeholder="Ex: Inception" required />
    </div>
    <div class="form-group">
      <label>Date du visionnage</label>
      <input :value="dateSeen" @input="$emit('update:dateSeen', ($event.target as HTMLInputElement).value)" type="date" required />
    </div>
    <div class="form-group full-width">
      <label>Affiche (Poster)</label>
      <div class="file-upload" @click="$emit('trigger-file')">
        <span v-if="!posterName">Cliquez pour ajouter l'affiche</span>
        <span v-else>{{ posterName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; dateSeen: string; posterName?: string }>();
defineEmits(['update:title', 'update:dateSeen', 'trigger-file']);
</script>

<style scoped>
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
.full-width { grid-column: span 2; }
.form-group label { display: block; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: #718096; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 10px; font-family: inherit; }
.file-upload { border: 2px dashed #ca75d644; padding: 1.5rem; text-align: center; border-radius: 10px; cursor: pointer; color: #ca75d6; font-weight: 600; }
@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } .full-width { grid-column: auto; } }
</style>

```


---
### Fichier : frontend\components\cinema\MovieFormReviews.vue
```text
<template>
  <div class="reviews-input-grid">
    <div class="review-input-box review-input-box--amani">
      <h3>Critique d'Amani 🌸</h3>
      <textarea :value="amaniReview" @input="$emit('update:amaniReview', ($event.target as HTMLInputElement).value)" placeholder="Ton avis, Amani..."></textarea>
      <div class="rating-input">
        <span v-for="i in 5" :key="i" @click="$emit('update:amaniRating', i)" :class="{ 'active': amaniRating >= i }">⭐</span>
      </div>
    </div>
    <div class="review-input-box review-input-box--antoine">
      <h3>Critique d'Antoine 🛡️</h3>
      <textarea :value="antoineReview" @input="$emit('update:antoineReview', ($event.target as HTMLInputElement).value)" placeholder="Ton avis, Antoine..."></textarea>
      <div class="rating-input">
        <span v-for="i in 5" :key="i" @click="$emit('update:antoineRating', i)" :class="{ 'active': antoineRating >= i }">⭐</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ amaniReview: string; amaniRating: number; antoineReview: string; antoineRating: number }>();
defineEmits(['update:amaniReview', 'update:amaniRating', 'update:antoineReview', 'update:antoineRating']);
</script>

<style scoped>
.reviews-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
.review-input-box { padding: 1.5rem; border-radius: 15px; }
.review-input-box--amani { background: #fff0f9; border: 1px solid #c40e7522; }
.review-input-box--antoine { background: #f4fafe; border: 1px solid #3b82f622; }
.review-input-box h3 { font-size: 1rem; margin-bottom: 1rem; font-family: var(--font-display); }
.review-input-box textarea { width: 100%; height: 120px; background: white; border: 1px solid rgba(0,0,0,0.05); border-radius: 10px; padding: 10px; font-family: inherit; resize: none; }
.rating-input { margin-top: 10px; font-size: 1.5rem; cursor: pointer; }
.rating-input span { opacity: 0.3; transition: opacity 0.2s; }
.rating-input span.active { opacity: 1; }
@media (max-width: 900px) { .reviews-input-grid { grid-template-columns: 1fr; } }
</style>

```


---
### Fichier : frontend\components\games\GamesHeader.vue
```text
<template>
  <header class="page-header container">
    <div class="header-content">
      <h1 class="page-title">Scoreboard</h1>
      <p class="page-subtitle">Qui est le champion d'Annecy ? 🎱🎳</p>
    </div>
    <button @click="$emit('toggle-form')" class="btn-toggle-form" :class="{ 'btn-toggle-form--active': showForm }">
      {{ showForm ? 'Fermer' : 'Nouvelle Partie' }}
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{ showForm: boolean }>();
defineEmits(['toggle-form']);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); letter-spacing: -1px; }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; font-size: 1.1rem; }
.btn-toggle-form { background: #1a1a1a; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.btn-toggle-form--active { background: #ca75d6; }
</style>

```


---
### Fichier : frontend\components\games\SessionCard.vue
```text
<template>
  <article class="timeline-item">
    <div class="timeline-dot" :class="getWinnerClass(session.winner)"></div>
    <div class="timeline-date">{{ formatDateShort(session.date) }}</div>
    <div class="timeline-content glass-card">
      <div class="session-header">
        <span class="session-type">{{ session.game_type_icon }} {{ session.game_type_name }}</span>
        <span class="session-location" v-if="session.location">📍 {{ session.location }}</span>
      </div>
      <GamesSessionCardScores :winner="session.winner" :amani-score="session.amani_score" :antoine-score="session.antoine_score" />
      <p class="session-notes" v-if="session.notes">"{{ session.notes }}"</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { GameSession } from '~/types';
defineProps<{ session: GameSession; }>();
const formatDateShort = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
const getWinnerClass = (w: string) => ({ 'Amani': 'winner-amani', 'Antoine': 'winner-antoine' }[w] || 'winner-draw');
</script>

<style scoped>
.timeline-item { display: flex; gap: 2rem; padding-left: 10px; }
.timeline-dot { width: 20px; height: 20px; border-radius: 50%; background: white; border: 4px solid #edf2f7; flex-shrink: 0; z-index: 1; }
.winner-amani { border-color: #c40e75ff; }
.winner-antoine { border-color: #1d4ed8; }
.winner-draw { border-color: #94a3b8; }
.timeline-date { width: 100px; font-size: 0.8rem; font-weight: 700; color: #94a3b8; padding-top: 2px; }
.timeline-content { flex-grow: 1; padding: 1.5rem; border-radius: 16px; }
.session-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.session-type { font-weight: 800; color: var(--clr-neutral-900); }
.session-location { font-size: 0.8rem; color: #94a3b8; }
.session-notes { font-style: italic; font-size: 0.9rem; color: #64748b; text-align: center; border-top: 1px dashed #edf2f7; padding-top: 1rem; }
@media (max-width: 768px) { .timeline-item { gap: 1rem; } .timeline-date { width: 60px; font-size: 0.7rem; } }
</style>

```


---
### Fichier : frontend\components\games\SessionCardScores.vue
```text
<template>
  <div class="session-scores-row">
    <div class="score-box amani" :class="{ 'winner': winner === 'Amani' }">
      <span class="name">Amani</span>
      <span class="score">{{ amaniScore }}</span>
    </div>
    <div class="score-vs">VS</div>
    <div class="score-box antoine" :class="{ 'winner': winner === 'Antoine' }">
      <span class="name">Antoine</span>
      <span class="score">{{ antoineScore }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ winner: string; amaniScore: number; antoineScore: number }>();
</script>

<style scoped>
.session-scores-row { display: flex; align-items: center; justify-content: center; gap: 2rem; margin: 1rem 0; }
.score-box { display: flex; flex-direction: column; align-items: center; padding: 1rem; border-radius: 12px; min-width: 100px; transition: transform 0.3s; }
.score-box.winner { transform: scale(1.1); font-weight: 800; }
.score-box.amani.winner { background: #fff0f9; box-shadow: 0 5px 15px rgba(196, 14, 117, 0.1); }
.score-box.antoine.winner { background: #f4fafe; box-shadow: 0 5px 15px rgba(29, 78, 216, 0.1); }
.score-box .name { font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.2rem; }
.score-box .score { font-size: 2rem; font-weight: 900; }
.score-vs { font-weight: 900; color: #cbd5e0; font-size: 0.8rem; }
@media (max-width: 768px) { .session-scores-row { gap: 1rem; } .score-box { min-width: 80px; } }
</style>

```


---
### Fichier : frontend\components\games\SessionForm.vue
```text
<template>
  <section class="add-session-section card glass-card">
    <div class="mso-journal-card__tape"></div>
    <h2 class="card-title">Enregistrer un exploit</h2>
    <form @submit.prevent="$emit('submit')" class="games-form">
      <GamesSessionFormFields :model-value="modelValue" :game-types="gameTypes" @update:field="$emit('update:modelValue', { ...modelValue, ...$event })" />
      <div class="form-group full-width">
        <label>Lieu</label>
        <input :value="modelValue.location" @input="$emit('update:modelValue', { ...modelValue, location: ($event.target as HTMLInputElement).value })" type="text" placeholder="Ex: Billard Club" />
      </div>
      <div class="form-group full-width">
        <label>Notes</label>
        <textarea :value="modelValue.notes" @input="$emit('update:modelValue', { ...modelValue, notes: ($event.target as HTMLTextAreaElement).value })" placeholder="Une anecdote ?"></textarea>
      </div>
      <div class="form-actions"><button type="submit" class="mso-btn-primary" :disabled="isSubmitting">{{ isSubmitting ? 'Enregistrement...' : 'Valider' }}</button></div>
    </form>
  </section>
</template>

<script setup lang="ts">
import type { GameType } from '~/types';
defineProps<{ modelValue: any; gameTypes: GameType[]; isSubmitting: boolean; }>();
defineEmits(['submit', 'update:modelValue']);
</script>

<style scoped>
.add-session-section { margin-bottom: 4rem; padding: 3rem; position: relative; transform: rotate(0.5deg); }
.mso-journal-card__tape { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 120px; height: 35px; background: rgba(202, 117, 214, 0.2); clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%); }
.form-group label { display: block; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: #718096; margin-bottom: 0.5rem; }
.form-group input, .form-group textarea { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 12px; font-family: inherit; }
.full-width { margin-top: 1.5rem; }
.form-actions { margin-top: 2rem; text-align: center; }
.mso-btn-primary { background: #1a1a1a; color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
.mso-btn-primary:hover:not(:disabled) { background: #ca75d6; box-shadow: 0 10px 25px rgba(202, 117, 214, 0.3); }
</style>

```


---
### Fichier : frontend\components\games\SessionFormFields.vue
```text
<template>
  <div class="form-grid">
    <div class="form-group">
      <label>Type de jeu</label>
      <select :value="modelValue.game_type" @change="$emit('update:field', { game_type: Number(($event.target as HTMLSelectElement).value) })" required>
        <option v-for="t in gameTypes" :key="t.id" :value="t.id">{{ t.icon }} {{ t.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label>Date</label>
      <input :value="modelValue.date" @input="$emit('update:field', { date: ($event.target as HTMLInputElement).value })" type="date" required />
    </div>
    <div class="form-group">
      <label>Score d'Amani 🌸</label>
      <input :value="modelValue.amani_score" @input="$emit('update:field', { amani_score: Number(($event.target as HTMLInputElement).value) })" type="number" min="0" required />
    </div>
    <div class="form-group">
      <label>Score d'Antoine 🛡️</label>
      <input :value="modelValue.antoine_score" @input="$emit('update:field', { antoine_score: Number(($event.target as HTMLInputElement).value) })" type="number" min="0" required />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameType } from '~/types';
defineProps<{ modelValue: any; gameTypes: GameType[] }>();
defineEmits(['update:field']);
</script>

<style scoped>
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.form-group label { display: block; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: #718096; margin-bottom: 0.5rem; }
.form-group input, .form-group select { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 12px; font-family: inherit; }
@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
</style>

```


---
### Fichier : frontend\components\games\SessionTimeline.vue
```text
<template>
  <div class="history-timeline">
    <h2 class="section-title">Chronologie des Défis</h2>
    <div class="timeline-container">
      <SessionCard
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameSession } from '~/types';

defineProps<{
  sessions: GameSession[];
}>();
</script>

<style scoped>
.section-title {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #edf2f7;
}

@media (max-width: 768px) {
  .timeline-container::before { left: 10px; }
}
</style>

```


---
### Fichier : frontend\components\games\StatsSummary.vue
```text
<template>
  <section class="stats-overview grid-3">
    <div class="stat-card glass-card amani-stat">
      <span class="stat-label">Amani</span>
      <span class="stat-value">{{ stats?.overall.amani_wins || 0 }}</span>
      <span class="stat-desc">Victoires Totales</span>
    </div>
    <div class="stat-card glass-card draw-stat">
      <span class="stat-label">Égalités</span>
      <span class="stat-value">{{ stats?.overall.draws || 0 }}</span>
      <span class="stat-desc">Parties Serrées</span>
    </div>
    <div class="stat-card glass-card antoine-stat">
      <span class="stat-label">Antoine</span>
      <span class="stat-value">{{ stats?.overall.antoine_wins || 0 }}</span>
      <span class="stat-desc">Victoires Totales</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ScoreboardStats } from '~/types';

defineProps<{
  stats: ScoreboardStats | null;
}>();
</script>

<style scoped>
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 20px;
}

.stat-label { font-weight: 800; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
.stat-value { font-size: 3rem; font-weight: 900; line-height: 1; }
.stat-desc { font-size: 0.85rem; color: #94a3b8; }

.amani-stat { background: #fff0f9; color: #c40e75ff; border: 1px solid #c40e7522; }
.antoine-stat { background: #f4fafe; color: #1d4ed8; border: 1px solid #3b82f622; }
.draw-stat { background: #f8fafc; color: #64748b; }

@media (max-width: 768px) {
  .grid-3 { grid-template-columns: 1fr; }
}
</style>

```


---
### Fichier : frontend\components\header\Actions.vue
```text
<template>
  <div class="mso-actions">
    <template v-if="isAuthenticated">
      <NuxtLink to="/profile" class="mso-user-pill">
        <span class="mso-user-pill__name">{{ username }}</span>
      </NuxtLink>
      <button class="mso-btn-logout" @click="$emit('logout')" title="Déconnexion">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </template>
    <template v-else>
      <NuxtLink to="/login" class="mso-btn-login">Connexion</NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean;
  username?: string;
}>();
defineEmits(['logout']);
</script>

<style scoped>
.mso-actions { display: flex; align-items: center; gap: 1rem; }
.mso-user-pill {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 16px; border-radius: 20px; color: white; text-decoration: none;
  font-weight: 600; font-size: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}
.mso-user-pill:hover { background: white; color: #ca75d6; }
.mso-btn-logout { background: none; border: none; color: white; cursor: pointer; opacity: 0.8; transition: opacity 0.3s; display: flex; }
.mso-btn-logout:hover { opacity: 1; }
.mso-btn-login {
  color: white; text-decoration: none; font-weight: 800; border: 2px solid white;
  padding: 8px 20px; border-radius: 12px; transition: all 0.3s;
}
.mso-btn-login:hover { background: white; color: #ca75d6; }
</style>

```


---
### Fichier : frontend\components\header\Logo.vue
```text
<template>
  <NuxtLink to="/" class="mso-logo" aria-label="Accueil MSO20s">
    <div class="mso-logo__icon">📸</div>
    <span class="mso-logo__text">MSO20s</span>
  </NuxtLink>
</template>

<style scoped>
.mso-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.mso-logo__icon { font-size: 24px; transform: rotate(-10deg); transition: transform 0.3s; }
.mso-logo:hover .mso-logo__icon { transform: rotate(10deg) scale(1.2); }
.mso-logo__text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
}
</style>

```


---
### Fichier : frontend\components\header\Nav.vue
```text
<template>
  <nav class="mso-nav">
    <ul class="mso-nav__list">
      <li><NuxtLink to="/albumPhoto" class="mso-nav__link">Album</NuxtLink></li>
      <li><NuxtLink to="/carte" class="mso-nav__link">Carte</NuxtLink></li>
      <li><NuxtLink to="/cinema" class="mso-nav__link">Cinéma</NuxtLink></li>
      <li><NuxtLink to="/jeux" class="mso-nav__link">Jeux</NuxtLink></li>
      <li><NuxtLink to="/wishlist" class="mso-nav__link">Wishlist</NuxtLink></li>
      <li><NuxtLink to="/calendrier" class="mso-nav__link">Agenda</NuxtLink></li>
      <li><NuxtLink to="/etoiles" class="mso-nav__link">Étoiles</NuxtLink></li>
      <li><NuxtLink to="/amani" class="mso-nav__link mso-nav__link--amani">Espace Amani</NuxtLink></li>
      <li>
        <button @click="$emit('antoine-click')" class="mso-nav__link mso-nav__link--antoine">
          Espace Antoine
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineEmits(['antoine-click']);
</script>

<style scoped>
.mso-nav__list { display: flex; list-style: none; gap: 1.5rem; margin: 0; padding: 0; }
.mso-nav__link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s;
  background: none; border: none; cursor: pointer;
}
.mso-nav__link:hover { color: white; background: rgba(255, 255, 255, 0.15); }
.mso-nav__link--amani:hover { background: #fff0f9; color: #c40e75ff; }
.mso-nav__link--antoine:hover { background: #f4fafe; color: #3b82f6; }

@media (max-width: 1024px) { .mso-nav { display: none; } }
</style>

```


---
### Fichier : frontend\components\home\Flashback.vue
```text
<template>
  <div v-if="memories.length > 0" class="mso-flashback">
    <h3 class="mso-flashback__title">✨ Flashback : Ce mois-ci les années passées</h3>
    <div class="mso-flashback__grid">
      <div v-for="memory in memories" :key="memory.id" class="mso-flashback__item">
        <img :src="memory.image_url" :alt="memory.titre" class="mso-flashback__img" />
        <div class="mso-flashback__overlay">
          <span class="mso-flashback__date">{{ formatDateYear(memory.date_creation) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';

defineProps<{
  memories: Photo[]
}>();

const formatDateYear = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
};
</script>

<style scoped>
.mso-flashback {
  margin-top: 5rem;
  width: 100%;
}

.mso-flashback__title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: center;
}

.mso-flashback__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.mso-flashback__item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.mso-flashback__item:hover {
  transform: scale(1.05) rotate(2deg);
}

.mso-flashback__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mso-flashback__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  display: flex;
  align-items: flex-end;
  padding: 10px;
}

.mso-flashback__date {
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}
</style>

```


---
### Fichier : frontend\components\home\FloatingStickers.vue
```text
<template>
  <div class="mso-stickers" aria-hidden="true">
    <span 
      v-for="(emoji, index) in stickers" 
      :key="index" 
      class="mso-sticker"
      :style="getStickerStyle(index)"
    >
      {{ emoji }}
    </span>
  </div>
</template>

<script setup lang="ts">
const stickers = ['🏔️', '🌸', '🌌', '✈️', '🌲', '🌷', '🍹', '🎱', '🍿', '📸', '🎞️', '🎿'];

const getStickerStyle = (index: number) => {
  const seed = index * 137.5;
  return {
    top: `${(seed % 85) + 5}%`,
    left: `${((seed * 1.6) % 90) + 5}%`,
    animationDuration: `${12 + (seed % 15)}s`,
    animationDelay: `${-(seed % 20)}s`,
    transform: `rotate(${(seed % 40) - 20}deg)`
  };
};
</script>

<style scoped>
.mso-stickers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.mso-sticker {
  position: absolute;
  font-size: 2.2rem;
  opacity: 0.35;
  filter: saturate(0.8) contrast(0.9);
  animation: floatAround linear infinite;
  will-change: transform;
}

@keyframes floatAround {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -40px) rotate(5deg); }
  66% { transform: translate(-15px, -60px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
</style>

```


---
### Fichier : frontend\components\home\HomeHero.vue
```text
<template>
  <section class="mso-hero container">
    <div class="mso-mission-badge">
      <span class="mso-mission-badge__pulse"></span>
      Mission : Sauver nos 20 ans
    </div>

    <h1 class="mso-title">
      Amani <span class="mso-title__amp">&</span> Antoine
    </h1>

    <slot />
  </section>
</template>

<style scoped>
.mso-hero {
  position: relative; z-index: 10; max-width: 850px;
  display: flex; flex-direction: column; align-items: center;
}
.mso-mission-badge {
  background: #ca75d6; color: white; padding: 8px 20px; border-radius: 50px;
  font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 3px;
  display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(202, 117, 214, 0.3);
}
.mso-mission-badge__pulse {
  width: 10px; height: 10px; background: white; border-radius: 50%;
  animation: pulseBadge 2s infinite;
}
@keyframes pulseBadge { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.mso-title {
  font-family: var(--font-display); font-size: clamp(3rem, 12vw, 5.5rem);
  color: #1a1a1a; text-align: center; margin-bottom: 4rem; line-height: 0.9; letter-spacing: -2px;
}
.mso-title__amp { color: #ca75d6; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; margin: 0 0.5rem; }
</style>

```


---
### Fichier : frontend\components\home\JournalCard.vue
```text
<template>
  <div class="mso-journal-card">
    <div class="mso-journal-card__tape"></div>
    <div class="mso-journal-card__content">
      <header class="mso-journal-card__header">
        <span class="mso-journal-card__date">Janvier 2026 — Annecy</span>
        <h2 class="mso-journal-card__subtitle">Le début de l'archive immuable</h2>
      </header>
      <HomeJournalCardBody />
      <div class="mso-journal-card__actions">
        <NuxtLink to="/albumPhoto" class="mso-btn-primary">
          Ouvrir l'Album Photo
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mso-journal-card { background: white; padding: 4rem; border-radius: 2px; box-shadow: 0 30px 80px rgba(0,0,0,0.08); position: relative; transform: rotate(-1.5deg); border: 1px solid #efefef; width: 100%; }
.mso-journal-card__tape { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); width: 140px; height: 45px; background: rgba(202, 117, 214, 0.25); backdrop-filter: blur(4px); z-index: 5; clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%); }
.mso-journal-card__header { margin-bottom: 3rem; border-bottom: 1px dashed #ddd; padding-bottom: 1.5rem; }
.mso-journal-card__date { font-family: var(--font-display); font-size: 1.3rem; color: #ca75d6; font-weight: 700; }
.mso-journal-card__subtitle { font-size: 1rem; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.5rem; }
.mso-btn-primary { display: inline-flex; align-items: center; gap: 15px; background: #1a1a1a; color: white; padding: 1.2rem 3rem; border-radius: 60px; text-decoration: none; font-weight: 800; font-size: 1.1rem; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
.mso-btn-primary:hover { background: #ca75d6; transform: translateY(-5px) rotate(1deg); box-shadow: 0 15px 35px rgba(202, 117, 214, 0.4); }
@media (max-width: 768px) { .mso-journal-card { padding: 2.5rem; transform: none; } }
</style>

```


---
### Fichier : frontend\components\home\JournalCardBody.vue
```text
<template>
  <div class="mso-journal-card__body">
    <p>Tout commence à <strong>Annecy</strong>. D'un côté, <strong>Antoine</strong>, lyonnais pure souche et futur architecte de la donnée à Polytech. De l'autre, <strong>Amani</strong>, parisienne libérée de l'enfer de la CPGE au Lycée Voltaire.</p>
    <p>Alors que l'ennui s'installait doucement entre deux sessions de code et de révisions, le destin a scellé notre pacte : transformer chaque "date", chaque rando et chaque soirée en une brique de notre muraille contre le temps.</p>
    <blockquote class="mso-journal-card__quote">"Parce que nos 20 ans ne se sauveront pas tout seuls."</blockquote>
  </div>
</template>

<style scoped>
.mso-journal-card__body { font-size: 1.2rem; line-height: 1.9; color: #333; }
.mso-journal-card__body p { margin-bottom: 2rem; }
.mso-journal-card__quote {
  font-family: var(--font-display); font-size: 2.2rem; text-align: center; margin: 4rem 0;
  color: #1a1a1a; background: linear-gradient(to right, transparent, #ca75d615, transparent); padding: 2rem; font-style: italic; line-height: 1.2;
}
@media (max-width: 768px) { .mso-journal-card__quote { font-size: 1.5rem; } }
</style>

```


---
### Fichier : frontend\components\social\PostCard.vue
```text
<template>
  <article class="post-item glass-card">
    <div class="post-item-header">
      <img :src="avatar || '/default-avatar.png'" class="small-avatar" />
      <div class="post-meta">
        <span class="post-author">{{ post.author.username }}</span>
        <time class="post-time">{{ formatDate(post.created_at) }}</time>
      </div>
    </div>
    <p class="post-caption">{{ post.caption }}</p>
    <div class="post-media-box">
      <img :src="post.image_url" class="post-full-image" loading="lazy" />
    </div>
    <div class="post-interactions">
      <button class="interaction-btn" :class="{ 'liked': post.is_liked }" @click="$emit('like', post.id)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="post.is_liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        {{ post.likes_count }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SocialPost } from '~/types';
import { formatDate } from '~/utils/formatters';

defineProps<{
  post: SocialPost;
  avatar: string | null | undefined;
}>();

defineEmits<{
  (e: 'like', id: number): void;
}>();
</script>

<style scoped>
.glass-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  margin-bottom: 24px;
}

.post-item { padding: 0; overflow: hidden; }
.post-item-header { padding: 16px; display: flex; align-items: center; gap: 12px; }
.small-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.post-author { font-weight: 700; color: #1a202c; }
.post-time { font-size: 12px; color: #a0aec0; display: block; }
.post-caption { padding: 0 16px 12px; font-size: 15px; line-height: 1.5; color: #333; }
.post-media-box { background: #f8fafc; }
.post-full-image { width: 100%; display: block; }
.post-interactions { padding: 12px 16px; display: flex; gap: 20px; }

.interaction-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #718096;
  cursor: pointer;
  font-weight: 600;
}

.interaction-btn.liked { color: #f56565; }
</style>

```


---
### Fichier : frontend\components\social\PostCreator.vue
```text
<template>
  <div class="creator-card glass-card">
    <SocialPostCreatorHeader :avatar="avatar" :caption="caption" @update:caption="$emit('update:caption', $event)" />
    
    <div v-if="preview" class="creator-preview">
      <img :src="preview" class="preview-img" />
      <button class="remove-preview" @click="$emit('removeFile')">×</button>
    </div>

    <div class="creator-footer">
      <button class="btn-icon-label" @click="triggerFileInput">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        Photo
      </button>
      <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="$emit('fileChange', $event)" />
      <button class="btn-primary-glow" :disabled="!hasFile || isSubmitting" @click="$emit('submit')">
        {{ isSubmitting ? 'Publication...' : 'Publier' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ avatar?: string | null; caption: string; preview: string | null; hasFile: boolean; isSubmitting: boolean; }>();
defineEmits(['update:caption', 'fileChange', 'removeFile', 'submit']);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInput.value?.click();
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.creator-preview { position: relative; margin-bottom: 1rem; border-radius: 12px; overflow: hidden; aspect-ratio: 16 / 9; }
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.remove-preview { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; }
.creator-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
.btn-icon-label { display: flex; align-items: center; gap: 8px; background: none; border: none; color: #4a5568; font-weight: 600; cursor: pointer; }
.btn-primary-glow { background: var(--clr-primary-500); color: white; border: none; padding: 8px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 14px rgba(202, 117, 214, 0.4); }
.btn-primary-glow:disabled { opacity: 0.5; }
.hidden { display: none; }
</style>

```


---
### Fichier : frontend\components\social\PostCreatorHeader.vue
```text
<template>
  <div class="creator-header">
    <img :src="avatar || '/default-avatar.png'" class="small-avatar" />
    <textarea 
      :value="caption" 
      placeholder="Quoi de neuf dans votre mission ?" 
      class="creator-input"
      @input="$emit('update:caption', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{ avatar?: string | null; caption: string }>();
defineEmits(['update:caption']);
</script>

<style scoped>
.creator-header { display: flex; gap: 16px; margin-bottom: 16px; }
.small-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.creator-input { flex: 1; border: none; background: #f7fafc; border-radius: 12px; padding: 12px; resize: none; height: 80px; font-family: inherit; }
</style>

```


---
### Fichier : frontend\components\social\ProfileHero.vue
```text
<template>
  <section class="profile-hero">
    <SocialProfileHeroCover :cover-url="profile?.cover_url" @edit="$emit('editCover')" />

    <div class="container hero-content-wrapper">
      <SocialProfileHeroInfo 
        :avatar-url="profile?.avatar_url" 
        :username="username" 
        :status="profile?.status" 
        :friends-count="profile?.friends_count || 0" 
        :posts-count="postsCount" 
        @edit-avatar="$emit('editAvatar')" 
      />

      <div class="hero-actions-group">
        <button class="btn-glass" @click="$emit('editProfile')">Modifier le profil</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Profile } from '~/types';
defineProps<{ profile: Profile | null; username: string | undefined; postsCount: number; }>();
defineEmits(['editCover', 'editAvatar', 'editProfile']);
</script>

<style scoped>
.profile-hero { background: white; border-bottom: 1px solid #e1e8f0; margin-bottom: var(--space-8); }
.hero-content-wrapper { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 20px; position: relative; margin-top: -60px; z-index: 2; }
.btn-glass { background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-glass:hover { background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
</style>

```


---
### Fichier : frontend\components\social\ProfileHeroCover.vue
```text
<template>
  <div class="cover-container" :style="coverStyle" @click="$emit('edit')">
    <div class="cover-overlay">
      <span class="cover-hint">Changer la couverture</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ coverUrl: string | null | undefined }>();
defineEmits(['edit']);
const coverStyle = computed(() => ({
  backgroundImage: props.coverUrl ? `url(${props.coverUrl})` : 'linear-gradient(45deg, #ca75d6, #eec0c6)',
  backgroundSize: 'cover', backgroundPosition: 'center'
}));
</script>

<style scoped>
.cover-container { height: 320px; position: relative; cursor: pointer; overflow: hidden; }
.cover-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.1);
  display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;
}
.cover-container:hover .cover-overlay { opacity: 1; }
.cover-hint { color: white; background: rgba(0,0,0,0.5); padding: 8px 16px; border-radius: 20px; font-size: 14px; }
</style>

```


---
### Fichier : frontend\components\social\ProfileHeroInfo.vue
```text
<template>
  <div class="hero-main-group">
    <div class="avatar-container">
      <img :src="avatarUrl || '/default-avatar.png'" alt="Avatar" class="main-avatar" />
      <button class="avatar-edit-badge" @click="$emit('editAvatar')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </button>
    </div>
    <div class="user-meta-info">
      <div class="name-badge-row">
        <h1 class="user-display-name">{{ username }}</h1>
        <span class="status-pill">{{ status || 'En mission...' }}</span>
      </div>
      <p class="user-stats-summary">
        <strong>{{ friendsCount }}</strong> amis • <strong>{{ postsCount }}</strong> éclats de vie
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ avatarUrl?: string | null; username?: string; status?: string; friendsCount: number; postsCount: number; }>();
defineEmits(['editAvatar']);
</script>

<style scoped>
.hero-main-group { display: flex; align-items: flex-end; gap: 24px; }
.avatar-container { position: relative; width: 160px; height: 160px; }
.main-avatar { width: 100%; height: 100%; border-radius: 50%; border: 6px solid white; object-fit: cover; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.avatar-edit-badge { position: absolute; bottom: 10px; right: 10px; background: var(--clr-primary-500); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.user-meta-info { margin-bottom: 10px; }
.name-badge-row { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.user-display-name { font-family: var(--font-display); font-size: 32px; font-weight: 800; color: #1a202c; }
.status-pill { background: #ebf8ff; color: #2b6cb0; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
.user-stats-summary { color: #718096; font-size: 15px; }
</style>

```


---
### Fichier : frontend\components\social\ProfileRalliements.vue
```text
<template>
  <div class="glass-card requests-view">
    <h2 class="section-title">Ralliements</h2>
    <div v-if="requests.length === 0" class="empty-state">Aucun ralliement en attente.</div>
    <div v-for="req in requests" :key="req.id" class="request-item">
      <span><strong>{{ req.from_user.username }}</strong> veut faire équipe</span>
      <div class="actions">
        <button class="btn-action" @click="$emit('handle', req.id, 'accept')">✔</button>
        <button class="btn-action" @click="$emit('handle', req.id, 'decline')">✘</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FriendRequest } from '~/types';
defineProps<{ requests: FriendRequest[] }>();
defineEmits(['handle']);
</script>

<style scoped>
.requests-view { padding: 2rem; }
.section-title { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1.5rem; }
.request-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f7fafc; border-radius: 12px; margin-bottom: 1rem; }
.empty-state { color: #718096; }
.actions { display: flex; gap: 0.5rem; }
.btn-action { background: white; border: 1px solid #e2e8f0; padding: 5px 10px; border-radius: 8px; cursor: pointer; }
</style>

```


---
### Fichier : frontend\components\social\ProfileTabs.vue
```text
<template>
  <div class="tab-nav-glass">
    <button 
      v-for="t in tabs" 
      :key="t.id" 
      class="tab-link" 
      :class="{ 'tab-link--active': activeTab === t.id }" 
      @click="$emit('update:activeTab', t.id)"
    >
      {{ t.label }}
      <span v-if="t.id === 'requests' && hasRequests" class="notif-dot"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ activeTab: string; hasRequests: boolean }>();
defineEmits(['update:activeTab']);
const tabs = [
  { id: 'posts', label: 'Timeline' },
  { id: 'friends', label: 'Exploration' },
  { id: 'requests', label: 'Ralliements' }
];
</script>

<style scoped>
.tab-nav-glass { display: flex; background: white; padding: 8px; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
.tab-link { flex: 1; border: none; background: none; padding: 12px; border-radius: 12px; font-weight: 600; color: #718096; cursor: pointer; position: relative; }
.tab-link--active { background: #f7fafc; color: var(--clr-primary-600); }
.notif-dot { width: 8px; height: 8px; background: #f56565; border-radius: 50%; position: absolute; top: 10px; right: 20px; }
</style>

```


---
### Fichier : frontend\components\social\SidebarBio.vue
```text
<template>
  <aside class="profile-sidebar-left">
    <SocialSidebarBioMission :points="points" />
    <SocialSidebarBioAbout 
      :bio="bio" 
      :is-editing="isEditing" 
      @start-edit="$emit('startEdit')" 
      @save="$emit('saveBio', $event)" 
    />
    <SocialSidebarBioStatus :status="status" @save="$emit('saveStatus', $event)" />
  </aside>
</template>

<script setup lang="ts">
defineProps<{ points: number; bio: string; status: string; isEditing: boolean; }>();
defineEmits(['startEdit', 'saveBio', 'saveStatus']);
</script>

```


---
### Fichier : frontend\components\social\SidebarBioAbout.vue
```text
<template>
  <div class="glass-card bio-card">
    <h3 class="sidebar-title">À propos</h3>
    <div v-if="!isEditing" class="bio-display">
      <p class="bio-text">{{ bio || "Cet aventurier n'a pas encore écrit sa légende..." }}</p>
      <button class="btn-text-only" @click="$emit('startEdit')">Modifier la bio</button>
    </div>
    <div v-else class="bio-editor">
      <textarea v-model="localBio" class="bio-edit-input" maxlength="500"></textarea>
      <button class="btn-save-mini" @click="$emit('save', localBio)">Enregistrer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ bio: string; isEditing: boolean }>();
const emit = defineEmits(['startEdit', 'save']);
const localBio = ref(props.bio);
watch(() => props.bio, (n) => localBio.value = n);
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.sidebar-title { font-size: 14px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.bio-text { font-size: 14px; line-height: 1.6; color: #4a5568; margin-bottom: 1rem; }
.bio-edit-input { width: 100%; min-height: 100px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; font-family: inherit; margin-bottom: 1rem; }
.btn-text-only { background: none; border: none; color: var(--clr-primary-500); font-weight: 600; font-size: 0.8rem; cursor: pointer; padding: 0; }
.btn-save-mini { background: var(--clr-primary-500); color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; }
</style>

```


---
### Fichier : frontend\components\social\SidebarBioMission.vue
```text
<template>
  <div class="glass-card mission-card">
    <h3 class="sidebar-title">Progression Mission</h3>
    <div class="mission-level">
      <span class="level-label">Niveau {{ level }}</span>
      <span class="points-label">{{ points }} XP</span>
    </div>
    <div class="progress-track">
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>
    <p class="mission-hint">Partagez et interagissez pour monter en grade !</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ points: number }>();
const level = computed(() => Math.floor(props.points / 100) + 1);
const progress = computed(() => props.points % 100);
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.sidebar-title { font-size: 14px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.mission-level { display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; }
.level-label { color: var(--clr-primary-600); }
.points-label { color: #718096; font-size: 13px; }
.progress-track { height: 8px; background: #edf2f7; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
.progress-bar { height: 100%; background: linear-gradient(90deg, var(--clr-primary-400), var(--clr-primary-600)); transition: width 0.5s ease-out; }
.mission-hint { font-size: 12px; color: #a0aec0; font-style: italic; }
</style>

```


---
### Fichier : frontend\components\social\SidebarBioStatus.vue
```text
<template>
  <div class="glass-card status-card">
    <h3 class="sidebar-title">Humeur du moment</h3>
    <input 
      v-model="localStatus" 
      class="status-input" 
      placeholder="Quelle est votre vibe ?"
      @blur="$emit('save', localStatus)"
      @keyup.enter="$emit('save', localStatus)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ status: string }>();
const emit = defineEmits(['save']);
const localStatus = ref(props.status);
watch(() => props.status, (n) => localStatus.value = n);
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.sidebar-title { font-size: 14px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.status-input { width: 100%; border: none; background: #f7fafc; padding: 8px 12px; border-radius: 8px; font-size: 14px; }
</style>

```


---
### Fichier : frontend\components\stars\CelestialInfo.vue
```text
<template>
  <div class="celestial-info glass-card">
    <header class="info-header">
      <span class="type-badge">{{ body.type }}</span>
      <h2>{{ body.name }}</h2>
    </header>

    <div class="info-grid">
      <div class="info-item">
        <span class="label">Magnitude</span>
        <span class="value">{{ body.magnitude }}</span>
      </div>
      <div class="info-item" v-if="body.distance">
        <span class="label">Distance</span>
        <span class="value">{{ body.distance }}</span>
      </div>
      <div class="info-item" v-if="body.constellation">
        <span class="label">Constellation</span>
        <span class="value">{{ body.constellation }}</span>
      </div>
    </div>

    <p class="description" v-if="description">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { CelestialBody } from '~/types';

const props = defineProps<{
  body: CelestialBody;
}>();

const description = computed(() => {
  if (props.body.name === 'Sirius') return "L'étoile la plus brillante du ciel nocturne. Également connue sous le nom de l'étoile du Chien.";
  if (props.body.name === 'Vega') return "Une étoile blanche éclatante dans la constellation de la Lyre. Très brillante dans l'hémisphère nord.";
  return "Un astre lointain qui veille sur vos bivouacs.";
});
</script>

<style scoped>
.celestial-info { padding: 1.5rem; color: #4a5568; }
.info-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
.type-badge { font-size: 0.7rem; background: #edf2f7; padding: 2px 8px; border-radius: 4px; font-weight: 800; text-transform: uppercase; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.info-item { display: flex; flex-direction: column; }
.label { font-size: 0.7rem; color: #a0aec0; text-transform: uppercase; }
.value { font-weight: 700; }
.description { font-size: 0.9rem; line-height: 1.5; font-style: italic; }
</style>

```


---
### Fichier : frontend\components\stars\SkyMap.vue
```text
<template>
  <div class="sky-map-container glass-card">
    <svg 
      viewBox="0 0 500 500" 
      class="sky-svg"
      @mousemove="handleMouseMove"
      @mouseleave="hoveredBody = null"
    >
      <!-- Background Sky -->
      <circle cx="250" cy="250" r="240" class="sky-bg" />
      
      <!-- Stars -->
      <g v-for="(star, i) in stars" :key="i">
        <circle 
          :cx="star.x" 
          :cy="star.y" 
          :r="star.r" 
          class="star"
          :class="{ 'is-hovered': hoveredBody?.name === star.name }"
          @click="$emit('select', star)"
          @mouseenter="hoveredBody = star"
        />
        <!-- Constellation Lines (Simulated) -->
        <line v-if="star.connectTo" 
          :x1="star.x" :y1="star.y" 
          :x2="star.connectTo.x" :y2="star.connectTo.y" 
          class="constellation-line" 
        />
      </g>

      <!-- Overlay Info on Hover -->
      <foreignObject v-if="hoveredBody" :x="hoveredBody.x + 10" :y="hoveredBody.y + 10" width="150" height="60">
        <div class="hover-tooltip">
          <strong>{{ hoveredBody.name }}</strong>
          <span>Mag: {{ hoveredBody.magnitude }}</span>
        </div>
      </foreignObject>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CelestialBody } from '~/types';

const props = defineProps<{
  stars: any[]; // Extended CelestialBody with x, y, r for SVG
}>();

defineEmits(['select']);

const hoveredBody = ref<any | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  // Logic could go here for interactive parallax if needed
};
</script>

<style scoped>
.sky-map-container { background: #0b1026; padding: 1rem; border-radius: 50%; overflow: hidden; border: 4px solid #1a2040; }
.sky-svg { width: 100%; height: auto; cursor: crosshair; }
.sky-bg { fill: #0b1026; }
.star { fill: white; cursor: pointer; transition: all 0.2s; filter: blur(0.5px); }
.star:hover, .star.is-hovered { fill: #fff700; r: 4; filter: drop-shadow(0 0 5px #fff700); }
.constellation-line { stroke: rgba(255,255,255,0.1); stroke-width: 1; stroke-dasharray: 2; }
.hover-tooltip { background: rgba(0,0,0,0.8); color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; display: flex; flex-direction: column; pointer-events: none; border: 1px solid rgba(255,255,255,0.2); }
</style>

```


---
### Fichier : frontend\components\wishlist\WishlistCard.vue
```text
<template>
  <div class="wishlist-card glass-card" :class="{ 'is-favorite': item.is_favorite }">
    <div class="card-header">
      <span class="initiator-badge" :class="item.initiator.toLowerCase()">
        {{ initiatorLabel }}
      </span>
      <button class="favorite-btn" @click="$emit('update', { is_favorite: !item.is_favorite })">
        {{ item.is_favorite ? '❤️' : '🤍' }}
      </button>
    </div>

    <h3 class="item-title">{{ item.title }}</h3>
    
    <div class="item-meta">
      <span class="status-pill" :class="item.status.toLowerCase()">
        {{ statusLabel }}
      </span>
      <span v-if="item.price" class="price">{{ item.price }}€</span>
    </div>

    <div class="card-footer">
      <a v-if="item.link" :href="item.link" target="_blank" class="link-btn">Voir le lien</a>
      <div class="actions">
        <button class="action-btn edit" @click="$emit('edit', item)">✏️</button>
        <button class="action-btn delete" @click="$emit('delete')">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '~/types';

const props = defineProps<{
  item: WishlistItem;
}>();

defineEmits(['update', 'delete', 'edit']);

const initiatorLabel = computed(() => {
  const map = { 'ANTOINE': 'Antoine', 'AMANI': 'Amani', 'BOTH': 'Ensemble' };
  return map[props.item.initiator];
});

const statusLabel = computed(() => {
  const map = { 'IDEA': 'Idée', 'IN_PROGRESS': 'En cours', 'DONE': 'Réalisé' };
  return map[props.item.status];
});
</script>

<style scoped>
.wishlist-card {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: relative;
  transition: transform var(--transition-normal);
}

.wishlist-card:hover {
  transform: translateY(-5px);
}

.is-favorite {
  border: 2px solid var(--clr-primary-400);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.initiator-badge {
  font-size: var(--text-xs);
  font-weight: var(--fw-bold);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.initiator-badge.antoine { background: #ebf8ff; color: #2b6cb0; }
.initiator-badge.amani { background: #fff0f9; color: #c40e75; }
.initiator-badge.both { background: #f3e5f5; color: #ca75d6; }

.item-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--clr-neutral-900);
}

.status-pill {
  font-size: var(--text-xs);
  padding: 4px 8px;
  border-radius: var(--radius-md);
}

.status-pill.idea { background: var(--clr-neutral-100); color: var(--clr-neutral-600); }
.status-pill.in_progress { background: #fffaf0; color: #b7791f; }
.status-pill.done { background: var(--clr-success-light); color: var(--clr-success-dark); }

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-btn {
  font-size: var(--text-xs);
  color: var(--clr-primary-500);
  font-weight: var(--fw-bold);
  text-decoration: underline;
}

.favorite-btn, .action-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>

```


---
### Fichier : frontend\components\wishlist\WishlistFilters.vue
```text
<template>
  <div class="wishlist-filters glass-card">
    <div class="filter-group">
      <label>Statut</label>
      <select :value="status" @change="$emit('update:status', ($event.target as HTMLSelectElement).value)">
        <option value="">Tous</option>
        <option value="IDEA">Idée</option>
        <option value="IN_PROGRESS">En cours</option>
        <option value="DONE">Réalisé</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Initiateur</label>
      <select :value="initiator" @change="$emit('update:initiator', ($event.target as HTMLSelectElement).value)">
        <option value="">Tous</option>
        <option value="BOTH">Ensemble</option>
        <option value="ANTOINE">Antoine</option>
        <option value="AMANI">Amani</option>
      </select>
    </div>

    <div class="filter-group checkbox">
      <label>
        <input type="checkbox" :checked="favoritesOnly" @change="$emit('update:favoritesOnly', ($event.target as HTMLInputElement).checked)" />
        Coups de cœur ❤️
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string;
  initiator: string;
  favoritesOnly: boolean;
}>();

defineEmits(['update:status', 'update:initiator', 'update:favoritesOnly']);
</script>

<style scoped>
.wishlist-filters {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group.checkbox {
  flex-direction: row;
  align-items: center;
  margin-top: 1.2rem;
}

.filter-group label {
  font-size: var(--text-xs);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-500);
  text-transform: uppercase;
}

select {
  padding: 8px 12px;
  border: 1px solid var(--clr-neutral-200);
  border-radius: var(--radius-md);
  background: white;
}
</style>

```


---
### Fichier : frontend\components\wishlist\WishlistForm.vue
```text
<template>
  <div class="wishlist-form-overlay" @click.self="$emit('close')">
    <div class="wishlist-form card glass-card">
      <h2 class="form-title">{{ isEdit ? 'Modifier' : 'Ajouter' }} une envie</h2>
      
      <form @submit.prevent="$emit('submit', localItem)">
        <div class="form-group">
          <label>Titre</label>
          <input v-model="localItem.title" type="text" required placeholder="Ex: Voyage au Japon" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Qui ?</label>
            <select v-model="localItem.initiator">
              <option value="BOTH">Ensemble</option>
              <option value="ANTOINE">Antoine</option>
              <option value="AMANI">Amani</option>
            </select>
          </div>
          <div class="form-group">
            <label>Statut</label>
            <select v-model="localItem.status">
              <option value="IDEA">Idée</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Réalisé</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Prix estimé</label>
            <input v-model.number="localItem.price" type="number" step="0.01" placeholder="0.00" />
          </div>
          <div class="form-group checkbox-group">
            <label>
              <input v-model="localItem.is_favorite" type="checkbox" />
              Coup de cœur ❤️
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Lien (URL)</label>
          <input v-model="localItem.link" type="url" placeholder="https://..." />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Annuler</button>
          <button type="submit" class="btn-primary">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '~/types';

const props = defineProps<{
  item: Partial<WishlistItem>;
  isEdit: boolean;
}>();

const emit = defineEmits(['submit', 'close']);

const localItem = ref({ ...props.item });
</script>

<style scoped>
.wishlist-form-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.wishlist-form { width: 90%; max-width: 500px; padding: 2rem; }
.form-title { font-family: var(--font-display); margin-bottom: 1.5rem; text-align: center; }
.form-group { display: flex; flex-direction: column; gap: 4px; margin-bottom: 1rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group label { font-size: 0.8rem; font-weight: 800; color: #718096; }
input, select { padding: 10px; border: 1px solid #edf2f7; border-radius: 8px; }
.checkbox-group { justify-content: center; }
.form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
.btn-primary { flex: 1; background: #1a1a1a; color: white; padding: 10px; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; }
.btn-secondary { flex: 1; background: #edf2f7; color: #4a5568; padding: 10px; border: none; border-radius: 8px; cursor: pointer; }
</style>

```


---
### Fichier : frontend\components\wishlist\WishlistGrid.vue
```text
<template>
  <div class="wishlist-grid">
    <div v-if="items.length === 0" class="empty-state">
      <div class="empty-icon">✨</div>
      <p>Aucune idée pour le moment. Lançons un projet !</p>
    </div>
    <div v-else class="grid-container">
      <WishlistCard 
        v-for="item in items" 
        :key="item.id" 
        :item="item" 
        @update="$emit('update', item.id, $event)"
        @delete="$emit('delete', item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '~/types';

defineProps<{
  items: WishlistItem[];
}>();

defineEmits<{
  (e: 'update', id: number, data: Partial<WishlistItem>): void;
  (e: 'delete', id: number): void;
}>();
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

.empty-state {
  text-align: center;
  padding: var(--space-20) 0;
  color: var(--clr-neutral-400);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}
</style>

```


---
### Fichier : frontend\composables\useAuth.ts
```text
import { ref, computed } from 'vue';
import type { User, AuthResponse } from '~/types';

export const useAuth = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const user = useState<User | null>('auth_user', () => null);
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  });

  const isAuthenticated = computed(() => !!token.value);

  const register = async (username: string, password: string, email: string = '') => {
    try {
      const response = await $fetch<AuthResponse>(`${apiBase}/auth/register/`, {
        method: 'POST',
        body: { username, password, email }
      });
      token.value = response.token;
      user.value = response.user;
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.data?.error || 'Erreur lors de l\'inscription' };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch<AuthResponse>(`${apiBase}/auth/login/`, {
        method: 'POST',
        body: { username, password }
      });
      token.value = response.token;
      user.value = response.user;
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.data?.error || 'Identifiants invalides' };
    }
  };

  const logout = async () => {
    if (token.value) {
      try {
        await $fetch(`${apiBase}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token.value}`
          }
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    token.value = null;
    user.value = null;
    navigateTo('/login');
  };

  const fetchUser = async () => {
    if (!token.value) return;
    try {
      const data = await $fetch<User>(`${apiBase}/auth/me/`, {
        headers: {
          'Authorization': `Token ${token.value}`
        }
      });
      user.value = data;
    } catch (err) {
      token.value = null;
      user.value = null;
    }
  };

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser
  };
};

```


---
### Fichier : frontend\composables\useCalendar.ts
```text
import { ref, computed } from 'vue';
import type { MSOEvent } from '~/types';

export const useCalendar = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const events = ref<MSOEvent[]>([]);
  const isLoading = ref(false);

  const fetchEvents = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<MSOEvent[]>(`${apiBase}/agenda/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      events.value = data;
    } catch (err) {
      console.error('Calendar load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createEvent = async (eventData: Partial<MSOEvent>) => {
    try {
      await $fetch(`${apiBase}/agenda/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: eventData
      });
      await fetchEvents();
      return true;
    } catch (err) {
      console.error('Calendar create error:', err);
      return false;
    }
  };

  return {
    events: readonly(events),
    isLoading,
    fetchEvents,
    createEvent
  };
};

```


---
### Fichier : frontend\composables\useCinema.ts
```text
import { ref, computed } from 'vue';
import type { Movie } from '~/types';

export const useCinema = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const movies = ref<Movie[]>([]);
  const isFetching = ref(false);
  const isSubmitting = ref(false);

  const sortedMovies = computed(() => {
    return [...movies.value].sort((a, b) => 
      new Date(b.date_seen).getTime() - new Date(a.date_seen).getTime()
    );
  });

  const fetchMovies = async () => {
    isFetching.value = true;
    try {
      const data = await $fetch<Movie[]>(`${apiBase}/cinema/movies/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      movies.value = data;
    } catch (err) {
      console.error('Erreur lors du chargement des films:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const createMovie = async (movieData: any) => {
    isSubmitting.value = true;
    const formData = new FormData();
    Object.entries(movieData).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as string | Blob);
    });

    try {
      await $fetch(`${apiBase}/cinema/movies/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: formData
      });
      await fetchMovies();
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'ajout du film:', err);
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    movies: readonly(movies),
    sortedMovies,
    isFetching,
    isSubmitting,
    fetchMovies,
    createMovie
  };
};

```


---
### Fichier : frontend\composables\useGames.ts
```text
import { ref, computed } from 'vue';
import type { GameType, GameSession, ScoreboardStats } from '~/types';

export const useGames = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const sessions = ref<GameSession[]>([]);
  const gameTypes = ref<GameType[]>([]);
  const stats = ref<ScoreboardStats | null>(null);
  const isFetching = ref(false);
  const isSubmitting = ref(false);

  const fetchAllData = async () => {
    isFetching.value = true;
    try {
      const headers = { Authorization: `Token ${token.value}` };
      const [typesData, sessionsData, statsData] = await Promise.all([
        $fetch<GameType[]>(`${apiBase}/games/types/`, { headers }),
        $fetch<GameSession[]>(`${apiBase}/games/sessions/`, { headers }),
        $fetch<ScoreboardStats>(`${apiBase}/games/stats/`, { headers })
      ]);
      gameTypes.value = typesData;
      sessions.value = sessionsData;
      stats.value = statsData;
    } catch (err) {
      console.error('Erreur lors du chargement des données de jeux:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const createSession = async (sessionData: any) => {
    isSubmitting.value = true;
    try {
      await $fetch(`${apiBase}/games/sessions/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: sessionData
      });
      await fetchAllData();
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la session:', err);
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    sessions: readonly(sessions),
    gameTypes: readonly(gameTypes),
    stats: readonly(stats),
    isFetching,
    isSubmitting,
    fetchAllData,
    createSession
  };
};

```


---
### Fichier : frontend\composables\useHome.ts
```text
import { ref, onMounted } from 'vue';
import type { Photo } from '~/types';

export const useHome = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();
  const memories = ref<Photo[]>([]);
  const isLoading = ref(false);

  const fetchMemories = async () => {
    if (!token.value) return;
    isLoading.value = true;
    try {
      const data = await $fetch<Photo[]>(`${apiBase}/photos/memories/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      memories.value = data;
    } catch (err) {
      console.error('Memories load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    memories: readonly(memories),
    isLoading,
    fetchMemories
  };
};

```


---
### Fichier : frontend\composables\usePhotos.ts
```text
import { ref, computed } from 'vue';
import type { Photo, AsyncStatus } from '~/types';

export const usePhotos = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const photos = ref<Photo[]>([]);
  const fetchStatus = ref<AsyncStatus>('idle');
  const submitStatus = ref<AsyncStatus>('idle');
  const fetchError = ref<string | null>(null);

  const authHeaders = computed(() => token.value ? { 'Authorization': `Token ${token.value}` } : {});
  const isLoading = computed(() => fetchStatus.value === 'loading');
  const isSubmitting = computed(() => submitStatus.value === 'loading');
  const hasPhotos = computed(() => photos.value.length > 0);
  const totalPhotos = computed(() => photos.value.length);

  const fetchPhotos = async () => {
    fetchStatus.value = 'loading'; fetchError.value = null;
    try {
      photos.value = await $fetch<Photo[]>(`${apiBase}/photos/`, { headers: authHeaders.value });
      fetchStatus.value = 'success';
    } catch (err: any) {
      fetchStatus.value = 'error'; fetchError.value = "Erreur archive."; console.error(err);
    }
  };

  const createPhoto = async (formData: FormData) => {
    submitStatus.value = 'loading';
    try {
      await $fetch(`${apiBase}/photos/`, { method: 'POST', headers: authHeaders.value, body: formData });
      submitStatus.value = 'success';
      await fetchPhotos();
      return true;
    } catch (err: any) {
      submitStatus.value = 'error'; return false;
    }
  };

  const deletePhoto = async (id: number) => {
    try {
      await $fetch(`${apiBase}/photos/${id}/`, { method: 'DELETE', headers: authHeaders.value });
      photos.value = photos.value.filter(p => p.id !== id);
      return true;
    } catch (err: any) { return false; }
  };

  return { photos, totalPhotos, fetchStatus, submitStatus, fetchError, isLoading, isSubmitting, hasPhotos, fetchPhotos, createPhoto, deletePhoto };
};

```


---
### Fichier : frontend\composables\usePhotosForm.ts
```text
import { ref, computed } from 'vue';
import type { PhotoFormState, PhotoFormErrors } from '~/types';

export const usePhotosForm = () => {
  const formState = ref<PhotoFormState>({
    titre: '', description: '', fichier: null, apercu: null
  });

  const formErrors = ref<PhotoFormErrors>({
    titre: '', fichier: '', description: '', global: ''
  });

  const isFormValid = computed(() => {
    return formState.value.titre.trim().length > 0 && formState.value.fichier !== null;
  });

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      formErrors.value.fichier = "L'image est trop lourde (max 10 Mo).";
      return;
    }

    formState.value.fichier = file;
    formState.value.apercu = URL.createObjectURL(file);
    formErrors.value.fichier = '';
  };

  const resetForm = () => {
    if (formState.value.apercu) URL.revokeObjectURL(formState.value.apercu);
    formState.value = { titre: '', description: '', fichier: null, apercu: null };
    formErrors.value = { titre: '', fichier: '', description: '', global: '' };
  };

  return { formState, formErrors, isFormValid, handleFileChange, resetForm };
};

```


---
### Fichier : frontend\composables\useSocial.ts
```text
import { ref } from 'vue';
import type { Profile, AsyncStatus } from '~/types';

export const useSocial = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const token = useCookie<string | null>('auth_token');

  const profile = ref<Profile | null>(null);
  const status = ref<AsyncStatus>('idle');

  const fetchProfile = async () => {
    try {
      profile.value = await $fetch<Profile>(`${apiBase}/social/profile/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
    } catch (err) { console.error(err); }
  };

  const updateProfile = async (formData: FormData) => {
    try {
      profile.value = await $fetch<Profile>(`${apiBase}/social/profile/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: formData
      });
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const { posts, fetchPosts, createPost, likePost } = useSocialPosts(apiBase, token);
  const { friendRequests, users, fetchUsers, sendFriendRequest, fetchFriendRequests, handleFriendRequest: handleRequest } = useSocialFriends(apiBase, token);

  const handleFriendRequest = async (id: number, action: 'accept' | 'decline') => {
    if (await handleRequest(id, action)) await fetchProfile();
  };

  return {
    profile: readonly(profile), posts, friendRequests, users, status,
    fetchProfile, updateProfile, fetchPosts, createPost, likePost,
    fetchUsers, sendFriendRequest, fetchFriendRequests, handleFriendRequest
  };
};

```


---
### Fichier : frontend\composables\useSocialFriends.ts
```text
import { ref } from 'vue';
import type { FriendRequest, User } from '~/types';

export const useSocialFriends = (apiBase: string, token: any) => {
  const friendRequests = ref<FriendRequest[]>([]);
  const users = ref<User[]>([]);

  const fetchUsers = async () => {
    try {
      users.value = await $fetch<User[]>(`${apiBase}/social/users/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
    } catch (err) { console.error(err); }
  };

  const sendFriendRequest = async (userId: number) => {
    try {
      await $fetch(`${apiBase}/social/friends/requests/send/${userId}/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }
      });
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const fetchFriendRequests = async () => {
    try {
      friendRequests.value = await $fetch<FriendRequest[]>(`${apiBase}/social/friends/requests/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
    } catch (err) { console.error(err); }
  };

  const handleFriendRequest = async (requestId: number, action: 'accept' | 'decline') => {
    try {
      await $fetch(`${apiBase}/social/friends/requests/${requestId}/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: { action }
      });
      await fetchFriendRequests();
      return true;
    } catch (err) { console.error(err); return false; }
  };

  return { friendRequests: readonly(friendRequests), users: readonly(users), fetchUsers, sendFriendRequest, fetchFriendRequests, handleFriendRequest };
};

```


---
### Fichier : frontend\composables\useSocialPosts.ts
```text
import { ref } from 'vue';
import type { SocialPost } from '~/types';

export const useSocialPosts = (apiBase: string, token: any) => {
  const posts = ref<SocialPost[]>([]);

  const fetchPosts = async (username?: string) => {
    try {
      let url = `${apiBase}/social/posts/`;
      if (username) url += `?username=${username}`;
      posts.value = await $fetch<SocialPost[]>(url, {
        headers: { Authorization: `Token ${token.value}` }
      });
    } catch (err) { console.error(err); }
  };

  const createPost = async (formData: FormData) => {
    try {
      await $fetch(`${apiBase}/social/posts/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: formData
      });
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const likePost = async (id: number) => {
    try {
      const data = await $fetch<{ liked: boolean }>(`${apiBase}/social/posts/${id}/like/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }
      });
      const post = posts.value.find(p => p.id === id);
      if (post) {
        post.is_liked = data.liked;
        post.likes_count += data.liked ? 1 : -1;
      }
    } catch (err) { console.error(err); }
  };

  return { posts: readonly(posts), fetchPosts, createPost, likePost };
};

```


---
### Fichier : frontend\composables\useStars.ts
```text
import { ref } from 'vue';
import type { StargazingSpot, CelestialBody } from '~/types';

export const useStars = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const spots = ref<StargazingSpot[]>([]);
  const isLoading = ref(false);

  const fetchSpots = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<StargazingSpot[]>(`${apiBase}/stargazing/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      spots.value = data;
    } catch (err) {
      console.error('Stars load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const saveSpot = async (spotData: Partial<StargazingSpot>) => {
    try {
      await $fetch(`${apiBase}/stargazing/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: spotData
      });
      await fetchSpots();
      return true;
    } catch (err) {
      console.error('Spot save error:', err);
      return false;
    }
  };

  // Mock data for stars if no API is available immediately
  const getVisibleStars = (lat: number, lon: number, date: string) => {
    return [
      { name: 'Sirius', type: 'Star', magnitude: -1.46, distance: '8.6 ly', constellation: 'Canis Major' },
      { name: 'Canopus', type: 'Star', magnitude: -0.74, distance: '310 ly', constellation: 'Carina' },
      { name: 'Rigel Kentaurus', type: 'Star', magnitude: -0.27, distance: '4.4 ly', constellation: 'Centaurus' },
      { name: 'Arcturus', type: 'Star', magnitude: -0.05, distance: '37 ly', constellation: 'Boötes' },
      { name: 'Vega', type: 'Star', magnitude: 0.03, distance: '25 ly', constellation: 'Lyra' },
    ];
  };

  return {
    spots: readonly(spots),
    isLoading,
    fetchSpots,
    saveSpot,
    getVisibleStars
  };
};

```


---
### Fichier : frontend\composables\useWishlist.ts
```text
import { ref, computed } from 'vue';
import type { WishlistItem, WishlistStatus, WishlistInitiator } from '~/types';

export const useWishlist = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const items = ref<WishlistItem[]>([]);
  const isLoading = ref(false);

  const fetchItems = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<WishlistItem[]>(`${apiBase}/wishlist/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      items.value = data;
    } catch (err) {
      console.error('Wishlist load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createItem = async (itemData: Partial<WishlistItem>) => {
    try {
      await $fetch(`${apiBase}/wishlist/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: itemData
      });
      await fetchItems();
      return true;
    } catch (err) {
      console.error('Wishlist create error:', err);
      return false;
    }
  };

  const updateItem = async (id: number, itemData: Partial<WishlistItem>) => {
    try {
      await $fetch(`${apiBase}/wishlist/${id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Token ${token.value}` },
        body: itemData
      });
      await fetchItems();
      return true;
    } catch (err) {
      console.error('Wishlist update error:', err);
      return false;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await $fetch(`${apiBase}/wishlist/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token.value}` }
      });
      items.value = items.value.filter(i => i.id !== id);
      return true;
    } catch (err) {
      console.error('Wishlist delete error:', err);
      return false;
    }
  };

  return {
    items: readonly(items),
    isLoading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};

```


---
### Fichier : frontend\layouts\default.vue
```text
<template>
  <div class="app-layout">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <footer class="main-footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Mission Save Our 20s. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.main-footer {
  padding-block: var(--space-8);
  border-top: 1px solid var(--clr-neutral-200);
  background: var(--clr-neutral-0);
  text-align: center;
  color: var(--clr-neutral-500);
  font-size: var(--text-sm);
}
</style>

```


---
### Fichier : frontend\middleware\auth.global.ts
```text
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  // Liste des routes publiques qui ne nécessitent pas d'être connecté
  const publicRoutes = ['/', '/login', '/register'];

  // 1. Rediriger vers /login si l'utilisateur n'est pas authentifié et essaie d'accéder à une route privée
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }

  // 2. Rediriger vers l'accueil si l'utilisateur est déjà authentifié et essaie d'aller sur login/register
  // Note : On ne redirige PAS si on est sur '/' pour éviter la boucle infinie
  const authRoutes = ['/login', '/register'];
  if (isAuthenticated.value && authRoutes.includes(to.path)) {
    return navigateTo('/');
  }
});

```


---
### Fichier : frontend\pages\albumPhoto.vue
```text
<template>
  <div class="mso-album">
    <div class="mso-scrapbook-bg"></div>
    <header class="mso-album__header container">
      <div class="header-text">
        <h1 class="mso-title-fancy">L'Archive Visuelle</h1>
        <p class="mso-subtitle"><span class="pulse-dot"></span>{{ totalPhotos }} éclats de vie sauvegardés</p>
      </div>
      <button type="button" class="mso-btn-add" :class="{ 'mso-btn-add--active': showForm }" @click="showForm = !showForm">
        <span class="icon">{{ showForm ? '×' : '+' }}</span>
        <span class="label">{{ showForm ? 'Annuler' : 'Fixer un moment' }}</span>
      </button>
    </header>

    <div class="container mso-album__body">
      <Transition name="scrapbook-slide">
        <AlbumPhotoUploadForm
          v-if="showForm" :form-state="formState" :form-errors="formErrors"
          :is-submitting="isSubmitting" :is-form-valid="isFormValid"
          @submit="handleSubmit" @file-change="handleFileChange" @remove-file="resetForm" @drop="handleDrop"
        />
      </Transition>

      <div v-if="isLoading" class="mso-loader">
        <div v-for="n in 4" :key="n" class="skeleton-polaroid"></div>
      </div>
      <AlbumPhotoGrid v-else-if="hasPhotos" :photos="photos" @delete="confirmDelete" />
      <div v-else class="mso-empty"><h2>La muraille est encore nue.</h2></div>
    </div>

    <Transition name="fade">
      <div v-if="photoToDelete" class="mso-dialog-overlay" @click.self="photoToDelete = null">
        <div class="mso-dialog glass-card">
          <h3>Effacer ce souvenir ?</h3>
          <p>La brique "<strong>{{ photoToDelete.titre }}</strong>" sera retirée à jamais.</p>
          <div class="mso-dialog__actions">
            <button class="btn-cancel" @click="photoToDelete = null">Annuler</button>
            <button class="btn-danger" @click="handleDelete">Supprimer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { Photo } from '~/types';

const { photos, totalPhotos, isLoading, isSubmitting, hasPhotos, fetchPhotos, createPhoto, deletePhoto } = usePhotos();
const { formState, formErrors, isFormValid, handleFileChange, resetForm } = usePhotosForm();

const showForm = ref(false);
const photoToDelete = ref<Photo | null>(null);

const handleDrop = (file: File) => {
  const event = { target: { files: [file] } } as any;
  handleFileChange(event);
};

const handleSubmit = async () => {
  const fd = new FormData();
  fd.append('titre', formState.value.titre);
  fd.append('description', formState.value.description);
  if (formState.value.fichier) fd.append('image', formState.value.fichier);
  
  if (await createPhoto(fd)) {
    showForm.value = false; resetForm();
    await nextTick(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const confirmDelete = (p: Photo) => photoToDelete.value = p;
const handleDelete = async () => {
  if (photoToDelete.value && await deletePhoto(photoToDelete.value.id)) photoToDelete.value = null;
};

onMounted(fetchPhotos);
useSeoMeta({ title: 'Album Photo — MSO20s' });
</script>

<style scoped>
.mso-album { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; position: relative; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.mso-album__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
.mso-title-fancy { font-family: var(--font-display); font-size: clamp(2.5rem, 8vw, 4rem); color: var(--clr-neutral-900); line-height: 0.9; letter-spacing: -2px; }
.mso-subtitle { color: var(--clr-primary-500); font-weight: 700; display: flex; align-items: center; gap: 10px; margin-top: 1rem; }
.pulse-dot { width: 8px; height: 8px; background: var(--clr-primary-500); border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.4; } 100% { transform: scale(1); opacity: 1; } }
.mso-btn-add { background: #1a1a1a; color: white; border: none; padding: 10px 24px; border-radius: 50px; font-weight: 800; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.mso-btn-add:hover { transform: translateY(-3px) rotate(1deg); background: var(--clr-primary-500); }
.mso-btn-add--active { background: #ff4d4d; }
.mso-dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; }
.mso-dialog { max-width: 400px; padding: 2.5rem; text-align: center; }
.mso-dialog__actions { display: flex; gap: 1rem; margin-top: 2rem; }
.btn-cancel { flex: 1; padding: 0.8rem; border-radius: 10px; border: 1px solid #ddd; background: none; cursor: pointer; }
.btn-danger { flex: 1; padding: 0.8rem; border-radius: 10px; border: none; background: #ff4d4d; color: white; font-weight: 800; cursor: pointer; }
@media (max-width: 768px) { .mso-album__header { flex-direction: column; align-items: center; text-align: center; gap: 2rem; } }
</style>

```


---
### Fichier : frontend\pages\amani.vue
```text
<template>
  <div class="mso-scrapbook mso-scrapbook--amani">
    <div class="mso-scrapbook-bg"></div>
    
    <div class="mso-stickers" aria-hidden="true">
      <span v-for="i in 5" :key="i" class="mso-sticker" :style="getStickerStyle(i)">🌸</span>
    </div>

    <div class="container scrapbook-container">
      <header class="scrapbook-header">
        <div class="mso-mission-badge">
          <span class="mso-mission-badge__pulse"></span>
          Espace Réservé : Amani
        </div>
        <h1 class="scrapbook-title">Le Jardin d'Amani 🌷</h1>
      </header>

      <div class="scrapbook-grid">
        <AmaniProfileMain />
        <AmaniProfileStats :points="profile?.points || 0" />
      </div>

      <footer class="scrapbook-footer">
        <NuxtLink to="/profile" class="btn-text">Modifier mon profil →</NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSocial } from '~/composables/useSocial';

const { profile, fetchProfile } = useSocial();

const getStickerStyle = (index: number) => ({
  top: `${20 + index * 15}%`,
  left: `${10 + (index % 2) * 70}%`,
  transform: `rotate(${(index * 45) % 360}deg)`,
  fontSize: '2.5rem',
  opacity: 0.4
});

onMounted(fetchProfile);

useSeoMeta({
  title: 'Espace Amani — MSO20s',
  description: 'Le carnet de bord personnel d\'Amani.'
});
</script>

<style scoped>
.mso-scrapbook--amani { background-color: #fff0f9; min-height: 100vh; padding-top: calc(var(--header-height) + 4rem); }
.scrapbook-container { max-width: 900px; position: relative; z-index: 10; }
.scrapbook-header { text-align: center; margin-bottom: 4rem; }
.scrapbook-title { font-family: var(--font-display); font-size: 4rem; color: #c40e75; margin-top: 1.5rem; }
.scrapbook-grid { display: grid; grid-template-columns: 1fr 300px; gap: 3rem; }
.scrapbook-footer { margin-top: 5rem; text-align: center; }
.mso-mission-badge { background: #ca75d6; color: white; padding: 8px 20px; border-radius: 50px; font-size: 0.75rem; font-weight: 900; display: inline-flex; align-items: center; gap: 10px; }
.mso-mission-badge__pulse { width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@media (max-width: 800px) { .scrapbook-grid { grid-template-columns: 1fr; } .scrapbook-title { font-size: 2.5rem; } }
</style>

```


---
### Fichier : frontend\pages\antoine.vue
```text
<template>
  <div class="mso-scrapbook mso-scrapbook--antoine">
    <div class="mso-scrapbook-bg"></div>
    
    <div class="mso-stickers" aria-hidden="true">
      <span v-for="i in 5" :key="i" class="mso-sticker" :style="getStickerStyle(i)">🛡️</span>
    </div>

    <div class="container scrapbook-container">
      <header class="scrapbook-header">
        <div class="mso-mission-badge">
          <span class="mso-mission-badge__pulse"></span>
          Zone de Données : Antoine
        </div>
        <h1 class="scrapbook-title">L'Avant-poste Lyonnais 🏔️</h1>
      </header>

      <div class="scrapbook-grid">
        <AntoineProfileStats :points="profile?.points || 0" />
        <AntoineProfileMain />
      </div>

      <footer class="scrapbook-footer">
        <NuxtLink to="/profile" class="btn-text">Accéder aux paramètres système →</NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSocial } from '~/composables/useSocial';

const { profile, fetchProfile } = useSocial();

const getStickerStyle = (index: number) => ({
  top: `${15 + index * 18}%`,
  left: `${5 + (index % 2) * 80}%`,
  transform: `rotate(${(index * 30) % 360}deg)`,
  fontSize: '2.5rem',
  opacity: 0.4
});

onMounted(fetchProfile);

useSeoMeta({
  title: 'Espace Antoine — MSO20s',
  description: 'Le centre de contrôle d\'Antoine.'
});
</script>

<style scoped>
.mso-scrapbook--antoine { background-color: #f4fafe; min-height: 100vh; padding-top: calc(var(--header-height) + 4rem); }
.scrapbook-container { max-width: 900px; position: relative; z-index: 10; }
.scrapbook-header { text-align: center; margin-bottom: 4rem; }
.scrapbook-title { font-family: var(--font-display); font-size: 4rem; color: #1d4ed8; margin-top: 1.5rem; }
.scrapbook-grid { display: grid; grid-template-columns: 300px 1fr; gap: 3rem; }
.scrapbook-footer { margin-top: 5rem; text-align: center; }
.mso-mission-badge { background: #3b82f6; color: white; padding: 8px 20px; border-radius: 50px; font-size: 0.75rem; font-weight: 900; display: inline-flex; align-items: center; gap: 10px; }
.mso-mission-badge__pulse { width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@media (max-width: 800px) { .scrapbook-grid { grid-template-columns: 1fr; } .scrapbook-grid aside { order: 2; } .scrapbook-title { font-size: 2.5rem; } }
</style>

```


---
### Fichier : frontend\pages\calendrier.vue
```text
<template>
  <div class="calendar-page">
    <div class="mso-scrapbook-bg"></div>

    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Notre Agenda 📅</h1>
        <p class="page-subtitle">Nos rendez-vous et moments clés.</p>
      </div>
    </header>

    <div class="container main-content">
      <AgendaCalendarGrid 
        :events="events"
        @day-click="handleDayClick"
      />
    </div>

    <AgendaEventModal 
      v-if="selectedDate"
      :date="selectedDate"
      :events="selectedEvents"
      :is-past="isPast(selectedDate)"
      @close="selectedDate = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCalendar } from '~/composables/useCalendar';
import type { MSOEvent } from '~/types';

const { events, fetchEvents } = useCalendar();

const selectedDate = ref<Date | null>(null);

const selectedEvents = computed(() => {
  if (!selectedDate.value) return [];
  const dStr = selectedDate.value.toISOString().split('T')[0];
  return events.value.filter(e => e.date === dStr);
});

const handleDayClick = (date: Date) => {
  selectedDate.value = date;
};

const isPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

onMounted(fetchEvents);

useSeoMeta({ title: 'Agenda — MSO20s' });
</script>

<style scoped>
.calendar-page { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.page-header { margin-bottom: 3rem; text-align: center; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; margin-top: 0.5rem; }
</style>

```


---
### Fichier : frontend\pages\carte.vue
```text
<template>
  <div class="mso-carte">
    <div class="mso-scrapbook-bg"></div>
    
    <div class="carte-layout">
      <!-- Presentation: list of localized photos -->
      <CartePhotoJournal 
        :photos="localizedPhotos"
        :photo-count="localizedPhotos.length"
        @focus-photo="handleFocus"
      />

      <!-- Presentation: The Map -->
      <CarteInteractiveMap
        ref="mapComponent"
        :photos="localizedPhotos"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Photo } from '~/types';

const { photos, fetchPhotos } = usePhotos();
const localizedPhotos = computed(() => photos.value.filter(p => p.latitude && p.longitude));

const mapComponent = ref();

const handleFocus = (photo: Photo) => {
  mapComponent.value?.focusOn(photo);
};

onMounted(fetchPhotos);

useSeoMeta({
  title: 'Notre Carte — Mission Save Our 20s',
  description: 'Visualisez chaque brique de notre muraille contre le temps.'
});
</script>

<style scoped>
.mso-carte {
  height: 100vh;
  padding-top: var(--header-height);
  overflow: hidden;
}

.mso-scrapbook-bg {
  position: fixed;
  inset: 0;
  background-color: #ffffff;
  background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px);
  background-size: 30px 30px;
  z-index: -1;
}

.carte-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  height: 100%;
}

@media (max-width: 900px) {
  .carte-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
  }
}
</style>

```


---
### Fichier : frontend\pages\cinema.vue
```text
<template>
  <div class="cinema-page">
    <div class="mso-scrapbook-bg"></div>
    <CinemaHeader :show-form="showAddForm" @toggle="showAddForm = !showAddForm" />

    <div class="container main-content">
      <Transition name="slide-fade">
        <CinemaMovieForm v-if="showAddForm" v-model="newMovie" :is-submitting="isSubmitting" @submit="handleAddMovie" />
      </Transition>
      <div class="movies-timeline">
        <CinemaMovieCard v-for="movie in sortedMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCinema } from '~/composables/useCinema';
const { sortedMovies, isSubmitting, fetchMovies, createMovie } = useCinema();
const showAddForm = ref(false);
const newMovie = ref({ title: '', date_seen: new Date().toISOString().substr(0, 10), poster: null as File | null, antoine_review: '', antoine_rating: 0, amani_review: '', amani_rating: 0 });
const handleAddMovie = async () => { if (await createMovie(newMovie.value)) { showAddForm.value = false; resetForm(); } };
const resetForm = () => { newMovie.value = { title: '', date_seen: new Date().toISOString().substr(0, 10), poster: null, antoine_review: '', antoine_rating: 0, amani_review: '', amani_rating: 0 }; };
onMounted(fetchMovies);
useSeoMeta({ title: 'Ciné-Journal — MSO20s' });
</script>

<style scoped>
.cinema-page { min-height: 100vh; padding-top: calc(var(--header-height) + 2rem); padding-bottom: 4rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d611 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.movies-timeline { display: flex; flex-direction: column; gap: 3rem; }
.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-20px); opacity: 0; }
</style>

```


---
### Fichier : frontend\pages\etoiles.vue
```text
<template>
  <div class="stars-page">
    <div class="mso-scrapbook-bg"></div>

    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Voûte Céleste 🌌</h1>
        <p class="page-subtitle">Nos nuits étoilées, du bivouac à la fenêtre.</p>
      </div>
    </header>

    <div class="container main-content grid-layout">
      <div class="map-section">
        <StarsSkyMap :stars="skyStars" @select="selectedBody = $event" />
        <div class="map-actions">
          <button @click="generateNewSky" class="btn-refresh">🔄 Rafraîchir le ciel</button>
        </div>
      </div>

      <aside class="info-section">
        <StarsCelestialInfo v-if="selectedBody" :body="selectedBody" />
        <div v-else class="info-placeholder glass-card">
          <p>Cliquez sur une étoile pour découvrir ses secrets...</p>
        </div>

        <div class="location-card glass-card">
          <h3>Localisation</h3>
          <p>📍 Annecy, France</p>
          <p>⏰ {{ new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CelestialBody } from '~/types';

const selectedBody = ref<CelestialBody | null>(null);
const skyStars = ref<any[]>([]);

const generateNewSky = () => {
  const stars = [
    { name: 'Sirius', x: 100, y: 150, r: 4, type: 'Étoile', magnitude: -1.46, distance: '8.6 ly', constellation: 'Canis Major' },
    { name: 'Vega', x: 350, y: 100, r: 3.5, type: 'Étoile', magnitude: 0.03, distance: '25 ly', constellation: 'Lyra' },
    { name: 'Betelgeuse', x: 120, y: 380, r: 3.8, type: 'Supergéante Rouge', magnitude: 0.42, distance: '640 ly', constellation: 'Orion' },
    { name: 'Altair', x: 400, y: 250, r: 3, type: 'Étoile', magnitude: 0.77, distance: '16.7 ly', constellation: 'Aquila' },
    { name: 'Deneb', x: 280, y: 80, r: 3.2, type: 'Étoile', magnitude: 1.25, distance: '2600 ly', constellation: 'Cygnus' },
  ];

  // Add random background stars
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 400 + 50;
    const y = Math.random() * 400 + 50;
    const dist = Math.sqrt((x - 250) ** 2 + (y - 250) ** 2);
    if (dist < 235) {
      stars.push({
        name: `Astre ${Math.floor(Math.random() * 9000)}`,
        x, y, r: Math.random() * 1.5 + 0.5,
        type: 'Étoile lointaine',
        magnitude: Math.random() * 5 + 2,
        distance: `${Math.floor(Math.random() * 5000)} ly`
      });
    }
  }
  skyStars.value = stars;
};

onMounted(generateNewSky);

useSeoMeta({ title: 'Ciel Étoilé — MSO20s' });
</script>

<style scoped>
.stars-page { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; background: #050814; color: white; }
.mso-scrapbook-bg { position: fixed; inset: 0; background: #050814; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 50px 50px; z-index: -1; }
.page-header { margin-bottom: 4rem; text-align: center; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: white; }
.page-subtitle { color: #ca75d6; font-weight: 700; }
.grid-layout { display: grid; grid-template-columns: 1fr 350px; gap: 4rem; align-items: start; }
.map-actions { margin-top: 2rem; text-align: center; }
.btn-refresh { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px 20px; border-radius: 50px; cursor: pointer; font-size: 0.8rem; font-weight: 700; transition: all 0.3s; }
.btn-refresh:hover { background: rgba(255,255,255,0.2); }
.info-section { display: flex; flex-direction: column; gap: 2rem; }
.info-placeholder { padding: 2rem; text-align: center; color: #a0aec0; font-style: italic; }
.location-card { padding: 1.5rem; }
.location-card h3 { font-size: 0.8rem; text-transform: uppercase; color: #ca75d6; margin-bottom: 10px; }
@media (max-width: 900px) { .grid-layout { grid-template-columns: 1fr; } }
</style>

```


---
### Fichier : frontend\pages\index.vue
```text
<template>
  <main class="mso-scrapbook">
    <HomeFloatingStickers />
    <HomeHero>
      <HomeJournalCard />
      <HomeFlashback :memories="memories" />
      
      <div class="mso-quick-links">
        <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link-card glass-card">
          <span class="icon">{{ link.icon }}</span>
          <span>{{ link.label }}</span>
        </NuxtLink>
      </div>

      <footer class="mso-footer">
        <p>Archive intime & secrète — MSO20s v4.0</p>
        <div class="mso-footer__names">Amani & Antoine</div>
      </footer>
    </HomeHero>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useHome } from '~/composables/useHome';
const { memories, fetchMemories } = useHome();

const quickLinks = [
  { to: '/wishlist', label: 'Wishlist', icon: '📝' },
  { to: '/calendrier', label: 'Agenda', icon: '📅' },
  { to: '/etoiles', label: 'Étoiles', icon: '🌌' }
];

onMounted(fetchMemories);
useSeoMeta({ title: 'Mission Save Our 20s — Notre Histoire' });
</script>

<style scoped>
.mso-scrapbook {
  min-height: 100vh; background-color: #ffffff;
  background-image: radial-gradient(#ca75d622 1px, transparent 1px),
    linear-gradient(to right, #f9f9f9 1px, transparent 1px),
    linear-gradient(to bottom, #f9f9f9 1px, transparent 1px);
  background-size: 24px 24px, 48px 48px, 48px 48px;
  position: relative; overflow: hidden; display: flex; align-items: center;
  padding-top: calc(var(--header-height) + 4rem); padding-bottom: 6rem;
}
.mso-quick-links {
  display: flex; gap: 1rem; justify-content: center; margin-top: 3rem; flex-wrap: wrap;
}
.quick-link-card {
  display: flex; align-items: center; gap: 10px; padding: 12px 24px;
  text-decoration: none; color: var(--clr-neutral-700); font-weight: 700;
  transition: all 0.3s;
}
.quick-link-card:hover { transform: translateY(-3px); color: var(--clr-primary-500); }
.mso-footer { margin-top: 6rem; text-align: center; color: #bbb; font-size: 0.9rem; }
.mso-footer__names { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #eee; margin-top: 1rem; letter-spacing: 2px; }
</style>

```


---
### Fichier : frontend\pages\jeux.vue
```text
<template>
  <div class="games-page">
    <div class="mso-scrapbook-bg"></div>
    <GamesHeader :show-form="showAddForm" @toggle-form="showAddForm = !showAddForm" />

    <div class="container main-content">
      <GamesStatsSummary :stats="stats" />
      <Transition name="slide-fade">
        <GamesSessionForm v-if="showAddForm" v-model="newSession" :game-types="gameTypes" :is-submitting="isSubmitting" @submit="handleAddSession" />
      </Transition>
      <GamesSessionTimeline :sessions="sessions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGames } from '~/composables/useGames';
const { sessions, gameTypes, stats, isSubmitting, fetchAllData, createSession } = useGames();
const showAddForm = ref(false);
const newSession = ref({ game_type: null as number | null, date: new Date().toISOString().substr(0, 10), amani_score: 0, antoine_score: 0, location: '', notes: '' });
const handleAddSession = async () => { if (await createSession(newSession.value)) { showAddForm.value = false; resetForm(); } };
const resetForm = () => { newSession.value = { game_type: gameTypes.value[0]?.id || null, date: new Date().toISOString().substr(0, 10), amani_score: 0, antoine_score: 0, location: '', notes: '' }; };
onMounted(fetchAllData);
useSeoMeta({ title: 'Scoreboard — MSO20s' });
</script>

<style scoped>
.games-page { min-height: 100vh; padding-top: calc(var(--header-height) + 2rem); padding-bottom: 4rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d611 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-20px); opacity: 0; }
</style>

```


---
### Fichier : frontend\pages\login.vue
```text
<template>
  <div class="auth-page">
    <AuthLoginCard v-model="form" :loading="loading" :error="error" @submit="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { login } = useAuth();
const router = useRouter();
const form = ref({ username: '', password: '' });
const loading = ref(false);
const error = ref('');

async function handleLogin() {
  loading.value = true; error.value = '';
  const result = await login(form.value.username, form.value.password);
  if (result.success) router.push('/');
  else error.value = result.error || 'Erreur connexion';
  loading.value = false;
}
definePageMeta({ layout: 'default' });
</script>

<style scoped>
.auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: var(--space-4); }
</style>

```


---
### Fichier : frontend\pages\profile.vue
```text
<template>
  <div class="social-profile-view">
    <SocialProfileHero 
      :profile="profile" :username="user?.username" :posts-count="posts.length"
      @edit-cover="triggerInput(coverInput)" @edit-avatar="triggerInput(avatarInput)" @edit-profile="activeTab = 'info'"
    />
    <input ref="coverInput" type="file" class="hidden" accept="image/*" @change="onFileChange($event, 'cover_image')" />
    <input ref="avatarInput" type="file" class="hidden" accept="image/*" @change="onFileChange($event, 'avatar')" />

    <div class="container profile-grid-layout">
      <SocialSidebarBio 
        :points="profile?.points || 0" :bio="profile?.bio || ''" :status="profile?.status || ''"
        :is-editing="isEditingBio" @start-edit="isEditingBio = true" @save-bio="save('bio', $event)" @save-status="save('status', $event)"
      />

      <main class="profile-main-content">
        <SocialProfileTabs v-model:activeTab="activeTab" :has-requests="friendRequests.length > 0" />

        <div class="tab-content-area">
          <Transition name="fade-slide" mode="out-in">
            <div v-if="activeTab === 'posts'" key="posts" class="posts-timeline">
              <SocialPostCreator v-model:caption="newPostCaption" :avatar="profile?.avatar_url" :preview="newPostPreview" :has-file="!!newPostFile" :is-submitting="isSubmittingPost" @file-change="onPostFile" @remove-file="clearPostFile" @submit="submitPost" />
              <div class="posts-list"><SocialPostCard v-for="p in posts" :key="p.id" :post="p" :avatar="profile?.avatar_url" @like="likePost" /></div>
            </div>
            <div v-else-if="activeTab === 'friends'" key="friends" class="glass-card explorer-view"><h2 class="section-title">Exploration</h2><div v-for="u in users" :key="u.id" class="user-item"><span>{{ u.username }}</span><button class="btn-mini-add" @click="sendFriendRequest(u.id)">Rejoindre</button></div></div>
            <SocialProfileRalliements v-else-if="activeTab === 'requests'" key="requests" :requests="friendRequests" @handle="handleFriendRequest" />
          </Transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { user } = useAuth();
const { profile, posts, friendRequests, users, fetchProfile, updateProfile, fetchPosts, createPost, likePost, sendFriendRequest, fetchFriendRequests, handleFriendRequest, fetchUsers } = useSocial();
const activeTab = ref('posts'); const isEditingBio = ref(false); const coverInput = ref<HTMLInputElement>(); const avatarInput = ref<HTMLInputElement>();
const newPostCaption = ref(''); const newPostFile = ref<File | null>(null); const newPostPreview = ref<string | null>(null); const isSubmittingPost = ref(false);

onMounted(() => Promise.all([fetchProfile(), fetchPosts(user.value?.username), fetchFriendRequests(), fetchUsers()]));

const triggerInput = (el?: HTMLInputElement) => el?.click();
const onFileChange = (e: Event, key: string) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) { const fd = new FormData(); fd.append(key, file); updateProfile(fd); }
};
const save = async (key: string, val: string) => { const fd = new FormData(); fd.append(key, val); await updateProfile(fd); isEditingBio.value = false; };
const onPostFile = (e: Event) => { const file = (e.target as HTMLInputElement).files?.[0]; if (file) { newPostFile.value = file; newPostPreview.value = URL.createObjectURL(file); } };
const clearPostFile = () => { newPostFile.value = null; newPostPreview.value = null; };
const submitPost = async () => {
  if (!newPostFile.value) return; isSubmittingPost.value = true;
  const fd = new FormData(); fd.append('image', newPostFile.value); fd.append('caption', newPostCaption.value);
  if (await createPost(fd)) { newPostCaption.value = ''; clearPostFile(); if (profile.value) profile.value.points += 10; }
  isSubmittingPost.value = false;
};
</script>

<style scoped>
.social-profile-view { min-height: 100vh; background: #f8faff; padding-bottom: 4rem; }
.profile-grid-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; }
.hidden { display: none; }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
.user-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f7fafc; border-radius: 12px; margin-bottom: 1rem; }
.section-title { font-family: var(--font-display); font-size: 1.5rem; padding: 2rem 2rem 1rem; }
@media (max-width: 900px) { .profile-grid-layout { grid-template-columns: 1fr; } }
</style>

```


---
### Fichier : frontend\pages\register.vue
```text
<template>
  <div class="auth-page">
    <AuthRegisterCard v-model="form" :loading="loading" :error="error" @submit="handleRegister" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { register } = useAuth();
const router = useRouter();
const form = ref({ username: '', email: '', password: '' });
const loading = ref(false);
const error = ref('');

async function handleRegister() {
  loading.value = true; error.value = '';
  const result = await register(form.value.username, form.value.password, form.value.email);
  if (result.success) router.push('/');
  else error.value = result.error || 'Erreur inscription';
  loading.value = false;
}
definePageMeta({ layout: 'default' });
</script>

<style scoped>
.auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: var(--space-4); }
</style>

```


---
### Fichier : frontend\pages\wishlist.vue
```text
<template>
  <div class="wishlist-page">
    <div class="mso-scrapbook-bg"></div>

    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Notre Wishlist 📝</h1>
        <p class="page-subtitle">Toutes ces choses qu'on veut vivre ensemble.</p>
      </div>
      <button @click="openCreateForm" class="btn-add">Ajouter une envie</button>
    </header>

    <div class="container main-content">
      <WishlistFilters 
        v-model:status="filterStatus"
        v-model:initiator="filterInitiator"
        v-model:favoritesOnly="filterFavorites"
      />

      <WishlistGrid 
        :items="filteredItems"
        @update="handleUpdate"
        @delete="handleDelete"
        @edit="openEditForm"
      />
    </div>

    <WishlistForm 
      v-if="showForm"
      :item="editingItem"
      :is-edit="!!editingItem.id"
      @close="closeForm"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { WishlistItem } from '~/types';

const { items, fetchItems, createItem, updateItem, deleteItem } = useWishlist();

const filterStatus = ref('');
const filterInitiator = ref('');
const filterFavorites = ref(false);
const showForm = ref(false);
const editingItem = ref<Partial<WishlistItem>>({});

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchStatus = !filterStatus.value || item.status === filterStatus.value;
    const matchInitiator = !filterInitiator.value || item.initiator === filterInitiator.value;
    const matchFavorite = !filterFavorites.value || item.is_favorite;
    return matchStatus && matchInitiator && matchFavorite;
  });
});

const openCreateForm = () => {
  editingItem.value = { status: 'IDEA', initiator: 'BOTH', is_favorite: false };
  showForm.value = true;
};

const openEditForm = (item: WishlistItem) => {
  editingItem.value = { ...item };
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  editingItem.value = {};
};

const handleSubmit = async (itemData: Partial<WishlistItem>) => {
  if (itemData.id) {
    await updateItem(itemData.id, itemData);
  } else {
    await createItem(itemData);
  }
  closeForm();
};

const handleUpdate = async (id: number, data: Partial<WishlistItem>) => {
  await updateItem(id, data);
};

const handleDelete = async (id: number) => {
  if (confirm('Supprimer cette envie ?')) {
    await deleteItem(id);
  }
};

onMounted(fetchItems);

useSeoMeta({ title: 'Wishlist — MSO20s' });
</script>

<style scoped>
.wishlist-page { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); letter-spacing: -1px; }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; margin-top: 0.5rem; }
.btn-add { background: #1a1a1a; color: white; border: none; padding: 10px 24px; border-radius: 50px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
.btn-add:hover { background: #ca75d6; transform: translateY(-2px); }
</style>

```


---
### Fichier : frontend\plugins\pl.ts
```text
export default defineNuxtPlugin(() => {})

```


---
### Fichier : frontend\public\robots.txt
```text
User-Agent: *
Disallow:

```


---
### Fichier : frontend\server\s.vue
```text

```


---
### Fichier : frontend\types\agenda.ts
```text
export interface MSOEvent {
    id: number;
    title: string;
    date: string;
    description?: string;
    location?: string;
    created_at: string;
}

```


---
### Fichier : frontend\types\auth.ts
```text
export interface User { id: number; username: string; email: string; }
export interface AuthResponse { token: string; user: User; }

```


---
### Fichier : frontend\types\cinema.ts
```text
export interface Movie {
  id: number; title: string; poster_url: string | null; date_seen: string;
  antoine_review: string; antoine_rating: number | null;
  amani_review: string; amani_rating: number | null;
  created_at: string; added_by_username: string;
}

```


---
### Fichier : frontend\types\games.ts
```text
export interface GameType { id: number; name: string; icon: string; }
export interface GameSession {
  id: number; game_type: number; game_type_name: string; game_type_icon: string;
  date: string; amani_score: number; antoine_score: number; location: string;
  notes: string; winner: string; created_at: string;
}
export interface ScoreboardStats {
  overall: { amani_wins: number; antoine_wins: number; draws: number; };
  by_game: { game_type: string; icon: string; amani_wins: number; antoine_wins: number; total: number; }[];
}

```


---
### Fichier : frontend\types\index.ts
```text
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
export * from './auth';
export * from './social';
export * from './photos';
export * from './games';
export * from './cinema';
export * from './wishlist';
export * from './agenda';
export * from './stars';

```


---
### Fichier : frontend\types\photos.ts
```text
export interface Photo {
  id: number; author_name: string | null; titre: string;
  description: string | null; image_url: string;
  latitude: number | null; longitude: number | null; date_creation: string;
}

export interface PhotoFormState { titre: string; description: string; fichier: File | null; apercu: string | null; }
export interface PhotoFormErrors { titre: string; fichier: string; description: string; global: string; }

```


---
### Fichier : frontend\types\social.ts
```text
import { User } from './auth';

export interface Profile {
  id: number; user: User; bio: string; status: string;
  avatar_url: string | null; cover_url: string | null;
  friends_count: number; points: number;
}

export interface SocialPost {
  id: number; author: User; image: string; image_url: string;
  caption: string; created_at: string; likes_count: number; is_liked: boolean;
}

export interface FriendRequest {
  id: number; from_user: User; to_user: User; created_at: string; accepted: boolean;
}

```


---
### Fichier : frontend\types\stars.ts
```text
export interface StargazingSpot {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    date?: string;
    notes?: string;
    created_at: string;
}

export interface CelestialBody {
    name: string;
    type: string;
    magnitude: number;
    distance?: string;
    constellation?: string;
}

```


---
### Fichier : frontend\types\wishlist.ts
```text
export type WishlistStatus = 'IDEA' | 'IN_PROGRESS' | 'DONE';
export type WishlistInitiator = 'ANTOINE' | 'AMANI' | 'BOTH';

export interface WishlistItem {
    id: number;
    title: string;
    status: WishlistStatus;
    initiator: WishlistInitiator;
    link?: string;
    price?: number;
    is_favorite: boolean;
    created_at: string;
}

```


---
### Fichier : frontend\utils\formatters.ts
```text
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

```
