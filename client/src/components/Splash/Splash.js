import React from "react";
import "./Splash.css";

const Splash = () => (

<div className="Splash">
    <nav>
    <div className="nav-wrapper #fb8c00 orange darken-1">
        <a className="brand-logo"><i className="material-icons">
            date_range</i>
            Ultimate<strong>Organizer</strong>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="#">Login</a></li>
        <li><a href="#">Log Out</a></li>
        </ul>
    </div>
    </nav>

    <div className="jumbotron">
        <h1 className="display-4">Your Family Command Center</h1>
        <p className="lead"> Keep your family organized with a click of a button. Click below to get started.</p>
        <p className="lead"></p>
        <hr className="my-4" />
        <p></p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Create a free account</a>
    </div>

    <div className="container">
    <div className="row">
      <div className="col-sm-6">
        <img src="../../images/date-night.png" style={{width:1000}} alt="" />
      </div>

      <div className="col-sm-6" text-center>
        <h3>Don't forget another birthday, date night, or anniversary!</h3>
        <p className="lead"> If it's happened once, it will happen again. Forgetting an important date, no matter how
          legitimate the excuse, makes you seem insensitive, uncaring, and selfish. You can avoid all of that by
          simplying plugging in all important birthdays, anniversaries, and date nights in advanced. </p>

      </div>
    </div>
    </div>
    <hr /> 
    <div className="container">
        <div className="row">
            <div className="col-sm-6" text-center>
                <h3> What do you want for dinner tonight?</h3>
                <p className="lead"> It's 4:45. Do you know what you're having for dinner tonight? If not, then you go through the
                    normal drill of texting your spouse and then waiting ten minutes for a response. You get to the grocery store
                    and you have no clue what to buy. With the Ultimate Organizer app, not only do you get to meal prep early on
                    in the week, but you get to add recipes that you'd like to try.
                </p>
            </div>
            <div className="col-sm-6">
                <img src="../../images/bbq.png" style={{width:1300}} alt="" />
            </div>
        </div>
    </div>
    <hr />

    <div className="container">
        <div className="row">
            <div className="col-sm-6">
                <img src="../../images/bicycle-1296063_640.png" style={{width:1300}} alt="" />
            </div>

            <div className="col-sm-6" text-center>
                <h3>Keep track of all upcoming family functions</h3>
                <p className="lead"> We all know about the major holidays we must plan for, but what about
                    "smaller-but-just-as-important" events that happen almost every month? We're talking soccer practice,
                    neighboorhood cook-offs, family reunions, work potlucks, etc. Stay on track of these events by simply adding
    them to the app. Set reminders so you'll know exactly when to show up. </p>

            </div>
        </div>
    </div>
    <hr />
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src="../../images/sample-1.jpg" alt="" />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>



  <div className="padding">

    <div className="container">

      <div className="title">
        <h3>You don't need a smart home to ease chaos.</h3>
        <h3>You need a smart system.</h3>
        <br />
        <h6>The Ultimate Organizer gives you an easy-to-use system your whole family will love.</h6>
        <h6>Take a look below at how this digital organizer can help you. </h6>

      </div>

      <div className="icon">
        <img src="../../images/icons.png" style={{textAlign: 'center'}} alt="" />
      </div>
    </div>
  </div>
 
  <div className="parallax-container">
    <div className="parallax"><img src="../../images/tablet-pllx.jpg" alt="" /></div>
  </div>

  <div className="padding">
    <div className="container">
      <div className="cta">
        <h3> Get started today for free!</h3>


        <div className="row">
          <div className="col-sm-6">
            <img src="../../images/cool-family.jpg" style={{width:1000}} alt="" />
          </div>

          <div className="col-sm-6" text-center>
            <h3>Get Your Family Organized</h3>
            <p className="lead"> Be the cool, calm, collected family that's prepared for anything. Create an account today
              to get started. </p>

          </div>
        </div>


      </div>
    </div>
  </div>

  <div id="my-signin2"></div>
  
  <footer className="page-footer #f57c00 orange darken-2">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">The Ultimate Organizer</h5>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text"></h5>
          <form action="/signup" method="post">
            <div>
                <label>Email:</label>
                <input type="text" name="email"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        © 2018 Copyright. All Rights Reserved.
      </div>
    </div>
  </footer>
  </div>
);
export default Splash;