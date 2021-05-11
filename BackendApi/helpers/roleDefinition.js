//roles object gives the permissions according to different roles.
const constants = require("../utils/constants");

const roles = {
  admin: {
    can: constants.adminRolesAllowed,
  },
  user: {
    can: constants.userRolesAllowed,
  },
  guest: {
    can: constants.guestRolesAllowed,
  },
};

module.exports = roles;
