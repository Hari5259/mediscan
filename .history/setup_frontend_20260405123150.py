import os
import shutil
import json
from pathlib import Path

# Base path
base_path = r'C:\Users\HP\OneDrive\Desktop\medigit'
frontend_path = os.path.join(base_path, 'frontend')

# Create directory structure
directories = [
    'frontend',
    'frontend/src',
    'frontend/src/components',
    'frontend/src/assets',
    'frontend/public'
]

print("Creating directory structure...")
for directory in directories:
    dir_full_path = os.path.join(base_path, directory)
    os.makedirs(dir_full_path, exist_ok=True)
    print(f"✓ Created: {directory}")

# Source and destination mappings
file_mappings = {
    # Config files
    'package.json': 'frontend/package.json',
    'vite.config.js': 'frontend/vite.config.js',
    'index.html': 'frontend/index.html',
    'tailwind.config.js': 'frontend/tailwind.config.js',
    'postcss.config.js': 'frontend/postcss.config.js',
    'eslint.config.js': 'frontend/eslint.config.js',
    '.gitignore': 'frontend/.gitignore',
    'README.md': 'frontend/README.md',
}

print("\nCopying config files...")
for src, dst in file_mappings.items():
    src_path = os.path.join(base_path, src)
    dst_path = os.path.join(base_path, dst)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"✓ Copied: {src} -> {dst}")
    else:
        print(f"⚠ Not found: {src}")

# Copy source files
print("\nCopying source files...")
src_files = ['App.jsx', 'App.css', 'main.jsx', 'index.css']
for file in src_files:
    src_path = os.path.join(base_path, 'src', file)
    dst_path = os.path.join(base_path, 'frontend', 'src', file)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"✓ Copied: src/{file} -> frontend/src/{file}")

# Copy component files
print("\nCopying component files...")
components = ['Login.jsx', 'Signup.jsx', 'Dashboard.jsx', 'Verification.jsx', 'Terms.jsx', 'Privacy.jsx']
for component in components:
    src_path = os.path.join(base_path, 'src', 'components', component)
    dst_path = os.path.join(base_path, 'frontend', 'src', 'components', component)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"✓ Copied: src/components/{component} -> frontend/src/components/{component}")

# Copy assets
print("\nCopying assets...")
assets_dir = os.path.join(base_path, 'src', 'assets')
if os.path.exists(assets_dir):
    for asset in os.listdir(assets_dir):
        src_path = os.path.join(assets_dir, asset)
        dst_path = os.path.join(base_path, 'frontend', 'src', 'assets', asset)
        if os.path.isfile(src_path):
            shutil.copy2(src_path, dst_path)
            print(f"✓ Copied: src/assets/{asset} -> frontend/src/assets/{asset}")

# Copy public files
print("\nCopying public files...")
public_dir = os.path.join(base_path, 'public')
if os.path.exists(public_dir):
    for file in os.listdir(public_dir):
        src_path = os.path.join(public_dir, file)
        dst_path = os.path.join(base_path, 'frontend', 'public', file)
        if os.path.isfile(src_path):
            shutil.copy2(src_path, dst_path)
            print(f"✓ Copied: public/{file} -> frontend/public/{file}")

print("\n" + "="*60)
print("Setup Complete!")
print("="*60)

# List frontend structure
print("\nFrontend Directory Structure:")
for root, dirs, files in os.walk(frontend_path):
    level = root.replace(frontend_path, '').count(os.sep)
    indent = ' ' * 2 * level
    folder_name = os.path.basename(root)
    if level == 0:
        print(f"{folder_name}/")
    else:
        print(f"{indent}{folder_name}/")
    subindent = ' ' * 2 * (level + 1)
    for file in files:
        print(f"{subindent}{file}")

print("\n✓ Frontend folder structure setup complete!")
print(f"\nNext steps:")
print(f"1. cd frontend")
print(f"2. npm install")
print(f"3. npm run dev")
