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
import { useForm, usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

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
        Inertia.put(`/watercompensations/${editData.id}`, {
            ...editData,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
            },
        });
    };

    const handleSort = (column) => {
        const isDesc = orderColumn === column && orderDir === 'desc';
        const direction = isDesc ? 'asc' : 'desc';
        setOrderColumn(column);
        setOrderDir(direction);
        // При необходимости можно сделать запрос с сортировкой
    };

    // Функции для управления субстанціями в форме
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
        const updatedSubstances = data.substances.map((sub, i) => (
            i === index ? { ...sub, [field]: value } : sub
        ));
        setData('substances', updatedSubstances);
    };

    // Аналогичные функции для редактирования субстанцій в модальном окне
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
        const updatedSubstances = editData.substances.map((sub, i) => (
            i === index ? { ...sub, [field]: value } : sub
        ));
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
                            onChange={(e) => setData('corporation_id', e.target.value ? parseInt(e.target.value, 10) : '')}
                            error={Boolean(errors.corporation_id)}
                            helperText={errors.corporation_id}
                        >
                            <MenuItem value="">
                                <em>Оберіть підприємство</em>
                            </MenuItem>
                            {corporations && corporations.map((corp) => (
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
                        {Array.from({ length: 2024 - 2019 + 1 }, (_, i) => 2024 - i).map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Категорійний коефіцієнт"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.category_coefficient}
                        onChange={(e) => setData('category_coefficient', e.target.value)}
                        error={Boolean(errors.category_coefficient)}
                        helperText={errors.category_coefficient}
                    />

                    <TextField
                        label="Регіональний коефіцієнт"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.regional_coefficient}
                        onChange={(e) => setData('regional_coefficient', e.target.value)}
                        error={Boolean(errors.regional_coefficient)}
                        helperText={errors.regional_coefficient}
                    />

                    <TextField
                        label="Індексовані втрати"
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
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TextField
                                    select
                                    label={`Субстанція ${index + 1}`}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={sub.substance_id}
                                    onChange={(e) => updateSubstance(index, 'substance_id', e.target.value ? parseInt(e.target.value, 10) : '')}
                                    error={Boolean(errors[`substances.${index}.substance_id`])}
                                    helperText={errors[`substances.${index}.substance_id`]}
                                >
                                    <MenuItem value="">
                                        <em>Оберіть субстанцію</em>
                                    </MenuItem>
                                    {substances && substances.map((s) => (
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
                                    onChange={(e) => updateSubstance(index, 'polution_mass', e.target.value)}
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
                                <TableCell>Субстанції</TableCell>
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
                                <TableCell>Індексовані втрати</TableCell>
                                <TableCell>Сумарна компенсація</TableCell>
                                <TableCell align="right">Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {watercompensations && watercompensations.length > 0 ? (
                                watercompensations.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.corporation?.title}</TableCell>
                                        <TableCell>
                                            {item.substances && item.substances.map((sub, idx) => (
                                                <Box key={idx}>
                                                    {sub.substance?.title}: {sub.polution_mass} кг
                                                </Box>
                                            ))}
                                        </TableCell>
                                        <TableCell>{item.year}</TableCell>
                                        <TableCell>{item.category_coefficient}</TableCell>
                                        <TableCell>{item.regional_coefficient}</TableCell>
                                        <TableCell>{item.indexated_loss}</TableCell>
                                        <TableCell>{item.calculated_water_compensation}</TableCell>
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
            <Dialog open={isEditModalOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
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
                                    setEditData({ ...editData, corporation_id: e.target.value ? parseInt(e.target.value, 10) : '' })
                                }
                                error={Boolean(errors.corporation_id)}
                                helperText={errors.corporation_id}
                            >
                                <MenuItem value="">
                                    <em>Оберіть підприємство</em>
                                </MenuItem>
                                {corporations && corporations.map((corp) => (
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
                            onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                            error={Boolean(errors.year)}
                            helperText={errors.year}
                        />

                        <TextField
                            label="Категорійний коефіцієнт"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.category_coefficient || ''}
                            onChange={(e) => setEditData({ ...editData, category_coefficient: e.target.value })}
                            error={Boolean(errors.category_coefficient)}
                            helperText={errors.category_coefficient}
                        />

                        <TextField
                            label="Регіональний коефіцієнт"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.regional_coefficient || ''}
                            onChange={(e) => setEditData({ ...editData, regional_coefficient: e.target.value })}
                            error={Boolean(errors.regional_coefficient)}
                            helperText={errors.regional_coefficient}
                        />

                        <TextField
                            label="Маса наднормативного скиду"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.polution_mass || ''}
                            onChange={(e) => setEditData({ ...editData, polution_mass: e.target.value })}
                            error={Boolean(errors.polution_mass)}
                            helperText={errors.polution_mass}
                        />

                        <TextField
                            label="Індексовані втрати"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.indexated_loss || ''}
                            onChange={(e) => setEditData({ ...editData, indexated_loss: e.target.value })}
                            error={Boolean(errors.indexated_loss)}
                            helperText={errors.indexated_loss}
                        />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Typography variant="h6">Субстанції</Typography>
                            {editData.substances.map((sub, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <TextField
                                        select
                                        label={`Субстанція ${index + 1}`}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                        value={sub.substance_id}
                                        onChange={(e) => updateEditSubstance(index, 'substance_id', e.target.value ? parseInt(e.target.value, 10) : '')}
                                        error={Boolean(errors[`edit_substances.${index}.substance_id`])}
                                        helperText={errors[`edit_substances.${index}.substance_id`]}
                                    >
                                        <MenuItem value="">
                                            <em>Оберіть субстанцію</em>
                                        </MenuItem>
                                        {substances && substances.map((s) => (
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
                    <Button type="submit" form="edit-form" variant="contained" color="primary">
                        Зберегти
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default WaterCompensationsCreate;
