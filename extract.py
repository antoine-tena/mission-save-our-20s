import os

SCRIPT_NAME = os.path.basename(__file__)
OUTPUT_DIR = "ALL"

# Liste des fichiers précis ou extensions à ignorer (comparé sur le nom complet ou l'extension)
IGNORE_FILES = {'.gitignore', 'all.md', 'front.md', 'back.md', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'}
IGNORE_EXTS = {
    '.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.tar', '.gz', 
    '.mp4', '.pyc', '.exe', '.dll', '.so', '.class', '.sqlite3', '.map'
}

# Dossiers lourds à ne JAMAIS explorer
IGNORE_DIRS = {
    'node_modules', 'venv', 'env', '.venv', '__pycache__', 
    '.nuxt', '.output', '.pytest_cache', '.git', '.idea', '.vscode','tests'
}

def is_hidden(name):
    return name.startswith('.')

def is_binary(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            f.read(1024)
        return False
    except UnicodeDecodeError:
        return True

def get_tree_and_content(root_dir, target_folder=None):
    tree_lines = []
    content_lines = []
    
    walk_dir = root_dir
    if target_folder:
        walk_dir = os.path.join(root_dir, target_folder)
        if not os.path.exists(walk_dir):
            return "", ""

    for root, dirs, files in os.walk(walk_dir):
        # CORRECTION : On filtre dynamiquement 'dirs' pour bloquer DIRECTEMENT l'accès aux dossiers exclus
        dirs[:] = [d for d in dirs if not is_hidden(d) and d != OUTPUT_DIR and d not in IGNORE_DIRS]
        
        # Calcul du niveau d'indentation pour l'arborescence
        level = root.replace(walk_dir, '').count(os.sep)
        indent = ' ' * 4 * level
        folder_name = os.path.basename(root) or os.path.basename(walk_dir)
        tree_lines.append(f"{indent}📁 {folder_name}/")
        
        subindent = ' ' * 4 * (level + 1)
        for f in sorted(files):
            # Ignorer le script lui-même ou les fichiers cachés (commençant par un point, sauf si dossier exclu avant)
            if f == SCRIPT_NAME or is_hidden(f) or f in IGNORE_FILES:
                continue
            
            ext = os.path.splitext(f)[1].lower()
            if ext in IGNORE_EXTS:
                continue

            tree_lines.append(f"{subindent}📄 {f}")
            
            filepath = os.path.join(root, f)
            if not is_binary(filepath):
                rel_path = os.path.relpath(filepath, root_dir)
                content_lines.append(f"\n\n---\n### Fichier : {rel_path}\n```text\n")
                try:
                    with open(filepath, 'r', encoding='utf-8') as file_obj:
                        content_lines.append(file_obj.read())
                except Exception as e:
                    content_lines.append(f"[Erreur de lecture : {e}]")
                content_lines.append("\n```\n")

    tree_str = "## Arborescence\n```text\n" + "\n".join(tree_lines) + "\n```\n\n"
    content_str = "## Contenu des fichiers\n" + "".join(content_lines)
    return tree_str, content_str

def guess_directory(root_dir, keywords):
    try:
        dirs = [d for d in os.listdir(root_dir) if os.path.isdir(os.path.join(root_dir, d))]
        for d in dirs:
            if d.lower() in keywords:
                return d
    except Exception:
        pass
    return None

def main():
    root_dir = os.getcwd()
    out_path = os.path.join(root_dir, OUTPUT_DIR)
    
    if not os.path.exists(out_path):
        os.makedirs(out_path)

    # 1. Générer all.md
    print("Génération de all.md...")
    tree_all, content_all = get_tree_and_content(root_dir)
    with open(os.path.join(out_path, "all.md"), 'w', encoding='utf-8') as f:
        f.write(tree_all + content_all)

    # 2. Identifier et générer front.md
    front_folder = guess_directory(root_dir, ['frontend', 'front', 'client', 'app', 'ui', 'vue'])
    if front_folder:
        print(f"Dossier Frontend détecté : '{front_folder}'. Génération de front.md...")
        tree_front, content_front = get_tree_and_content(root_dir, front_folder)
        with open(os.path.join(out_path, "front.md"), 'w', encoding='utf-8') as f:
            f.write(tree_front + content_front)
    else:
        print("Aucun dossier Frontend évident détecté.")

    # 3. Identifier et générer back.md
    back_folder = guess_directory(root_dir, ['backend', 'back', 'server', 'api', 'core'])
    if back_folder:
        print(f"Dossier Backend détecté : '{back_folder}'. Génération de back.md...")
        tree_back, content_back = get_tree_and_content(root_dir, back_folder)
        with open(os.path.join(out_path, "back.md"), 'w', encoding='utf-8') as f:
            f.write(tree_back + content_back)
    else:
        print("Aucun dossier Backend évident détecté.")

    print("\nTerminé ! Les fichiers ont été générés dans le dossier 'ALL'.")
    input("Appuie sur Entrée pour quitter...") 

if __name__ == "__main__":
    main()