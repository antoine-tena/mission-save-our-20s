<template>
  <div class="min-h-screen pt-[calc(var(--header-height)+2rem)] pb-24 bg-slate-900 overflow-hidden relative selection:bg-fuchsia-500/30">
    <!-- Animated background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] left-[20%] w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 4s;"></div>
      <div class="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 6s;"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <header class="text-center mb-16">
        <h1 class="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 mb-4 tracking-tight">
          Arcade MSO20s
        </h1>
        <p class="text-slate-400 text-lg">Qui sera le champion aujourd'hui ?</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- GAME SECTION -->
        <div class="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-indigo-500/5 pointer-events-none"></div>
          
          <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
            <Icon name="lucide:swords" class="text-fuchsia-400" /> Le Morpion
          </h2>
          
          <div class="mb-6 flex gap-6 text-sm font-semibold uppercase tracking-widest relative z-10">
            <div :class="['px-4 py-2 rounded-lg transition-all duration-300', currentPlayer === 'X' && !winner ? 'bg-fuchsia-500/20 text-fuchsia-300 ring-1 ring-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'text-slate-500']">
              Amani (X)
            </div>
            <div :class="['px-4 py-2 rounded-lg transition-all duration-300', currentPlayer === 'O' && !winner ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'text-slate-500']">
              Antoine (O)
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 mb-8 bg-white/5 p-3 rounded-2xl relative z-10">
            <button 
              v-for="(cell, index) in board" 
              :key="index"
              @click="makeMove(index)"
              :disabled="cell !== null || winner !== null"
              class="w-20 h-20 sm:w-24 sm:h-24 bg-slate-800/80 hover:bg-slate-700 transition-colors rounded-xl flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-inner disabled:cursor-not-allowed group"
              :class="{'text-fuchsia-400': cell === 'X', 'text-indigo-400': cell === 'O'}"
            >
              <span v-if="cell" class="animate-bounceIn drop-shadow-lg">{{ cell }}</span>
              <span v-else class="opacity-0 group-hover:opacity-10 transition-opacity duration-300 text-white">{{ currentPlayer }}</span>
            </button>
          </div>

          <div v-if="winner" class="text-center animate-fadeInDown relative z-10">
            <p class="text-2xl font-bold text-white mb-6 bg-slate-900/50 px-6 py-2 rounded-full ring-1 ring-white/10 shadow-xl backdrop-blur-sm">
              <span v-if="winner === 'Draw'" class="text-yellow-400 flex items-center gap-2"><Icon name="lucide:handshake" /> Match Nul !</span>
              <span v-else class="text-green-400 flex items-center gap-2"><Icon name="lucide:party-popper" /> Victoire de {{ winner === 'X' ? 'Amani' : 'Antoine' }} !</span>
            </p>
            <div class="flex gap-4 justify-center">
              <button @click="resetGame" class="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all flex items-center gap-2">
                <Icon name="lucide:rotate-ccw" /> Rejouer
              </button>
              <button v-if="winner !== 'Draw'" @click="saveGameScore" :disabled="isSubmitting" class="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white font-medium shadow-lg shadow-fuchsia-500/25 transition-all disabled:opacity-50 flex items-center gap-2">
                <Icon name="lucide:save" v-if="!isSubmitting" />
                <Icon name="lucide:loader-2" class="animate-spin" v-else />
                <span>{{ isSubmitting ? 'Sauvegarde...' : 'Enregistrer Score' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- SCOREBOARD SECTION -->
        <div class="flex flex-col gap-8">
          <div class="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div class="absolute -right-10 -top-10 text-9xl text-white/5 opacity-20 pointer-events-none"><Icon name="lucide:trophy" /></div>
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
              <Icon name="lucide:bar-chart-2" class="text-yellow-400" /> Statistiques Globales
            </h3>
            <div v-if="stats" class="grid grid-cols-2 gap-4 relative z-10">
              <div class="bg-gradient-to-b from-white/10 to-white/5 p-4 rounded-2xl border border-fuchsia-500/20 text-center shadow-[0_0_15px_rgba(217,70,239,0.05)]">
                <div class="text-4xl font-display font-bold text-fuchsia-400 mb-1 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">{{ stats.total_amani_wins }}</div>
                <div class="text-xs uppercase tracking-wider text-fuchsia-200/70 font-semibold">Victoires Amani</div>
              </div>
              <div class="bg-gradient-to-b from-white/10 to-white/5 p-4 rounded-2xl border border-indigo-500/20 text-center shadow-[0_0_15px_rgba(99,102,241,0.05)]">
                <div class="text-4xl font-display font-bold text-indigo-400 mb-1 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">{{ stats.total_antoine_wins }}</div>
                <div class="text-xs uppercase tracking-wider text-indigo-200/70 font-semibold">Victoires Antoine</div>
              </div>
            </div>
            <div v-else class="text-slate-400 text-sm animate-pulse relative z-10">Chargement des statistiques...</div>
          </div>

          <div class="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl flex-1 flex flex-col">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <Icon name="lucide:history" class="text-blue-400" /> Historique
              </h3>
            </div>
            <div class="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="session in sessions" :key="session.id" class="group bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <div>
                  <div class="text-white font-medium group-hover:text-blue-200 transition-colors">{{ session.game_type_name || 'Jeu Inconnu' }}</div>
                  <div class="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Icon name="lucide:calendar-clock" class="w-3 h-3" />
                    {{ new Date(session.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                  </div>
                </div>
                <div class="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-lg ring-1 ring-white/5">
                  <span :class="['font-display font-bold text-xl', session.amani_score > session.antoine_score ? 'text-fuchsia-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]' : 'text-slate-500']">{{ session.amani_score }}</span>
                  <span class="text-slate-600 font-bold">-</span>
                  <span :class="['font-display font-bold text-xl', session.antoine_score > session.amani_score ? 'text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]' : 'text-slate-500']">{{ session.antoine_score }}</span>
                </div>
              </div>
              <div v-if="sessions.length === 0" class="text-center py-12 text-slate-500 flex flex-col items-center gap-3">
                <Icon name="lucide:ghost" class="w-12 h-12 opacity-50" />
                <p>Aucune partie jouée pour l'instant.<br>Que le meilleur gagne !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGames } from '~/composables/useGames';

const { sessions, gameTypes, stats, isSubmitting, fetchAllData, createSession } = useGames();

// Tic-Tac-Toe Logic
const board = ref<Array<'X' | 'O' | null>>(Array(9).fill(null));
const currentPlayer = ref<'X' | 'O'>('X');
const winner = ref<'X' | 'O' | 'Draw' | null>(null);

const checkWinner = () => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
      return board.value[a];
    }
  }
  if (!board.value.includes(null)) return 'Draw';
  return null;
};

const makeMove = (index: number) => {
  if (board.value[index] || winner.value) return;
  board.value[index] = currentPlayer.value;
  winner.value = checkWinner();
  if (!winner.value) {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }
};

const resetGame = () => {
  board.value = Array(9).fill(null);
  currentPlayer.value = 'X';
  winner.value = null;
};

const saveGameScore = async () => {
  if (!winner.value || winner.value === 'Draw') return;
  
  // Try to find a "Morpion" game type, else just use the first one or null
  const morpionType = gameTypes.value.find(t => t.name.toLowerCase().includes('morpion')) || gameTypes.value[0];
  
  const payload = {
    game_type: morpionType?.id || null,
    date: new Date().toISOString().substring(0, 10),
    amani_score: winner.value === 'X' ? 1 : 0,
    antoine_score: winner.value === 'O' ? 1 : 0,
    location: 'Arcade MSO20s',
    notes: 'Partie jouée directement depuis le dashboard.'
  };

  const success = await createSession(payload);
  if (success) {
    resetGame();
  }
};

onMounted(fetchAllData);
useSeoMeta({ title: 'Arcade — MSO20s' });
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounceIn {
  animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInDown {
  animation: fadeInDown 0.4s ease-out forwards;
}
</style>
