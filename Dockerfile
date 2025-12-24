FROM nginx:alpine

# Kopiere die HTML-Datei
COPY index.html /usr/share/nginx/html/

# Kopiere Bilder
COPY images/ /usr/share/nginx/html/images/

# Exponiere Port 80
EXPOSE 80