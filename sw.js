const CACHE_NAME = 'my-app-v1'; // שנה את ה-v1 ל-v2 כדי לעדכן גרסה
const ASSETS = [
  '/',
  '/index.html',
  // כאן תוסיף את קבצי ה-CSS או התמונות שלך
];

// התקנת ה-Service Worker ושמירת קבצים בזיכרון
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // גורם לעדכון להיכנס לתוקף מיד (עדכון שקט)
});

// הפעלת ה-Service Worker וניקוי זיכרון ישן
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// ניהול בקשות רשת (מאפשר לאתר לעבוד גם בלי אינטרנט)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
