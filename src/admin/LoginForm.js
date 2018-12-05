import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {bindActionCreators} from "redux";
import app from '../firebase'


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }
    renderField(field) {
        const {input, meta: {touched, error}} = field;
        const cname = `form-group ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <input className="form-control large-input"
                       {...input} {...field}
                />
                <div className="error-msg">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderError() {
        console.log("here")
        if (this.state.message) {
            console.log(this.state.message)
            return (
                <div className="text-help">
                    {this.state.message}
                </div>
            );
        }
    }
    onSubmit(values) {
        console.log(values);
        app.auth().onAuthStateChanged((user) => {
            if (user.emailVerified) {
                console.log('Email is verified');
                console.log(user);
                console.log(this.props.history)
                this.props.history.push('/dashboard');
                console.log(user);
            } else {
                alert(`Please verify your email: ${user.email} for verification link`);
                app.auth().signOut();
                console.log('Email is not verified');
            }
        });
    }
    render() {
        console.log(this.props.error)
        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        return (
            <div className="panel col-md-5">
                <div className="sub-panel">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                        <div id="ErrorMessageWrapper">
                            <div id="signin-error" className="error-msg" component={this.renderError}>{this.renderError()}</div>
                            <br/>
                        </div>
                        <label htmlFor="UsernameBox" className="font-family-roboto">Email Address</label>
                        <Field name="email" type="text" id="UsernameBox" component={this.renderField}/>
                        <label htmlFor="PasswordBox" className="font-family-roboto">Password</label>
                        <Field name="password" type="password" maxLength="40" id="PasswordBox"
                               component={this.renderField}/>

                        <input type="hidden" name="ctl00$GlobalBody$SignOnControl$CaptchEnabledField"
                               id="GlobalBody_SignOnControl_CaptchEnabledField"/>

                        <button type="submit" disabled={pristine || submitting} className="btn btn-primary mt-2"
                                alternatetext="Sign In">Sign In
                        </button>
                    </form>
                    <a href ="/signup">
                            <button className="btn btn-primary mt-2"
                                    alternatetext="Sign Up">Sign Up
                            </button>
                    </a>
                </div>


            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    //validate input from values

    if (!values.email) {
        errors.email = 'Please enter Username or email address\n';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
        errors.password = 'Please enter password';
    }

    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}


function mapStateToProps(state) {
    return ({error: state.user.message})
}


function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            // adminSignin
        }, dispatch)

    };
}

export default reduxForm({
    validate,
    form: 'loginForm'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));