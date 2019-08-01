const FFCApi ='https://ffc-server.herokuapp.com/api/';
const FFCLocal ='http://localhost:3002/api/'
const playerLocal = 'http://localhost:3000/api/players'

export function restangularConfigFactory(RestangularProvider){
    RestangularProvider.setBaseUrl(FFCApi)
}