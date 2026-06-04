<template>
  <div class="album-page">
    <!-- ─── En-tête de page ──────────────────────────────────────────── -->
    <div class="album-page__header">
      <div class="container">
        <div class="page-title-group">
          <div class="page-title-group__icon" aria-hidden="true">📸</div>
          <div>
            <h1 class="page-title-group__title">Notre Album Photo</h1>
            <p class="page-title-group__subtitle">
              {{ totalPhotos }}
              {{ totalPhotos === 1 ? "photo partagée" : "photos partagées" }}
            </p>
          </div>
        </div>

        <!-- Bouton toggle du formulaire -->
        <button
          type="button"
          class="btn-add-photo"
          :class="{ 'btn-add-photo--open': showForm }"
          :aria-expanded="showForm"
          aria-controls="form-add-photo"
          @click="showForm = !showForm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="btn-add-photo__icon"
            width="18"
            height="18"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span>{{ showForm ? "Annuler" : "Ajouter une photo" }}</span>
        </button>
      </div>
    </div>

    <div class="container album-page__body">
      <!-- ─── Formulaire d'ajout ─────────────────────────────────────── -->
      <Transition name="form-slide">
        <section
          v-if="showForm"
          id="form-add-photo"
          class="add-photo-form-wrapper"
          aria-label="Formulaire d'ajout de photo"
        >
          <form
            class="add-photo-form"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <h2 class="add-photo-form__title">Ajouter une photo</h2>

            <!-- Zone de drop / upload ───────────────────────────────── -->
            <div
              class="upload-zone"
              :class="{
                'upload-zone--dragging': isDragging,
                'upload-zone--filled': !!formState.apercu,
                'upload-zone--error': !!formErrors.fichier,
              }"
              role="button"
              tabindex="0"
              aria-label="Zone d'upload de photo — cliquez ou déposez un fichier"
              @click="triggerFileInput"
              @keydown.enter.space.prevent="triggerFileInput"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
            >
              <!-- Aperçu de l'image sélectionnée -->
              <Transition name="fade">
                <div v-if="formState.apercu" class="upload-zone__preview">
                  <img
                    :src="formState.apercu"
                    alt="Aperçu de l'image sélectionnée"
                    class="upload-zone__preview-img"
                  />
                  <button
                    type="button"
                    class="upload-zone__remove-btn"
                    aria-label="Supprimer l'image sélectionnée"
                    @click.stop="removeSelectedFile"
                  >
                    ×
                  </button>
                </div>

                <!-- Placeholder -->
                <div v-else class="upload-zone__placeholder">
                  <div class="upload-zone__icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      width="48"
                      height="48"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <p class="upload-zone__label">
                    <strong>Cliquez</strong> ou glissez-déposez une image
                  </p>
                  <p class="upload-zone__hint">
                    JPG, PNG, GIF, WEBP — 10 Mo maximum
                  </p>
                </div>
              </Transition>

              <!-- Input file masqué -->
              <input
                ref="fileInputRef"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                class="upload-zone__input"
                aria-hidden="true"
                tabindex="-1"
                @change="handleFileChange"
              />
            </div>

            <!-- Message d'erreur fichier -->
            <Transition name="error-slide">
              <p
                v-if="formErrors.fichier"
                class="form-error"
                role="alert"
                aria-live="polite"
              >
                {{ formErrors.fichier }}
              </p>
            </Transition>

            <!-- Champ titre ─────────────────────────────────────────── -->
            <div class="form-field" :class="{ 'form-field--error': !!formErrors.titre }">
              <label class="form-field__label" for="photo-titre">
                Titre
                <span class="form-field__required" aria-hidden="true">*</span>
              </label>
              <div class="form-field__input-wrapper">
                <input
                  id="photo-titre"
                  v-model.trim="formState.titre"
                  type="text"
                  class="form-field__input"
                  placeholder="Un titre mémorable…"
                  maxlength="255"
                  autocomplete="off"
                  :aria-describedby="formErrors.titre ? 'error-titre' : undefined"
                  :aria-invalid="!!formErrors.titre"
                  @input="clearFieldError('titre')"
                />
                <span class="form-field__counter" aria-hidden="true">
                  {{ formState.titre.length }}/255
                </span>
              </div>
              <Transition name="error-slide">
                <p
                  v-if="formErrors.titre"
                  id="error-titre"
                  class="form-error"
                  role="alert"
                >
                  {{ formErrors.titre }}
                </p>
              </Transition>
            </div>

            <!-- Champ description ───────────────────────────────────── -->
            <div class="form-field">
              <label class="form-field__label" for="photo-description">
                Description
                <span class="form-field__optional">(optionnel)</span>
              </label>
              <textarea
                id="photo-description"
                v-model.trim="formState.description"
                class="form-field__textarea"
                placeholder="Décrivez ce moment…"
                rows="3"
                autocomplete="off"
              />
            </div>

            <!-- Erreur globale ──────────────────────────────────────── -->
            <Transition name="error-slide">
              <div
                v-if="formErrors.global"
                class="form-alert form-alert--error"
                role="alert"
                aria-live="assertive"
              >
                <span aria-hidden="true">⚠️</span>
                {{ formErrors.global }}
              </div>
            </Transition>

            <!-- Succès ─────────────────────────────────────────────── -->
            <Transition name="error-slide">
              <div
                v-if="submitStatus === 'success'"
                class="form-alert form-alert--success"
                role="status"
                aria-live="polite"
              >
                <span aria-hidden="true">✅</span>
                Photo ajoutée avec succès !
              </div>
            </Transition>

            <!-- Bouton de soumission ────────────────────────────────── -->
            <button
              type="submit"
              class="btn-submit"
              :disabled="isSubmitting || !isFormValid"
              :aria-busy="isSubmitting"
            >
              <Transition name="fade" mode="out-in">
                <span v-if="isSubmitting" key="loading" class="btn-submit__loader">
                  <span class="spinner" aria-hidden="true" />
                  Envoi en cours…
                </span>
                <span v-else key="idle">
                  Publier la photo
                </span>
              </Transition>
            </button>
          </form>
        </section>
      </Transition>

      <!-- ─── État de chargement ────────────────────────────────────── -->
      <div
        v-if="isLoading"
        class="gallery-loading"
        role="status"
        aria-label="Chargement des photos"
        aria-live="polite"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="gallery-skeleton"
          :style="{ animationDelay: `${(n - 1) * 80}ms` }"
          aria-hidden="true"
        />
      </div>

      <!-- ─── Erreur de chargement ──────────────────────────────────── -->
      <div
        v-else-if="fetchStatus === 'error'"
        class="gallery-error"
        role="alert"
      >
        <p class="gallery-error__emoji" aria-hidden="true">😕</p>
        <h2 class="gallery-error__title">Impossible de charger les photos</h2>
        <p class="gallery-error__message">
          {{ fetchError ?? "Une erreur inattendue est survenue." }}
        </p>
        <button type="button" class="btn-retry" @click="fetchPhotos">
          Réessayer
        </button>
      </div>

      <!-- ─── État vide ─────────────────────────────────────────────── -->
      <div
        v-else-if="fetchStatus === 'success' && !hasPhotos"
        class="gallery-empty"
        role="status"
      >
        <div class="gallery-empty__icon" aria-hidden="true">📷</div>
        <h2 class="gallery-empty__title">Aucune photo pour le moment</h2>
        <p class="gallery-empty__subtitle">
          Soyez le premier à partager un souvenir !
        </p>
        <button
          type="button"
          class="btn-add-photo btn-add-photo--cta"
          @click="showForm = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            width="18"
            height="18"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Ajouter la première photo
        </button>
      </div>

      <!-- ─── Galerie de photos ──────────────────────────────────────── -->
      <TransitionGroup
        v-else-if="hasPhotos"
        tag="section"
        name="gallery"
        class="photo-gallery"
        aria-label="Galerie de photos"
      >
        <article
          v-for="(photo, index) in photos"
          :key="photo.id"
          class="photo-card"
          :style="{ animationDelay: `${Math.min(index, 5) * 60}ms` }"
        >
          <!-- Image -->
          <div class="photo-card__media">
            <img
              :src="photo.image_url"
              :alt="photo.titre"
              class="photo-card__img"
              loading="lazy"
              decoding="async"
              @error="handleImageError"
            />
            <!-- Overlay au survol -->
            <div class="photo-card__overlay" aria-hidden="true">
              <button
                type="button"
                class="photo-card__delete-btn"
                :aria-label="`Supprimer la photo « ${photo.titre} »`"
                :title="`Supprimer « ${photo.titre} »`"
                @click="handleDelete(photo.id, photo.titre)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Infos -->
          <div class="photo-card__body">
            <h3 class="photo-card__title">{{ photo.titre }}</h3>
            <p
              v-if="photo.description"
              class="photo-card__description"
            >
              {{ photo.description }}
            </p>
            <time
              class="photo-card__date"
              :datetime="photo.date_creation"
            >
              {{ formatDate(photo.date_creation) }}
            </time>
          </div>
        </article>
      </TransitionGroup>
    </div>

    <!-- Dialog de confirmation de suppression -->
    <Transition name="fade">
      <div
        v-if="deleteConfirm"
        class="dialog-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        @click.self="deleteConfirm = null"
      >
        <div class="dialog">
          <div class="dialog__icon" aria-hidden="true">🗑️</div>
          <h2 id="dialog-title" class="dialog__title">
            Supprimer cette photo ?
          </h2>
          <p class="dialog__message">
            La photo
            <strong>« {{ deleteConfirm.titre }} »</strong>
            sera définitivement supprimée. Cette action est irréversible.
          </p>
          <div class="dialog__actions">
            <button
              type="button"
              class="dialog__btn dialog__btn--cancel"
              @click="deleteConfirm = null"
            >
              Annuler
            </button>
            <button
              type="button"
              class="dialog__btn dialog__btn--danger"
              :disabled="isDeleting"
              @click="confirmDelete"
            >
              <span v-if="isDeleting">Suppression…</span>
              <span v-else>Supprimer</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { formatDate } from "~/utils/formatters";

