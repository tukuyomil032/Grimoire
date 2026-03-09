use std::fs;
use std::path::Path;
use tauri::Manager;

// ─── Basic YAML file operations ────────────────────────────────────────────────

/// Read the contents of a YAML file at the given path.
#[tauri::command]
fn read_yaml_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

/// Write content to a YAML file, creating parent directories as needed.
#[tauri::command]
fn write_yaml_file(path: String, content: String) -> Result<(), String> {
    if let Some(parent) = Path::new(&path).parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    fs::write(&path, &content).map_err(|e| e.to_string())
}

/// List all .yml/.yaml files in a directory (non-recursive).
#[tauri::command]
fn list_yaml_files(dir: String) -> Result<Vec<String>, String> {
    let path = Path::new(&dir);
    if !path.is_dir() {
        return Ok(vec![]);
    }
    let mut files = Vec::new();
    for entry in fs::read_dir(path).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let p = entry.path();
        if let Some(ext) = p.extension() {
            if ext == "yml" || ext == "yaml" {
                if let Some(s) = p.to_str() {
                    files.push(s.to_string());
                }
            }
        }
    }
    Ok(files)
}

/// Recursively list all .yml/.yaml files under a directory tree.
#[tauri::command]
fn list_yaml_files_recursive(dir: String) -> Result<Vec<String>, String> {
    let mut files = Vec::new();
    visit_dir(Path::new(&dir), &mut files).map_err(|e| e.to_string())?;
    Ok(files)
}

fn visit_dir(dir: &Path, files: &mut Vec<String>) -> std::io::Result<()> {
    if !dir.is_dir() {
        return Ok(());
    }
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            visit_dir(&path, files)?;
        } else if let Some(ext) = path.extension() {
            if ext == "yml" || ext == "yaml" {
                if let Some(s) = path.to_str() {
                    files.push(s.to_string());
                }
            }
        }
    }
    Ok(())
}

/// Delete a file at the given path.
#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    fs::remove_file(&path).map_err(|e| e.to_string())
}

// ─── Project management (.grimoire files) ──────────────────────────────────────

/// Save a JSON project file (.grimoire) at the given path.
#[tauri::command]
fn save_project(path: String, content: String) -> Result<(), String> {
    if let Some(parent) = Path::new(&path).parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    fs::write(&path, &content).map_err(|e| e.to_string())
}

/// Load a JSON project file (.grimoire) from the given path.
#[tauri::command]
fn load_project(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

// ─── App data directory & crash-recovery backups ───────────────────────────────

/// Return the OS-specific app data directory path (for auto-save / backups).
#[tauri::command]
fn get_app_data_dir(app: tauri::AppHandle) -> Result<String, String> {
    app.path()
        .app_data_dir()
        .map(|p| p.to_string_lossy().into_owned())
        .map_err(|e| e.to_string())
}

/// Write an auto-save backup to <app_data>/grimoire/backup.json.
#[tauri::command]
fn save_backup(app: tauri::AppHandle, content: String) -> Result<(), String> {
    let base = app.path().app_data_dir().map_err(|e| e.to_string())?;
    let backup_dir = base.join("grimoire");
    fs::create_dir_all(&backup_dir).map_err(|e| e.to_string())?;
    fs::write(backup_dir.join("backup.json"), &content).map_err(|e| e.to_string())
}

/// Load the auto-save backup; returns None if no backup exists.
#[tauri::command]
fn load_backup(app: tauri::AppHandle) -> Result<Option<String>, String> {
    let backup_path = app
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?
        .join("grimoire")
        .join("backup.json");
    if backup_path.exists() {
        let content = fs::read_to_string(&backup_path).map_err(|e| e.to_string())?;
        Ok(Some(content))
    } else {
        Ok(None)
    }
}

/// Delete the auto-save backup file (call after a successful project save).
#[tauri::command]
fn clear_backup(app: tauri::AppHandle) -> Result<(), String> {
    let backup_path = app
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?
        .join("grimoire")
        .join("backup.json");
    if backup_path.exists() {
        fs::remove_file(&backup_path).map_err(|e| e.to_string())?;
    }
    Ok(())
}

// ─── Batch YAML export ──────────────────────────────────────────────────────────

/// Export all skills, mobs, and items as YAML files in the MythicMobs directory structure:
///   <dir>/Skills/skills.yml
///   <dir>/Mobs/mobs.yml
///   <dir>/Items/items.yml
#[tauri::command]
fn export_all_yaml(
    dir: String,
    skills_yaml: String,
    mobs_yaml: String,
    items_yaml: String,
) -> Result<(), String> {
    let base = Path::new(&dir);

    let skills_dir = base.join("Skills");
    fs::create_dir_all(&skills_dir).map_err(|e| e.to_string())?;
    fs::write(skills_dir.join("skills.yml"), &skills_yaml).map_err(|e| e.to_string())?;

    let mobs_dir = base.join("Mobs");
    fs::create_dir_all(&mobs_dir).map_err(|e| e.to_string())?;
    fs::write(mobs_dir.join("mobs.yml"), &mobs_yaml).map_err(|e| e.to_string())?;

    let items_dir = base.join("Items");
    fs::create_dir_all(&items_dir).map_err(|e| e.to_string())?;
    fs::write(items_dir.join("items.yml"), &items_yaml).map_err(|e| e.to_string())?;

    Ok(())
}

// ─── Application entry ─────────────────────────────────────────────────────────

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            // File operations
            read_yaml_file,
            write_yaml_file,
            list_yaml_files,
            list_yaml_files_recursive,
            delete_file,
            // Project management
            save_project,
            load_project,
            // App data & backups
            get_app_data_dir,
            save_backup,
            load_backup,
            clear_backup,
            // Batch export
            export_all_yaml,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
