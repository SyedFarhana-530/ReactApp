// src/app/page.tsx
'use client';
import NotebookSidebar from './components/NotebookSidebar';
import ChatBox from './components/ChatBox';
import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <NotebookSidebar />
      <main className={styles.main}>
        <ChatBox />
      </main>
    </div>
  );
}
