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
import { router, useForm, usePage, Link } from '@inertiajs/react';

const EmissionTable = ({ emissions, corporations, substances }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        corporation_id: '',
        substance_id: '',
        year: '',
        volume: '',
        volume_spent: '',
        air_taxes: '',
        water_taxes: '',
    });

    const [editData, setEditData] = useState({
        id: null,
        corporation_id: '',
        substance_id: '',
        year: '',
        volume: '',
        volume_spent: '',
        air_taxes: '',
        water_taxes: '',
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
            air_taxes: emission.air_taxes,
            water_taxes: emission.water_taxes,
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
                    Додати новий запис викидів
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
                                <em>Оберіть підприємство</em>
                            </MenuItem>
                            {corporations.map((corp) => (
                                <MenuItem key={corp.id} value={corp.id}>
                                    {corp.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <IconButton
                            color="primary"
                            component={Link}
                            href="/corporations" // Route to create a new corporation
                            sx={{ ml: 2 }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Box>

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
                            href="/substances" // Route to create a new substance
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
                        {Array.from({ length: 2024 - 1915 + 1 }, (_, i) => 2024 - i).map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Об'єм викидів т/рік"
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
                        label="Масова витрата г/год"
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
                        label="Ставка податку(повітря) грн/т"
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
                    <TextField
                        label="Ставка податку(вода) грн/т"
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Додати
                    </Button>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <form onSubmit={handleSearch}>
                    <TextField
                        label="Пошук"
                        variant="outlined"
                        fullWidth
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Введіть запит для пошуку"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Шукати
                    </Button>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Таблиця викидів
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Підприємство</TableCell>
                                <TableCell>Забруднююча речовина</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'year'}
                                        direction={orderDir}
                                        onClick={() => handleSort('year')}
                                    >
                                        Рік звітності
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'volume'}
                                        direction={orderDir}
                                        onClick={() => handleSort('volume')}
                                    >
                                        Об'єм викидів т/рік
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Масова витрата г/год</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'air_taxes'}
                                        direction={orderDir}
                                        onClick={() => handleSort('air_taxes')}
                                    >
                                        Ставка податку(повітря) грн/т
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'water_taxes'}
                                        direction={orderDir}
                                        onClick={() => handleSort('water_taxes')}
                                    >
                                        Ставка податку(вода) грн/т
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Дії</TableCell>
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
                                        <TableCell>{parseFloat(emission.volume_spent).toFixed(3)}</TableCell> {/* Округлення до 0.000 */}
                                        <TableCell>{parseFloat(emission.air_taxes).toFixed(2)}</TableCell> {/* Округлення до 0.00 */}
                                        <TableCell>{emission.water_taxes}</TableCell>
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
                                        Нема записів викидів
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={isEditModalOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Редагувати запис викидів</DialogTitle>
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
                            <IconButton
                                color="primary"
                                component={Link}
                                href="/corporations"
                                sx={{ ml: 2 }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                select
                                label="Забруднююча речовина"
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
                            <IconButton
                                color="primary"
                                component={Link}
                                href="/substances"
                                sx={{ ml: 2 }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Box>

                        <TextField
                            label="Рік звітності"
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
                            label="Об'єм викидів т/рік "
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
                            label="Масова витрата г/год"
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
                            label="Ставка податку(повітря) грн/т"
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
                        <TextField
                            label="Ставка податку(вода) грн/т"
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

export default EmissionTable;

