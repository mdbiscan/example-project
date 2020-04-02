import userRole from 'example/types/user-role';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.create('user', {
    id: '1',
    email: 'admin@example.com',
    type: userRole.VIEW_ONLY,
  });
}
