import $ from "jquery";
import { ACTIONS } from "../config/constant";

function makeApiRequest(url,type=ACTIONS.get,data={}) {
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