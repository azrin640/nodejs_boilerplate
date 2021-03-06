import '../sass/style.scss';
//import { $, $$ } from './modules/bling';
const $ = require('jquery');
const validate = require('jquery-validation');
import './modules/turnjs/turn.js';

$(document).ready(function(){

  $(".navbar-burger").click(function(){
    $(".navbar-menu").toggleClass('is-active');
  });

  // Register Modal
  $(".button-registerModal").click(function(){
    $(".modal-register").addClass("is-active");
    if(deferredPrompt){
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choiceResult){
        console.log(choiceResult.outcome);
        if(choiceResult.outcome === 'dismissed'){
          console.log('User cancelled installation');
        }else{
          console.log('User addded to Homescreen');
        }
      });
      deferredPrompt = null;
    }
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
        equalTo: "#password"
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
          console.log(xhr.responseText);
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

  // Profile Modal
  $(".profile-dropdown-button").click(function(){
    $(".dropdown").toggleClass("is-active");
  });

  $(".user-profile-link").click(function(){
    $(".modal-profile").addClass("is-active");
  });

  $(".modal-profile-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 6
      },
      email: {
        required: true,
        email: true
      },
      mobile: {
        required: true,
        minlength: 10
      },
      phone: {
        required: true,
        minlength: 10
      },
      facebook: {
        required: true
      }
    },
    errorClass: "is-danger",
    validClass: "is-success"
  });

  $(".modal-profile-button").on('click', function(e){
    var validator = $(".modal-profile-form").validate();
    if(validator){
      var formData = {
        'name': $('input[name=profile-name]').val(),
        'email': $('input[name=profile-email]').val(),
        'mobile': $('input[name=profile-mobile]').val(),
        'phone': $('input[name=profile-phone]').val(),
        'facebook': $('input[name=profile-facebook]').val()
      };

      console.log(formData);

      $.ajax({
        type: "POST",
        url: "/profile/update",
        data: formData,
        dataType: 'json',
        success: function(result){
          $(".modal-message").html('Your profile has been updated');
          $(".modal-profile-form").hide();
          $(".modal-profile-button").hide();
          $(".modal-close-profile-button").hide();
        },
        error: function (xhr, status, error) {
          // console.log(xhr.status);
          //console.log(xhr.responseText);
          //var message = JSON.parse(xhr.responseText);
          var message = xhr.responseText;
          console.log(message);
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

  $(".modal-close-profile").click(function(){
    $(".modal-profile").removeClass("is-active");
  });

  $(".modal-close-profile-button").click(function(){
    $(".modal-profile").removeClass("is-active");
  });
  // Profile Modal Ends

  // Facebook Modal
  $(".user-profile-facebook-link").click(function(){
    $(".modal-facebook").addClass("is-active");
  });

  $(".modal-close-facebook").click(function(){
    $(".modal-facebook").removeClass("is-active");
  });

  $(".modal-facebook-button").on('click', function(e){
    var validator = $(".modal-facebook-form").validate();
    if(validator){
      var formData = {
        'id': $('input[name=id]').val(),
        'facebook': $('input[name=profile-facebook]').val()
      };

      $.ajax({
        type: "POST",
        url: "/facebook/update",
        data: formData,
        dataType: 'json',
        success: function(result){
          $(".modal-message").html('Your facebook profile has been updated');
          $(".modal-facebook-form").hide();
          $(".modal-facebook-button").hide();
          $(".modal-facebook-button").hide();
        },
        error: function (xhr, status, error) {
          // console.log(xhr.status);
          //console.log(xhr.responseText);
          //var message = JSON.parse(xhr.responseText);
          var message = xhr.responseText;
          console.log(message);
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

  $(".flipbook").turn({
    gradients: true,
    autoCenter: true

  });

  $(".flipbookNext").click(function(){
    $(".flipbook").turn("next");
  });

  $(".flipbookPrevious").click(function(){
    $(".flipbook").turn("previous");
  });

});
