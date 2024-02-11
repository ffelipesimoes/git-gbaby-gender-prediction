import React from 'react'
import { useState } from 'react';
import { images } from '../assets';

const styles = {
    about1: `font-[Kollektif]  text-[30px] text-center md:text-[40px] pt-[100px] pb-[20px]`,
    green: `font-[Kollektif]  text-[#013a81]`,
    grey: `font-[Kollektif] `,
    wrapper: `max-w-[1500px] mx-auto`,
    selectgrid: `flex justify-center mb-[50px] p-[0px] md:p-[20px] `,
    boy: `bg-[#ebf6ff]  w-1/2 md:h-[200px] h-40 pr-[10px] `,
    girl: `bg-[#fcf0ee] w-1/2 md:h-[200px] h-40 pr-[10px] ` ,
    imgSelected: ` cursor-pointer animate-wiggle`,
    img: `cursor-pointer `,
  }
  
const BoyGirl = (props) => {

    function renderelement(genre) {
        if (genre === "boy") {
            if (props.gender === "APOSTO que é ELE") {
               return styles.imgSelected
            }  else { return styles.img}
        }
        if (genre === "girl") {
            if (props.gender === "APOSTO que é ELA") {
               return styles.imgSelected
            }  else { return styles.img}
        }
       } 

  return (
    <>
    <div className={styles.wrapper}>

        <div className={styles.selectgrid} >
            <div className={styles.girl} onClick={()=>{props.setGender("APOSTO que é ELA")}}>
                <img src={images.girl} alt="" className={renderelement("girl")}></img>
            </div>
            <div className={styles.boy} onClick={()=>{props.setGender("APOSTO que é ELE")}} >
                <img src={images.boy} alt="" className={renderelement("boy")}></img>
            </div>
        </div>

    </div>
    </>
  )
}

export default BoyGirl