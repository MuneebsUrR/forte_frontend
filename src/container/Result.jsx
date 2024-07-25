import React from 'react';
import { useTheme, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Result = ({ results }) => {
    const theme = useTheme();

    return (
        <div className='h-[80vh] flex items-center justify-center'>
            <TableContainer component={Paper} sx={{ margin: theme.spacing(2), padding: theme.spacing(2), maxWidth: '70vw', mx: 'auto' }}>
                <Typography variant="h4" fontWeight={"bold"} gutterBottom align="left">
                    Results
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" align="center" fontWeight={"bold"}>
                                    Subject
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" align="center" fontWeight={"bold"}>
                                    Correct Answers
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" align="center" fontWeight={"bold"}>
                                    Incorrect Answers
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((subject, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle1" align='center' fontWeight="bold">
                                        {subject.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ color: theme.palette.success.main }}>
                                    {subject.correct}
                                </TableCell>
                                <TableCell align="center" sx={{ color: theme.palette.error.main }}>
                                    {subject.incorrect}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Result;
