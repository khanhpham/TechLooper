techlooper.factory("tsMainService", function (jsonValue, $http, $location) {
  //var locations, skills, titles, companies;
  var searchRequest = {};
  var instance = {
    enableSelectOptions: function () {
      $.each([
        {key: "skills", selector: "#input-skill"},
        {key: "companies", selector: "#company"},
        {key: "locations", selector: "#select-location"},
        //{key: "locations", selector: "#select-location", options: jsonValue.cities},
      ], function (i, item) {
        searchRequest[item.key] = $(item.selector);
        //searchRequest[item.key] = $(item.selector).selectize({
        //  plugins: {
        //    "remove_button": {},
        //    "restore_on_backspace": {},
        //    "techlooper": {onReturn: instance.searchTalent}
        //  },
        //  mode: "multi",
        //  persist: false,
        //  createOnBlur: false,
        //  preload: true,
        //  create: function(input) {
        //    return {
        //      value: input,
        //      text: input
        //    }
        //  },
        //  valueField: "text",
        //  searchField: ['text'],
        //  labelField: "text",
        //  createFilter: function (input) {
        //    var ok = true;
        //    $.each(this.options, function (index, value) {
        //      if (value.text.toLowerCase() === input.toLowerCase()) {
        //        ok = false;
        //        return false;
        //      }
        //    });
        //    return ok;
        //  },
        //  render: {
        //    item: function (item, escape) {
        //      return "<div>" + item.text + " </div>";
        //    },
        //    option: function (item, escape) {
        //      return "<div>" + item.text + " </div>";
        //    }
        //  }
        //})[0].selectize;
        //
        //if (item.options !== undefined) {
        //  searchRequest[item.key].addOption(item.options);
        //}
      });
    },
    searchTalent: function () {
      //var request = {
      //  keywords: searchRequest.keywords.getValue().split(","),
      //  locations: searchRequest.locations.getValue().split(",")
      //}
      var request = {};
      for (var prop in searchRequest) {
        if (searchRequest[prop].val().trim().length > 0) {
          request[prop] = searchRequest[prop].val();
        }
      }

      var q = "";
      for (var prop in request) {
        if (request[prop][0] !== "") {
          q += prop + ":" + request[prop] + "::";
        }
      }
      //if (q === "") {
      //  return;
      //}

      $location.path(jsonValue.routerUris.talentSearchResult + "/" + $.base64.encode(q));
    },

    //validationFeedback: function () {
    //  $('.send-feedback').click(function (event) {
    //    event.preventDefault();
    //    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    //      feedBack = $('#txtFeedback').val(),
    //      email = $('#txtEmail').val();
    //    var errorContent = '';
    //    $('.error-messages').text('');
    //    var inputVal = new Array(email, feedBack);
    //    var inputMessage = new Array("Email", "Your Message");
    //    $.each(inputVal, function (index, value) {
    //      if (value == "") {
    //        if (errorContent == '') {
    //          errorContent = inputMessage[index];
    //        }
    //        else {
    //          errorContent = errorContent + ', ' + inputMessage[index];
    //        }
    //      }
    //    });
    //    if (email != '' && !emailReg.test(email)) {
    //      if (errorContent == '') {
    //        errorContent = 'Email address is not valid';
    //      }
    //      else {
    //        errorContent = errorContent + ', Email address is not valid';
    //      }
    //    }
    //    if (errorContent != '') {
    //      $('.error-messages').append('Please enter your <strong>' + errorContent + '</strong>');
    //    }
    //    else {
    //      alert('Thank you for your feedback')
    //    }
    //  });
    //},
    getSearchRequest: function () {
      return searchRequest;
    },
    scrollToReason: function () {
      $('.scroll-btn').click(function () {
        if ($('.reasons').length > 0) {
          $('html,body').animate({scrollTop: $('.reasons').offset().top - 45}, 800);
        }
      });
    }
  };

  return instance;

});