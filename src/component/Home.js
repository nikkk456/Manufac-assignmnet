import React from 'react'
import agriData from './ManufacDataset.json'
import Table1 from './Table1'
import Table2 from './Table2'

const Home = () => {
    return (
        <div>
            <center><h1> Table 1</h1></center>
            <Table1 agriData={agriData}/>
            <center><h1> Table 2</h1></center>
            <Table2 agriData={agriData}/>
        </div>
    )
}

export default Home
