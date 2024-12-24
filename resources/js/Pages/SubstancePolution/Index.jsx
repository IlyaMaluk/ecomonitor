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

const Index = ({ substances, substancePolutions }) => {
    const { data, setData, post, processing, errors } = useForm({
        substance_id: '',
        formula_type: '',
        qi: '',
        Mci: '',
        po: '',
        S: '',
        tax_rate: '',

        // Окремі поля, які будуть вибиратися з випадаючих списків
        hazard_class_coeff: '',
        environmental_impact_coeff: '',
        event_scale_coeff: '',
        origin_character_coeff: '',
    });

    const [formulaType, setFormulaType] = useState('');

    const submit = (e) => {
        e.preventDefault();
        router.post('/substance-polution', data);
    };

    const handleFormulaChange = (e) => {
        setFormulaType(e.target.value);
        setData('formula_type', e.target.value);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Оцінити ризик
                </Typography>
                <form onSubmit={submit} noValidate>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            select
                            label="Забруднююча речовина"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.substance_id}
                            onChange={(e) => setData('substance_id', e.target.value)}
                            error={Boolean(errors.substance_id)}
                            helperText={errors.substance_id}
                        >
                            <MenuItem value="">
                                <em>Оберіть забруднюючу речовину</em>
                            </MenuItem>
                            {substances.map((substance) => (
                                <MenuItem key={substance.id} value={substance.id}>
                                    {substance.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <IconButton
                            color="primary"
                            component={Link}
                            href="/substances"
                            sx={{ ml: 2 }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Box>

                    {/* Приклад вибору формули (не стосується випадаючих списків коефіцієнтів) */}
                    <TextField
                        select
                        label="Формула"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formulaType}
                        onChange={handleFormulaChange}
                    >
                        <MenuItem value="">
                            <em>Оберіть формулу</em>
                        </MenuItem>
                        <MenuItem value="formula1">Відома маса</MenuItem>
                        <MenuItem value="formula2">Не відома маса</MenuItem>
                        <MenuItem value="formula3">Лісові насадження</MenuItem>
                    </TextField>

                    {/* Якщо формула = formula1 */}
                    {formulaType === 'formula1' && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="qi (т/т)"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.qi}
                                onChange={(e) => setData('qi', e.target.value)}
                            />
                            <TextField
                                label="Mаса згорілої речовини (т)"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.Mci}
                                onChange={(e) => setData('Mci', e.target.value)}
                            />
                        </Box>
                    )}

                    {/* Якщо формула = formula2 */}
                    {formulaType === 'formula2' && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="qi"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.qi}
                                onChange={(e) => setData('qi', e.target.value)}
                            />
                            <TextField
                                label="po"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.po}
                                onChange={(e) => setData('po', e.target.value)}
                            />
                            <TextField
                                label="S"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.S}
                                onChange={(e) => setData('S', e.target.value)}
                            />
                        </Box>
                    )}

                    {/* Якщо формула = formula3 */}
                    {formulaType === 'formula3' && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="qi"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.qi}
                                onChange={(e) => setData('qi', e.target.value)}
                            />
                            <TextField
                                label="S"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.S}
                                onChange={(e) => setData('S', e.target.value)}
                            />
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Ставка податку (грн)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.tax_rate}
                            onChange={(e) => setData('tax_rate', e.target.value)}
                        />

                        {/* 1) Окремий випадаючий список для Коефіцієнта класу небезпеки */}
                        <TextField
                            select
                            label="Коефіцієнт класу небезпеки (Kнеб)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.hazard_class_coeff}
                            onChange={(e) => setData('hazard_class_coeff', e.target.value)}
                            error={Boolean(errors.hazard_class_coeff)}
                            helperText={errors.hazard_class_coeff}
                        >
                            <MenuItem value="">
                                <em>Оберіть коефіцієнт</em>
                            </MenuItem>
                            <MenuItem value="2">Class II (коеф 2)</MenuItem>
                            <MenuItem value="3">Class III (коеф 3)</MenuItem>
                            <MenuItem value="5">Class V (коеф 5)</MenuItem>
                        </TextField>

                        {/* 2) Окремий випадаючий список для Коефіцієнта впливу на довкілля (Kв) */}
                        <TextField
                            select
                            label="Коефіцієнт впливу (Kв)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.environmental_impact_coeff}
                            onChange={(e) =>
                                setData('environmental_impact_coeff', e.target.value)
                            }
                            error={Boolean(errors.environmental_impact_coeff)}
                            helperText={errors.environmental_impact_coeff}
                        >
                            <MenuItem value="">
                                <em>Оберіть коефіцієнт</em>
                            </MenuItem>
                            <MenuItem value="3">До 12 год (коеф 3)</MenuItem>
                            <MenuItem value="4">До 24 год (коеф 4)</MenuItem>
                            <MenuItem value="5">Понад 24 год (коеф 5)</MenuItem>
                        </TextField>

                        {/* 3) Окремий випадаючий список для Коефіцієнта масштабу події (Kмп) */}
                        <TextField
                            select
                            label="Коефіцієнт масштабу події (Kмп)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.event_scale_coeff}
                            onChange={(e) => setData('event_scale_coeff', e.target.value)}
                            error={Boolean(errors.event_scale_coeff)}
                            helperText={errors.event_scale_coeff}
                        >
                            <MenuItem value="">
                                <em>Оберіть коефіцієнт</em>
                            </MenuItem>
                            <MenuItem value="1.2">До 50т (коеф 1.2)</MenuItem>
                            <MenuItem value="2">50–150т (коеф 2)</MenuItem>
                            <MenuItem value="3">150–500т (коеф 3)</MenuItem>
                        </TextField>

                        {/* 4) Окремий випадаючий список для Коефіцієнта характеру походження (Kпп) */}
                        <TextField
                            select
                            label="Коефіцієнт характеру походження події (Kпп)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.origin_character_coeff}
                            onChange={(e) =>
                                setData('origin_character_coeff', e.target.value)
                            }
                            error={Boolean(errors.origin_character_coeff)}
                            helperText={errors.origin_character_coeff}
                        >
                            <MenuItem value="">
                                <em>Оберіть коефіцієнт</em>
                            </MenuItem>
                            <MenuItem value="3">Надзвичайна ситуація (коеф 3)</MenuItem>
                            <MenuItem value="6">
                                НС з неможливістю проживання (коеф 6)
                            </MenuItem>
                            <MenuItem value="10">Воєнний стан (коеф 10)</MenuItem>
                        </TextField>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Button type="submit" variant="contained" color="primary" disabled={processing}>
                            Зберегти
                        </Button>
                    </Box>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Таблиця забруднень
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Substance</TableCell>
                                <TableCell>Polution (грн)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {substancePolutions.map((element, index) => (
                                <TableRow key={index}>
                                    <TableCell>{element.substance.title}</TableCell>
                                    <TableCell>{element.polution}</TableCell>
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
