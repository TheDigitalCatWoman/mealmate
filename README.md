# MealMate Installatie Handleiding

Dit project is op GitHub: https://github.com/TheDigitalCatWoman/mealmate

## Benodigdheden

- **Node.js** (versie 18 of hoger aanbevolen)
- **npm** (wordt meegeleverd met Node.js)
- **Git** (optioneel, voor het clonen van de repository)

## Installatie Stappen

1. **Repository downloaden**

   Clone de repository met Git of download het project als zip-bestand en pak het uit.

   ```bash
   git clone git@github.com:TheDigitalCatWoman/mealmate.git
   cd mealmate
   ```

2. **Afhankelijkheden installeren**

   Installeer de benodigde npm packages:

   ```bash
   npm install
   ```

3. **.env bestand aanmaken**

   Maak een bestand genaamd `.env` in de hoofdmap van het project en voeg de volgende regel toe:

   ```
   VITE_NOVI_API_URL=https://novi-backend-api-wgsgz.ondigitalocean.app
   VITE_SPOONACULAR_API_KEY=<jouw_spoonacular_api_key>
   ```

   Het is ook mogelijk om `.env.example` te kopieeren naar `.env`.

   Vervang `<jouw_spoonacular_api_key>` door `cabbfa370ce14f48838c4d20d2e64103`. Normaal deel je een API key niet maar ter beoordeling staat die er bij.

4. **Project starten**

   Start de ontwikkelserver:

   ```bash
   npm run dev
   ```

   De applicatie is nu bereikbaar op [http://localhost:5173](http://localhost:5173) (of een andere poort die in de terminal wordt weergegeven).

## Opmerkingen

- Zorg dat je Node.js en npm correct geïnstalleerd hebt. Controleer dit met `node -v` en `npm -v`.
- Voor productie kun je het project bouwen met `npm run build`.

## Testgebruikers

|Gebruiker|Wachtwoord|Rol|
|---------|----------|---|
|admin123@mealmate.com|admin123|admin|
|editor@mealmate.com|werkers123|editor|
|member@mealmate.com|member123|member|

---

Veel succes met MealMate!
