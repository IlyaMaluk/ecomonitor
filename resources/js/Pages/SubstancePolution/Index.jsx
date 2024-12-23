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
        const value = e.target.value;
        setFormulaType(value);
        setData('formula_type', value);
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
                    <Box sx={{ mt: 2 }}>
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
                            <MenuItem value="formula1">Якщо відома маса</MenuItem>
                            <MenuItem value="formula2">Не відома маса</MenuItem>
                            <MenuItem value="formula3">Лісові насадження</MenuItem>
                        </TextField>
                    </Box>
                    {formulaType === 'formula1' && (
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
                                label="Mci"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={data.Mci}
                                onChange={(e) => setData('Mci', e.target.value)}
                            />
                        </Box>
                    )}
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
                            label="Ставка податку"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.tax_rate}
                            onChange={(e) => setData('tax_rate', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт класу небезпеки"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.hazard_class_coeff}
                            onChange={(e) => setData('hazard_class_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт впливу на довкілля"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.environmental_impact_coeff}
                            onChange={(e) => setData('environmental_impact_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт масштабу події"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.event_scale_coeff}
                            onChange={(e) => setData('event_scale_coeff', e.target.value)}
                        />
                        <TextField
                            label="Коефіцієнт характериу походження події"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.origin_character_coeff}
                            onChange={(e) => setData('origin_character_coeff', e.target.value)}
                        />
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
                                <TableCell>Polution</TableCell>
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