// ─── Métadonnées ──────────────────────────────────────────────────────────
useSeoMeta({
  title: "Album Photo — Mission Save Our 20s",
  description: "Galerie de photos de notre aventure collective.",
});

// ─── Composable photos ────────────────────────────────────────────────────
const {
  photos,
  totalPhotos,
  fetchStatus,
  submitStatus,
  fetchError,
  formState,
  formErrors,
  isLoading,
  isSubmitting,
  hasPhotos,
  isFormValid,
  fetchPhotos,
  createPhoto,
  deletePhoto,
  handleFileChange,
  resetForm,
} = usePhotos();

// ─── État local ───────────────────────────────────────────────────────────
const showForm = ref<boolean>(false);
const isDragging = ref<boolean>(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isDeleting = ref<boolean>(false);

interface DeleteConfirm {
  id: number;
  titre: string;
}
const deleteConfirm = ref<DeleteConfirm | null>(null);

// ─── Gestion formulaire ───────────────────────────────────────────────────

function triggerFileInput(): void {
  fileInputRef.value?.click();
}

function removeSelectedFile(): void {
  resetForm();
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}

function clearFieldError(field: "titre" | "fichier" | "description" | "global"): void {
  if (formErrors.value && field in formErrors.value) {
    (formErrors.value as any)[field] = "";
  }
}

async function handleDrop(event: DragEvent): Promise<void> {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;

  // Simuler un événement input pour réutiliser handleFileChange
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  const syntheticEvent = {
    target: { files: dataTransfer.files } as HTMLInputElement,
  } as unknown as Event;
  handleFileChange(syntheticEvent);
}

async function handleSubmit(): Promise<void> {
  const success = await createPhoto();
  if (success) {
    showForm.value = false;
    // Scroll vers la galerie
    await nextTick();
    document.querySelector(".photo-gallery")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ─── Gestion suppression ──────────────────────────────────────────────────

function handleDelete(id: number, titre: string): void {
  deleteConfirm.value = { id, titre };
}

async function confirmDelete(): Promise<void> {
  if (!deleteConfirm.value) return;
  isDeleting.value = true;
  await deletePhoto(deleteConfirm.value.id);
  isDeleting.value = false;
  deleteConfirm.value = null;
}

// ─── Gestion image cassée ─────────────────────────────────────────────────

function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
  // Optionnel : afficher un placeholder
}

// ─── Raccourcis clavier ───────────────────────────────────────────────────

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && deleteConfirm.value) {
    deleteConfirm.value = null;
  }
}

