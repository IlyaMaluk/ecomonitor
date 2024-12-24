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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableSortLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

// Масив із варіантами областей та відповідними регіональними коефіцієнтами (Кр)
const REGIONAL_OPTIONS = [
    { label: 'Закарпатська', value: 1.00 },
    { label: 'Івано-Франківська', value: 1.05 },
    { label: 'Чернівецька', value: 1.06 },
    { label: 'Тернопільська', value: 1.07 },
    { label: 'Волинська', value: 1.10 },
    { label: 'Житомирська', value: 1.10 },
    { label: 'Львівська', value: 1.10 },
    { label: 'Сумська', value: 1.10 },
    { label: 'Хмельницька', value: 1.11 },
    { label: 'Рівненська', value: 1.11 },
    { label: 'Чернігівська', value: 1.11 },
    { label: 'Кіровоградська', value: 1.13 },
    { label: 'Полтавська', value: 1.15 },
    { label: 'Вінницька', value: 1.17 },
    { label: 'Черкаська', value: 1.18 },
    { label: 'Луганська', value: 1.18 },
    { label: 'Харківська', value: 1.19 },
    { label: 'Миколаївська', value: 1.20 },
    { label: 'Київська', value: 1.20 },
    { label: 'Автономна Республіка Крим', value: 1.24 },
    { label: 'Одеська', value: 1.26 },
    { label: 'Донецька', value: 1.26 },
    { label: 'Дніпропетровська', value: 1.28 },
    { label: 'Запорізька', value: 1.28 },
    { label: 'Херсонська', value: 1.30 },
];

// Масив із варіантами категорій водного об’єкта та відповідними коефіцієнтами (Ккат)
const CATEGORY_OPTIONS = [
    {
        label: 'Поверхневі водні об’єкти (господарсько-побутове використання)',
        value: 1.5,
    },
    {
        label: 'Поверхневі водні об’єкти (риболовне господарство)',
        value: 2.5,
    },
    {
        label: 'Поверхневі водні об’єкти (питне використання)',
        value: 3.0,
    },
    {
        label: 'Внутрішні морські води, територіальне море, акваторії морських портів',
        value: 3.5,
    },
    {
        label: 'Водні об’єкти в межах ПЗФ загальнодержавного значення / лікувальні',
        value: 4.5,
    },
    {
        label: 'Підземні води',
        value: 5.0,
    },
];

