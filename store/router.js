const url = process.env.URL_CLIENT + '/api/';
export default {
  me: {
    menu: url + 'menu',
  },
  register: url + 'register', 
  product: {
    lists: url + 'product',
    info: url + 'product/{:id}',
    update: url + 'product/{:id}',
    create: url + 'product',
    delete: url + 'product/{:id}',
    import: url + 'product/{:id}/import',
  }, 
  member_user: {
    lists: url + 'member-user',
    info: url + 'member-user/{:id}',
    update: url + 'member-user/{:id}',
    create: url + 'member-user',
    delete: url + 'member-user/{:id}',
  }, 
  count_product: {
    lists: url + 'count-product',
    info: url + 'count-product/{:id}',
    update: url + 'count-product/{:id}',
    create: url + 'count-product',
    delete: url + 'count-product/{:id}',
  },
}