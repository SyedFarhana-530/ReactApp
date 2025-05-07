'use client';
import { useNotebookStore } from '../store/useNotebookStore';
import styles from '../styles/Sidebar.module.css';

export default function NotebookSidebar() {
  const { notes, addNote } = useNotebookStore();

  return (
    <div className={styles.sidebar}>
  <div className={styles.noteItem}>📝 Meeting Notes</div>
  <div className={styles.noteItem}>📄 Research Summary</div>
  <div className={styles.noteItem}>📚 Article Snippets</div>
  <div className={styles.addNote}>➕ Add New Note</div>

      <h3>Notebook</h3>
      <button onClick={() => addNote('New Note', '...')}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
