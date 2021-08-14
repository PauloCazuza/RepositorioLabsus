import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/Labsus/1.jpeg";
import image2 from "assets/img/Labsus/2.jpeg";
import image3 from "assets/img/Labsus/3.jpeg";
import image4 from "assets/img/Labsus/4.jpeg";
import image5 from "assets/img/Labsus/5.jpeg";
import image6 from "assets/img/Labsus/6.jpeg";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
    const classes = useStyles();
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };
    return (
        <div className={{...classes.section, margin: "0px"}}>
            <div className={{...classes.container, margin: "0px"}}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
                        <Card carousel>
                            <Carousel {...settings} style={{ height: "500px" }}>
                                <div>
                                    <img src={image1} alt="First slide" className="slick-image" style={{ minHeight: "500px" }} />
                                    <div className="slick-caption" style={{ position: "absolute", top: "380px" }}>
                                        <h4 style={{ color: "#139c40", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "50px", fontSize: "20px", fontFamily: "'Roboto Slab'" }}>
                                            Encontro Labsus
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        src={image2}
                                        alt="Second slide"
                                        className="slick-image" style={{ minHeight: "500px" }}
                                    />
                                    <div className="slick-caption" style={{ position: "absolute", top: "380px" }}>
                                        <h4 style={{ color: "#139c40", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "50px", fontSize: "20px", fontFamily: "'Roboto Slab'" }}>
                                            Encontro Labsus
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <img src={image3} alt="Third slide" className="slick-image" style={{ minHeight: "500px" }} />
                                    <div className="slick-caption" style={{ position: "absolute", top: "380px" }}>
                                        <h4 style={{ color: "#139c40", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "50px", fontSize: "20px", fontFamily: "'Roboto Slab'" }}>
                                            Premiação Labsus
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <img src={image4} alt="Third slide" className="slick-image" style={{ minHeight: "500px" }} />
                                    <div className="slick-caption" style={{ position: "absolute", top: "380px" }}>
                                        <h4 style={{ color: "#139c40", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "50px", fontSize: "20px", fontFamily: "'Roboto Slab'" }}>
                                            Encontro Labsus
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <img src={image5} alt="Third slide" className="slick-image" style={{ minHeight: "500px" }} />
                                    <div className="slick-caption" style={{ position: "absolute", top: "380px" }}>
                                        <h4 style={{ color: "#139c40", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "50px", fontSize: "20px", fontFamily: "'Roboto Slab'" }}>
                                            Encontro Labsus
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <img src={image6} alt="Third slide" className="slick-image" style={{ minHeight: "500px" }} />
                                    <div className="slick-caption" style={{ position: "absolute", top: "380px" }}>
                                        <h4 style={{ color: "#139c40", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "50px", fontSize: "20px", fontFamily: "'Roboto Slab'" }}>
                                            Encontro Labsus
                                        </h4>
                                    </div>
                                </div>
                            </Carousel>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
