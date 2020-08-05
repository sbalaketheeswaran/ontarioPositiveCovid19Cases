# ontarioPositiveCovid19Cases
REST API access for daily reported data from the public health units on confirmed positive cases of COVID-19 in Ontario 

Available endpoints: 

https://covid-19-in-ontario-rest-api.herokuapp.com/OntarioMetaCovidCase

https://covid-19-in-ontario-rest-api.herokuapp.com/PublicHealthUnit (/{id} will give specific public heat unit)




If interested, there is already an available CKAN action API provided that grants direct access to the dataset. However, I found running complex queries to be a bit challenging using the CKAN API and decided to build my own freestanding REST API using the data provided instead. 

Data source -> https://data.ontario.ca/dataset/confirmed-positive-cases-of-covid-19-in-ontario/resource/455fd63b-603d-4608-8216-7d8647f43350
