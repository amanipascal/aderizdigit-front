import React, {useEffect, useRef } from 'react'
import * as Tableau from 'tableau-api-js';

// const {tableau} = window;

const TableauEmbed = ({url, width, height, hideTabs}) => {

    

    const ref = useRef(null)

    let viz;

    const initViz = () => {
        console.log('tableau', Tableau)
        if (viz) {
            viz.dispose()
        }
        viz = new Tableau.Viz(ref.current, url, {
            hideTabs, width, height,
            onFirstInteractive: function () {
                console.log("Run this code when the viz has finished loading.");
            },
            onFirstVizSizeKnown: function () {
            console.log("Viz Size Loaded");
            }
         })
    }

    useEffect(initViz, [])
    

    return (
         <div ref={ref} style={{maxHeight:'650px', overflow: 'auto'}} />
  )
}

export default TableauEmbed