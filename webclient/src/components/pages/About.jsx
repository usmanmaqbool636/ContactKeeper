import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
const About = () => {
    document.title = "KeepContact - About";
    return (
        <div>
            <div>
                <h1>About Developer</h1>
                <p>
                    <span style={{ fontSize: "180%", fontWeight: "bold" }}>contact me using : </span>
                    <br />
                    Gmail :usmanmaqbool636@gmail.com
                    <br />
                    Skype Name :usmanmaqbool636
                    <br/>
                    <br />
                    <a href="https://www.linkedin.com/in/usmanmaqbool636">
                        <Button color='linkedin'>
                            <Icon name='linkedin' /> LinkedIn
                        </Button>
                    </a>
                    <a href="mailto:usmanmaqbool636@gmail.com">
                        <Button color='google'  >
                            <Icon name='google' /> Google
                    </Button>
                    </a>
                    <h2>or hire me on upwork</h2>
                    <a href="https://www.upwork.com/freelancers/~01da6cd2e340d3be78?viewMode=1">
                        <Button color='green'  >
                            Upwork
                        </Button>
                    </a>
                </p>
                <p style={{ textAlign: "justify" }}>
                    I am a Full Stack MERN with 2 years of experience in JS. 
                    I have through understanding Bootstrap 4, Materialize CSS and Semantic UI.
                    To enhance the experience of the web I use JavaScript (ES5, ES6, ES7).

                    For Backend, I do development in Node js, Google`s firebase Functions, Express js..
                    For Database, I'm using MongoDB using pure mongo DB syntax and with Mongoose, Google’s Firebase.

                    For Deployment, I have experience in Heroku Deployment Google Cloud Deployment and Netlify
                    In addition to these development working experience, I hold a Bachelor degree in Computer Science.
                </p>
            </div>
            <hr />
            <div>
                <h1>About this App</h1>
                <p className="my-1">
                    This is full stack app for keeping contacts
            </p>
                <p className="bg-dark p">
                    <strong>1.0.0</strong>
                </p>
            </div>
        </div>
    )
}
export default About