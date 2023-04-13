import express from 'express'

// de basis url van de api
const url = 'https://restcountries.com/v3.1/all'

// maak een nieuwe express app
const server = express()

// Stel het poortnummer in
server.set('port', process.env.PORT || 8000)

// Stel de view engine in
server.set('view engine', 'ejs')
server.set('views', './views')

// Stel de public map in
server.use(express.static('public'))

// Maak een route voor de index
server.get('/', (request, response) => {
 
    fetchJson(url).then((data) => {
      response.render('index', {countries: data})
    })
  })

//   route voor als je zoekt op een land
  server.get('/search', (request, response) => {
    const query = request.query.name;
    const url = `https://restcountries.com/v3.1/name/${query}`;

    fetchJson(url).then((data) => {
      response.render('search', {country: data, query: query})
    })
  })

  // route voor als je zoekt op continent
  
  // array waar elke region max 1x in komt
  const regions = [];

  server.get('/regions-page', (request, response) => {
    const url = `https://restcountries.com/v3.1/all?fields=region`

    fetchJson(url).then(data => {
      data.forEach(country => {
        const region = country.region;

        // voeg de regio toe aan de array als deze nog niet is weergegeven
        if (!regions.includes(region)) {
          regions.push(region);
        }
      });
      
      response.render('regions-page', {regions: regions})
    })
  })

  // route voor als je een region in de regions-page aanklikt
  server.get('/region', (request, response) => {
    const query = request.query.region;
    const url = `https://restcountries.com/v3.1/region/${query}`;

    fetchJson(url).then((data) => {
      response.render('region', {country: data, query: query})
    })
  })

  // route voor als je een land in de index aanklikt
  server.get('/country', (request, response) => {
    const query = request.query.name;
    const url = `https://restcountries.com/v3.1/name/${query}`;

    fetchJson(url).then((data) => {
      response.render('country', {country: data, query: query})
    })
  })

    // definieer de fetchJson functie
    async function fetchJson(url) {
        return await fetch(url)
          .then((response) => response.json())
          .catch((error) => error)
      }
      
      // Start met luisteren
    server.listen(server.get('port'), () => {
        console.log(`Application started on http://localhost:${server.get('port')}`)
      })