import '../sass/style.scss';
//import { $, $$ } from './modules/bling';
const $ = require('jquery');
const validate = require('jquery-validation');

$(document).ready(function(){
  $(".navbar-burger").click(function(){
    $(".navbar-menu").toggleClass('is-active');
  });

  // Register Modal
  $(".button-registerModal").click(function(){
    $(".modal-register").addClass("is-active");
  });

  $(".modal-close-register").click(function(){
    $(".modal-register").removeClass("is-active");
  });

  $(".modal-register-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 6
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      },
      password_repeat: {
        required: true,
        minlength: 8,
        equalTo: password
      }
    },
    errorClass: "is-danger",
    validClass: "is-success"
  }); // validate Ends

  $(".modal-register-button").on('click', function(e){
    var validator = $(".modal-register-form").validate();
    if(validator){
      var formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'password': $('input[name=password]').val(),
        'password_repeat': $('input[name=password_repeat]').val()
      };

      $.ajax({
        type: "POST",
        url: "/register",
        data: formData,
        dataType: 'json',
        success: function(result){
          $(".modal-message").html('An authentication link has been sent to your email, please check your email and click the link in one hour');
          $(".modal-register-form").hide();
          $(".modal-register-button").hide();
          $(".modal-cancel-register-button").hide();
        },
        error: function (xhr, status, error) {
          //console.log(xhr.status);
          //console.log(xhr.responseText);
          var message = JSON.parse(xhr.responseText);
          $(".message").html(`
            <article class="message is-small is-danger">
              <div class="message-body">
                ${message.message}
              </div>
            </article>`
          );
        }
      });
    }else{
      $(".input").addClass("is-danger");
    }
    e.preventDefault();
  });

  $(".login-modal-button").on('click', function(){
    $(".modal-register").removeClass("is-active");
    $(".modal-login").addClass("is-active");
  });
  // Register Modal Ends

  // Login Modal
  $(".button-loginModal").click(function(){
    $(".modal-login").addClass("is-active");
  });

  $(".modal-close-login").click(function(){
    $(".modal-login").removeClass("is-active");
  });

  $(".modal-login-form").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      }
    },
    errorClass: "is-danger",
    validClass: "is-success"
  }); // validate Ends

  $(".modal-login-button").on('click', function(){
    var validator = $(".modal-login-form").validate();
    if(validator){
      var formData = {
        'email': $('input[name=email]').val(),
        'password': $('input[name=password]').val()
      };

      $.ajax({
        type: "POST",
        url: "/login-modal",
        data: formData,
        dataType: 'json',
        success: function(result){
          if(result){
            console.log(result);
            $(".modal-login").removeClass("is-active");
            location.reload();
          }else{
            $(".message").html('Username and password do not match');
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.status);
          console.log(error);
        }
      });
    }else{
      $(".input").addClass("is-danger");
    };
  });
  // Login Modal Ends
});
