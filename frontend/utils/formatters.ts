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

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function formatDateYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

export function renderMarkdown(text: string): string {
  if (!text) return '';
  
  // Escape HTML to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  // Restore blockquote since we escaped '>'
  html = html.replace(/^(?:&gt;)\s+(.+)$/gm, '<blockquote class="border-l-4 border-slate-300 pl-4 my-2 italic text-slate-500">$1</blockquote>');

  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic: *text*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline Code: `code`
  html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-slate-800 text-xs px-1.5 py-0.5 rounded font-mono">$1</code>');

  // Bullet list: lines starting with -
  html = html.replace(/^-\s+(.+)$/gm, '<li class="list-disc ml-5 my-1">$1</li>');

  // Convert newlines to breaks
  html = html.replace(/\n/g, '<br>');

  return html;
}