const WaterCompensationsCreate = ({ watercompensations, corporations, substances }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        corporation_id: '',
        year: '',
        category_coefficient: '',
        regional_coefficient: '',
        indexated_loss: '',
        substances: [],
    });

    const [editData, setEditData] = useState({
        id: null,
        corporation_id: '',
        year: '',
        category_coefficient: '',
        regional_coefficient: '',
        indexated_loss: '',
        substances: [],
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [orderColumn, setOrderColumn] = useState('');
    const [orderDir, setOrderDir] = useState('asc');

    const submit = (e) => {
        e.preventDefault();
        post('/watercompensations', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        Inertia.delete(`/watercompensations/${id}`, {
            preserveScroll: true,
        });
    };

    const handleEditOpen = (item) => {
        setEditData({
            ...item,
            substances: item.substances.map(sub => ({
                substance_id: sub.substance_id,
                polution_mass: sub.polution_mass,
            })),
        });
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        Inertia.put(
            `/watercompensations/${editData.id}`,
            {
                ...editData,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsEditModalOpen(false);
                },
            }
        );
    };

    const handleSort = (column) => {
        const isDesc = orderColumn === column && orderDir === 'desc';
        const direction = isDesc ? 'asc' : 'desc';
        setOrderColumn(column);
        setOrderDir(direction);
        // При необхідності можна зробити запит із сортуванням
    };

    // --- Субстанції при створенні ---
    const addSubstance = () => {
        setData('substances', [
            ...data.substances,
            { substance_id: '', polution_mass: '' },
        ]);
    };

    const removeSubstance = (index) => {
        const updatedSubstances = data.substances.filter((_, i) => i !== index);
        setData('substances', updatedSubstances);
    };

    const updateSubstance = (index, field, value) => {
        const updatedSubstances = data.substances.map((sub, i) =>
            i === index ? { ...sub, [field]: value } : sub
        );
        setData('substances', updatedSubstances);
    };

    // --- Субстанції при редагуванні ---
    const addEditSubstance = () => {
        setEditData({
            ...editData,
            substances: [
                ...editData.substances,
                { substance_id: '', polution_mass: '' },
            ],
        });
    };

    const removeEditSubstance = (index) => {
        const updatedSubstances = editData.substances.filter((_, i) => i !== index);
        setEditData({ ...editData, substances: updatedSubstances });
    };

    const updateEditSubstance = (index, field, value) => {
        const updatedSubstances = editData.substances.map((sub, i) =>
            i === index ? { ...sub, [field]: value } : sub
        );
        setEditData({ ...editData, substances: updatedSubstances });
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Розрахунок компенсації за воду
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
                            onChange={(e) =>
                                setData(
                                    'corporation_id',
                                    e.target.value ? parseInt(e.target.value, 10) : ''
                                )
                            }
                            error={Boolean(errors.corporation_id)}
                            helperText={errors.corporation_id}
                        >
                            <MenuItem value="">
                                <em>Оберіть підприємство</em>
                            </MenuItem>
                            {corporations &&
                                corporations.map((corp) => (
                                    <MenuItem key={corp.id} value={corp.id}>
                                        {corp.title}
                                    </MenuItem>
                                ))}
                        </TextField>

                        <IconButton
                            color="primary"
                            component={Link}
                            href="/corporations"
                            sx={{ ml: 2 }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Box>

                    <TextField
                        select
                        label="Рік звітності"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        error={Boolean(errors.year)}
                        helperText={errors.year}
                    >
                        {Array.from({ length: 2024 - 2019 + 1 }, (_, i) => 2024 - i).map(
                            (year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            )
                        )}
                    </TextField>

                    {/* Випадаючий список для категорійного коефіцієнта */}
                    <TextField
                        select
                        label="Категорія водного об’єкта (Ккат)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.category_coefficient}
                        onChange={(e) => {
                            setData('category_coefficient', e.target.value);
                        }}
                        error={Boolean(errors.category_coefficient)}
                        helperText={errors.category_coefficient}
                    >
                        <MenuItem value="">
                            <em>Оберіть категорію</em>
                        </MenuItem>
                        {CATEGORY_OPTIONS.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label} (Ккат = {option.value})
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Випадаючий список для регіонального коефіцієнта */}
                    <TextField
                        select
                        label="Регіон (Кр)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.regional_coefficient}
                        onChange={(e) => {
                            setData('regional_coefficient', e.target.value);
                        }}
                        error={Boolean(errors.regional_coefficient)}
                        helperText={errors.regional_coefficient}
                    >
                        <MenuItem value="">
                            <em>Оберіть область</em>
                        </MenuItem>
                        {REGIONAL_OPTIONS.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label} (Кр = {option.value})
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Індексовані втрати (грн)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.indexated_loss}
                        onChange={(e) => setData('indexated_loss', e.target.value)}
                        error={Boolean(errors.indexated_loss)}
                        helperText={errors.indexated_loss}
                    />

                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="h6">Субстанції</Typography>
                        {data.substances.map((sub, index) => (
                            <Box
                                key={index}
                                sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                            >
                                <TextField
                                    select
                                    label={`Субстанція ${index + 1}`}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={sub.substance_id}
                                    onChange={(e) =>
                                        updateSubstance(
                                            index,
                                            'substance_id',
                                            e.target.value
                                                ? parseInt(e.target.value, 10)
                                                : ''
                                        )
                                    }
                                    error={Boolean(errors[`substances.${index}.substance_id`])}
                                    helperText={errors[`substances.${index}.substance_id`]}
                                >
                                    <MenuItem value="">
                                        <em>Оберіть субстанцію</em>
                                    </MenuItem>
                                    {substances &&
                                        substances.map((s) => (
                                            <MenuItem key={s.id} value={s.id}>
                                                {s.title}
                                            </MenuItem>
                                        ))}
                                </TextField>
                                <TextField
                                    label="Маса наднормативного скиду"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    type="number"
                                    value={sub.polution_mass}
                                    onChange={(e) =>
                                        updateSubstance(index, 'polution_mass', e.target.value)
                                    }
                                    error={Boolean(errors[`substances.${index}.polution_mass`])}
                                    helperText={errors[`substances.${index}.polution_mass`]}
                                    sx={{ ml: 2 }}
                                />
                                <IconButton
                                    color="error"
                                    onClick={() => removeSubstance(index)}
                                    sx={{ mt: 2, ml: 1 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                            onClick={addSubstance}
                            sx={{ mt: 2 }}
                        >
                            Додати субстанцію
                        </Button>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Розрахувати компенсацію
                    </Button>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Список компенсацій води
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Підприємство</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'year'}
                                        direction={orderDir}
                                        onClick={() => handleSort('year')}
                                    >
                                        Рік
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Категорійний коефіцієнт</TableCell>
                                <TableCell>Регіональний коефіцієнт</TableCell>
                                <TableCell>Індексовані втрати (грн)</TableCell>
                                <TableCell>Сумарна компенсація (грн)</TableCell>
                                <TableCell align="right">Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {watercompensations && watercompensations.length > 0 ? (
                                watercompensations.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.corporation?.title}</TableCell>
                                        <TableCell>{item.year}</TableCell>
                                        <TableCell>{item.category_coefficient}</TableCell>
                                        <TableCell>{item.regional_coefficient}</TableCell>
                                        <TableCell>{item.indexated_loss}</TableCell>
                                        {/* Округлення сумарної компенсації до сотих */}
                                        <TableCell>
                                            {Number(item.calculated_water_compensation).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                color="primary"
                                                onClick={() => handleEditOpen(item)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        Немає записів компенсацій води
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Модальне вікно для редагування */}
            <Dialog
                open={isEditModalOpen}
                onClose={handleEditClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Редагувати компенсацію води</DialogTitle>
                <DialogContent>
                    <form id="edit-form" onSubmit={handleEditSubmit} noValidate>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                select
                                label="Підприємство"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={editData.corporation_id || ''}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        corporation_id: e.target.value
                                            ? parseInt(e.target.value, 10)
                                            : '',
                                    })
                                }
                                error={Boolean(errors.corporation_id)}
                                helperText={errors.corporation_id}
                            >
                                <MenuItem value="">
                                    <em>Оберіть підприємство</em>
                                </MenuItem>
                                {corporations &&
                                    corporations.map((corp) => (
                                        <MenuItem key={corp.id} value={corp.id}>
                                            {corp.title}
                                        </MenuItem>
                                    ))}
                            </TextField>
                            <IconButton
                                color="primary"
                                component={Link}
                                href="/corporations"
                                sx={{ ml: 2 }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Box>

                        <TextField
                            label="Рік"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.year || ''}
                            onChange={(e) =>
                                setEditData({ ...editData, year: e.target.value })
                            }
                            error={Boolean(errors.year)}
                            helperText={errors.year}
                        />

                        {/* Випадаючий список для категорійного коефіцієнта в модалці */}
                        <TextField
                            select
                            label="Категорія водного об’єкта (Ккат)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={editData.category_coefficient || ''}
                            onChange={(e) => {
                                setEditData({
                                    ...editData,
                                    category_coefficient: e.target.value,
                                });
                            }}
                            error={Boolean(errors.category_coefficient)}
                            helperText={errors.category_coefficient}
                        >
                            <MenuItem value="">
                                <em>Оберіть категорію</em>
                            </MenuItem>
                            {CATEGORY_OPTIONS.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label} (Ккат = {option.value})
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Випадаючий список для регіонального коефіцієнта в модалці */}
                        <TextField
                            select
                            label="Регіон (Кр)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={editData.regional_coefficient || ''}
                            onChange={(e) => {
                                setEditData({
                                    ...editData,
                                    regional_coefficient: e.target.value,
                                });
                            }}
                            error={Boolean(errors.regional_coefficient)}
                            helperText={errors.regional_coefficient}
                        >
                            <MenuItem value="">
                                <em>Оберіть область</em>
                            </MenuItem>
                            {REGIONAL_OPTIONS.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label} (Кр = {option.value})
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Маса наднормативного скиду (т)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.polution_mass || ''}
                            onChange={(e) =>
                                setEditData({
                                    ...editData,
                                    polution_mass: e.target.value,
                                })
                            }
                            error={Boolean(errors.polution_mass)}
                            helperText={errors.polution_mass}
                        />

                        <TextField
                            label="Індексовані втрати (грн)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.indexated_loss || ''}
                            onChange={(e) =>
                                setEditData({
                                    ...editData,
                                    indexated_loss: e.target.value,
                                })
                            }
                            error={Boolean(errors.indexated_loss)}
                            helperText={errors.indexated_loss}
                        />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Typography variant="h6">Субстанції</Typography>
                            {editData.substances.map((sub, index) => (
                                <Box
                                    key={index}
                                    sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                                >
                                    <TextField
                                        select
                                        label={`Субстанція ${index + 1}`}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                        value={sub.substance_id}
                                        onChange={(e) =>
                                            updateEditSubstance(
                                                index,
                                                'substance_id',
                                                e.target.value
                                                    ? parseInt(e.target.value, 10)
                                                    : ''
                                            )
                                        }
                                        error={Boolean(
                                            errors[`edit_substances.${index}.substance_id`]
                                        )}
                                        helperText={
                                            errors[`edit_substances.${index}.substance_id`]
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>Оберіть субстанцію</em>
                                        </MenuItem>
                                        {substances &&
                                            substances.map((s) => (
                                                <MenuItem key={s.id} value={s.id}>
                                                    {s.title}
                                                </MenuItem>
                                            ))}
                                    </TextField>
                                    <IconButton
                                        color="error"
                                        onClick={() => removeEditSubstance(index)}
                                        sx={{ mt: 2, ml: 1 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<AddCircleIcon />}
                                onClick={addEditSubstance}
                                sx={{ mt: 2 }}
                            >
                                Додати субстанцію
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Відміна</Button>
                    <Button
                        type="submit"
                        form="edit-form"
                        variant="contained"
                        color="primary"
                    >
                        Зберегти
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default WaterCompensationsCreate;
