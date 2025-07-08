# custom_server.py
import http.server
import socketserver
import os

PORT = 8000
# Asegúrate de que esto coincida con el nombre de tu carpeta de la aplicación.
# El servidor servirá directamente desde esta carpeta, así que la URL ya no necesitará /Simulador/.
DIRECTORY = "./Simulador"


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Establece el directorio base para el servidor
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Añade las cabeceras Content-Type para los tipos de archivo que nos interesan
        if self.path.endswith('.json'):
            # Tipo MIME correcto para manifest.json
            self.send_header('Content-Type', 'application/manifest+json')
        elif self.path.endswith('.js'):
            # Tipo MIME correcto para archivos JS
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.html'):
            # Con charset para HTML
            self.send_header('Content-Type', 'text/html; charset=utf-8')
        elif self.path.endswith(('.png', '.jpg', '.jpeg', '.gif')):
            # Infiere para imágenes
            self.send_header('Content-Type', self.guess_type(self.path))
        # Si tienes otros tipos de archivos (ej. .css), asegúrate de que también se manejen
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')

        # Asegúrate de llamar al método end_headers del padre al final
        super().end_headers()


# Ejecuta el servidor
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Sirviendo en el puerto {PORT} desde el directorio '{DIRECTORY}'")
    # ¡La URL ahora será más corta!
    print(f"Accede a tu aplicación en: http://localhost:{PORT}/")
    httpd.serve_forever()
