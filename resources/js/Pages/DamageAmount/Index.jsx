import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    MenuItem,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { router, useForm, Link } from '@inertiajs/react';

const Index = ({ corporations, damageAmounts }) => {
    const { data, setData, post, processing, errors } = useForm({
        corporation_id: '',
        monetary_evaluation: '',
        land_area: '',
        hazard_coeff: '',
        natural_value_coeff: '',
        complexity_coeff: '',
        pollution_area_coeff: '',
        reclamation_coeff: '',
    });

    const submit = (e) => {
        e.preventDefault();
        router.post('/damage-amount', data);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Визначення розміру шкоди внаслідок забруднення грунтів
                </Typography>
                <form onSubmit={submit} noValidate>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            select
                            label="Підприємство"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.corporation_id}
                            onChange={(e) => setData('corporation_id', e.target.value)}
                            error={Boolean(errors.corporation_id)}
                            helperText={errors.corporation_id}
                        >
                            <MenuItem value="">
                                <em>Виберіть підприємство</em>
                            </MenuItem>
                            {corporations.map((corporation) => (
                                <MenuItem key={corporation.id} value={corporation.id}>
                                    {corporation.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Нормативно грошова оцінка земельної ділянки (грн/кв.м.)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.monetary_evaluation}
                            onChange={(e) => setData('monetary_evaluation', e.target.value)}
                        />
                        <TextField
                            label="Площа земельної ділянки (кв.м.)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.land_area}
                            onChange={(e) => setData('land_area', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт небезпечності забруднюючих речовин"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.hazard_coeff}
                            onChange={(e) => setData('hazard_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт природоохоронної цінності земельної ділянки"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.natural_value_coeff}
                            onChange={(e) => setData('natural_value_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт складності"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.complexity_coeff}
                            onChange={(e) => setData('complexity_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт к-сті забруднюючих ділянок"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.pollution_area_coeff}
                            onChange={(e) => setData('pollution_area_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт робіт із землевпорядження"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.reclamation_coeff}
                            onChange={(e) => setData('reclamation_coeff', e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Button type="submit" variant="contained" color="primary" disabled={processing}>
                            Обчислити
                        </Button>
                    </Box>
                </form>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Таблиця результатів
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Підприємство</TableCell>
                                <TableCell>Розмір шкоди</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {damageAmounts.map((element, index) => (
                                <TableRow key={index}>
                                    <TableCell>{element.corporation.title}</TableCell>
                                    <TableCell>{element.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Index;
