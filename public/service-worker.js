const FILES_TO_CACHE = ["/", "/index.html", "db.js", "index.js", "styles.css"];
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cach3e-v1";

self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Your filer were pre-cached seccessfully");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("../routes/api/")) {
    evt.responsWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(evt.request)
            .then((response) => {
              if (resopnce.status === 200) {
                cache.put(evt.request.url, resopnse.clone());
              }
              return response;
            })
            .catch((err) => {
              return cache.match(evt.request);
            });
        })
        .catch((err) => console.log(err))
    );
    return;
  }
});