// ─── Cycle de vie ─────────────────────────────────────────────────────────
onMounted(async () => {
  await fetchPhotos();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
/* ─── Page container ─────────────────────────────────────────────────────── */
.album-page {
  min-height: 100%;
  padding-bottom: var(--space-16);
  padding-top: var(--header-height);
}

/* ─── En-tête ────────────────────────────────────────────────────────────── */
.album-page__header {
  background: var(--clr-neutral-0);
  border-bottom: 1px solid var(--clr-neutral-200);
  padding-block: var(--space-6);
  position: sticky;
  top: var(--header-height);
  z-index: var(--z-above);
}

.album-page__header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Groupe titre de page */
.page-title-group {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.page-title-group__icon {
  font-size: var(--text-3xl);
  line-height: 1;
}

.page-title-group__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-900);
  line-height: var(--leading-tight);
}

.page-title-group__subtitle {
  font-size: var(--text-sm);
  color: var(--clr-neutral-500);
  margin-top: var(--space-1);
  font-weight: var(--fw-regular);
}

/* ─── Bouton ajouter ─────────────────────────────────────────────────────── */
.btn-add-photo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background: var(--clr-primary-500);
  color: var(--clr-neutral-0);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  border: none;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
  box-shadow: var(--shadow-primary);
  white-space: nowrap;
}

