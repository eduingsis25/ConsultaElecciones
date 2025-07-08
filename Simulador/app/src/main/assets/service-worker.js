const CACHE_NAME = "voting-app-cache-v3";
const urlsToCache = [
  "./", // La raíz de tu aplicación
  "./index.html",
  "./styles.css",
  "./script.js",
  // Asegúrate de incluir todos los logos, fotos de candidatos, etc.
  // Ejemplo:
  "./logos/Accion_Democratica.jpg",
  "./logos/AlianzaCambio.jpg",
  "./logos/ArepaDigital.png",
  "./logos/AvanzadaProgresista.jpg",
  "./logos/BanderaRoja.jpg",
  "./logos/Cambiemos.png",
  "./logos/COPEI.jpg",
  "./logos/DDP.png",
  "./logos/Ecologico.png",
  "./logos/ElCambio.png",
  "./logos/Enamorate.png",
  "./logos/FuerzaVecinal.jpg",
  "./logos/Futuro.jpg",
  "./logos/Lapiz.jpg",
  "./logos/MEP.png",
  "./logos/MINUnidad.png",
  "./logos/MovimientoRepublicano.png",
  "./logos/ORA.jpg",
  "./logos/PartidoVerdeVenezuela.png",
  "./logos/pcv.jpg",
  "./logos/Podemos.png",
  "./logos/PPT.png",
  "./logos/PrimeroJusticia.png",
  "./logos/PrimeroVenezuela.png",
  "./logos/psuv.jpg",
  "./logos/Soluciones.png",
  "./logos/SomosVenezuela.png",
  "./logos/TUPAMARO.png",
  "./logos/UNE.jpg",
  "./logos/UNICA.png",
  "./logos/UnidadVisionVenezuela.jpg",
  "./logos/unt.png",
  "./logos/VenezuelaUnida.jpg",
  "./logos/VP.jpg",
  // ... (agrega todas las imágenes y archivos necesarios)
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png",
];

// Instalar Service Worker y cachear archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Servir archivos desde la caché o la red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // No cache hit - fetch from network
      return fetch(event.request).catch(() => {
        // Si la red falla y no está en caché, puedes devolver una página offline.html
        // return caches.match('/offline.html'); // Necesitarías crear esta página
      });
    })
  );
});

// Actualizar Service Worker (eliminar cachés antiguas)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
