import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'Users/RegisterController.handle')
Route.get('/profile', 'Users/ProfileController.handle').middleware('auth')
Route.post('/fund', 'FundWallet.handle').middleware('auth')
Route.get('/confirm', 'VerifyPayment.handle').as('paymentConfirmation')
Route.post('/transfer', 'Transfer.handle').middleware('auth')
Route.get('/beneficiaries', 'Beneficiaries.handle').middleware('auth')
Route.post('/beneficiaries', 'AddBeneficiary.handle').middleware('auth')
Route.post('/withdraw', 'Withdraw.handle').middleware('auth')