.btn-add-photo:hover {
  background: var(--clr-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-primary-lg);
}

.btn-add-photo:active {
  transform: scale(0.97);
}

.btn-add-photo--open {
  background: var(--clr-neutral-700);
  box-shadow: var(--shadow-md);
}

.btn-add-photo--open:hover {
  background: var(--clr-neutral-800);
}

.btn-add-photo__icon {
  transition: transform var(--transition-spring);
}

.btn-add-photo--open .btn-add-photo__icon {
  transform: rotate(45deg);
}

/* ─── Corps de page ──────────────────────────────────────────────────────── */
.album-page__body {
  padding-top: var(--space-8);
}

/* ─── Formulaire d'ajout ─────────────────────────────────────────────────── */
.add-photo-form-wrapper {
  margin-bottom: var(--space-10);
}

.add-photo-form {
  max-width: 640px;
  margin-inline: auto;
  background: var(--clr-neutral-0);
  border: 1px solid var(--clr-neutral-200);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.add-photo-form__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-900);
}

/* ─── Zone d'upload ──────────────────────────────────────────────────────── */
.upload-zone {
  position: relative;
  min-height: 200px;
  border: 2px dashed var(--clr-neutral-300);
  border-radius: var(--radius-xl);
  background: var(--clr-neutral-50);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    background var(--transition-fast),
    transform var(--transition-fast);
  overflow: hidden;
}

.upload-zone:hover,
.upload-zone:focus-within {
  border-color: var(--clr-primary-400);
  background: var(--clr-primary-50);
}

.upload-zone--dragging {
  border-color: var(--clr-primary-500);
  background: var(--clr-primary-100);
  transform: scale(1.01);
}

.upload-zone--filled {
  border-color: var(--clr-primary-400);
  border-style: solid;
  min-height: 240px;
}

.upload-zone--error {
  border-color: var(--clr-error);
  background: var(--clr-error-light);
}

.upload-zone__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  font-size: 0;
}

.upload-zone__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-8);
  text-align: center;
  pointer-events: none;
}

.upload-zone__icon {
  color: var(--clr-neutral-400);
  transition: color var(--transition-fast), transform var(--transition-spring);
}

.upload-zone:hover .upload-zone__icon,
.upload-zone--dragging .upload-zone__icon {
  color: var(--clr-primary-500);
  transform: scale(1.1) translateY(-4px);
}

.upload-zone__label {
  font-size: var(--text-sm);
  color: var(--clr-neutral-600);
  font-weight: var(--fw-regular);
}

.upload-zone__label strong {
  font-weight: var(--fw-semibold);
  color: var(--clr-primary-600);
}

.upload-zone__hint {
  font-size: var(--text-xs);
  color: var(--clr-neutral-400);
}

.upload-zone__preview {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 240px;
}

