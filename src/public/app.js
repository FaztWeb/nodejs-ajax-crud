$(function () {

  const URI = '/api/products';

  // GET PRODUCTS
  $('#getProducts').on('click', () => {
    $.ajax({
      url: URI,
      success: function (products) {
        let tbody = $('tbody');
        tbody.html('');
        products.forEach(product => {
          tbody.append(`
              <tr>
                <td class="id">${product.id}</td>
                <td>
                  <input type="text" class="name" value="${product.name}"/>
                </td>
                <td>
                  <button class="update-button">UPDATE</button>
                  <button class="delete-button">DELETE</button>
                </td>
              </tr>
          `)
        })
      }
    });
  });

  // POST PRODUCTS
  $('#productForm').on('submit', (e) => {
    e.preventDefault();
    let newProduct = $('#newProduct');

    $.ajax({
      url: URI,
      method: 'POST',
      data: {
        name: newProduct.val()
      },
      success: function(response) {
       newProduct.val('');
       $('#getProducts').click();
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
  
  $('table').on('click', '.update-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let name = row.find('.name').val();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'PUT',
      data: {
        name: name 
      },
      success: function(response) {
        console.log(response);
        $('#getProducts').click();
      }
    });
  });

  $('table').on('click', '.delete-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'DELETE',
      success: function (response) {
       $('#getProducts').click();
      }
    });
  });

});
