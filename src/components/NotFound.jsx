import React from 'react'
import {Typography, Box} from "@material-ui/core"
import {Link} from "react-router-dom"
function NotFound() {
    return (
        <div>
           <Box textAlign="center">
               <Typography> Error 404. Page not found</Typography>
               <Link to="/">Go Home</Link>
           </Box>
        </div>
    )
}

export default NotFound
