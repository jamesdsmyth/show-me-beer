var Data = {
  "beers" : {
    "london-pale-ale" : {
      "cityOrigin" : "London",
      "alcoholContent" : 4,
      "countryOrigin" : "England",
      "description" : "Short description",
      "locations" : {
        "the-hunter-s" : {
            "name": "The Hunter S",
            "coords": {
                "longitude" :  51.505,
                "latitude" : -0.09
            },
        },
        "the-fox" : {
            "name": "The Fox",
            "coords": {
                "longitude" :  51.505,
                "latitude" : -2.0
            },
        }
      },
      "name" : "London Pale Ale",
      "photo" : "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/pimages/MeantimeLondonPaleAle.jpg",
      "type" : "ale",
      "style": "pale ale"
    }
  },
  "locations" : {
    "the-hunter-s" : {
      "postCode" : "E8 4EH",
      "beers" : {
        "london-pale-ale" : {
            "name": "London Pale Ale",
            "alcoholContent" : 4,
            "price" : 4.95,
            "type" : "ale",
            "style": "pale ale",
            "countryOrigin" : "England",
            "photo" : "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/pimages/MeantimeLondonPaleAle.jpg"
        }
      },
      "description" : "Long description of The Hunter S",
      "borough" : "Tower Hamlets",
      "city" : "London",
      "locationCountry" : "England",
      "coords": {
          "longitude" :  51.505,
          "latitude" : -0.09
      },
      "name" : "The Hunter S"
      },
      "the-fox" : {
        "postCode" : "N1 4ES",
        "beers" : {
          "london-pale-ale" : {
              "name": "London Pale Ale",
              "alcoholContent" : 4,
              "price" : 4.95,
              "type" : "ale",
              "style": "pale ale",
              "countryOrigin" : "England",
              "photo" : "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/pimages/MeantimeLondonPaleAle.jpg"
          }
        },
        "description" : "Long description of The Fox",
        "borough" : "God Knows",
        "city" : "Bristol",
        "locationCountry" : "England",
        "coords": {
            "longitude" :  51.505,
            "latitude" : -2.0
        },
        "name" : "The Fox"
      }
  },
   "shortLocations" : {
       "the-hunter-s" : {
         "postCode" : "E8 4EH",
         "borough" : "Tower Hamlets",
         "city" : "London",
         "locationCountry" : "England",
         "coords": {
             "longitude" :  51.505,
             "latitude" : -0.09
         },
         "name" : "The Hunter S"
         },
         "the-fox" : {
           "postCode" : "N1 4ES",
           "borough" : "God Knows",
           "city" : "Bristol",
           "locationCountry" : "England",
           "coords": {
               "longitude" :  51.505,
               "latitude" : -2.0
           },
           "name" : "The Fox"
         }
   },
   "beerTypes" : [
       'ale',
       'lager',
       'stout',
       'malt'
   ],
   "beerStyles" : [
       'amber',
       'blond',
       'brown',
       'cream',
       'dark',
       'golden',
       'honey',
       'pale ale',
       'light',
       'pilsner',
       'red',
       'strong'
   ],
   "boroughs": [
       'Barking and Dagenham',
       'Barnet',
       'Bexley',
       'Brent',
       'Bromley',
       'Camden',
       'City of London',
       'Croyden',
       'Ealing',
       'Enfield',
       'Greenwich',
       'Hackney',
       'Hammersmith and Fulham',
       'Haringey',
       'Harrow',
       'Havering',
       'Hillingdon',
       'Hounslow',
       'Islington',
       'Kensington and Chelsea',
       'Kingston upon Thames',
       'Lambeth',
       'Lewisham',
       'Merton',
       'Newham',
       'Redbridge',
       'Richmond upon Thames',
       'Southwark',
       'Sutton',
       'Tower Hamlets',
       'Waltham Forest',
       'Wandsworth',
       'Westminster'
   ]
}

export default Data
