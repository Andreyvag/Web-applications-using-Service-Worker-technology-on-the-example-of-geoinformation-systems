const CACHE = 'cache-update-and-refresh-v1';
  
  // При установке воркера мы должны закешировать часть данных (статику).
  self.addEventListener('install', (event) => {
      event.waitUntil(
          caches
              .open(CACHE)
              .then((cache) => cache.addAll([
              './index.html',
              './src/application.js',
              './src/app.js',
              './src/index.css',
              './src/index.js',
              './src/components/Footer.js',
              './src/components/Header.js',
              './src/components/InfoPanel.js',
              './src/components/KeplerGl.js',
              './src/components/ParkingMap.js',
              './src/components/info-panel-styles.css',
              './src/configs/gridLayer.js',
              './src/configs/pointLayer.js',
              './src/configs/map.js',
              './src/data/kepler-gl_dataopen(2)jsoncsv.js',
              './src/store/actions.js',
              './src/store/index.js',
              './src/store/reducers.js',
            ]))
      );
  });
  
  // При запросе на сервер мы используем данные из кэша и только после идем на сервер.
  self.addEventListener('fetch', (event) => {
      // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
      event.respondWith(fromCache(event.request));
      event.waitUntil(
        update(event.request)
        // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
        .then(refresh)
      );
  });
  
  function fromCache(request) {
      return caches.open(CACHE).then((cache) =>
          cache.match(request).then((matching) =>
              matching || Promise.reject('no-match')
          ));
  }
  
  function update(request) {
      return caches.open(CACHE).then((cache) =>
          fetch(request).then((response) =>
              cache.put(request, response.clone()).then(() => response)
          )
      );
  }
  
  // Шлём сообщения об обновлении данных всем клиентам.
  function refresh(response) {
      return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
              // Подробнее про ETag можно прочитать тут
              // https://en.wikipedia.org/wiki/HTTP_ETag
              const message = {
                  type: 'refresh',
                  url: response.url,
                  eTag: response.headers.get('ETag')
              };
              // Уведомляем клиент об обновлении данных.
              client.postMessage(JSON.stringify(message));
          });
      });
  }