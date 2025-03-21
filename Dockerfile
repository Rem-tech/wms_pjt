# Utilisation de l'image officielle Node.js pour le frontend
FROM node:16

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers du frontend
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
