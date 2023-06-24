import { MenuItem, Select } from '@mui/material'
import React from 'react'

const OverviewSelect = ({period, handleChange}) => {
  return (
    <div>
        <Select
            value={period}
            onChange={handleChange}
            className="report"
            displayEmpty
            inputProps={{ "aria-label": "period for report" }}
        >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"yearly"}>Yearly</MenuItem>
        </Select>
    </div>
  )
}

export default OverviewSelect