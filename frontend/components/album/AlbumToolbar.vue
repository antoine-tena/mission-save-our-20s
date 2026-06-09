<template>
  <div class="album-toolbar glass-card" v-if="page">
    <div class="toolbar-section">
      <span class="ctrl-label whitespace-nowrap">Mise en page :</span>
      <div class="toolbar-actions">
        <!-- Layout Type toggles -->
        <button 
          type="button" 
          class="utility-btn icon-only" 
          :class="{ 'active': page.layout_type === 'text-only' }"
          @click="toggleTextOnly"
          title="Passer en mode texte seul"
        >
          <Icon name="lucide:align-left" />
        </button>

        <button 
          type="button" 
          class="utility-btn icon-only" 
          @click="injectTitle"
          title="Ajouter/Modifier un Titre de Page"
        >
          <Icon name="lucide:heading" />
        </button>

        <!-- Photos count adjuster -->
        <div class="counter-box" v-if="page.layout_type !== 'text-only'">
          <button type="button" class="btn-counter" @click="adjustSlots(-1)" :disabled="slotsCount <= 1">-</button>
          <span class="count-val">{{ slotsCount }} <Icon name="lucide:image" class="inline-icon" /></span>
          <button type="button" class="btn-counter" @click="adjustSlots(1)" :disabled="slotsCount >= 10">+</button>
        </div>
      </div>
    </div>

    <div class="toolbar-section">
      <span class="ctrl-label whitespace-nowrap">Design :</span>
      <div class="toolbar-actions">
        <!-- Background color picker -->
        <div class="color-selector">
          <button 
            v-for="c in ['#ffffff', '#faf6ee', '#eef3fa', '#f8edf5', '#f1f8ed']" 
            :key="c" 
            type="button" 
            class="color-btn"
            :style="{ backgroundColor: c }"
            :class="{ 'active': page.background_color === c }"
            @click="updateColor(c)"
          ></button>
          
          <div class="hex-picker-wrapper">
            <button type="button" class="color-btn hex-rainbow-btn" @click="triggerHexPicker" title="Couleur personnalisée (HEX)"></button>
            <input ref="hexInput" type="color" :value="page.background_color || '#ffffff'" class="hidden-color-input" @input="onHexColorInput" />
          </div>
        </div>

        <!-- Modern Lucide Icons Stamps Picker -->
        <div class="icon-selector-box">
          <button 
            v-for="ic in ['lucide:heart', 'lucide:camera', 'lucide:sparkles', 'lucide:plane', 'lucide:sun', 'lucide:tent']" 
            :key="ic" 
            type="button" 
            class="icon-stamp-btn"
            :class="{ 'active': page.sticker === ic }"
            @click="updateIcon(ic)"
          >
            <Icon :name="ic" />
          </button>
          <button v-if="page.sticker" type="button" class="btn-clear-stamp" @click="updateIcon(null)">×</button>
        </div>
      </div>
    </div>

    <div class="toolbar-section">
      <span class="ctrl-label whitespace-nowrap">Légendes :</span>
      <div class="toolbar-actions">
        <button 
          v-for="sIdx in slotsCount" 
          :key="'cap-' + sIdx"
          type="button"
          class="utility-btn small-btn"
          @click="editCaptionForSlot(sIdx - 1)"
          :disabled="!getPhotoAtSlot(sIdx - 1)"
          :title="getPhotoAtSlot(sIdx - 1) ? `Écrire une légende pour la photo ${sIdx}` : `Ajoutez une photo au slot ${sIdx} d'abord`"
        >
          <Icon name="lucide:message-square-plus" /> S{{ sIdx }}
        </button>
      </div>
    </div>

    <div class="toolbar-section actions-section">
      <!-- Color propagation utilities -->
      <button type="button" class="utility-btn" @click="applyColorToAll" title="Appliquer cette couleur à TOUTES les pages">
        <Icon name="lucide:palette" /><span>Tout</span>
      </button>
      <button type="button" class="utility-btn" @click="showPropagateModal = true" title="Sélectionner les pages à colorer">
        <Icon name="lucide:copy" /><span>Sélect.</span>
      </button>

      <!-- Page Delete Button -->
      <button type="button" class="btn-delete-page" @click="removePage" title="Supprimer cette page">
        <Icon name="lucide:trash" />
      </button>
    </div>

    <!-- Modals -->
    <AlbumColorPropagationModal 
      v-if="showPropagateModal" 
      :page-id="page.id" 
      :color="page.background_color || '#ffffff'" 
      @close="showPropagateModal = false"
    />

    <AlbumCaptionModal
      :is-open="editingCaptionSlot !== null"
      :photo="editingCaptionPhoto"
      :slot-idx="editingCaptionSlot ?? 0"
      :album-id="page.album"
      @close="closeCaptionModal"
      @saved="onCaptionSaved"
    />

  </div>
</template>

<script setup lang="ts">
import { useAlbumToolbarLogic } from '~/composables/useAlbumToolbarLogic';

const props = defineProps<{ page: any; }>();

const {
  hexInput, showPropagateModal, editingCaptionSlot, editingCaptionPhoto,
  getPhotoAtSlot, slotsCount, adjustSlots, toggleTextOnly, injectTitle,
  updateColor, triggerHexPicker, onHexColorInput, updateIcon, applyColorToAll,
  removePage, editCaptionForSlot, closeCaptionModal, onCaptionSaved
} = useAlbumToolbarLogic(props);
</script>

<style scoped>
@import '~/assets/css/album-toolbar.css';
</style>