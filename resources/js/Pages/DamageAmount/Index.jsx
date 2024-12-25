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
    MenuItem,
} from '@mui/material';
import { router, useForm } from '@inertiajs/react';

// 1. Коефіцієнт небезпечності (таблиця з перших скріншотів)
const hazardOptions = [
    { label: 'I (надзвичайно небезпечні) – 4.0', value: 4.0 },
    { label: 'II (дуже небезпечні) – 3.0', value: 3.0 },
    { label: 'III (помірно небезпечні) – 2.5', value: 2.5 },
    { label: 'IV (інші) – 1.5', value: 1.5 },
];

// 2. Коефіцієнт природоохоронної цінності земель (таблиця «Території з особливим режимом…»)
const naturalValueOptions = [
    { label: 'Природні території та об\'єкти ПЗФ (10)', value: 10 },
    { label: 'Штучно створені об\'єкти ПЗФ (5)', value: 5 },
    { label: 'Охоронні зони навколо цінних природних об\'єктів (3,5)', value: 3.5 },
    { label: 'Охоронні зони навколо об\'єктів культурної спадщини (4)', value: 4 },
    { label: 'Охоронні зони навколо гідрометеорологічних станцій (3)', value: 3 },
    { label: 'Особливо цінні сільськогосподарські угіддя (2)', value: 2 },
    { label: 'Округ санітарної (гірничо-санітарної) охорони (1,5)', value: 1.5 },
    { label: 'Прибережні захисні смуги (5)', value: 5 },
    { label: 'Пляжі зон уздовж морів, заток і лиманів (6)', value: 6 },
    { label: 'Водooхоронні зони річок, морів, озер (4)', value: 4 },
    { label: 'Охоронні зони надземних і підземних трубопроводів (2,5)', value: 2.5 },
    { label: 'Охоронні зони вздовж кабелів зв\'язку (2)', value: 2 },
    { label: 'Охоронні зони вздовж ЛЕП (1,5)', value: 1.5 },
    // Додавайте інші пункти за потреби
];

// 3. Коефіцієнт кількості забруднених ділянок (з третьої таблиці)
const pollutionAreaOptions = [
    { label: '1 ділянка → 1.0', value: 1.0 },
    { label: '2 ділянки → 1.1', value: 1.1 },
    { label: '3 ділянки → 1.2', value: 1.2 },
    { label: '4 і більше → 1.9', value: 1.9 },
];

// 4. Коефіцієнт складності К(с):
//    - При рівній місцевості → 1
//    - В інших випадках → 1,2
const complexityOptions = [
    { label: 'Рівна місцевість (1)', value: 1 },
    { label: 'Інші випадки (1,2)', value: 1.2 },
];

const Index = ({ corporations, damageAmounts }) => {
    const { data, setData, post, processing, errors } = useForm({
        corporation_id: '',
        monetary_evaluation: '',
        land_area: '',
        hazard_coeff: '',
        natural_value_coeff: '',
        complexity_coeff: '',
        pollution_area_coeff: '',
        reclamation_coeff: '', // Тепер це буде заповнюватися через звичайний інпут
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
                    {/* Вибір підприємства */}
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

                    {/* Поля для введення */}
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Нормативно грошова оцінка (грн/кв.м.)"
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

                        {/* Коефіцієнт небезпечності */}
                        <TextField
                            select
                            label="Коефіцієнт небезпечності"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.hazard_coeff}
                            onChange={(e) => setData('hazard_coeff', e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Виберіть коефіцієнт</em>
                            </MenuItem>
                            {hazardOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Коефіцієнт природоохоронної цінності */}
                        <TextField
                            select
                            label="Коефіцієнт природоохоронної цінності"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.natural_value_coeff}
                            onChange={(e) => setData('natural_value_coeff', e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Виберіть коефіцієнт</em>
                            </MenuItem>
                            {naturalValueOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Коефіцієнт складності (К(с)) */}
                        <TextField
                            select
                            label="Коефіцієнт складності (К(с))"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.complexity_coeff}
                            onChange={(e) => setData('complexity_coeff', e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Виберіть коефіцієнт</em>
                            </MenuItem>
                            {complexityOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Коефіцієнт кількості забруднених ділянок */}
                        <TextField
                            select
                            label="Коефіцієнт кількості ділянок"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.pollution_area_coeff}
                            onChange={(e) => setData('pollution_area_coeff', e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Виберіть коефіцієнт</em>
                            </MenuItem>
                            {pollutionAreaOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Коефіцієнт робіт із землювання (м²)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={data.reclamation_coeff}
                            onChange={(e) => setData('reclamation_coeff', e.target.value)}
                        />
                    </Box>

                    {/* Кнопка надіслати */}
                    <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={processing}
                        >
                            Обчислити
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Таблиця результатів */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Таблиця результатів
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Підприємство</TableCell>
                                <TableCell>Розмір шкоди (грн)</TableCell>
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
