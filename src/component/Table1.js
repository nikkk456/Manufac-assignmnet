import React from 'react'
import { useState, useEffect } from 'react';
import { Table } from '@mantine/core'

const Table1 = ({agriData}) => {
    const [maxMinData, setMaxMinData] = useState({});
    useEffect(() => {
        const calculateMaxMinData = () => {
            const result = {};

            agriData.forEach(entry => {
                const year = entry.Year.match(/\d{4}/)[0];;
                const production = parseFloat(entry['Crop Production (UOM:t(Tonnes))']) || 0;
                const cropName = entry['Crop Name'];

                if (!result[year]) {
                    result[year] = {
                        maxProduction: -Infinity,
                        maxCrop: null,
                        minProduction: Infinity,
                        minCrop: null
                    };
                }

                if (production > result[year].maxProduction) {
                    result[year].maxProduction = production;
                    result[year].maxCrop = cropName;
                }

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
