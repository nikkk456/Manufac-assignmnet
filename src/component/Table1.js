import React from 'react'
import { useState, useEffect } from 'react';
import { Table } from '@mantine/core'

const Table1 = ({agriData}) => {
    // Created State to store the Maximum and Minimum Production of Crop
    const [maxMinData, setMaxMinData] = useState({});

    useEffect(() => {
        const calculateMaxMinData = () => {
            const result = {};

            agriData.forEach(entry => {

                const year = entry.Year.match(/\d{4}/)[0]; // So that we get only the year instead of getting the financial year string
                const production = parseFloat(entry['Crop Production (UOM:t(Tonnes))']) || 0; // To get the production
                const cropName = entry['Crop Name'];

                if (!result[year]) {
                    result[year] = {
                        maxProduction: -Infinity,
                        maxCrop: null,
                        minProduction: Infinity,
                        minCrop: null
                    };
                }
                // To check the maxproduction
                if (production > result[year].maxProduction) {
                    result[year].maxProduction = production;
                    result[year].maxCrop = cropName;
                }
                // To check the minproduction
                if (production < result[year].minProduction) {
                    result[year].minProduction = production;
                    result[year].minCrop = cropName;
                }
            });

            setMaxMinData(result);
        };

        calculateMaxMinData();
    }, [agriData]);
  return (
    <div>
      <div style={{ height: "300px", overflowY: "auto" }}>
                <Table.ScrollContainer minWidth={300} type='native'>
                    <Table horizontalSpacing="md" withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Year</Table.Th>
                                <Table.Th>Crop with Maximum
                                    Production in that Year</Table.Th>
                                <Table.Th>Crop with Minimum
                                    Production in that Year</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {Object.entries(maxMinData).map(([year, rowData]) => (
                                <Table.Tr key={year}>
                                    <Table.Td>{year}</Table.Td>
                                    <Table.Td>{rowData.maxCrop}</Table.Td>
                                    <Table.Td>{rowData.minCrop}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </div>
    </div>
  )
}

export default Table1
