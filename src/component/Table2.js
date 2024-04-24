import React from 'react'
import { Table } from '@mantine/core'

const Table2 = ({agriData}) => {
    // To group the data with crop name
    const cropData = agriData.reduce((acc, curr) => {
        const cropName = curr['Crop Name'];
        if (!acc[cropName]) {
            acc[cropName] = [];
        }
        acc[cropName].push(curr);
        return acc;
    }, {});

    // To calculate the average and then store it 
    const cropSummary = Object.entries(cropData).map(([cropName, data]) => {
        const totalYield = data.reduce((sum, entry) => sum + parseFloat(entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0), 0);
        const totalArea = data.reduce((sum, entry) => sum + parseFloat(entry['Area Under Cultivation (UOM:Ha(Hectares))'] || 0), 0);
        const averageYield = totalYield / data.length; // data.length to find the average.
        const averageArea = totalArea / data.length;
        return {
            cropName,
            averageYield,
            averageArea,
        };
    });
    return (
        <div>
            <div style={{ height: "300px", overflowY: "auto" }}>
                <Table.ScrollContainer minWidth={300} type='native'>
                    <Table horizontalSpacing="md" withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Crop Name</Table.Th>
                                <Table.Th>Average Yield of the
                                    Crop between
                                    1950-2020</Table.Th>
                                <Table.Th>Average Cultivation Area
                                    of the Crop between
                                    1950-2020</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {cropSummary.map(({ cropName, averageYield, averageArea }) => (
                                <Table.Tr key={cropName}>
                                    <Table.Td>{cropName}</Table.Td>
                                    <Table.Td>{averageYield.toFixed(3)}</Table.Td>
                                    <Table.Td>{averageArea.toFixed(3)}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </div>
        </div>
    )
}

export default Table2