.upload-zone__preview-img {
  width: 100%;
  height: 100%;
  min-height: 240px;
  object-fit: cover;
  border-radius: calc(var(--radius-xl) - 2px);
}

.upload-zone__remove-btn {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: rgb(0 0 0 / 0.6);
  color: var(--clr-neutral-0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-lg);
  line-height: 1;
  transition: background var(--transition-fast), transform var(--transition-fast);
  cursor: pointer;
  border: none;
}

.upload-zone__remove-btn:hover {
  background: var(--clr-error);
  transform: scale(1.1);
}

/* ─── Champs de formulaire ───────────────────────────────────────────────── */
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-field__label {
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  color: var(--clr-neutral-700);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.form-field__required {
  color: var(--clr-error);
  font-size: var(--text-base);
  line-height: 1;
}

.form-field__optional {
  font-size: var(--text-xs);
  font-weight: var(--fw-regular);
  color: var(--clr-neutral-400);
}

.form-field__input-wrapper {
  position: relative;
}

.form-field__input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-16);
  background: var(--clr-neutral-0);
  border: 1.5px solid var(--clr-neutral-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--clr-neutral-900);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
}

.form-field__input:hover {
  border-color: var(--clr-neutral-400);
}

.form-field__input:focus {
  border-color: var(--clr-primary-500);
  box-shadow: 0 0 0 3px rgb(202 117 214 / 0.15);
}

.form-field--error .form-field__input {
  border-color: var(--clr-error);
}

.form-field--error .form-field__input:focus {
  box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15);
}

.form-field__counter {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-xs);
  color: var(--clr-neutral-400);
  pointer-events: none;
}

.form-field__textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--clr-neutral-0);
  border: 1.5px solid var(--clr-neutral-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--clr-neutral-900);
  resize: vertical;
  min-height: 88px;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
  line-height: var(--leading-relaxed);
}

.form-field__textarea:hover {
  border-color: var(--clr-neutral-400);
}

.form-field__textarea:focus {
  border-color: var(--clr-primary-500);
  box-shadow: 0 0 0 3px rgb(202 117 214 / 0.15);
}

/* ─── Messages d'erreur ──────────────────────────────────────────────────── */
.form-error {
  font-size: var(--text-xs);
  color: var(--clr-error-dark);
  font-weight: var(--fw-medium);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.form-error::before {
  content: "⚠";
  font-size: var(--text-sm);
}

/* ─── Alertes ────────────────────────────────────────────────────────────── */
.form-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  line-height: var(--leading-relaxed);
}

.form-alert--error {
  background: var(--clr-error-light);
  color: var(--clr-error-dark);
  border: 1px solid rgb(239 68 68 / 0.3);
}

.form-alert--success {
  background: var(--clr-success-light);
  color: var(--clr-success-dark);
  border: 1px solid rgb(34 197 94 / 0.3);
}

/* ─── Bouton submit ──────────────────────────────────────────────────────── */
.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-4);
  background: var(--clr-primary-500);
  color: var(--clr-neutral-0);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition:
    background var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    opacity var(--transition-fast);
  box-shadow: var(--shadow-primary);
  min-height: 52px;
}

.btn-submit:hover:not(:disabled) {
  background: var(--clr-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-primary-lg);
}

.btn-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-submit__loader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* ─── Spinner ────────────────────────────────────────────────────────────── */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgb(255 255 255 / 0.4);
  border-top-color: var(--clr-neutral-0);
  border-radius: var(--radius-full);
  animation: spin 0.7s linear infinite;
}

/* ─── États galerie ──────────────────────────────────────────────────────── */
.gallery-loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

.gallery-skeleton {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-2xl);
  background: linear-gradient(
    90deg,
    var(--clr-neutral-200) 25%,
    var(--clr-neutral-100) 50%,
    var(--clr-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.gallery-error,
.gallery-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  text-align: center;
  padding: var(--space-20) var(--space-8);
}

.gallery-error__emoji,
.gallery-empty__icon {
  font-size: 4rem;
  line-height: 1;
}

.gallery-error__title,
.gallery-empty__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-800);
}

.gallery-error__message,
.gallery-empty__subtitle {
  font-size: var(--text-base);
  color: var(--clr-neutral-500);
  max-width: 40ch;
}

