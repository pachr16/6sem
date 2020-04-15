import React from 'react';

function About() {
    const h2 = {
        "padding-left": "30px",
        "font-size": "40px"
    };

    const p = {
        "padding-left": "20px",
        "font-size": "20px"
    };

    const background = {
        "background-color": "rgb(200, 200, 200)",
        "padding": "10px"
    };


    return(
        <div style={background}>
            <h2 style={h2}>About Us</h2>
            <p style={p}>
                We are a group of Software Engineering students from the University of Southern Denmark (SDU / Syddansk Universitet),
                 who are currently working on our bachelors project. <br/>
                This site has been created purely for testing purposes, as a somewhat generic streaming service
                 against which we can measure certain improvements and/or changes that our projects may introduce to this type of service. <br/> <br/>
                It has been developed as a collaboration by: <br/> 
                 - Alexander Micheelsen Rol, alrol17 <br/>
                 - Lasse Fisker, lafis17 <br/>
                 - Patrick Christoffersen, pachr16 <br/>
                 - Rasmus Jensen, rasje17 <br/>
            </p>
        </div>
    );
}

export default About;