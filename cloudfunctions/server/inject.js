const dao = {};
const services = {}

function inject() {
    const {UserDao, AppointDao, LibraryDao} = require('./dao');
    const {UserService, LibraryService, AppointService} = require('./services');

    dao.userDao = new UserDao();
    dao.appointDao = new AppointDao();
    dao.libraryDao = new LibraryDao();

    services.userService = new UserService();
    services.libraryService = new LibraryService();
    services.appointService = new AppointService();
}

module.exports = {
    services,
    dao,
    inject
};