.btn-retry {
  padding: var(--space-3) var(--space-6);
  background: var(--clr-neutral-800);
  color: var(--clr-neutral-0);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.btn-retry:hover {
  background: var(--clr-neutral-900);
  transform: translateY(-1px);
}

.btn-add-photo--cta {
  margin-top: var(--space-2);
}

/* ─── Galerie photos ─────────────────────────────────────────────────────── */
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

/* ─── Carte photo ────────────────────────────────────────────────────────── */
.photo-card {
  background: var(--clr-neutral-0);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid var(--clr-neutral-200);
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
  animation: scaleIn 0.5s ease both;
}

.photo-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
  border-color: var(--clr-primary-200);
}

.photo-card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--clr-neutral-100);
}

.photo-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.photo-card:hover .photo-card__img {
  transform: scale(1.06);
}

.photo-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgb(0 0 0 / 0.4) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: var(--space-3);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.photo-card:hover .photo-card__overlay {
  opacity: 1;
}

.photo-card__delete-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: rgb(239 68 68 / 0.9);
  color: var(--clr-neutral-0);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    transform var(--transition-spring);
  backdrop-filter: blur(4px);
}

.photo-card__delete-btn:hover {
  background: var(--clr-error-dark);
  transform: scale(1.1);
}

.photo-card__body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.photo-card__title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  color: var(--clr-neutral-900);
  line-height: var(--leading-snug);
  /* Tronquage sur 2 lignes */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.photo-card__description {
  font-size: var(--text-sm);
  color: var(--clr-neutral-500);
  line-height: var(--leading-normal);
  /* Tronquage sur 2 lignes */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.photo-card__date {
  font-size: var(--text-xs);
  color: var(--clr-neutral-400);
  font-weight: var(--fw-medium);
  margin-top: var(--space-1);
}

/* ─── Dialog de confirmation ─────────────────────────────────────────────── */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: var(--z-modal);
  backdrop-filter: blur(4px);
}

.dialog {
  background: var(--clr-neutral-0);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  max-width: 420px;
  width: 100%;
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  animation: bounceIn 0.4s var(--transition-spring) both;
}

.dialog__icon {
  font-size: 3rem;
  line-height: 1;
}

.dialog__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-900);
}

.dialog__message {
  font-size: var(--text-sm);
  color: var(--clr-neutral-600);
  line-height: var(--leading-relaxed);
  max-width: 32ch;
}

.dialog__actions {
  display: flex;
  gap: var(--space-3);
  width: 100%;
  margin-top: var(--space-2);
}

.dialog__btn {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  border: none;
  transition:
    background var(--transition-fast),
    transform var(--transition-fast);
}

.dialog__btn:active {
  transform: scale(0.97);
}

.dialog__btn--cancel {
  background: var(--clr-neutral-100);
  color: var(--clr-neutral-700);
}

.dialog__btn--cancel:hover {
  background: var(--clr-neutral-200);
}

.dialog__btn--danger {
  background: var(--clr-error);
  color: var(--clr-neutral-0);
}

.dialog__btn--danger:hover:not(:disabled) {
  background: var(--clr-error-dark);
}

.dialog__btn--danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ─── Transitions Vue ────────────────────────────────────────────────────── */
.form-slide-enter-active {
  animation: fadeInDown 0.35s var(--transition-spring) both;
}

.form-slide-leave-active {
  animation: fadeInDown 0.25s ease reverse both;
}

.error-slide-enter-active {
  animation: fadeInDown 0.2s ease both;
}

.error-slide-leave-active {
  animation: fadeIn 0.15s ease reverse both;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Galerie TransitionGroup */
.gallery-enter-active {
  animation: scaleIn 0.4s ease both;
}

.gallery-leave-active {
  animation: scaleIn 0.25s ease reverse both;
}

.gallery-move {
  transition: transform var(--transition-normal);
}

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .album-page__header .container {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }

  .btn-add-photo {
    width: 100%;
    justify-content: center;
  }

  .add-photo-form {
    padding: var(--space-5);
  }

  .photo-gallery {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--space-4);
  }
}

@media (max-width: 480px) {
  .photo-gallery {
    grid-template-columns: 1fr;
  }

  .dialog {
    padding: var(--space-6);
  }
}
</style>
