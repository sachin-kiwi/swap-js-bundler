import $ from "jquery";

function makeApiRequest(url,type='GET',data={}) {
  return $.ajax({
    url,
    type,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(result) {
      return result
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + textStatus + ' - ' + errorThrown);
    }
  });
}

export {makeApiRequest}