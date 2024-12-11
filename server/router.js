const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/books', mid.requiresLogin, controllers.Book.getBooks);
  app.post('/books', mid.requiresLogin, controllers.Book.addBook);
// Add routes for updating and deleting books

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/admin-login', mid.requiresSecure, mid.requiresLogout, (req, res) => {
    res.render('admin-login');
  });

  app.post('/admin', (req, res) => {
    const { adminPass } = req.body;
    if (adminPass === 'book123!') {
      res.render('admin-dashboard');
    } else {
      res.status(401).send('Unauthorized');
    }
  });

  app.post('/admin/add-book', controllers.Book.addBook);
  app.post('/admin/update-book/:id', controllers.Book.updateById);
  app.post('/admin/delete-book/:id', controllers.Book.deleteById);
  

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};
module.exports = router;
