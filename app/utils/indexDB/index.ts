/* eslint-disable @typescript-eslint/no-explicit-any */

function openIndexDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UserDatabase', 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('userStore')) {
        db.createObjectStore('userStore', { keyPath: 'id' });
      }
    };
    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
}

export async function saveDataInIndexDB(key: string, value: any) {
  const db: any = await openIndexDatabase();
  const transaction = db.transaction(['userStore'], 'readwrite');
  const store = transaction.objectStore('userStore');
  const request = store.put({ id: key, value });

  return new Promise<void>((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event: any) => reject(event.target.error);
  });
}

export async function getDataFromIndexDB(key: string) {
  const db: any = await openIndexDatabase();
  const transaction = db.transaction(['userStore'], 'readonly');
  const store = transaction.objectStore('userStore');
  const request = store.get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event: any) => resolve(event.target.result ? event.target.result.value : null);
    request.onerror = (event: any) => reject(event.target.error);
  });
}
