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