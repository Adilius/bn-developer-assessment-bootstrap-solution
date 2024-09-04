# Lösning för bn-developer-assessment-bootstrap

Lösning för ett [publikt repo från Bonnier News](https://github.com/BonnierNews/bn-developer-assessment-bootstrap) om att hämta RSS-flöden och visa dem i en webbapplikation i Node.js.

## Installera och kör

1. Installera beroende moduler: `npm install`
2. Kör applikation: `node app.js`

## Lösningen
Tillagda bibliotek som används lösningen
* **[path](https://nodejs.org/api/path.html)** : Inbyggd modul i Node.js för att hantera filsökväg och katalogsökväg
* **[fs](https://nodejs.org/api/fs.html)** : Inbyggd modul i Node.js för att hämta, lagra, och hantera filer på systemet
* **[xml2js](https://www.npmjs.com/package/xml2js)** : NPM modul för att enkelt omvandla XML till Javascript objekt.

Hämta alla RSS-flöden samtidigt från länkarna med asynkrona löften (*Promises*). Resultatet sparas i en hashtabell (*Map*) med titel som nyckel för att endast behålla unika artiklar. Från varje artikel i RSS-flödet sparas endast titel, länk till nyhetsartikeln, och publikationsdatum. Sist sorteras artiklarna i fallande datumordning, varav 10 senaste artiklar skickas som svar från webbapplikationen.

## Skärmbild av resultat

![image](https://github.com/user-attachments/assets/bdc0ecea-c189-495a-8d4a-72710b88e7ac)

## Förbättringar

* **Lägga till tester**: Modularisera de olika funktioner så som att hämta länkarna från `.json`-filen och de olika stegen från att hämta RSS-flöde till att returnera de 10 senaste artiklerna och skapa enhetstester för de funktionerna.
* **Cachning**: Istället för att hämta RSS-flöden vid varje sidladning som både tar egna och andras serverresurser så bör resultatet lagras i processminne eller lagring i en fil för att snabbare hämtas och inte påfresta servrarna i onödan. Sådan cachning bör uppdateras regelbundet nog att hålla sig relativt uppdaterad men också under en troligtvis begränsningsgräns (*rate limit*).
* **Användargränssnitt**: Skapa ett enkelt användargränssnit med endast HTML/CSS eller React för att enklare läsa texten, möjligtvis visa bilder, och enkelt klicka sig vidare till artikeln med hjälp av en \<a\>-tagg
