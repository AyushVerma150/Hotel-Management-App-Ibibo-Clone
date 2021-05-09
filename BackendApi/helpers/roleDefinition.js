//roles object gives the permissions according to different roles.
const roles = {
    admin: {
        can: ['edit', 'delete', 'update', 'create']
    },
    user: {
        can: ['signup', 'login', 'view']
    },
    guest: {
        cac: ['view']
    }
};


module.exports = roles;