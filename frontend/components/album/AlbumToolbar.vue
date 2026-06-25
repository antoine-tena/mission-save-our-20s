<template>
  <div v-if="page" class="album-toolbar glass-card">
    <div class="toolbar-section">
      <span class="ctrl-label whitespace-nowrap">Mise en page :</span>
      <div class="toolbar-actions">
        <!-- Layout Type toggles -->
        <button 
          type="button" 
          class="utility-btn icon-only" 
          :class="{ 'active': page.layout_type === 'text-only' }"
          title="Passer en mode texte seul"
          @click="toggleTextOnly"
        >
          <Icon name="lucide:align-left" />
        </button>

        <button 
          type="button" 
          class="utility-btn icon-only" 
          title="Ajouter/Modifier un Titre de Page"
          @click="injectTitle"
        >
          <Icon name="lucide:heading" />
        </button>

        <!-- Photos count adjuster -->
        <div v-if="page.layout_type !== 'text-only'" class="counter-box">
          <button type="button" class="btn-counter" :disabled="slotsCount <= 1" @click="adjustSlots(-1)">-</button>
          <span class="count-val">{{ slotsCount }} <Icon name="lucide:image" class="inline-icon" /></span>
          <button type="button" class="btn-counter" :disabled="slotsCount >= 10" @click="adjustSlots(1)">+</button>
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
          />
          
          <div class="hex-picker-wrapper">
            <button type="button" class="color-btn hex-rainbow-btn" title="Couleur personnalisée (HEX)" @click="triggerHexPicker"/>
            <input ref="hexInput" type="color" :value="page.background_color || '#ffffff'" class="hidden-color-input" @input="onHexColorInput" >
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
          :disabled="!getPhotoAtSlot(sIdx - 1)"
          :title="getPhotoAtSlot(sIdx - 1) ? `Écrire une légende pour la photo ${sIdx}` : `Ajoutez une photo au slot ${sIdx} d'abord`"
          @click="editCaptionForSlot(sIdx - 1)"
        >
          <Icon name="lucide:message-square-plus" /> S{{ sIdx }}
        </button>
      </div>
    </div>

    <div class="toolbar-section actions-section">
      <!-- Color propagation utilities -->
      <button type="button" class="utility-btn" title="Appliquer cette couleur à TOUTES les pages" @click="applyColorToAll">
        <Icon name="lucide:palette" /><span>Tout</span>
      </button>
      <button type="button" class="utility-btn" title="Sélectionner les pages à colorer" @click="showPropagateModal = true">
        <Icon name="lucide:copy" /><span>Sélect.</span>
      </button>

      <!-- Page Delete Button -->
      <button type="button" class="btn-delete-page" title="Supprimer cette page" @click="removePage">
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