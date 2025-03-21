# Utilisation de l'image officielle Node.js
FROM node:16

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers de l'application
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Lancer l'application
CMD ["node", "app.js"]
