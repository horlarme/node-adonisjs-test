import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'Users/RegisterController.handle')
Route.get('/profile', 'Users/ProfileController.handle').middleware('auth')
