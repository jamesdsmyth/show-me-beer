var Data = {
  "beers" : {
    "London Pale Ale" : {
      "cityOrigin" : "London",
      "alcoholContent" : 4,
      "countryOrigin" : "England",
      "description" : "Short description",
      "locations" : {
        "The Hunter S" : {
            "coords": {
                "longitude" :  51.505,
                "latitude" : -0.09
            },
        },
        "The Fox" : {
            "coords": {
                "longitude" :  51.505,
                "latitude" : -2.0
            },
        }
      },
      "name" : "London Pale Ale",
      "photo" : "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/pimages/MeantimeLondonPaleAle.jpg",
      "type" : "pale ale"
    }
  },
  "locations" : {
    "The Hunter S" : {
      "LocationPostCode" : "E8 4EH",
      "beers" : {
        "London Pale Ale" : {
            "alcoholContent" : 4,
            "price" : 4.95,
            "type" : "pale ale",
            "countryOrigin" : "England",
            "photo" : "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/pimages/MeantimeLondonPaleAle.jpg"
        }
      },
      "description" : "Long description of The Hunter S",
      "locationBorough" : "Tower Hamlets",
      "locationCity" : "London",
      "locationCountry" : "England",
      "coords": {
          "longitude" :  51.505,
          "latitude" : -0.09
      },
      "name" : "The Hunter S"
      },
      "The Fox" : {
        "LocationPostCode" : "N1 4ES",
        "beers" : {
          "London Pale Ale" : {
              "alcoholContent" : 4,
              "price" : 4.95,
              "type" : "pale ale",
              "countryOrigin" : "England",
              "photo" : "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/pimages/MeantimeLondonPaleAle.jpg"
          }
        },
        "description" : "Long description of The Fox",
        "locationBorough" : "God Knows",
        "locationCity" : "Bristol",
        "locationCountry" : "England",
        "coords": {
            "longitude" :  51.505,
            "latitude" : -2.0
        },
        "name" : "The Fox"
      }
  },
   "shortLocations" : {
       "The Hunter S" : {
         "LocationPostCode" : "E8 4EH",
         "locationBorough" : "Tower Hamlets",
         "locationCity" : "London",
         "locationCountry" : "England",
         "coords": {
             "longitude" :  51.505,
             "latitude" : -0.09
         },
         "name" : "The Hunter S"
         },
         "The Fox" : {
           "LocationPostCode" : "N1 4ES",
           "locationBorough" : "God Knows",
           "locationCity" : "Bristol",
           "locationCountry" : "England",
           "coords": {
               "longitude" :  51.505,
               "latitude" : -2.0
           },
           "name" : "The Fox"
         }
   },
   "beerTypes" : ['ale', 'lager', 'stout'],
   "beerStyles" : ['amber', 'blond', 'brown', 'cream', 'dark', 'golden', 'honey', 'pale ale', 'light', 'pilsner', 'red', 'strong']
}

export default Data
