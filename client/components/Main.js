import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as userActions from '../actions/user';


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="main">
            	{!this.props.user && (<nav className="main-nav" id="index-nav">
                     <ul>
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/signup">Sign Up</Link></li>
                          <li className="nav-brand">Simple Code</li>
                     </ul>
                </nav>)}
                
               

                	<div className="main-slogan">Create code snippets to keep yourself organized
	                	<div>
	                      <Link to="/login">
	                          <button className="btn">Login</button>
	                     </Link>
	                     <Link to="/signup">
	                          <button className="btn">Sign Up</button>
	                     </Link>

	                    </div>
                	</div>
                	 


               	<img src="https://i.imgur.com/dlRrvfT.png" className="main-image" />

               

	
				
					<div className="row grey-row">
						<div className="col-6">
						<img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/compose.png?raw=true" alt="code image" className="main-icon" />
						</div>
						<div className="col-6">
						<h2>Code Beautiful Snippets</h2>
						<p>Syntax highlight available in almost any language to keep all your code organized.</p>
						</div>
						</div>
						<div className="row grey-row">
						<div className="col-6">
						<h2>Search for What You Need</h2>
						<p>Easily search code snippets and keep organized.</p>
						</div>
						<div className="col-6">
							<img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/search-1.png?raw=true" className="main-icon"/>
						</div>
					</div> 
						<div className="row grey-row">
					<div className="col-6">
						<img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/cloud-computing-2.png?raw=true" className="main-icon"/>
						</div>
						<div className="col-6">
							<h2>Keep Code in the Cloud</h2>
						<p>Keep Code Snippets in one place for easy storage.</p>
						</div>
					</div>
					<div className="row">
					<div className="col-12">
							<p className="bottom-slogan">Code. Save. Search.</p>
						</div>
						</div>
					<div className="bottom-main-nav">
                     <p>Built with {"\u2764"} By <a href="http://www.danafng.com">Dana Ng</a></p>
                	</div>
				</div> 
			
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Main);
