export type DateFormatType = 'long' | 'short' | 'datetime' | 'year';

export function formatDate(dateString: string, type: DateFormatType = 'long'): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  switch (type) {
    case 'short':
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    case 'datetime':
      return date.toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    case 'year':
      return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    case 'long':
    default:
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
  }
}

// Deprecated wrappers for backwards compatibility
export const formatDateShort = (dateString: string) => formatDate(dateString, 'short');
export const formatDateDateTime = (dateString: string) => formatDate(dateString, 'datetime');
export const formatDateYear = (dateString: string) => formatDate(dateString, 'year');

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
