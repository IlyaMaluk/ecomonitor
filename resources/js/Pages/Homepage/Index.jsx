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
import { router, useForm, usePage } from '@inertiajs/react';

const EmissionTable = ({ emissions, corporations, substances }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        corporation_id: '',
        substance_id: '',
        year: '',
        volume: '',
        volume_spent: '',
        water_taxes: '',
        air_taxes: '',
    });

    const [editData, setEditData] = useState({
        id: null,
        corporation_id: '',
        substance_id: '',
        year: '',
        volume: '',
        volume_spent: '',
        water_taxes: '',
        air_taxes: '',
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { url, props } = usePage();
    const queryParams = new URLSearchParams(url.split('?')[1]);

    const searchQuery = queryParams.get('q') || '';
    const orderBy = queryParams.get('sort_by') || '';
    const orderDirection = queryParams.get('desc') === '1' ? 'desc' : 'asc';

    const [searchValue, setSearchValue] = useState(searchQuery);
    const [orderColumn, setOrderColumn] = useState(orderBy);
    const [orderDir, setOrderDir] = useState(orderDirection);

    const submit = (e) => {
        e.preventDefault();
        post('/logs', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        router.delete(`/logs/${id}`, {
            preserveScroll: true,
        });
    };

    const handleEditOpen = (emission) => {
        setEditData({
            id: emission.id,
            corporation_id: emission.corporation_id,
            substance_id: emission.substance_id,
            year: emission.year,
            volume: emission.volume,
            volume_spent: emission.volume_spent,
            water_taxes: emission.water_taxes,
            air_taxes: emission.air_taxes,
        });
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        router.put(`/logs/${editData.id}`, editData, {
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

        router.get('/', {
            sort_by: column,
            desc: direction === 'desc' ? 1 : 0,
            q: searchValue,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/', {
            sort_by: orderColumn,
            desc: orderDir === 'desc' ? 1 : 0,
            q: searchValue,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Добавить новую запись о выбросах
                </Typography>
                <form onSubmit={submit} noValidate>
                    <TextField
                        select
                        label="Корпорация"
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
                            <em>Выберите корпорацию</em>
                        </MenuItem>
                        {corporations.map((corp) => (
                            <MenuItem key={corp.id} value={corp.id}>
                                {corp.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Субстанция"
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
                            <em>Выберите субстанцию</em>
                        </MenuItem>
                        {substances.map((substance) => (
                            <MenuItem key={substance.id} value={substance.id}>
                                {substance.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Год"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        error={Boolean(errors.year)}
                        helperText={errors.year}
                    />
                    <TextField
                        label="Объем"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.volume}
                        onChange={(e) => setData('volume', e.target.value)}
                        error={Boolean(errors.volume)}
                        helperText={errors.volume}
                    />
                    <TextField
                        label="Израсходованный объем"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.volume_spent}
                        onChange={(e) => setData('volume_spent', e.target.value)}
                        error={Boolean(errors.volume_spent)}
                        helperText={errors.volume_spent}
                    />
                    <TextField
                        label="Налог на воду"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.water_taxes}
                        onChange={(e) => setData('water_taxes', e.target.value)}
                        error={Boolean(errors.water_taxes)}
                        helperText={errors.water_taxes}
                    />
                    <TextField
                        label="Налог на воздух"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.air_taxes}
                        onChange={(e) => setData('air_taxes', e.target.value)}
                        error={Boolean(errors.air_taxes)}
                        helperText={errors.air_taxes}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Добавить
                    </Button>
                </form>
            </Box>

            {/* Поле поиска */}
            <Box sx={{ mt: 4 }}>
                <form onSubmit={handleSearch}>
                    <TextField
                        label="Поиск"
                        variant="outlined"
                        fullWidth
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Введите запрос для поиска"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Искать
                    </Button>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Список выбросов
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Корпорация</TableCell>
                                <TableCell>Субстанция</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'year'}
                                        direction={orderDir}
                                        onClick={() => handleSort('year')}
                                    >
                                        Год
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'volume'}
                                        direction={orderDir}
                                        onClick={() => handleSort('volume')}
                                    >
                                        Объем
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Израсходовано</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'water_taxes'}
                                        direction={orderDir}
                                        onClick={() => handleSort('water_taxes')}
                                    >
                                        Налог на воду
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'air_taxes'}
                                        direction={orderDir}
                                        onClick={() => handleSort('air_taxes')}
                                    >
                                        Налог на воздух
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {emissions.length > 0 ? (
                                emissions.map((emission) => (
                                    <TableRow key={emission.id}>
                                        <TableCell>{emission.id}</TableCell>
                                        <TableCell>{emission.corporation.title}</TableCell>
                                        <TableCell>{emission.substance.title}</TableCell>
                                        <TableCell>{emission.year}</TableCell>
                                        <TableCell>{emission.volume}</TableCell>
                                        <TableCell>{emission.volume_spent}</TableCell>
                                        <TableCell>{emission.water_taxes}</TableCell>
                                        <TableCell>{emission.air_taxes}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                color="primary"
                                                onClick={() => handleEditOpen(emission)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleDelete(emission.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        Нет записей о выбросах
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Модальное окно для редактирования */}
            <Dialog open={isEditModalOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Редактировать запись о выбросах</DialogTitle>
                <DialogContent>
                    <form id="edit-form" onSubmit={handleEditSubmit} noValidate>
                        <TextField
                            select
                            label="Корпорация"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={editData.corporation_id}
                            onChange={(e) =>
                                setEditData({ ...editData, corporation_id: e.target.value })
                            }
                            error={Boolean(errors.corporation_id)}
                            helperText={errors.corporation_id}
                        >
                            {corporations.map((corp) => (
                                <MenuItem key={corp.id} value={corp.id}>
                                    {corp.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Субстанция"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={editData.substance_id}
                            onChange={(e) =>
                                setEditData({ ...editData, substance_id: e.target.value })
                            }
                            error={Boolean(errors.substance_id)}
                            helperText={errors.substance_id}
                        >
                            {substances.map((substance) => (
                                <MenuItem key={substance.id} value={substance.id}>
                                    {substance.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Год"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.year}
                            onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                            error={Boolean(errors.year)}
                            helperText={errors.year}
                        />
                        <TextField
                            label="Объем"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.volume}
                            onChange={(e) => setEditData({ ...editData, volume: e.target.value })}
                            error={Boolean(errors.volume)}
                            helperText={errors.volume}
                        />
                        <TextField
                            label="Израсходованный объем"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.volume_spent}
                            onChange={(e) =>
                                setEditData({ ...editData, volume_spent: e.target.value })
                            }
                            error={Boolean(errors.volume_spent)}
                            helperText={errors.volume_spent}
                        />
                        <TextField
                            label="Налог на воду"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.water_taxes}
                            onChange={(e) =>
                                setEditData({ ...editData, water_taxes: e.target.value })
                            }
                            error={Boolean(errors.water_taxes)}
                            helperText={errors.water_taxes}
                        />
                        <TextField
                            label="Налог на воздух"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.air_taxes}
                            onChange={(e) =>
                                setEditData({ ...editData, air_taxes: e.target.value })
                            }
                            error={Boolean(errors.air_taxes)}
                            helperText={errors.air_taxes}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Отмена</Button>
                    <Button type="submit" form="edit-form" variant="contained" color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EmissionTable;
