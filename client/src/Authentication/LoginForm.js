import React from 'react';
import './LoginForm.css'
import Button from "../Button"
import GoogleImg from "../assets/google_signin.png"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: 0
        };
        this.loginState = this.loginState.bind(this);
        this.updateLoginState = this.updateLoginState.bind(this);
    }

    loginState() {
        if (this.state.login === 0) {
            return this.renderLogin();
        } else {
            return this.renderRegister();
        }
    }

    async simulateLogin() {
        console.log("Calling simulate Login")
        var user = "";
        var pass = "";
        const loginAuth = await this.authenticate(user, pass)
        if (loginAuth.auth === true) {
            window.location.href = "/api/home"
        } 
    }

    renderLogin() {
        return(
            <form className="auth-form">
                <button className="google-button" onClick={() => this.openGoogleLogin()}>
                    <img src={GoogleImg} alt="Google Login Button" />
                </button>
                <input className="login-input" type="text" placeholder="Username" name="Username"/>
                <input className="login-input" type="password" placeholder="Password" name="Password"/>
                <Button name="Login" url="/api/home"/>
                <p>New user? 
                    <a href="#" onClick={() => {
                        // console.log("clicked")
                        this.setState({login: 1})
                    }}>
                         Sign up here.</a>
                </p>
            </form>
        )
    }

    renderRegister() {
        return(
            <form className="auth-form registration">
                <button className="google-button" onClick={() => this.openGoogleLogin()}>
                    <img src={GoogleImg} alt="Google Login Button" />
                </button>
                <input className="login-input" type="text" placeholder="Username" name="Email"/>
                <input className="login-input" type="password" placeholder="Password" name="Password"/>
                <input className="login-input" type="password" placeholder="Confirm Password" name="Confirm Password"/>
                <Button name="Register" url="/api/home"/>
                <p>Already have an account?  
                    <a href="#" onClick={() => {
                        this.setState({login: 0})
                    }}>
                         Log in here.</a>
                </p>

            </form>
        )
    }

    updateLoginState(num) {
        this.setState({login: num});
    }

    render() {
        return (
            <div className="LoginForm">
                <h1 className={"Title"}>Documentary Songwriters</h1>
                <div className="login_area flex_container">
                    <div className={"user_login login_section"}>
                        {this.loginState()}
                    </div>
                </div>

            </div>
        );
    };

    openGoogleLogin = () => {
        window.open("http://localhost:5000/auth/google/", "Login",'height=800,width=500');
    };

    componentDidMount = () => {
        window.addEventListener('message', (event) => {
            console.log(event.data);
            if (event.origin.startsWith("http://localhost:5000")) {
                console.log("User " + event.data + " successfully logged in.");
                window.location = "/api/home";
            }
        });
    }
}

export default LoginForm
